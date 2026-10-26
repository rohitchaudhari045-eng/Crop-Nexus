# Crop Nexus — Product Context

## Purpose & Mission
Crop Nexus is an agricultural technology platform designed to bring digital transparency, speed, and accuracy to crop damage reporting, field spot inspections, provisional e-Panchanama draft generation, and post-calamity crop recovery guidance.

## Target Audience & Personas
1. **Farmers / Cultivators (Kisan)**:
   - Primary Goal: Report localized crop losses caused by natural calamities (torrential rainfall, hailstorms, flooding, high winds) within the statutory 72-hour window, track relief claim progression, and receive agronomic recovery advisories to salvage surviving yields.
   - Operating Environment: Mobile and desktop browsers in rural and semi-rural settings, varying network conditions, high ambient light outdoors.
2. **Agriculture Officers (Krishi Adhikari / Circle Inspectors)**:
   - Primary Goal: Conduct on-site physical field inspections, calibrate GPS coordinates, cross-verify 7/12 land records, assess crop growth stage and damage percentage, and compile provisional draft e-Panchanamas with local Panchas (witnesses).
   - Operating Environment: Field visits on tablets and smartphones, desktop review in taluka/district offices.
3. **Agricultural Administrators & District Collectors**:
   - Primary Goal: Monitor district-wide disaster analytics, loss distribution across crop varieties, balance inspector workloads, and review batches of verified e-Panchanama records for State Disaster Response Fund (SDRF) sanctions.

## Key Capabilities & Workflows
- **Damage Intimation (Form 1-A)**: Farmer submits crop particulars, 7/12 plot/gut numbers, calamity cause, loss estimates, and geotagged field photos.
- **Spot Field Survey (Form 2-B)**: Officer visits plot, captures coordinates, evaluates acreage loss, and records panchas statements.
- **Provisional Draft e-Panchanama (Form 3-A)**: Digital compilation of verified findings with print/PDF export and audit trail.
- **Agronomic Recovery Advisor**: Guidance on drainage, soil drenching, foliar nutrition, and KVK consultation.
- **Recovery Progression**: Side-by-side before-and-after photo comparison slider and follow-up milestone logging.
- **Agromet Weather Alerts**: Real-time district meteorological warnings and preventive farming measures.

## Constraints & Principles
- **No Official Government Claim**: Documents are explicitly designated as *Provisional Draft Reports* until reviewed and countersigned by competent revenue authorities.
- **High-Contrast Outdoor Legibility**: Interfaces must be readable under direct sunlight (strict WCAG AA contrast).
- **Legible Typography**: No functional UI text below 11px; body text at 14–16px.
- **Independent Frontend**: Built ready for Python Flask API integration via Axios with a robust client-side demo fallback.
