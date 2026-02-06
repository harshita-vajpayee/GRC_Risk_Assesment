from pydantic import BaseModel, Field

class RiskCreate(BaseModel):
    asset: str
    threat: str
    likelihood: int = Field(..., ge=1, le=5)
    impact: int = Field(..., ge=1, le=5)

class RiskResponse(RiskCreate):
    id: int
    score: int
    level: str

    class Config:
        orm_mode = True
