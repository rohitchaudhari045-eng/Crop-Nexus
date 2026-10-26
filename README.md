# Crop Nexus — Agricultural Technology Frontend

**Crop Nexus** is a modern, responsive web application designed for agricultural damage reporting, digital inspection records, draft e-Panchanama compilation, claim tracking, and crop recovery guidance.

---

## 🌾 Technology Stack

- **Framework**: React.js with Vite (`react-ts` template)
- **Language**: TypeScript (Strict Mode enabled)
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS (v4) with customized agritech color palette
- **Icons**: Lucide React
- **Analytics & Data Visualization**: Recharts
- **HTTP Client**: Axios with request/response interceptors
- **Form Validation**: React Hook Form with Zod schemas

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ or v24+
- **npm**: v9+ or v11+

### 2. Installation
```bash
# Clone or open the project folder
cd "Crop Nexus"

# Install dependencies
npm install --legacy-peer-deps
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Key variables:
- `VITE_API_BASE_URL`: Base address of your friend's Python Flask backend (e.g. `http://localhost:5000/api`).
- `VITE_ENABLE_DEMO_MODE`: Set to `true` to enable the built-in interactive demo mock store (simulates end-to-end functionality without needing the backend running). Set to `false` when fully connected to Flask.
- `VITE_WEATHER_API_KEY`: Optional Agromet or OpenWeather API key.

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Production Build & Verification
```bash
npm run build
npm run preview
```

---

## 🏛️ Application Architecture & Roles

Crop Nexus supports three primary roles with role-specific views and quick-switch capabilities:

1. **Farmer (Kisan)**:
   - **Dashboard**: Overview cards for submitted claims, inspections, and compensation status.
   - **Report Crop Damage**: Form 1-A with village/district, 7/12 survey plot numbers, damage cause, and photo uploads with preview/removal.
   - **Claim Tracking**: Search and filter claims by status (`submitted`, `inspection_scheduled`, `inspected`, `panchanama_drafted`, `approved`), view detailed lifecycle stepper.
   - **Crop Recovery Advisor**: Actionable agronomic steps (fertilizer, soil drenching, drainage) for surviving crops after floods, storms, or hailstorms.
   - **Recovery Progression**: Visual before-and-after photo comparison slider and follow-up milestone logs.
   - **Weather Alerts**: 5-day agromet forecast and severe weather alert protocols.

2. **Agriculture Officer (Krishi Adhikari)**:
   - **Inspection Queue**: Filterable claims queue with missing-information indicators.
   - **Field Spot Inspection**: Form 2-B to calibrate GPS coordinates, verify crop variety and acreage, evaluate growth stage, and assess loss percentage.
   - **Draft e-Panchanama**: Standardized digital Form 3-A preview with local Panchas (witnesses) block, officer sign-off, printable `@media print` styling, and edit modal.

3. **Administration (Executive Desk)**:
   - **Disaster Analytics**: Recharts visualizations for crop loss distribution (acres), claims by calamity cause, and monthly SDRF relief trends.
   - **User Management**: Identity and access management across cultivators and inspection officers.
   - **Batch Sanction**: Quick confirmation workflows for relief disbursement.

---

## 🔌 Python Flask Backend API Specification

The frontend communicates with the Flask backend via Axios (`src/services/apiClient.ts`). When the backend is offline, requests gracefully fall back to the local demo mock store (`src/services/mockData.ts`).

### Expected API Endpoint Contracts

