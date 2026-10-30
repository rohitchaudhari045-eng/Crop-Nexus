# Crop Nexus: Frontend API Requirements & Backend Contract Specification

> **Target Architecture:** Java 21 / Spring Boot 3.x, Spring Security (JWT / Bearer Token), Spring Data JPA, PostgreSQL 16 (with PostGIS for GPS spatial coordinates), AWS S3 / MinIO for evidence photo storage.  
> **Status:** Contract Specification for Backend Phase  
> **Target Frontend Client:** React 19, TypeScript, Vite 8 (Mobile-First Web App)  
> **Base URL:** Defined via frontend environment variable `VITE_API_BASE_URL` (e.g., `http://localhost:8080/api/v1`)

---

## 1. Executive Architecture Summary

Crop Nexus is a mission-critical public agricultural workflow platform designed for Maharashtra. It streamlines the reporting of natural disaster crop damages ( अतिवृष्टी, पूर, गारपीट, दुष्काळ ) by farmers within the mandated 72-hour regulatory window, and provides authorized government officers (कृषी सहाय्यक / ग्रामसेवक / तलाठी) with digital verification tools for spot inspections, GPS geofencing, and draft e-Panchanama compilation.

### Key Architectural Tenets
1. **Strict Two-Role RBAC Model:** Only `FARMER` and `OFFICER` roles exist. There is no superuser, public role switcher, or administrative UI.
2. **Stateless JWT Security:** The frontend stores JWT access tokens securely in memory or HTTP-only cookies. No passwords or sensitive keys are persisted in client storage.
3. **Envelope Response Standard:** All API endpoints return a standardized JSON envelope structure with consistent timestamp, status, and localized error schemas.
4. **Provisional Legal Status:** Damage report submissions and draft e-Panchanamas are provisional administrative records and do not constitute approved financial grants until countersigned by the Competent Revenue Authority (District Collectorate / Tehsildar).

---

## 2. Standardized API Envelope & Error Format

### 2.1 Success Envelope
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Operation completed successfully",
  "data": { ... },
  "timestamp": "2026-10-30T10:15:30Z"
}
```

### 2.2 Error Envelope
```json
{
  "success": false,
  "statusCode": 400,
  "errorCode": "VALIDATION_FAILED",
  "message": "Input validation failed. Please check the supplied fields.",
  "errors": {
    "mobileNumber": ["Invalid 10-digit Indian mobile number format"],
    "incidentDate": ["Incident date cannot be in the future"],
    "evidencePhotos": ["At least one photo must be uploaded"]
  },
  "timestamp": "2026-10-30T10:15:30Z",
  "path": "/api/v1/damage-reports"
}
```

### 2.3 Standard HTTP Error Status Codes
| HTTP Code | Error Code | Meaning / Frontend Action |
|:---|:---|:---|
| `400 Bad Request` | `VALIDATION_FAILED` | Field errors rendered directly beneath form inputs. |
| `401 Unauthorized` | `UNAUTHENTICATED` / `TOKEN_EXPIRED` | Frontend clears session and redirects to `/login`. |
| `403 Forbidden` | `ACCESS_DENIED` | User role does not match required endpoint permissions. |
| `404 Not Found` | `RESOURCE_NOT_FOUND` | Record does not exist; display empty state / not found view. |
| `409 Conflict` | `DUPLICATE_CLAIM` | A claim for this Survey Number / Season has already been submitted. |
| `413 Payload Too Large` | `FILE_SIZE_EXCEEDED` | Photo exceeds 10MB limit. |
| `422 Unprocessable` | `BUSINESS_RULE_VIOLATION` | E.g., reported affected area exceeds total cultivated area. |
| `500 Server Error` | `INTERNAL_SERVER_ERROR` | System error; frontend displays retry notification. |

---

## 3. Core TypeScript Models (Frontend Contract)

The frontend expects the backend payloads to map directly to the following TypeScript interfaces (`src/types/index.ts`):

```typescript
export type UserRole = 'farmer' | 'officer';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  district?: string;
  taluka?: string;
  village?: string;
  preferredLanguage?: 'en' | 'mr';
  createdAt?: string;
}

