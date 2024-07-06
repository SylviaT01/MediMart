import React, { useEffect, useState } from "react";
import { GrSearch } from "react-icons/gr";

const ProductList = ({ setCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // const [cart, setCart] = useState([]);

  // Fetch products from API
  useEffect(() => {
    fetch("http://127.0.0.1:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Initially set products as filtered products
        // Extract unique categories from products
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category_name))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, searchQuery);
  };

  // Handle search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterProducts(selectedCategory, query);
  };

  // Filter products based on selected category and search query
  const filterProducts = (category, query) => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter(
        (product) => product.category_name === category
      );
    }

    if (query) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  // Handle search button click
  const handleSearchClick = () => {
    filterProducts(selectedCategory, searchQuery);
  };

  // Handle adding to cart
  const handleAddToCart = (product) => {
    // Create a new order (Assuming user_id is 1 for simplicity)
    const order = {
      user_id: 1,
      product_id: product.id,
      quantity: 1,
      price: product.price,
      total_price: product.price,
    };

    fetch("http://127.0.0.1:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Order created:", data);
        // Update cart state
        setCart((prevCart) => [...prevCart, data]);
      })
      .catch((error) => console.error("Error creating order:", error));
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex mb-4 space-x-4">
        {/* Category filter dropdown */}
        <select
          className="px-4 py-2 border border-gray-300 rounded-md capitalize"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* Search bar */}
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search products"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
        {/* Search button */}
        <button
          className="bg-blue-300 hover:bg-blue-200/90 p-2 py-2 rounded border"
          onClick={handleSearchClick}
        >
          <GrSearch />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 flex flex-col justify-between shadow-xl rounded-lg overflow-hidden bg-white"
          >
            <h2 className="font-medium text-lg mb-2 overflow-hidden relative">
              <span className="marquee">{product.title}</span>
            </h2>
            <div className="border border-gray-200 h-60 mb-4 overflow-hidden relative text-center">
              <div className="relative group">
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="mx-auto p-4 w-60 h-60 object-contain transition duration-300 ease-in-out transform group-hover:scale-110"
                  style={{ maxHeight: "300px" }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-sm text-gray-500 capitalize">
                {product.category_name}
              </div>
              <div className="text-lg font-semibold">Ksh {product.price}</div>
              <button
                className="bg-blue-300 hover:bg-blue-200 text-white py-1 px-2 rounded-md transition duration-300 ease-in-out"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
