from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ProposalBase(BaseModel):
    title: str
    description: str
    category: str  # e.g., "funding", "policy", "infrastructure"
    duration_days: int = 30
    quorum_percentage: float = 50.0

class ProposalCreate(ProposalBase):
    creator_id: str
    initial_votes: int = 0

class Proposal(ProposalBase):
    id: str
    status: str  # "active", "approved", "rejected", "expired"
    created_at: datetime
    updated_at: datetime
    votes_for: int = 0
    votes_against: int = 0
    total_votes: int = 0
    quorum_met: bool = False

class VoteBase(BaseModel):
    voter_id: str
    vote_type: str  # "for", "against", "abstain"

class VoteCreate(VoteBase):
    proposal_id: str

class Vote(VoteBase):
    id: str
    created_at: datetime

class GovernanceResponse(BaseModel):
    proposals: List[Proposal]
    total_proposals: int
    active_proposals: int
    voter_turnout: float

class ProposalResponse(BaseModel):
    proposal: Proposal
    votes: List[Vote]