export type DamageCause =
  | 'heavy_rainfall'   // अतिवृष्टी
  | 'flood'            // पूर
  | 'hailstorm'        // गारपीट
  | 'drought'          // दुष्काळ
  | 'pest_attack'      // कीड व रोग
  | 'cyclone_wind';    // वादळ / चक्रीवादळ

export type CropSeason = 'Kharif' | 'Rabi' | 'Zaid';

export type ClaimStatus =
  | 'submitted'
  | 'under_review'
  | 'inspection_scheduled'
  | 'inspection_completed'
  | 'panchanama_drafted'
  | 'approved'
  | 'rejected'
  | 'requires_information';

export type CompensationStatus =
  | 'pending'
  | 'calculated'
  | 'sanctioned'
  | 'disbursed'
  | 'rejected';

export interface ClaimRecord {
  id: string;
  claimNumber: string;               // e.g. CN-2026-MH-4821
  userId: string;
  farmerName: string;
  phone: string;
  aadhaarLastFour?: string;
  district: string;
  taluka: string;
  village: string;
  surveyNumber: string;              // 7/12 गट / सर्व्हे क्र.
  cropName: string;
  cropSeason: CropSeason;
  damageCause: DamageCause;
  incidentDate: string;
  cultivatedAreaAcres: number;
  affectedAreaAcres: number;
  estimatedLossPercentage: number;
  description: string;
  evidencePhotos: string[];          // S3 / CDN URLs
  submissionDate: string;
  status: ClaimStatus;
  compensationStatus: CompensationStatus;
  sanctionedAmount?: number;          // Official amount sanctioned by revenue authority
  lastUpdated: string;
  officerNotes?: string;
}

export interface InspectionRecord {
  id: string;
  claimId: string;
  officerId: string;
  officerName: string;
  inspectionDate: string;
  gpsCoordinates?: {
    latitude: number;
    longitude: number;
    accuracyMeters: number;
  };
  verifiedCropName: string;
  verifiedAffectedAreaAcres: number;
  verifiedLossPercentage: number;
  observedDamageCause: DamageCause;
  soilCondition: string;
  waterloggingObserved: boolean;
  fieldObservations: string;
  inspectionPhotos: string[];
  recommendation: 'recommend_approval' | 'recommend_rejection' | 'require_reinspection';
  status: 'draft' | 'completed';
}

export interface EPanchanamaDocument {
  id: string;
  panchanamaNumber: string;          // e.g. EP-MH-KHP-2026-0042
  claimId: string;
  claimNumber: string;
  generationDate: string;
  revenueCircle: string;
  village: string;
  taluka: string;
  district: string;
  surveyNumber: string;
  farmerName: string;
  farmerAadhaarLast4: string;
  officerName: string;
  officerDesignation: string;
  witness1Name: string;
  witness1Contact: string;
  witness2Name: string;
  witness2Contact: string;
  verifiedLossPercentage: number;
  damageCause: string;
  officialDisclaimer: string;
  isDraft: boolean;
}
```

---

## 4. Endpoints Specification

### 4.1 Authentication & Profile Workflow

#### 1. `POST /api/v1/auth/login`
- **Purpose:** Authenticates user credentials and resolves the user's authorized role (`FARMER` or `OFFICER`).
- **Required Role:** Public (Unauthenticated).
- **Request Body (`application/json`):**
  ```json
  {
    "email": "balasaheb.patil@example.com",
    "password": "Password@123"
  }
  ```
- **Validation Rules:**
  - `email`: Valid email format, mandatory.
  - `password`: Non-empty string, mandatory.
- **Expected Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsIn...",
      "refreshToken": "dGhpcy1pcy1hLXJlZnJl...",
      "expiresIn": 86400,
      "user": {
        "id": "usr-farmer-01",
        "name": "Balasaheb Patil",
        "email": "balasaheb.patil@example.com",
        "phone": "+91 98220 12345",
        "role": "farmer",
        "district": "Kolhapur",
        "taluka": "Shirol",
        "village": "Kurundwad",
        "preferredLanguage": "mr"
      }
    }
  }
  ```
