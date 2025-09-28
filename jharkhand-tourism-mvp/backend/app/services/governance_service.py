import json
import os
from typing import List, Dict, Any
from datetime import datetime, timedelta
from ..models.governance_model import Proposal, ProposalCreate, Vote, VoteCreate, GovernanceResponse

class GovernanceService:
    def __init__(self):
        self.data_file = os.path.join(os.path.dirname(__file__), "../data/mock_data.json")
        self._ensure_data_file()

    def _ensure_data_file(self):
        if not os.path.exists(self.data_file):
            os.makedirs(os.path.dirname(self.data_file), exist_ok=True)
            with open(self.data_file, 'w') as f:
                json.dump({"proposals": [], "votes": []}, f, indent=2)

    def _load_data(self) -> Dict[str, Any]:
        with open(self.data_file, 'r') as f:
            return json.load(f)

    def _save_data(self, data: Dict[str, Any]):
        with open(self.data_file, 'w') as f:
            json.dump(data, f, indent=2, default=str)

    def get_all_proposals(self) -> List[Proposal]:
        """Get all governance proposals"""
        data = self._load_data()
        proposals_list = data.get("proposals", [])
        return [Proposal(**item) for item in proposals_list]

    def get_proposal_by_id(self, proposal_id: str) -> Proposal:
        """Get a specific proposal by ID"""
        data = self._load_data()
        proposals_list = data.get("proposals", [])
        for item in proposals_list:
            if item["id"] == proposal_id:
                return Proposal(**item)
        raise ValueError(f"Proposal with ID {proposal_id} not found")

    def create_proposal(self, proposal_data: ProposalCreate) -> Proposal:
        """Create a new governance proposal"""
        data = self._load_data()
        proposals_list = data.get("proposals", [])

        # Generate ID
        proposal_id = str(len(proposals_list) + 1)

        new_proposal = Proposal(
            id=proposal_id,
            **proposal_data.dict(),
            status="active",
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

        proposals_list.append(new_proposal.dict())
        data["proposals"] = proposals_list
        self._save_data(data)

        return new_proposal

    def vote_on_proposal(self, vote_data: VoteCreate) -> Vote:
        """Cast a vote on a proposal"""
        data = self._load_data()
        proposals_list = data.get("proposals", [])
        votes_list = data.get("votes", [])

        # Find the proposal
        proposal = None
        for item in proposals_list:
            if item["id"] == vote_data.proposal_id:
                proposal = item
                break

        if not proposal:
            raise ValueError(f"Proposal with ID {vote_data.proposal_id} not found")

        # Check if proposal is still active
        if proposal["status"] != "active":
            raise ValueError("Proposal is not active for voting")

        # Create vote
        vote_id = str(len(votes_list) + 1)
        new_vote = Vote(
            id=vote_id,
            **vote_data.dict(),
            created_at=datetime.utcnow()
        )

        votes_list.append(new_vote.dict())
        data["votes"] = votes_list

        # Update proposal vote counts
        if vote_data.vote_type == "for":
            proposal["votes_for"] += 1
        elif vote_data.vote_type == "against":
            proposal["votes_against"] += 1

        proposal["total_votes"] += 1
        proposal["updated_at"] = datetime.utcnow().isoformat()

        # Check if quorum is met
        total_eligible_voters = 100  # Mock value
        quorum_percentage = proposal["quorum_percentage"]
        if (proposal["total_votes"] / total_eligible_voters) * 100 >= quorum_percentage:
            proposal["quorum_met"] = True

        data["proposals"] = proposals_list
        self._save_data(data)

        return new_vote

    def get_proposal_votes(self, proposal_id: str) -> List[Vote]:
        """Get all votes for a specific proposal"""
        data = self._load_data()
        votes_list = data.get("votes", [])
        proposal_votes = [Vote(**item) for item in votes_list if item["proposal_id"] == proposal_id]
        return proposal_votes

    def get_governance_data(self) -> GovernanceResponse:
        """Get overall governance data"""
        proposals = self.get_all_proposals()
        total_proposals = len(proposals)
        active_proposals = len([p for p in proposals if p.status == "active"])

        # Mock voter turnout calculation
        total_eligible_voters = 100
        total_votes = sum(p.total_votes for p in proposals)
        voter_turnout = (total_votes / total_eligible_voters) * 100 if total_eligible_voters > 0 else 0

        return GovernanceResponse(
            proposals=proposals,
            total_proposals=total_proposals,
            active_proposals=active_proposals,
            voter_turnout=round(voter_turnout, 2)
        )

    def finalize_proposal(self, proposal_id: str) -> Proposal:
        """Finalize a proposal based on voting results"""
        data = self._load_data()
        proposals_list = data.get("proposals", [])

        for item in proposals_list:
            if item["id"] == proposal_id:
                # Simple majority decision
                if item["votes_for"] > item["votes_against"]:
                    item["status"] = "approved"
                else:
                    item["status"] = "rejected"

                item["updated_at"] = datetime.utcnow().isoformat()
                data["proposals"] = proposals_list
                self._save_data(data)
                return Proposal(**item)

        raise ValueError(f"Proposal with ID {proposal_id} not found")
