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