- **Error Responses:**
  - `401 Unauthorized`: Invalid credentials (`{"errorCode": "INVALID_CREDENTIALS", "message": "Invalid email or password"}`).
  - `423 Locked`: Account locked due to repeated failed attempts.

---

#### 2. `POST /api/v1/auth/register`
- **Purpose:** Registers a new farmer profile in Maharashtra.
- **Required Role:** Public (Unauthenticated).
- **Request Body (`application/json`):**
  ```json
  {
    "fullName": "Dnyaneshwar Shinde",
    "email": "dnyaneshwar.shinde@example.com",
    "phone": "9823456789",
    "password": "SecurePassword@123",
    "district": "Kolhapur",
    "taluka": "Karveer",
    "village": "Chinchwad",
    "preferredLanguage": "mr"
  }
  ```
- **Validation Rules:**
  - `fullName`: 2 to 100 characters.
  - `phone`: Exactly 10 digits, starts with 6, 7, 8, or 9 (Indian mobile format).
  - `email`: Valid email, unique in database.
  - `password`: Minimum 8 characters, at least 1 number and 1 uppercase letter.
  - `district`: Valid Maharashtra district name.
- **Expected Success Response (`201 Created`):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Registration successful. Please proceed to login.",
    "data": {
      "userId": "usr-farmer-09",
      "registeredAt": "2026-10-30T10:20:00Z"
    }
  }
  ```
- **Error Responses:**
  - `409 Conflict`: Phone or Email already registered.

---

#### 3. `GET /api/v1/auth/me`
- **Purpose:** Fetches the current authenticated user's profile and active session role.
- **Required Role:** Authenticated (`FARMER` or `OFFICER`).
- **Headers:** `Authorization: Bearer <token>`
- **Expected Success Response (`200 OK`):**
  Returns standard `User` object.

---

### 4.2 Damage Reports (Farmer Submission & Tracking)

#### 4. `POST /api/v1/damage-reports`
- **Purpose:** Farmer submits a new crop damage incident report.
- **Required Role:** `FARMER`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body (`application/json`):**
  ```json
  {
    "district": "Kolhapur",
    "taluka": "Shirol",
    "village": "Kurundwad",
    "surveyNumber": "142/2A",
    "cropName": "Sugarcane (ऊस)",
    "cropSeason": "Kharif",
    "damageCause": "heavy_rainfall",
    "incidentDate": "2026-10-28",
    "cultivatedAreaAcres": 3.5,
    "affectedAreaAcres": 2.8,
    "estimatedLossPercentage": 75,
    "description": "Continuous torrential rainfall submerged the standing crop for 48 hours.",
    "evidencePhotos": [
      "https://storage.cropnexus.gov.in/claims/temp/photo1.jpg",
      "https://storage.cropnexus.gov.in/claims/temp/photo2.jpg"
    ]
  }
  ```
- **Validation Rules:**
  - `incidentDate`: Must be within the last 72 hours (regulatory disaster reporting timeline) and cannot be future-dated.
  - `affectedAreaAcres`: Must be `> 0` and `<= cultivatedAreaAcres`.
  - `estimatedLossPercentage`: Between 1 and 100.
  - `evidencePhotos`: Array with at least 1 and at most 6 valid photo URLs.
  - `surveyNumber`: Mandatory 7/12 land record identifier.
- **Expected Success Response (`201 Created`):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Crop damage report submitted successfully",
    "data": {
      "id": "clm-9421",
      "claimNumber": "CN-2026-MH-9421",
      "status": "submitted",
      "submissionDate": "2026-10-30T10:30:00Z"
    }
  }
  ```

---

#### 5. `POST /api/v1/damage-reports/upload-evidence`
- **Purpose:** Multipart/form-data upload for damage photographs and land record extracts.
- **Required Role:** `FARMER`
- **Request Format:** `multipart/form-data`
  - Form field: `file` (Binary Image: JPEG, PNG, WEBP, or HEIC)
- **Validation Rules:**
  - Maximum size: 10 MB per image.
  - MIME types allowed: `image/jpeg`, `image/png`, `image/webp`.
