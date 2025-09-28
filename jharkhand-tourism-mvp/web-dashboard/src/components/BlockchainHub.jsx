import React, { useState, useEffect } from 'react';

// Mock SmartContracts Component
const SmartContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading smart contracts
    setTimeout(() => {
      setContracts([
        { id: 1, name: 'Tourism Token', address: '0x1234...5678', status: 'Active', deployedAt: '2025-09-28' },
        { id: 2, name: 'Local Services', address: '0xabcd...efgh', status: 'Active', deployedAt: '2025-09-29' },
        { id: 3, name: 'Marketplace Exchange', address: '0x9876...4321', status: 'Pending', deployedAt: '2025-09-28' }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 animate-spin mx-auto">
            <span className="text-xl text-white">⚡</span>
          </div>
          <p className="text-gray-600">Loading smart contracts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map(contract => (
          <div key={contract.id} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{contract.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                contract.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {contract.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Address: {contract.address}</p>
            <p className="text-sm text-gray-600">Deployed: {contract.deployedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock SentimentAnalysis Component
const SentimentAnalysis = () => {
  const sentimentData = [
    { category: 'Tourism Services', positive: 85, negative: 15, neutral: 10 },
    { category: 'Local Products', positive: 92, negative: 8, neutral: 15 },
    { category: 'Transportation', positive: 78, negative: 22, neutral: 12 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sentimentData.map((item, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{item.category}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-600">Positive</span>
                <span className="font-semibold">{item.positive}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: `${item.positive}%`}}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock GovernanceDashboard Component
const GovernanceDashboard = () => {
  const proposals = [
    { id: 1, title: 'Tourism Development Fund', votes: 1250, status: 'Active' },
    { id: 2, title: 'Artisan Support Program', votes: 980, status: 'Passed' },
    { id: 3, title: 'Digital Infrastructure', votes: 750, status: 'Pending' }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {proposals.map(proposal => (
          <div key={proposal.id} className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">{proposal.title}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                proposal.status === 'Passed' ? 'bg-green-100 text-green-700' : 
                proposal.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {proposal.status}
              </span>
            </div>
            <p className="text-gray-600 mb-4">Total Votes: {proposal.votes}</p>
            <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// BlockchainNetwork Component
const BlockchainNetwork = () => {
  const [blockchainData] = useState({
    network: { status: 'Active', blockHeight: 15420, gasPrice: 25 },
    nodes: [
      { id: 1, type: 'Validator', address: '0x1234...abcd', status: 'online', latency: 45 },
      { id: 2, type: 'Full Node', address: '0x5678...efgh', status: 'online', latency: 67 },
      { id: 3, type: 'Light Node', address: '0x9abc...1234', status: 'syncing', latency: 120 }
    ],
    transactions: [
      { hash: '0xabcd1234567890abcdef', value: 2.5, from: '0x1111...2222', to: '0x3333...4444', gas: 21000 },
      { hash: '0xefgh5678901234567890', value: 1.8, from: '0x5555...6666', to: '0x7777...8888', gas: 42000 }
    ],
    blocks: [
      { number: 15420, timestamp: '2025-09-29 10:30:25', hash: '0xblock1234567890', transactionCount: 45, gasUsed: 8500000 },
      { number: 15419, timestamp: '2025-09-28 10:30:10', hash: '0xblock0987654321', transactionCount: 32, gasUsed: 6200000 }
    ]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 animate-spin mx-auto">
            <span className="text-xl text-white">🌐</span>
          </div>
          <p className="text-gray-600">Loading blockchain data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Network Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="text-center">
            <div className={`text-2xl font-bold mb-2 ${
              blockchainData.network.status === 'Active' ? 'text-green-600' : 'text-red-600'
            }`}>
              {blockchainData.network.status}
            </div>
            <div className="text-sm text-gray-600">Network Status</div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">{blockchainData.nodes.length}</div>
            <div className="text-sm text-gray-600">Active Nodes</div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">{blockchainData.network.blockHeight.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Block Height</div>
          </div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">{blockchainData.network.gasPrice}</div>
            <div className="text-sm text-gray-600">Gas Price (Gwei)</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Network Nodes */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Network Nodes</h3>
          <div className="space-y-4">
            {blockchainData.nodes.map(node => (
              <div key={node.id} className="p-4 bg-gray-50/50 rounded-2xl hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{node.type}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    node.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {node.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-1">{node.address}</div>
                <div className="text-sm text-gray-500">Latency: {node.latency}ms</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Blocks */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Blocks</h3>
          <div className="space-y-4">
            {blockchainData.blocks.map(block => (
              <div key={block.number} className="p-4 bg-gray-50/50 rounded-2xl hover:bg-white/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Block #{block.number}</span>
                  <span className="text-xs text-gray-500">{block.timestamp}</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">{block.hash.substring(0, 30)}...</div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Transactions: {block.transactionCount}</span>
                  <span>Gas Used: {block.gasUsed.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Pool */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Transaction Pool</h3>
        <div className="space-y-4">
          {blockchainData.transactions.map((tx, index) => (
            <div key={index} className="p-4 bg-gray-50/50 rounded-2xl hover:bg-white/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{tx.hash.substring(0, 25)}...</span>
                <span className="text-lg font-bold text-blue-600">{tx.value} ETH</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                <span>From: {tx.from.substring(0, 15)}...</span>
                <span>To: {tx.to.substring(0, 15)}...</span>
                <span>Gas: {tx.gas.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlockchainHub = () => {
  const [activeTab, setActiveTab] = useState('network');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const tabs = [
    { id: 'network', label: 'Blockchain Network', icon: '🌐', description: 'Monitor network status and nodes' },
    { id: 'smart-contracts', label: 'Smart Contracts', icon: '📋', description: 'Manage deployed contracts' },
    { id: 'sentiment', label: 'Sentiment Analysis', icon: '💬', description: 'Community feedback insights' },
    { id: 'governance', label: 'Governance Dashboard', icon: '🏛️', description: 'DAO proposals and voting' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'smart-contracts':
        return <SmartContracts />;
      case 'sentiment':
        return <SentimentAnalysis />;
      case 'governance':
        return <GovernanceDashboard />;
      case 'network':
      default:
        return <BlockchainNetwork />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 animate-spin mx-auto">
              <span className="text-2xl text-white">⛓️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Blockchain Hub...</h3>
            <p className="text-gray-600">Connecting to network</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full translate-y-48 -translate-x-48 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-xl">
            <span className="text-4xl">⛓️</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Blockchain <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Hub</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Manage and monitor blockchain features, smart contracts, and decentralized services 
            for the Jharkhand tourism ecosystem.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Contracts', value: '12+', icon: '📋' },
            { label: 'Network Nodes', value: '50+', icon: '🌐' },
            { label: 'Transactions', value: '2.5K+', icon: '💸' },
            { label: 'Block Height', value: '15.4K+', icon: '📊' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-lg border border-white/20">
            <div className="flex flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 m-1 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100/50'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="hidden md:block">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Description */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {tabs.find(tab => tab.id === activeTab)?.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="mb-16">
          {renderContent()}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Build on Blockchain?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join the decentralized future of tourism with our blockchain infrastructure
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 shadow-lg">
                  📞 Developer Support
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  📖 Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainHub;