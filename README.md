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

### Stats & Analytics Page

 - Accessible via navbar link (separate from dashboard)
 - Total Issues
 - High Risks
 - Critical Risks

Cards are:
 - Color-segregated
 - Clickable
 - Instantly filter the risk list below

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