- **Expected Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "statusCode": 200,
    "data": {
      "photoUrl": "https://storage.cropnexus.gov.in/evidence/2026/10/clm-9421-img-01.jpg",
      "thumbnailUrl": "https://storage.cropnexus.gov.in/evidence/2026/10/clm-9421-img-01-thumb.jpg",
      "fileSizeBytes": 2451920
    }
  }
  ```

---

#### 6. `GET /api/v1/damage-reports/my-reports`
- **Purpose:** Returns all damage reports submitted by the logged-in farmer.
- **Required Role:** `FARMER`
- **Query Parameters:**
  - `status` (optional): Filter by `ClaimStatus` (e.g. `submitted`, `inspection_scheduled`).
  - `page` (optional, default `0`): Page index.
  - `size` (optional, default `20`): Page size.
- **Expected Success Response (`200 OK`):**
  ```json
  {
    "success": true,
    "data": {
      "content": [
        {
          "id": "clm-9421",
          "claimNumber": "CN-2026-MH-9421",
          "cropName": "Sugarcane (ऊस)",
          "incidentDate": "2026-10-28",
          "affectedAreaAcres": 2.8,
          "estimatedLossPercentage": 75,
          "status": "submitted",
          "compensationStatus": "pending",
          "submissionDate": "2026-10-30T10:30:00Z"
        }
      ],
      "totalElements": 1,
      "totalPages": 1
    }
  }
  ```

---

#### 7. `GET /api/v1/damage-reports/{id}`
- **Purpose:** Retrieves complete report details for a specific claim.
- **Required Role:** `FARMER` (only own claims) or `OFFICER` (any claim in assigned jurisdiction).
- **Path Parameter:** `id` (e.g. `clm-9421` or `CN-2026-MH-9421`).
- **Expected Success Response (`200 OK`):**
  Returns complete `ClaimRecord` object.

---

### 4.3 Government Officer Workflows (Review, Inspection & e-Panchanama)

#### 8. `GET /api/v1/officer/reports`
- **Purpose:** Retrieves operational queue of reports assigned to the officer's administrative jurisdiction.
- **Required Role:** `OFFICER`
- **Query Parameters:**
  - `status` (optional): Filter by `ClaimStatus`.
  - `taluka` / `village` (optional): Jurisdiction filters.
  - `search` (optional): Search query matching Farmer Name, Claim Number, or Survey Number.
- **Expected Success Response (`200 OK`):**
  Returns list of actionable `ClaimRecord` objects.

---

#### 9. `POST /api/v1/officer/inspections`
- **Purpose:** Officer records spot verification findings and GPS calibration.
- **Required Role:** `OFFICER`
- **Request Body (`application/json`):**
  ```json
  {
    "claimId": "clm-9421",
    "inspectionDate": "2026-10-31",
    "gpsCoordinates": {
      "latitude": 16.6913,
      "longitude": 74.5932,
      "accuracyMeters": 4.2
    },
    "verifiedCropName": "Sugarcane (ऊस)",
    "verifiedAffectedAreaAcres": 2.5,
    "verifiedLossPercentage": 70,
    "observedDamageCause": "heavy_rainfall",
    "soilCondition": "Submerged black cotton soil, root aeration choked",
    "waterloggingObserved": true,
    "fieldObservations": "Crop lodged due to water stagnation. Recommended for immediate compensation under NDRF norms.",
    "inspectionPhotos": [
      "https://storage.cropnexus.gov.in/inspections/2026/insp-01.jpg"
    ],
    "recommendation": "recommend_approval",
    "status": "completed"
  }
  ```
- **Validation Rules:**
  - `gpsCoordinates`: Must have valid lat/long within Maharashtra boundaries and accuracy `< 50m`.
  - `verifiedLossPercentage`: Integer 0 to 100.
  - `verifiedAffectedAreaAcres`: Must be `> 0`.
- **Side Effect on Backend:** Automatically transitions the underlying claim status to `inspection_completed`.
- **Expected Success Response (`201 Created`):**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Spot inspection record created successfully",
    "data": {
      "id": "insp-0084",
      "claimId": "clm-9421",
      "status": "completed"
    }
  }
  ```

