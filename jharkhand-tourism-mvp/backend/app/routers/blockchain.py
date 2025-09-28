from fastapi import APIRouter, Depends, HTTPException
from typing import Dict, Any, List
import json


from ..services.blockchain_service import BlockchainService

router = APIRouter()
blockchain_service = BlockchainService()

@router.get("/contracts")
async def get_deployed_contracts():
    """
    Get all deployed smart contracts
    """
    try:
        contracts = blockchain_service.get_deployed_contracts()
        return {"contracts": contracts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contracts: {str(e)}")

@router.get("/contracts/{contract_address}")
async def get_contract_details(contract_address: str):
    """
    Get details of a specific contract
    """
    try:
        contract = blockchain_service.get_contract_details(contract_address)
        if not contract:
            raise HTTPException(status_code=404, detail="Contract not found")
        return contract
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching contract details: {str(e)}")

@router.post("/contracts/deploy")
async def deploy_contract(contract_data: Dict[str, Any]):
    """
    Deploy a new smart contract
    """
    try:
        result = blockchain_service.deploy_contract(
            contract_type=contract_data.get("type", "general"),
            parameters=contract_data.get("parameters", {}),
            owner_address=contract_data.get("owner_address", "")
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deploying contract: {str(e)}")

@router.get("/transactions")
async def get_recent_transactions(limit: int = 50):
    """
    Get recent blockchain transactions
    """
    try:
        transactions = blockchain_service.get_recent_transactions(limit)
        return {"transactions": transactions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching transactions: {str(e)}")

@router.post("/transactions")
async def create_transaction(transaction_data: Dict[str, Any]):
    """
    Create a new blockchain transaction
    """
    try:
        transaction = blockchain_service.create_transaction(
            from_address=transaction_data.get("from_address", ""),
            to_address=transaction_data.get("to_address", ""),
            value=transaction_data.get("value", 0),
            data=transaction_data.get("data", {})
        )
        return transaction
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating transaction: {str(e)}")

@router.get("/network")
async def get_network_info():
    """
    Get blockchain network information
    """
    try:
        network_info = blockchain_service.get_network_info()
        return network_info
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching network info: {str(e)}")

@router.get("/network/nodes")
async def get_network_nodes():
    """
    Get connected network nodes
    """
    try:
        nodes = blockchain_service.get_network_nodes()
        return {"nodes": nodes}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching network nodes: {str(e)}")

@router.get("/blocks")
async def get_recent_blocks(limit: int = 10):
    """
    Get recent blocks from blockchain
    """
    try:
        blocks = blockchain_service.get_recent_blocks(limit)
        return {"blocks": blocks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching blocks: {str(e)}")

@router.post("/verify-guide")
async def verify_guide(guide_data: Dict[str, Any]):
    """
    Verify a tour guide using blockchain
    """
    try:
        verification = blockchain_service.verify_guide(guide_data)
        return verification
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error verifying guide: {str(e)}")

@router.get("/verification/{verification_id}")
async def check_verification_status(verification_id: str):
    """
    Check verification status
    """
    try:
        status = blockchain_service.check_verification_status(verification_id)
        return status
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error checking verification: {str(e)}")

@router.post("/certificates")
async def issue_digital_certificate(certificate_data: Dict[str, Any]):
    """
    Issue a digital certificate on blockchain
    """
    try:
        certificate = blockchain_service.issue_digital_certificate(certificate_data)
        return certificate
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error issuing certificate: {str(e)}")

@router.get("/certificates/{certificate_id}")
async def validate_certificate(certificate_id: str):
    """
    Validate a digital certificate
    """
    try:
        validation = blockchain_service.validate_certificate(certificate_id)
        return validation
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error validating certificate: {str(e)}")

@router.get("/analytics/{contract_address}")
async def get_contract_analytics(contract_address: str):
    """
    Get analytics for a specific contract
    """
    try:
        analytics = blockchain_service.get_contract_analytics(contract_address)
        return analytics
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching analytics: {str(e)}")
