# GRAMSETU (ग्रामसेतु)

> **"Panchayat ka har kaam, ek digital platform par."**  
> *Official Demo & Presentation Platform for Digital Gram Panchayat Administration*

---

## 🏛️ Project Overview

**GRAMSETU** is a production-quality, enterprise-grade digital governance platform built specifically for Indian Gram Panchayats. Designed to be presented to Sarpanches, Panchayat Secretaries (Sachiv), Ward Panches, Janpad/Zilla Panchayat CEOs, and Department of Panchayati Raj officials, GRAMSETU transforms rural local body administration by bringing transparency, citizen engagement, and AI-powered operational insights under one unified platform.

This demo prototype is configured with realistic sample data for **Gram Panchayat Rampur, Tehsil Waraseoni, District Balaghat, Madhya Pradesh**.

---

## 🌟 Core Value Proposition

- **100% Panchayat Work Digitization:** Replace manual physical registers with audited digital workflows.
- **Development Project Monitoring:** Real-time physical and financial tracking of CC roads, covered drains, community water tanks, and street lights with Before/After photographic evidence.
- **Gram Sabha & Quorum Management:** Digital scheduling, agenda publishing, attendee quorum tracking, resolution registers, and action items.
- **Citizen Grievance Redressal:** Transparent ticketing for water leakage, street lighting, and sanitation with SLA timelines and citizen satisfaction ratings.
- **Workers & Muster Roll Tracking:** Daily attendance (Present/Absent/Leave) and task allocation for sanitation, water supply, and MGNREGA laborers.
- **Government Scheme Facilitation:** Catalog of flagship schemes (PMAY-G, Ladli Behna, PM-Kisan, Jal Jeevan Mission) with smart eligibility verification and CSC token generation.
- **AI Panchayat Intelligence:** Deterministic AI pattern recognition providing schedule delay warnings, complaint spike anomalies, and 1-click executive monthly reports.
- **Bilingual Interface:** Instant seamless switching between English and Hindi (हिंदी).

---

## 🚀 Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS (Custom Government Civic Palette: Navy `#0F2747`, Blue `#1769AA`, Green `#16865B`)
- **Routing:** React Router v7
- **Charts & Data Visualization:** Recharts (Area charts, Bar charts, Donut charts)
- **Icons:** Lucide React
- **Type Safety & Architecture:** Clean TypeScript types, decoupled Service API layer, and local storage state persistence.

---

## 📂 Project Architecture

```
gramsetu-panchayat-demo/
├── src/
│   ├── components/
│   │   ├── common/             # GlobalSearchModal, PresentationWalkthrough
│   │   ├── layout/             # Navbar, Sidebar
│   ├── layouts/                # MainLayout
│   ├── pages/
│   │   ├── auth/               # LoginPage (with 1-click Demo Role Logins)
│   │   ├── dashboard/          # DashboardPage (Overview, Stats, AI Alerts, Charts)
│   │   ├── members/            # MembersPage (Panchayat Administration & Staff)
│   │   ├── notices/            # NoticesPage (Communication & Official Circulars)
│   │   ├── projects/           # ProjectsPage (Development Tracking, DPR, MB, Photos)
│   │   ├── meetings/           # MeetingsPage (Gram Sabha, MoM, Resolutions)
│   │   ├── complaints/         # ComplaintsPage (Grievance Redressal & Tracking)
│   │   ├── schemes/            # SchemesPage (Govt Schemes & Eligibility Checker)
│   │   ├── workers/            # WorkersPage (Muster Roll & Daily Attendance)
│   │   ├── village/            # VillagePage (Demographics, Facilities, Ward Grid)
│   │   ├── documents/          # DocumentsPage (Repository, Orders, Approvals)
│   │   ├── reports/            # ReportsPage (Audit Analytics & Printable Report)
│   │   ├── ai-intelligence/    # AIIntelligencePage (Autonomous Risk Analysis)
│   │   ├── notifications/      # NotificationsPage (System Broadcast Alerts)
│   │   └── settings/           # SettingsPage (Panchayat Profile, RBAC Matrix, Lang)
│   ├── services/               # Mock REST Service Layer ready for Backend
│   ├── mock-data/              # Realistic Rampur GP Datasets (Zero real PII)
│   ├── types/                  # Strict TypeScript interfaces
│   ├── hooks/                  # useAuth, useLanguage, useToast
│   ├── utils/                  # formatters (INR currency, dates), cn, i18n
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/                     # Favicon, assets
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── .env.example
└── README.md
```

