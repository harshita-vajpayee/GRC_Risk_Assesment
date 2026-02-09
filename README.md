# GRC Risk Assessment & Heatmap Dashboard

A full-stack GRC (Governance, Risk & Compliance) risk assessment tool that allows users to assess risks using a standard **Likelihood × Impact** matrix, store them persistently, and visualize insights via an interactive dashboard and heatmap.

This project mirrors how real-world GRC tools (ISO 27001 / NIST SP 800-30 aligned) perform qualitative risk assessments to prioritize mitigation efforts.

---

## 🧠 Core Concept (GRC Context)

Organizations face multiple risks (cyber, operational, compliance, etc.).  
To prioritize them, GRC teams typically:

1. Estimate **Likelihood** (1–5)
2. Estimate **Impact** (1–5)
3. Compute **Risk Score = Likelihood × Impact**
4. Map score to a **Risk Level**:
   - 1–5 → Low
   - 6–12 → Medium
   - 13–18 → High
   - 19–25 → Critical
5. Visualize risks on a **5×5 heatmap** for decision-makers
   <img width="1904" height="890" alt="Screenshot 2026-02-09 234228" src="https://github.com/user-attachments/assets/2ac792df-67da-4284-bcd5-94c6ae530f08" />


This application implements exactly this workflow end-to-end.

---

## 🛠 Tech Stack

### Backend
- **FastAPI** (REST API)
- **SQLite** (persistent storage)
- **SQLAlchemy** (ORM)
- **Pydantic** (validation)

### Frontend
- **React.js (CRA)**
- **Bootstrap** (UI styling)
- **React Hooks** (`useState`, `useEffect`, `useMemo`)
- **Fetch/Axios** for API integration

---

## 🚀 How to Run the Project

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app:app --reload
```
Backend runs at:http://127.0.0.1:8000

Swagger Docs:http://127.0.0.1:8000/docs

### Frontend Setup
```
cd frontend
npm install
npm start
```
Frontend runs at:http://localhost:3000

### 📊 Dashboard
 - Risk register table
 - Sortable columns (Score)
 - Level-based filtering (Low / Medium / High / Critical)
 - CSV export (current filtered view)
 - Interactive heatmap: Click cell → filters table by likelihood & impact

<img width="1893" height="963" alt="Screenshot 2026-02-09 234144" src="https://github.com/user-attachments/assets/da03d733-5c83-4bbb-b7ec-415234781ed2" />

### Stats & Analytics Page

 - Accessible via navbar link (separate from dashboard)
 - Total Issues
 - High Risks
 - Critical Risks

Cards are:
 - Color-segregated
 - Clickable
 - Instantly filter the risk list below

<img width="1905" height="944" alt="Screenshot 2026-02-09 234210" src="https://github.com/user-attachments/assets/81d832b3-1e54-42f1-af44-a3fdfbd2e37f" />



## 🔌 API Endpoints
### Add a Risk

POST /api/risks

{
  "asset": "Web Server",
  "threat": "SQL Injection",
  "likelihood": 4,
  "impact": 5
}

### 📄 Get All Risks

GET /api/risks

Returns:

[
  {
    "id": 1,
    "asset": "Web Server",
    "threat": "SQL Injection",
    "likelihood": 4,
    "impact": 5,
    "score": 20,
    "level": "Critical"
  }
]

### 🎯 Get Risks by Level

GET /api/risks?level=High

Supported levels:

Low

Medium

High

Critical

### 📊 Get Risk Statistics

GET /api/risks/stats

{
  "total": 25,
  "high": 6,
  "critical": 4
}

## Testing
Testing has been done by putting 5-7 dummy entries.

## Assumptions 
Assumed no authentication and authorization is required for simplicity.

## Challenges Faced

 - Handled async API calls with useEffect while keeping consistent state for risk list and filtered data.
 - Managing CORS between Vercel frontend and Render backend.
 - Ensuring environment variable REACT_APP_API_URL works for both local and hosted frontend builds.
 - Avoiding re-render loops while filtering stats cards and heatmap clicks.
 - Maintaining clean component structure for reusability (StatsCards, RiskTable, RiskHeatMap).

## Bonuses
 - Export filtered risks to CSV.
 - Clickable stats cards for filtering risks by level.

## Hosting / Deployment

Frontend: Vercel - https://grcrisk-2iazgs9ky-harshita-vajpayees-projects.vercel.app/
Backend: Render

Backend API URL is configured via environment variable in frontend: REACT_APP_API_URL=https://grc-risk-assesment.onrender.com.

### Known Issues / Notes:

When visiting frontend, the following errors may appear in the console:

 - GET https://grcrisk-2iazgs9ky-harshita-vajpayees-projects.vercel.app/manifest.json 401 (Unauthorized)
   This happens because the frontend manifest fetch is blocked by Vercel, and the root of FastAPI backend returns "detail":"Not Found" by default.
 - API calls work correctly from the frontend to Render backend if REACT_APP_API_URL is set properly.