---

#### 10. `POST /api/v1/officer/panchanama/generate`
- **Purpose:** Compiles a provisional draft e-Panchanama document from verified claim and inspection records.
- **Required Role:** `OFFICER`
- **Request Body (`application/json`):**
  ```json
  {
    "claimId": "clm-9421",
    "revenueCircle": "Kurundwad Circle",
    "witness1Name": "Ramesh Shankar More",
    "witness1Contact": "98221 54321",
    "witness2Name": "Suresh Ganpat Yadav",
    "witness2Contact": "98223 87654"
  }
  ```
- **Validation Rules:**
  - Two distinct adult witnesses residing in the same village are legally required for panchanama recording.
  - Claim must have completed inspection findings before draft generation.
- **Expected Success Response (`201 Created`):**
  Returns complete `EPanchanamaDocument` with `isDraft: true` and official provisional disclaimer.

---

#### 11. `PATCH /api/v1/officer/claims/{id}/status`
- **Purpose:** Officer updates report lifecycle status (e.g. requesting additional documents).
- **Required Role:** `OFFICER`
- **Request Body (`application/json`):**
  ```json
  {
    "status": "requires_information",
    "officerNotes": "Please upload 7/12 extract showing current year crop entry (पिक पाहणी नोंद)."
  }
  ```
- **Expected Success Response (`200 OK`):**
  Returns updated `ClaimRecord`.

---

### 4.4 Agronomic Recovery & Meteorological Guidance

#### 12. `GET /api/v1/recovery/advisories`
- **Purpose:** Fetches agronomic rehabilitation recommendations published by Agricultural Universities (e.g., MPKV Rahuri).
- **Required Role:** Public / Authenticated.
- **Query Parameters:**
  - `cropName` (optional): e.g. `Sugarcane`, `Soybean`, `Cotton`.
  - `damageCause` (optional): e.g. `heavy_rainfall`, `hailstorm`.
- **Expected Success Response (`200 OK`):**
  Returns array of `CropRecoveryItem` objects.

---

#### 13. `GET /api/v1/weather/alerts`
- **Purpose:** Provides active meteorological warnings from IMD / Mahavedh.
- **Required Role:** Public / Authenticated.
- **Query Parameters:**
  - `district` (optional): e.g. `Kolhapur`, `Solapur`, `Sangli`.
- **Expected Success Response (`200 OK`):**
  Returns array of `WeatherAlertItem` objects.

---

#### 14. `GET /api/v1/notifications`
- **Purpose:** Fetches unread lifecycle notifications for the logged-in user.
- **Required Role:** Authenticated (`FARMER` or `OFFICER`).
- **Expected Success Response (`200 OK`):**
  Returns array of `NotificationItem` objects.

---

## 5. Security & Spring Boot Implementation Guidelines

1. **Role Mapping in Spring Security:**
   - Map roles as `ROLE_FARMER` and `ROLE_OFFICER`.
   - Configure `@PreAuthorize("hasRole('FARMER')")` and `@PreAuthorize("hasRole('OFFICER')")` on controller methods.
2. **CORS Configuration:**
   - Allow origins from local Vite dev server (`http://localhost:5173`) and staging/production domains.
   - Allowed headers: `Authorization`, `Content-Type`, `Accept-Language`.
3. **Database Constraints (PostgreSQL):**
   - Unique index on `(survey_number, crop_season, financial_year, village)` to prevent duplicate claims.
   - Column `sanctioned_amount` must be nullable and only populated when official sanction order is issued.
4. **Audit Trail:**
   - Every status transition must record `changed_by_user_id`, `previous_status`, `new_status`, `timestamp`, and `remarks`.

---

## 6. Frontend Environment Configuration

The frontend dynamically loads backend configuration via `.env`:

```env
# Production/Dev Spring Boot Backend URL
VITE_API_BASE_URL=http://localhost:8080/api/v1

# Maximum File Upload Size in Bytes (10MB)
VITE_MAX_UPLOAD_BYTES=10485760

# Default Language ('en' | 'mr')
VITE_DEFAULT_LANGUAGE=mr
```
