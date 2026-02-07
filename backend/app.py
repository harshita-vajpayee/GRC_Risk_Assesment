from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

from database import SessionLocal, engine
from models import Base, Risk
from schemas import RiskCreate, RiskResponse

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="GRC Risk Assessment API")

# Allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Risk level logic (NIST-style)
def calculate_level(score: int) -> str:
    if score <= 5:
        return "Low"
    elif score <= 12:
        return "Medium"
    elif score <= 18:
        return "High"
    else:
        return "Critical"


class RiskPreview(BaseModel):
    likelihood: int
    impact: int

@app.post("/preview-risk")
def preview_risk(data: RiskPreview):
    score = data.likelihood * data.impact
    level = calculate_level(score)
    return {
        "score": score,
        "level": level
    }


# POST: assess risk
@app.post("/assess-risk", response_model=RiskResponse)
def assess_risk(risk: RiskCreate, db: Session = Depends(get_db)):
    score = risk.likelihood * risk.impact
    level = calculate_level(score)

    new_risk = Risk(
        asset=risk.asset,
        threat=risk.threat,
        likelihood=risk.likelihood,
        impact=risk.impact,
        score=score,
        level=level
    )

    db.add(new_risk)
    db.commit()
    db.refresh(new_risk)
    return new_risk

# GET: fetch risks
@app.get("/risks", response_model=list[RiskResponse])
def get_risks(level: str | None = None, db: Session = Depends(get_db)):
    query = db.query(Risk)
    if level:
        query = query.filter(Risk.level == level)
    return query.all()
