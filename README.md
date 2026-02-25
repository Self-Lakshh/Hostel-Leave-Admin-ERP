<h1 align="center">
  <br />
  🏛️ SPSU Hostel Leave ERP — Security Portal
  <br />
</h1>

<p align="center">
  A dedicated, real-time security gate management system for Sir Padampat Singhania University's hostel leave & outgoing workflow.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Version-1.2.0-success?style=for-the-badge" />
</p>

<p align="center">
  <a href="https://github.com/Self-Lakshh/Hostel-Leave-Security-ERP">
    <strong>📁 GitHub Repository</strong>
  </a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#-quick-start">
    <strong>🚀 Quick Start</strong>
  </a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#-portal-overview">
    <strong>🖥️ Portal Overview</strong>
  </a>
</p>

---

## 📌 About The Project

The **SPSU Hostel Leave ERP – Security Portal** is the gate-facing module of the larger Hostel Leave Management ecosystem. It is purpose-built for **security guards and supervisors** stationed at hostel entry/exit points.

Instead of manual registers, this portal provides a **live, digital dashboard** where security staff can:
- View all **approved leave/outgoing requests** in real time
- Mark a student's **physical gate exit (OUT)** and **return (IN)** with a single click
- Maintain a complete, exportable **leave movement audit trail**

This system eliminates paper logs, prevents unauthorized exits, and creates a tamper-proof record of every student movement.

---

## ✨ Key Features

### 🔐 Authentication
- Secure **Employee ID + Password** login for security staff
- JWT-based session management stored via cookies
- Role-restricted access — only users with the `security` role can access portal routes

### 🟠 Out Entry (Gate Exit Logging)
- Displays all **pending approved requests** awaiting physical gate exit
- Security guard marks **Gate OUT** for each student to confirm departure
- Real-time status update to the central hostel management system
- Search by student name, enrollment number, or reason
- Filter by **custom date range**

### 🟢 In Entry (Gate Return Logging)
- Lists all students who have **exited and not yet returned**
- Mark **Gate IN** to confirm the student has returned safely to the hostel
- Identical search and date filter controls

### 📋 Leave Records (History & Audit)
- Full archive of **all completed leave and outing movements**
- Timestamped **Gate OUT and Gate IN** entries per student
- **Export to PDF** — landscape-formatted professional report with auto-table, title, and generation timestamp
- **Export to XLSX** — native Excel spreadsheet with granular columns:
  - Student Details, Enrollment No, **Hostel** (separate), **Room No** (separate), Applied From, Applied To, Reason, Gate Out, Gate In

### 🗂️ Resilient Timestamp Resolution
Gate OUT / Gate IN times are derived through a **multi-fallback chain**:
1. Explicit `action_time` in the action log
2. `updated_at` / `updatedAt` timestamp on the action document
3. MongoDB `_id`-encoded timestamp (ObjectId to UNIX)
4. Document-level `security_status` update timestamp
5. Falls back to `---` for genuinely pending entries

This guarantees the on-screen display and exported reports are **always in sync**.

---

## 🖥️ Portal Overview

```
/login                    → Security Staff Sign In
/security/out-request     → Gate EXIT logging (default landing)
/security/in-request      → Gate RETURN logging
/security/leave-records   → Full audit history + PDF/XLSX export
```

| Page | Purpose | Export |
|------|---------|--------|
| Out Entry | Approve exits at gate | ✗ |
| In Entry | Confirm student returns | ✗ |
| Leave Records | Full movement audit | ✅ PDF + XLSX |

---

## 🏗️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 + TypeScript 5.7 |
| **Build Tool** | Vite 6 |
| **Styling** | Tailwind CSS v4 |
| **State Management** | Zustand 5 |
| **Routing** | React Router DOM v6 |
| **Tables** | TanStack Table v8 |
| **Forms** | React Hook Form + Zod |
| **HTTP** | Axios |
| **Date Handling** | Day.js |
| **PDF Export** | jsPDF + jsPDF-AutoTable |
| **Excel Export** | SheetJS (xlsx) |
| **Notifications** | Sonner |
| **Icons** | Lucide React + React Icons |
| **Animation** | Framer Motion |

---

## 📁 Project Structure