| Module | Method | Endpoint | Request Body | Response Format |
|---|---|---|---|---|
| **Auth** | `POST` | `/api/auth/login` | `{ emailOrPhone, password, role }` | `{ success: true, token: string, user: User }` |
| **Auth** | `POST` | `/api/auth/register` | `{ name, email, phone, role, district, village }` | `{ success: true, token: string, user: User }` |
| **Auth** | `GET` | `/api/auth/me` | *Headers: Bearer Token* | `{ success: true, user: User }` |
| **Claims** | `GET` | `/api/claims` | *Query: `?status=&search=&userId=`* | `{ success: true, claims: ClaimRecord[] }` |
| **Claims** | `POST` | `/api/claims` | `CropDamageReportInput` (JSON or multipart) | `{ success: true, claim: ClaimRecord }` |
| **Claims** | `GET` | `/api/claims/:id` | — | `{ success: true, claim: ClaimRecord }` |
| **Claims** | `PATCH` | `/api/claims/:id/status` | `{ status, remarks }` | `{ success: true, claim: ClaimRecord }` |
| **Inspections** | `GET` | `/api/inspections` | — | `{ success: true, inspections: InspectionRecord[] }` |
| **Inspections** | `POST` | `/api/inspections` | `InspectionRecord` input | `{ success: true, inspection: InspectionRecord }` |
| **e-Panchanama** | `GET` | `/api/panchanama/claim/:claimId` | — | `{ success: true, panchanama: EPanchanamaDocument }` |
| **e-Panchanama** | `PUT` | `/api/panchanama/:id` | `Partial<EPanchanamaDocument>` | `{ success: true, panchanama: EPanchanamaDocument }` |
| **Recovery** | `GET` | `/api/recovery/advisories` | — | `{ success: true, advisories: CropRecoveryItem[] }` |
| **Recovery** | `GET` | `/api/recovery/progress` | *Query: `?farmerId=`* | `{ success: true, records: CropRecoveryProgressRecord[] }` |
| **Weather** | `GET` | `/api/weather/alerts` | *Query: `?district=`* | `{ success: true, alerts: WeatherAlertItem[] }` |
| **Weather** | `GET` | `/api/weather/forecast` | *Query: `?district=`* | `{ success: true, forecast: WeatherForecastDay[] }` |
| **Admin** | `GET` | `/api/admin/analytics` | — | `{ success: true, analytics: AdminAnalyticsSummary }` |
| **Admin** | `GET` | `/api/admin/users` | — | `{ success: true, users: User[] }` |

---

## 🔒 Security & Compliance Principles

- **No Plaintext Passwords**: Password fields feature toggle visibility and never persist credentials insecurely.
- **Strict Disclaimers**: Generated e-Panchanama documents are explicitly labeled **PROVISIONAL DRAFT RECORDS** to preserve administrative compliance until official countersignature.
- **Accurate Claims Reporting**: Compensation values are clearly labeled as estimates until sanctioned by verified treasury records.
- **Privacy First**: Private user data and photos are kept local or routed only to the designated backend base URL.

---

## 📁 Source Code Directory Structure

```
Crop Nexus/
├── src/
│   ├── assets/             # Branding icons and static assets
│   ├── components/
│   │   ├── claims/         # Claim timeline, detail modal, photo preview
│   │   ├── common/         # Logo, Button, Badge, Modal, StatCard, EmptyState, Pagination, DemoBanner
│   │   ├── panchanama/     # Printable Draft e-Panchanama report and editor
│   │   ├── recovery/       # Before-and-after split comparison slider
│   │   └── weather/        # Agromet district selector and forecast widget
│   ├── context/            # AuthContext (multi-role + demo toggle), ToastContext
│   ├── layouts/            # PublicLayout, DashboardLayout, Navbar, Sidebar, Topbar, Footer
│   ├── pages/
│   │   ├── admin/          # AdminDashboard (Recharts), UserManagementPage
│   │   ├── auth/           # LoginPage, RegisterPage
│   │   ├── farmer/         # FarmerDashboard, ReportDamagePage, ClaimTrackingPage, Recovery pages
│   │   ├── officer/        # OfficerDashboard, OfficerInspectionPage, DraftPanchanamaPage
│   │   ├── shared/         # ProfilePage, SettingsPage, NotificationsPage, HelpSupportPage, NotFoundPage
│   │   └── LandingPage.tsx # Public agritech landing page
│   ├── routes/             # AppRoutes (React Router DOM)
│   ├── services/           # apiClient (Axios), apiService, mockData
│   ├── types/              # Comprehensive TypeScript interfaces
│   ├── utils/              # formatters, constants, helpers
│   ├── App.tsx             # Main provider wrapper
│   ├── index.css           # Tailwind CSS imports & @media print styles
│   └── main.tsx            # Application root
├── .env.example
├── package.json
├── tsconfig.app.json
├── vite.config.ts
└── README.md
```
