from sqlalchemy import Column, Integer, String
from database import Base

class Risk(Base):
    __tablename__ = "risks"

    id = Column(Integer, primary_key=True, index=True)
    asset = Column(String, nullable=False)
    threat = Column(String, nullable=False)
    likelihood = Column(Integer, nullable=False)
    impact = Column(Integer, nullable=False)
    score = Column(Integer, nullable=False)
    level = Column(String, nullable=False)