```
src/
├── auth/                          # Auth context, guards, HOCs
├── components/
│   ├── layouts/
│   │   └── PostLoginLayout/       # Collapsible sidebar layout
│   ├── template/
│   │   ├── Header.tsx             # Top nav with portal branding
│   │   ├── SideNav.tsx            # Collapsible sidebar + logo
│   │   └── UserProfileDropdown.tsx # Welcome greeting + sign out
│   └── ui/                        # Base UI components (Input, Button, etc.)
├── configs/
│   ├── app.config.ts              # API prefix, entry paths
│   ├── endpoint.config.ts         # All API endpoint definitions
│   └── navigation.config/         # Sidebar navigation items
├── services/
│   ├── ApiService.ts              # Axios wrapper
│   ├── AuthService.ts             # Login/logout API calls
│   └── Security.ts                # Security module API + types
├── store/
│   ├── authStore.ts               # Zustand user session store
│   └── themeStore.ts              # Layout/theme preferences
└── views/
    ├── auth/SignIn/               # Login page
    └── security/
        ├── OutRequest/            # Gate exit page
        ├── InRequest/             # Gate return page
        ├── LeaveRecords/          # Audit history page
        └── components/
            ├── SecurityTable.tsx   # Shared data table component
            ├── SearchBar.tsx       # Pill search input
            ├── FilterTableByDate.tsx # Date range filter
            ├── ExportButton.tsx    # PDF / XLSX export trigger
            └── useSecurityRequests.ts # Central data + export hook
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A running instance of the **SPSU Hostel Leave Backend API**

### 1. Clone the Repository

```bash
git clone https://github.com/Self-Lakshh/Hostel-Leave-Security-ERP.git
cd Hostel-Leave-Security-ERP
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file in the project root:

```env
VITE_BASE_URL=https://your-backend-api.com/api
```

> If `VITE_BASE_URL` is not set, the app defaults to `/api` (same-origin proxy).

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at **`http://localhost:5173`**

### 5. Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to serve via Nginx, Vercel, or any static host.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/security/login` | Authenticate security staff |
| `GET` | `/security/allRequests/pending` | Fetch pending (awaiting OUT) requests |
| `GET` | `/security/allRequests/in` | Fetch students currently out (awaiting IN) |
| `GET` | `/security/allRequests/out` | Fetch all completed leave records |
| `PUT` | `/request/update-status` | Mark Gate OUT or Gate IN for a request |

All authenticated requests include a `Bearer` token in the `Authorization` header, persisted via **HTTP-only cookies**.

---

## 📤 Export System

The Leave Records page supports one-click professional exports:

### PDF Report
- **Landscape orientation** for wide data tables
- Includes report title and generation timestamp
- Black header row with alternating row shading
- Generated via `jsPDF` + `jsPDF-AutoTable`

### Excel Spreadsheet
- Native `.xlsx` format (opens perfectly in Microsoft Excel / Google Sheets)
- Generated via `SheetJS (xlsx)`

**Export columns:**

| STUDENT DETAILS | ENROLLMENT NO | HOSTEL | ROOM NO | APPLIED FROM | APPLIED TO | REASON | GATE OUT | GATE IN |
|---|---|---|---|---|---|---|---|---|

**File naming format:** `Leave_Records_DDMMYYYY_HHMM.pdf` / `.xlsx`

---

## 🎨 UI Design System

- **Color**: Minimal white/gray palette with primary accent for active states
- **Typography**: Inter font with consistent sizing scale
- **Layout**: Collapsible sidebar (290px expanded / 80px collapsed)
- **Header**: Portal branding centered — *"SPSU Hostel Leave ERP – Security Portal"* — with personalized `Welcome, {emp_id}` greeting
- **Controls**: Rounded-md search bar + labeled date range pills with active arrow indicator
- **Table**: Sticky header, alternating row hover, fully scrollable within viewport
- **Responsive**: Mobile-first, sidebar hidden on small screens with mobile navigation

---

## 🗺️ Roadmap

- [ ] Real-time updates via WebSockets / SSE
- [ ] Biometric / QR-based student verification toggle
- [ ] Weekly automated movement summary email to warden
- [ ] Night-mode support (dark theme)
- [ ] Multi-hostel gate filtering

---

## �‍💻 Developers

**Lakshya Chopra**
- GitHub: [@Self-Lakshh](https://github.com/Self-Lakshh)
- Project: [Hostel-Leave-Security-ERP](https://github.com/Self-Lakshh/Hostel-Leave-Security-ERP)

**Riya**
- GitHub: [@Riya-TheLazyDev](https://github.com/Riya-TheLazyDev)

---

## 📄 License

This project is private and intended for use within **Sir Padampat Singhania University (SPSU)** hostel administration infrastructure.

---

<p align="center">
  Built with ❤️ for smarter, paperless hostel management at SPSU
</p>
