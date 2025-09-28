 import React, { useState, useEffect } from 'react';

// Mock products data (replace with actual API call)
const mockProducts = [
    {
      id: 1,
      name: 'Tribal Dokra Art Horse',
      description: 'Beautiful handcrafted brass horse using traditional Dokra technique',
      price: 2500,
      category: 'handicraft',
      artisan: 'Ramesh Mahato',
      image: '/assets/dokra-horse.jpg',
      rating: 4.8,
      reviews: 45,
      inStock: true,
      verified: true
    },
    {
      id: 2,
      name: 'Santhal Silk Saree',
      description: 'Exquisite handwoven silk saree with traditional Santhal motifs',
      price: 8500,
      category: 'textile',
      artisan: 'Sita Devi',
      image: '/assets/santhal-saree.jpg',
      rating: 4.9,
      reviews: 67,
      inStock: true,
      verified: true
    },
    {
      id: 3,
      name: 'Silver Tribal Necklace',
      description: 'Authentic silver necklace with traditional geometric patterns',
      price: 4200,
      category: 'jewelry',
      artisan: 'Mohan Kumar',
      image: '/assets/silver-necklace.jpg',
      rating: 4.7,
      reviews: 23,
      inStock: true,
      verified: true
    },
    {
      id: 4,
      name: 'Bamboo Craft Basket',
      description: 'Eco-friendly bamboo basket perfect for home organization',
      price: 1200,
      category: 'handicraft',
      artisan: 'Lakshmi Oraon',
      image: '/assets/bamboo-basket.jpg',
      rating: 4.6,
      reviews: 89,
      inStock: true,
      verified: true
    },
    {
      id: 5,
      name: 'Organic Honey',
      description: 'Pure forest honey collected from Jharkhand tribal communities',
      price: 650,
      category: 'organic',
      artisan: 'Tribal Cooperative',
      image: '/assets/organic-honey.jpg',
      rating: 4.9,
      reviews: 156,
      inStock: true,
      verified: true
    },
    {
      id: 6,
      name: 'Handwoven Cotton Kurta',
      description: 'Traditional handwoven cotton kurta with block prints',
      price: 1800,
      category: 'textile',
      artisan: 'Geeta Kumari',
      image: '/assets/cotton-kurta.jpg',
      rating: 4.5,
      reviews: 34,
      inStock: false,
      verified: true
    }
  ];

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      setProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const filteredProducts = products.filter(product => {
    const matchesFilter = filter === 'all' || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.artisan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const categories = [
    { id: 'all', name: 'All Products', icon: '🏪', count: products.length },
    { id: 'handicraft', name: 'Handicrafts', icon: '🏺', count: products.filter(p => p.category === 'handicraft').length },
    { id: 'textile', name: 'Textiles', icon: '🧵', count: products.filter(p => p.category === 'textile').length },
    { id: 'jewelry', name: 'Jewelry', icon: '💎', count: products.filter(p => p.category === 'jewelry').length },
    { id: 'organic', name: 'Organic Products', icon: '🍯', count: products.filter(p => p.category === 'organic').length }
  ];

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 animate-spin mx-auto">
              <span className="text-2xl text-white">🛍️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Marketplace...</h3>
            <p className="text-gray-600">Fetching authentic products</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200/20 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/20 rounded-full translate-y-48 -translate-x-48 animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-6 shadow-xl">
            <span className="text-4xl">🛍️</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Local <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Marketplace</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover authentic handmade products directly from talented local artisans. 
            Every purchase supports tribal communities and preserves traditional craftsmanship.
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, artisans..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-300"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🔍</span>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">⊞</span>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-emerald-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg">☰</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 sticky top-32">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${
                      filter === category.id
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      filter === category.id
                        ? 'bg-white/20'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                <h4 className="font-bold text-gray-800 mb-3">Marketplace Stats</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Total Products:</span>
                    <span className="font-semibold">{products.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Artisans:</span>
                    <span className="font-semibold">50+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verified Products:</span>
                    <span className="font-semibold text-green-600">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                {filteredProducts.length} Products Found
              </h3>
              <select className="px-4 py-2 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
                <option>Newest</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 mb-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <div key={product.id} className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'h-64'}`}>
                    <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-8xl opacity-60 block mb-2">
                          {product.category === 'handicraft' && '🎨'}
                          {product.category === 'textile' && '🧶'}
                          {product.category === 'jewelry' && '💍'}
                          {product.category === 'organic' && '🌿'}
                        </span>
                        <span className="text-sm font-medium text-emerald-700 bg-white/70 px-3 py-1 rounded-full">
                          {product.category === 'handicraft' && 'Handicraft'}
                          {product.category === 'textile' && 'Textile'}
                          {product.category === 'jewelry' && 'Jewelry'}
                          {product.category === 'organic' && 'Organic'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col space-y-2">
                      {product.verified && (
                        <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full flex items-center space-x-1">
                          <span>✅</span>
                          <span>Verified</span>
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Quick Add Button */}
                    <button 
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-emerald-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="text-lg">🛒</span>
                    </button>
                  </div>

                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {product.name}
                      </h4>
                      <span className="text-2xl font-bold text-emerald-600">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-500">By:</span>
                      <span className="text-sm font-semibold text-gray-700">{product.artisan}</span>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm font-semibold">{product.rating}</span>
                        <span className="text-gray-400 text-xs">({product.reviews})</span>
                      </div>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                        {product.category}
                      </span>
                    </div>

                    <button 
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Shopping Cart Sidebar */}
        {cart.length > 0 && (
          <div className="fixed bottom-6 right-6 w-96 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 z-50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Shopping Cart</h3>
              <span className="w-6 h-6 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600">₹{item.price.toLocaleString()} each</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <span className="text-xs">−</span>
                    </button>
                    <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                    >
                      <span className="text-xs">+</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-xl text-emerald-600">
                  ₹{getTotalPrice().toLocaleString()}
                </span>
              </div>

              <button className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center space-x-2">
                <span>🔐</span>
                <span>Secure Checkout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Marketplace;