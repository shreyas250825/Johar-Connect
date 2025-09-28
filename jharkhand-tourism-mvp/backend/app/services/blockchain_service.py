import json
import os
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import random
import hashlib
from web3 import Web3
import requests

class BlockchainService:
    def __init__(self):
        self.web3_provider_url = os.getenv("WEB3_PROVIDER_URL", "")
        self.contract_address = os.getenv("CONTRACT_ADDRESS", "")
        self.setup_web3()
        self.mock_contracts = self.generate_mock_contracts()
        self.mock_transactions = self.generate_mock_transactions()
        self.verification_requests = {}
    
    def setup_web3(self):
        """Setup Web3 connection"""
        if self.web3_provider_url:
            try:
                self.web3 = Web3(Web3.HTTPProvider(self.web3_provider_url))
                self.connected = self.web3.is_connected()
                if self.connected:
                    print("✅ Connected to blockchain network")
                else:
                    print("❌ Failed to connect to blockchain network")
            except Exception as e:
                print(f"❌ Blockchain connection error: {e}")
                self.connected = False
                self.web3 = None
        else:
            print("⚠️  No blockchain provider URL configured - using mock mode")
            self.connected = False
            self.web3 = None
    
    def generate_mock_contracts(self) -> List[Dict[str, Any]]:
        """Generate mock smart contract data"""
        return [
            {
                "id": "contract_1",
                "name": "Guide Verification Contract",
                "address": "0x742d35Cc6634C0532925a3b8D...",
                "type": "verification",
                "status": "active",
                "description": "Smart contract for verifying tour guides and service providers",
                "created_date": "2024-01-01",
                "owner": "0x8932A7a7b2A69De6Dbf7f01ED...",
                "transactions_count": 234,
                "last_activity": "2024-01-15T10:30:00Z"
            },
            {
                "id": "contract_2",
                "name": "Marketplace Escrow",
                "address": "0x89205A3A3b2A69De6Dbf7f01ED...",
                "type": "marketplace",
                "status": "active",
                "description": "Escrow contract for secure marketplace transactions",
                "created_date": "2024-01-02",
                "owner": "0x8932A7a7b2A69De6Dbf7f01ED...",
                "transactions_count": 567,
                "last_activity": "2024-01-15T14:20:00Z"
            },
            {
                "id": "contract_3",
                "name": "Tour Booking Manager",
                "address": "0x1F4E6A7A7b2A69De6Dbf7f01ED...",
                "type": "booking",
                "status": "active",
                "description": "Contract for managing tour bookings and payments",
                "created_date": "2024-01-03",
                "owner": "0x8932A7a7b2A69De6Dbf7f01ED...",
                "transactions_count": 189,
                "last_activity": "2024-01-14T16:45:00Z"
            },
            {
                "id": "contract_4",
                "name": "Digital Certification",
                "address": "0x2A4F6B8C9d1E3f5A7b9C8D2E4F...",
                "type": "certification",
                "status": "active",
                "description": "Issuing digital certificates for completed tours and verifications",
                "created_date": "2024-01-05",
                "owner": "0x8932A7a7b2A69De6Dbf7f01ED...",
                "transactions_count": 78,
                "last_activity": "2024-01-13T11:15:00Z"
            }
        ]
    
    def generate_mock_transactions(self) -> List[Dict[str, Any]]:
        """Generate mock transaction data"""
        transactions = []
        base_time = datetime.now()
        transaction_types = ["guide_verification", "marketplace_purchase", "booking_payment", "certification_issue"]
        
        for i in range(100):
            transaction_time = base_time - timedelta(hours=i*2)
            tx_type = random.choice(transaction_types)
            
            transaction = {
                "hash": f"0x{hashlib.sha256(str(i).encode()).hexdigest()[:64]}",
                "from": f"0x{hashlib.sha256(f'from{i}'.encode()).hexdigest()[:40]}",
                "to": f"0x{hashlib.sha256(f'to{i}'.encode()).hexdigest()[:40]}",
                "value": round(random.uniform(0.01, 2.0), 4),
                "gas": random.randint(21000, 100000),
                "gas_price": random.randint(10, 100),
                "block_number": 18000000 - i * 100,
                "timestamp": transaction_time.isoformat(),
                "status": "confirmed" if i > 5 else "pending",
                "type": tx_type,
                "contract_address": random.choice([c["address"] for c in self.mock_contracts])
            }
            
            transactions.append(transaction)
        
        return transactions
    
    def get_deployed_contracts(self) -> List[Dict[str, Any]]:
        """Get all deployed smart contracts"""
        return self.mock_contracts
    
    def get_contract_details(self, contract_address: str) -> Dict[str, Any]:
        """Get details of a specific contract"""
        for contract in self.mock_contracts:
            if contract["address"].lower().startswith(contract_address.lower()):
                # Add more detailed information
                contract_details = contract.copy()
                contract_details.update({
                    "abi": "[...]",  # Mock ABI
                    "bytecode": "0x...",
                    "compiler_version": "0.8.19",
                    "optimization_enabled": True,
                    "functions": [
                        {"name": "verifyGuide", "type": "function", "state_mutability": "nonpayable"},
                        {"name": "getVerificationStatus", "type": "function", "state_mutability": "view"},
                        {"name": "issueCertificate", "type": "function", "state_mutability": "nonpayable"}
                    ]
                })
                return contract_details
        return {}
    
    def deploy_contract(self, contract_type: str, parameters: Dict[str, Any], owner_address: str) -> Dict[str, Any]:
        """Deploy a new smart contract (mock implementation)"""
        contract_id = f"contract_{len(self.mock_contracts) + 1}"
        contract_address = f"0x{hashlib.sha256(contract_id.encode()).hexdigest()[:40]}"
        
        new_contract = {
            "id": contract_id,
            "name": f"{contract_type.title()} Contract",
            "address": contract_address,
            "type": contract_type,
            "status": "deploying",
            "description": f"New {contract_type} contract for {parameters.get('purpose', 'general use')}",
            "created_date": datetime.utcnow().strftime("%Y-%m-%d"),
            "owner": owner_address,
            "parameters": parameters,
            "transactions_count": 0,
            "last_activity": datetime.utcnow().isoformat()
        }
        
        self.mock_contracts.append(new_contract)
        
        # Simulate deployment process
        import time
        time.sleep(2)  # Simulate blockchain confirmation time
        
        new_contract["status"] = "active"
        
        # Create deployment transaction
        deployment_tx = {
            "hash": f"0x{hashlib.sha256(contract_address.encode()).hexdigest()[:64]}",
            "from": owner_address,
            "to": contract_address,
            "value": 0,
            "gas": 2000000,
            "gas_price": 25,
            "block_number": 18000000 + len(self.mock_transactions),
            "timestamp": datetime.utcnow().isoformat(),
            "status": "confirmed",
            "type": "contract_deployment",
            "contract_address": contract_address
        }
        
        self.mock_transactions.insert(0, deployment_tx)
        
        return {
            "contract": new_contract,
            "transaction": deployment_tx,
            "gas_used": 1500000,
            "status": "success",
            "deployment_cost": "0.0375 ETH"  # 1.5M gas * 25 gwei
        }
    
    def get_recent_transactions(self, limit: int = 50) -> List[Dict[str, Any]]:
        """Get recent blockchain transactions"""
        return self.mock_transactions[:limit]
    
    def create_transaction(self, from_address: str, to_address: str, value: float, data: Dict[str, Any]) -> Dict[str, Any]:
        """Create a new blockchain transaction"""
        new_transaction = {
            "hash": f"0x{hashlib.sha256(str(len(self.mock_transactions)).encode()).hexdigest()[:64]}",
            "from": from_address,
            "to": to_address,
            "value": value,
            "data": data,
            "gas": random.randint(21000, 100000),
            "gas_price": random.randint(10, 100),
            "block_number": 18000000 + len(self.mock_transactions),
            "timestamp": datetime.utcnow().isoformat(),
            "status": "pending",
            "type": data.get("type", "transfer")
        }
        
        self.mock_transactions.insert(0, new_transaction)
        
        # Simulate confirmation
        import time
        time.sleep(1)
        new_transaction["status"] = "confirmed"
        
        return new_transaction
    
    def get_network_info(self) -> Dict[str, Any]:
        """Get blockchain network information"""
        if self.connected and self.web3:
            try:
                block_number = self.web3.eth.block_number
                gas_price = self.web3.eth.gas_price
                return {
                    "network": "Ethereum Mainnet",
                    "chain_id": 1,
                    "block_height": block_number,
                    "gas_price": self.web3.from_wei(gas_price, 'gwei'),
                    "connected": True,
                    "last_block_time": datetime.utcnow().isoformat(),
                    "sync_status": "synced"
                }
            except Exception as e:
                print(f"Error getting network info: {e}")
        
        # Fallback to mock data
        return {
            "network": "Ethereum Mainnet",
            "chain_id": 1,
            "block_height": 18000000 + len(self.mock_transactions),
            "gas_price": random.randint(20, 50),
            "connected": self.connected,
            "last_block_time": datetime.utcnow().isoformat(),
            "sync_status": "synced"
        }
    
    def get_network_nodes(self) -> List[Dict[str, Any]]:
        """Get connected network nodes"""
        nodes = [
            {
                "id": "node_1",
                "type": "full",
                "address": "192.168.1.100:30303",
                "status": "connected",
                "latency": random.randint(10, 100),
                "client": "Geth/v1.10.0",
                "protocols": ["eth", "les"]
            },
            {
                "id": "node_2",
                "type": "archive",
                "address": "192.168.1.101:30303",
                "status": "connected",
                "latency": random.randint(10, 100),
                "client": "Nethermind/v1.10.0",
                "protocols": ["eth", "les"]
            },
            {
                "id": "node_3",
                "type": "light",
                "address": "192.168.1.102:30303",
                "status": "connected",
                "latency": random.randint(10, 100),
                "client": "Erigon/v2.0.0",
                "protocols": ["eth"]
            }
        ]
        return nodes
    
    def get_recent_blocks(self, limit: int = 10) -> List[Dict[str, Any]]:
        """Get recent blocks from blockchain"""
        blocks = []
        base_block = 18000000 + len(self.mock_transactions)
        
        for i in range(limit):
            block_time = datetime.now() - timedelta(minutes=i*2)
            blocks.append({
                "number": base_block - i,
                "hash": f"0x{hashlib.sha256(str(base_block - i).encode()).hexdigest()[:64]}",
                "timestamp": block_time.isoformat(),
                "transaction_count": random.randint(50, 200),
                "gas_used": random.randint(1000000, 15000000),
                "gas_limit": 30000000,
                "miner": f"0x{hashlib.sha256(f'miner{i}'.encode()).hexdigest()[:40]}",
                "difficulty": random.randint(1000000000, 2000000000),
                "total_difficulty": "58750003716598352816469"
            })
        
        return blocks
    
    def verify_guide(self, guide_data: Dict[str, Any]) -> Dict[str, Any]:
        """Verify a tour guide using blockchain"""
        verification_id = hashlib.sha256(
            f"{guide_data.get('name', '')}{guide_data.get('license', '')}{datetime.utcnow().isoformat()}".encode()
        ).hexdigest()[:16]
        
        # Create verification record
        verification_record = {
            "verification_id": verification_id,
            "guide_name": guide_data.get("name", ""),
            "license_number": guide_data.get("license", ""),
            "specialties": guide_data.get("specialties", []),
            "experience_years": guide_data.get("experience", 0),
            "verified": True,
            "verification_date": datetime.utcnow().isoformat(),
            "expiry_date": (datetime.utcnow() + timedelta(days=365)).isoformat(),
            "verification_authority": "Jharkhand Tourism Board"
        }
        
        # Create blockchain transaction
        verification_tx = self.create_transaction(
            from_address="0xJharkhandTourismBoard",
            to_address=guide_data.get("wallet_address", "0x0"),
            value=0,
            data={
                "type": "guide_verification",
                "verification_id": verification_id,
                "action": "issue_certification"
            }
        )
        
        verification_record["transaction_hash"] = verification_tx["hash"]
        verification_record["block_number"] = verification_tx["block_number"]
        
        # Store verification record
        self.verification_requests[verification_id] = verification_record
        
        return verification_record
    
    def check_verification_status(self, verification_id: str) -> Dict[str, Any]:
        """Check verification status"""
        verification = self.verification_requests.get(verification_id)
        if not verification:
            return {
                "verification_id": verification_id,
                "status": "not_found",
                "message": "Verification request not found"
            }
        
        return {
            "verification_id": verification_id,
            "status": "verified" if verification.get("verified") else "pending",
            "verified": verification.get("verified", False),
            "verification_date": verification.get("verification_date"),
            "expiry_date": verification.get("expiry_date"),
            "transaction_hash": verification.get("transaction_hash")
        }
    
    def issue_digital_certificate(self, recipient_data: Dict[str, Any]) -> Dict[str, Any]:
        """Issue a digital certificate on blockchain"""
        certificate_id = hashlib.sha256(
            f"{recipient_data.get('recipient_name')}{recipient_data.get('achievement')}{datetime.utcnow().isoformat()}".encode()
        ).hexdigest()[:16]
        
        certificate_data = {
            "certificate_id": certificate_id,
            "recipient_name": recipient_data.get("recipient_name"),
            "recipient_wallet": recipient_data.get("recipient_wallet"),
            "achievement": recipient_data.get("achievement"),
            "issue_date": datetime.utcnow().isoformat(),
            "issuing_authority": "Jharkhand Tourism Platform",
            "certificate_type": recipient_data.get("type", "completion"),
            "metadata": recipient_data.get("metadata", {})
        }
        
        # Create blockchain transaction
        certificate_tx = self.create_transaction(
            from_address="0xJharkhandTourismPlatform",
            to_address=recipient_data.get("recipient_wallet", "0x0"),
            value=0,
            data={
                "type": "digital_certificate",
                "certificate_id": certificate_id,
                "action": "issue_certificate",
                "achievement": recipient_data.get("achievement")
            }
        )
        
        certificate_data["transaction_hash"] = certificate_tx["hash"]
        certificate_data["block_number"] = certificate_tx["block_number"]
        
        return certificate_data
    
    def validate_certificate(self, certificate_id: str) -> Dict[str, Any]:
        """Validate a digital certificate"""
        # In a real implementation, this would query the blockchain
        # For mock purposes, we'll assume valid if it follows our format
        if len(certificate_id) == 16 and certificate_id.isalnum():
            return {
                "certificate_id": certificate_id,
                "valid": True,
                "validation_date": datetime.utcnow().isoformat(),
                "message": "Certificate is valid and verified on blockchain"
            }
        else:
            return {
                "certificate_id": certificate_id,
                "valid": False,
                "validation_date": datetime.utcnow().isoformat(),
                "message": "Certificate not found or invalid"
            }
    
    def get_contract_analytics(self, contract_address: str) -> Dict[str, Any]:
        """Get analytics for a specific contract"""
        contract = self.get_contract_details(contract_address)
        if not contract:
            return {"error": "Contract not found"}
        
        # Filter transactions for this contract
        contract_transactions = [
            tx for tx in self.mock_transactions 
            if tx.get("contract_address") == contract_address
        ]
        
        return {
            "contract_address": contract_address,
            "total_transactions": len(contract_transactions),
            "active_users": len(set(tx["from"] for tx in contract_transactions)),
            "transaction_volume": sum(tx["value"] for tx in contract_transactions),
            "gas_used": sum(tx["gas"] for tx in contract_transactions),
            "last_activity": contract_transactions[0]["timestamp"] if contract_transactions else None,
            "transaction_types": list(set(tx["type"] for tx in contract_transactions))
        }