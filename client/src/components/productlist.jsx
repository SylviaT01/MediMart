import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch products from API
  useEffect(() => {
    fetch('http://127.0.0.1:5000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); // Initially set products as filtered products
        // Extract unique categories from products
        const uniqueCategories = Array.from(new Set(data.map(product => product.category)));
        setCategories(uniqueCategories);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      // If category is empty, show all products
      setFilteredProducts(products);
    } else {
      // Filter products based on selected category
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="flex mb-4 h-full">
        {/* Category filter dropdown */}
        <select
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-screen-xl  bg-blue-50 z-100 px-4 py-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="border p-4 flex flex-col justify-between shadow-xl rounded-lg overflow-hidden bg-white">
            <h2 className="font-medium text-lg mb-2 overflow-hidden relative">
              <span className="marquee">{product.title}</span>
            </h2>
            <div className="border border-gray-200 h-60 mb-4 overflow-hidden relative text-center">
            <div className="relative group">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="p-4 mr-2 w-60 h-60 object-contain transition duration-300 ease-in-out transform group-hover:scale-110"
                  style={{ maxHeight: "300px" }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-500 capitalize">{product.category}</div>
              <div className="text-lg font-semibold">{product.price}</div>
              <button className="bg-blue-300 hover:bg-blue-200 text-white py-1 px-2 rounded-md transition duration-300 ease-in-out">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
