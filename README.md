<div align="center">🌾 Crop Nexus
Smart Crop-Loss Reporting & Digital Farmer Support Platform
Empowering Farmers • Connecting Technology • Supporting Agriculture

A unified digital platform for crop damage reporting, compensation claim tracking, field inspection support, e-Panchanama documentation, crop recovery guidance, and weather alerts.
</div>📌 About Crop Nexus
Crop Nexus is a digital agriculture platform designed to bring essential crop-loss reporting and farmer-support workflows together in one place.

The platform connects three key user groups — farmers, government field officers, and administrators — through dedicated dashboards and a centralized application workflow.

Farmers can use the platform to report crop damage, follow claim progress, access crop recovery guidance, and receive weather alerts. Field officers have a dedicated workspace to support inspection and e-Panchanama documentation workflows, while administrators can access platform-management features.
Our vision: Make crop-loss support services more accessible, organized, and transparent through digital technology.

🚜 The Problem
When crops are damaged, farmers may need to navigate several processes to report losses, provide information, follow up on claims, and find relevant support. These activities can involve documentation and coordination between farmers and field officers.

Common challenges include:
- Difficulty accessing a convenient digital channel for crop-damage reporting.
- Documentation and inspection workflows that can be difficult to coordinate.
- Limited visibility into compensation claim progress.
- Difficulty finding relevant crop recovery guidance.
- Need for timely, accessible weather information.
- Coordination gaps between farmers and field officers.
💡 Our Solution
Crop Nexus brings these related activities into a single digital platform with role-based dashboards.

The platform is designed to:
- Provide a digital crop-damage reporting workflow.
- Help farmers track compensation claim status.
- Support field inspection and e-Panchanama documentation.
- Make crop recovery guidance accessible.
- Provide weather alerts and notifications.
- Organize access for farmers, officers, and administrators.
✨ Key Features
👨‍🌾 Farmer Module
- Farmer registration and login.
- Personalized farmer dashboard.
- Crop damage reporting.
- Compensation claim tracking.
- Crop recovery guidance.
- Weather alerts.
- Notifications.
🏢 Government Officer Module
- Dedicated field officer dashboard.
- Access to crop-damage reports.
- Crop inspection workflow support.
- e-Panchanama documentation support.
⚙️ Administration Module
- Admin dashboard.
- Platform and report monitoring.
- Administrative management features.
🔄 Core Workflow
                 FARMER
                    |
                    v
          Registration / Login
                    |
                    v
            Farmer Dashboard
                    |
                    v
          Crop Damage Reporting
                    |
                    v
          Claim Status Tracking
                    |
                    v
          Field Officer Workflow
                    |
                    v
        Inspection & e-Panchanama
                    |
                    v
       Updates / Notifications / Support
🏗️ System Architecture
Crop Nexus uses a frontend, backend, and relational database architecture.
+--------------------------------------------------+
|                    USERS                         |
|             Farmer | Officer | Admin             |
+--------------------------+-----------------------+
                           |
                           v
+--------------------------------------------------+
|                  FRONTEND                        |
|               React + TypeScript                 |
|           Role-based dashboards and UI           |
+--------------------------+-----------------------+
                           |
                           v
+--------------------------------------------------+
|                    REST API                      |
|                    /api/v1                       |
|                 25 endpoints                     |
+--------------------------+-----------------------+
                           |
                           v
+--------------------------------------------------+
|                    BACKEND                       |
|                Java 21 / Spring Boot 4           |
|          Spring Security / JWT / Spring Data JPA |
+--------------------------+-----------------------+
                           |
                           v
+--------------------------------------------------+
|                    DATABASE                      |
|                   PostgreSQL                     |
|                 12 JPA entities                  |
+--------------------------------------------------+
🧰 Technology Stack
Layer	Technologies
Frontend	React.js, TypeScript, Vite
Backend language	Java 21
Backend framework	Spring Boot 4
Security	Spring Security, JWT
API	REST API, /api/v1
API documentation	Swagger UI
Database	PostgreSQL
Persistence	Spring Data JPA
Data model	12 JPA entities
API surface	25 endpoints


🔐 Security
The backend uses Spring Security and JSON Web Token (JWT) as part of its authentication and security implementation.

These technologies provide the foundation for authenticated access and securing backend API routes. Actual authorization rules depend on the backend configuration.
🔌 Backend API
The backend exposes REST endpoints under the base path:
/api/v1
API overview:
- 25 REST API endpoints.
- Java 21 and Spring Boot 4.
- Spring Security and JWT authentication.
- PostgreSQL persistence through Spring Data JPA.
- Swagger UI for API exploration and documentation.
🗄️ Database
Crop Nexus uses PostgreSQL as its relational database and Spring Data JPA for persistence.

The backend data model includes 12 JPA entity classes.
▶️ Getting Started
Prerequisites
Install the following tools:
- Git
- Node.js and npm
- Java Development Kit (JDK) 21
- PostgreSQL
- Maven, if the project does not include the Maven Wrapper
1. Clone the repository
git clone https://github.com/rohitchaudhari045-eng/Crop-Nexus.git
cd Crop-Nexus
2. Install frontend dependencies
Open the frontend application directory — the directory containing its package.json — and run:
npm install
3. Configure the backend
Open the Spring Boot backend project directory — the directory containing its pom.xml or Maven Wrapper.

Configure the PostgreSQL connection and any required environment variables in the backend's application configuration. Use your own local credentials; do not commit passwords, JWT secrets, or other private values to Git.
4. Run the backend
From the backend project directory, run:
mvn spring-boot:run
If the repository includes a Maven Wrapper, use the wrapper command provided by the project instead.
5. Run the frontend
From the frontend project directory, run:
npm run dev
Open the local development URL printed by Vite in the terminal.
Note: Run commands from the relevant frontend or backend project directory. The repository's actual folder layout and configuration determine the exact working directories and required environment variables.

🌱 Expected Impact
Crop Nexus is designed to support:

Farmers
- More accessible crop-damage reporting.
- A convenient way to follow claim progress.
- Access to crop recovery guidance and weather alerts.
Field Officers
- Organized access to crop-damage reports.
- Support for inspection and e-Panchanama documentation workflows.
Agricultural ecosystem
- More organized digital workflows.
- Better coordination between stakeholders.
- A platform concept that can be evaluated and improved for wider adoption.
These are intended benefits; actual outcomes depend on testing, adoption, and integration with relevant services.
🚀 Future Scope
Potential areas for future development include:
- Integration with verified government agriculture services.
- Integration with trusted real-time weather data providers.
- AI-assisted crop-damage assessment.
- Marathi and other regional-language experiences.
- Mobile application support.
- Advanced analytics and reporting.
- Integration with official compensation workflows.
These are future possibilities and are not represented as completed integrations.
👥 Team Conquerors
Team Member	Responsibility
Rohit Manohar Chaudhari	Team Leader & Frontend Developer
Akshay Vinod Patil	Backend Developer


🏆 Project
Crop Nexus — developed as a student innovation project for the Seva First Innovation Challenge 2026 – Maharashtra.

Focus area: Farmer income protection, market access, and digital crop-loss assessment.
<div align="center">🌾 Connecting Farmers with Digital Agricultural Support
Built for Farmers. Designed for Impact.
</div>