---

## 🔑 Demo Login Roles & Credentials

The login page includes **Instant 1-Click Demo Buttons** for direct presentation without typing:

| Role | Name | Access Level |
|---|---|---|
| **Sarpanch (Gram Pradhan)** | Smt. Sunita Bai Maravi | Full Super-Admin Access |
| **Panchayat Secretary (Sachiv)** | Shri Mahendra Singh Patle | Administrative & Accounting Access |
| **Ward Panch (Ward 04)** | Smt. Rekha Meshram | Ward-Level Supervision |
| **Technical Assistant (Sub-Engineer)**| Er. Amit Kumar Bisen | DPR, Estimates & MB Verification |
| **Panchayat Operator / CSC** | Smt. Kavita Sharma | Data Entry & Beneficiary e-KYC |
| **Gram Rojgar Sahayak (GRS)** | Shri Santosh Dhurve | MGNREGA Muster Roll & Labor |
| **Citizen (Public)** | Shri Ramcharan Gautam | Grievance Lodging & Public Transparency |

*Manual Login Default Credentials:*  
- Mobile: `9826144520`  
- OTP: `123456`

---

## ⚡ Installation & Running Locally

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 2. Setup
```bash
# Clone or extract archive
cd gramsetu-panchayat-demo

# Install dependencies
npm install

# Start local Vite development server
npm run dev
```

Open your browser at `http://localhost:5173`.

### 3. Production Build & Verification
```bash
# Compile TypeScript and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🧭 Sarpanch 10-Minute Presentation Flow

For a live demo to a Sarpanch or district collector, use the top **Demo Tour Bar**:
1. **Login:** Demonstrate 1-click role switcher between Sarpanch, Sachiv, and Citizen.
2. **Dashboard:** Point out 8 core stats, live budget utilization (₹40.7L), and AI anomaly card.
3. **Panchayat Members:** Show all 12 ward panches, attendance rates, and assign task button.
4. **Development Projects:** Inspect *CC Road Construction – Ward 04* (Budget ₹8.5L, 68% progress).
5. **Update Progress:** Click *Update Progress* to show how engineers submit photo and expenditure updates.
6. **Gram Sabha:** Display upcoming 15 Nov Gram Sabha, 4 published agenda items, and passed resolutions.
7. **Citizen Grievances:** Search complaint `GP-2026-00124` (Street light) and view timeline from submission to resolution.
8. **Government Schemes:** Run the interactive *Check Eligibility* on Ladli Behna or PM Awas.
9. **Workers & Attendance:** Toggle worker attendance (Present/Absent/Leave) in 1 click.
10. **AI Intelligence & Reports:** Click *Generate Monthly AI Report* to show the auto-synthesized audit summary.

---

## 🔌 Future Backend Integration

All data access is channeled through modular services located in `src/services/` (`projectService`, `complaintService`, `meetingService`, `schemeService`, etc.). To integrate with a real Django, Node.js, Spring Boot, or NIC API:
1. Update `VITE_API_BASE_URL` in `.env`.
2. Replace the `mock...` references in `src/services/*` with `fetch()` or `axios` calls to your REST endpoints.
3. Replace `aiService.generateMonthlyReport` with calls to Gemini 1.5/2.0 Flash or an LLM pipeline.

---

## 🔒 Security & Privacy Notice

This application contains **sample demonstration mock data only**. No real citizens' personally identifiable information (PII) is stored or displayed.

