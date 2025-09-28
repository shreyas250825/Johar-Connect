import React, { useState, useEffect } from 'react';
import { blockchainService } from '../services/api';

const SmartContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [contractsData, transactionsData] = await Promise.all([
          blockchainService.getContracts(),
          blockchainService.getTransactions()
        ]);
        setContracts(Array.isArray(contractsData) ? contractsData : []);
        setTransactions(Array.isArray(transactionsData) ? transactionsData : []);
      } catch (error) {
        console.error('Error fetching blockchain data:', error);
        setContracts([]);
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Loading smart contracts...</div>;
  }

  return (
    <div className="blockchain-container">
      <h2>Smart Contracts & Blockchain Transactions</h2>
      
      <div className="grid-2">
        <div className="card">
          <h3>Active Smart Contracts</h3>
          <div className="contracts-list">
            {contracts.map(contract => (
              <div key={contract.id} className="contract-item">
                <div className="contract-header">
                  <h4>{contract.name}</h4>
                  <span className={`status ${contract.status}`}>
                    {contract.status}
                  </span>
                </div>
                <p className="contract-address">
                  Address: {contract.address}
                </p>
                <p className="contract-description">
                  {contract.description}
                </p>
                <div className="contract-details">
                  <span>Type: {contract.type}</span>
                  <span>Created: {contract.createdDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Recent Transactions</h3>
          <div className="transactions-list">
            {transactions.map(transaction => (
              <div key={transaction.hash} className="transaction-item">
                <div className="transaction-header">
                  <span className="hash">
                    {transaction.hash.substring(0, 20)}...
                  </span>
                  <span className={`status ${transaction.status}`}>
                    {transaction.status}
                  </span>
                </div>
                <div className="transaction-details">
                  <span>From: {transaction.from.substring(0, 15)}...</span>
                  <span>To: {transaction.to.substring(0, 15)}...</span>
                  <span>Amount: {transaction.amount} ETH</span>
                </div>
                <div className="transaction-meta">
                  <span>Block: {transaction.blockNumber}</span>
                  <span>{transaction.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Contract Deployment</h3>
        <div className="deployment-interface">
          <div className="form-group">
            <label>Contract Type</label>
            <select>
              <option value="guide">Guide Verification</option>
              <option value="marketplace">Marketplace</option>
              <option value="booking">Booking</option>
              <option value="certification">Certification</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Contract Parameters</label>
            <textarea 
              placeholder="Enter contract parameters in JSON format..."
              rows="4"
            />
          </div>

          <button className="btn btn-primary">
            Deploy Smart Contract
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartContracts;