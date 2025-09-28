from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any

from ..services.governance_service import GovernanceService
from ..models.governance_model import Proposal, ProposalCreate, Vote, VoteCreate, GovernanceResponse

router = APIRouter()
governance_service = GovernanceService()

@router.get("/", response_model=GovernanceResponse)
async def get_governance_data():
    """
    Get overall governance data including proposals and statistics
    """
    try:
        data = governance_service.get_governance_data()
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching governance data: {str(e)}")

@router.get("/proposals", response_model=List[Proposal])
async def get_all_proposals():
    """
    Get all governance proposals
    """
    try:
        proposals = governance_service.get_all_proposals()
        return proposals
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching proposals: {str(e)}")

@router.get("/proposals/{proposal_id}", response_model=Proposal)
async def get_proposal(proposal_id: str):
    """
    Get a specific proposal by ID
    """
    try:
        proposal = governance_service.get_proposal_by_id(proposal_id)
        return proposal
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching proposal: {str(e)}")

@router.post("/proposals", response_model=Proposal)
async def create_proposal(proposal: ProposalCreate):
    """
    Create a new governance proposal
    """
    try:
        new_proposal = governance_service.create_proposal(proposal)
        return new_proposal
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating proposal: {str(e)}")

@router.post("/proposals/{proposal_id}/vote", response_model=Vote)
async def vote_on_proposal(proposal_id: str, vote: VoteCreate):
    """
    Cast a vote on a specific proposal
    """
    try:
        # Ensure the proposal_id in vote matches the URL parameter
        vote.proposal_id = proposal_id
        new_vote = governance_service.vote_on_proposal(vote)
        return new_vote
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error casting vote: {str(e)}")

@router.get("/proposals/{proposal_id}/votes", response_model=List[Vote])
async def get_proposal_votes(proposal_id: str):
    """
    Get all votes for a specific proposal
    """
    try:
        votes = governance_service.get_proposal_votes(proposal_id)
        return votes
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching votes: {str(e)}")

@router.post("/proposals/{proposal_id}/finalize", response_model=Proposal)
async def finalize_proposal(proposal_id: str):
    """
    Finalize a proposal based on voting results
    """
    try:
        finalized_proposal = governance_service.finalize_proposal(proposal_id)
        return finalized_proposal
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error finalizing proposal: {str(e)}")
