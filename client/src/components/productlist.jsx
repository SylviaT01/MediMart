import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "./context/cartContext";
import { UserContext } from "./context/userContext";

const ProductList = ({ setCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const { addToCart } = useContext(CartContext);
  const { currentUser, authToken } = useContext(UserContext);
  const [quantities, setQuantities] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // Fetch products from API
  useEffect(() => {
    fetch("http://127.0.0.1:5000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        const uniqueCategories = Array.from(
          new Set(data.map((product) => product.category_name))
        );
        setCategories(uniqueCategories);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter products
  useEffect(() => {
    filterProducts(selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery, showFavorites, products, favorites]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, searchQuery);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    filterProducts(selectedCategory, query);
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

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

    if (showFavorites) {
      filtered = filtered.filter((product) => favorites.includes(product.id));
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    const token = authToken || localStorage.getItem("access_token");
    if (!token) {
      console.error("No auth token available");
      return;
    }

    const quantity = quantities[product.id] || 1;

    const order = {
      user_id: currentUser.id,
      product_id: product.id,
      quantity: quantity,
      price: product.price,
      total_price: product.price * quantity,
    };

    fetch("http://127.0.0.1:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to create order: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order created:", data);
        addToCart({ ...product, quantity });
        setAlertMessage('Product added to cart successfully!');

        setTimeout(() => {
          setAlertMessage('');
        }, 3000);
      })
      .catch((error) => console.error("Error creating order:", error));
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    switch (option) {
      case "price-desc":
        sortProductsByPrice("desc");
        break;
      case "price-asc":
        sortProductsByPrice("asc");
        break;
      case "name-asc":
        sortProductsByName("asc");
        break;
      case "name-desc":
        sortProductsByName("desc");
        break;
      default:
        break;
    }
  };

  const sortProductsByPrice = (order) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sortedProducts);
  };

  const sortProductsByName = (order) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    setFilteredProducts(sortedProducts);
  };

  const toggleFavorite = (productId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter(id => id !== productId);
      } else {
        return [...prevFavorites, productId];
      }
    });
  };

  return (
    <div className="w-full mx-auto p-4 mt-15">
      <div className="flex justify-between items-center mb-4 space-x-4">
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
        <div className="flex space-x-4">
          <input
            type="text"
            className="px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Search products"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-md"
          value={sortOption}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-desc">Price (Highest)</option>
          <option value="price-asc">Price (Lowest)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
            className="form-checkbox"
          />
          <span>Show Favorites Only</span>
        </label>
      </div>
      <hr className="my-6 border-gray-200" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 flex flex-col justify-between shadow-xl rounded-lg overflow-hidden bg-white"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-medium text-lg overflow-hidden relative">
                <span className="marquee">{product.title}</span>
              </h2>
              <button
                onClick={() => toggleFavorite(product.id)}
                className={`text-2xl ${favorites.includes(product.id) ? 'text-red-500' : 'text-gray-300'}`}
              >
                ♥
              </button>
            </div>
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
              <div className="text-xs text-gray-500 capitalize">
                {product.category_name}
              </div>
              <div className="text-md font-normal">
                Ksh. {product.price.toLocaleString()}
              </div>
              <div className="flex justify-between items-center">
                <button
                  className="bg-blue-300 hover:bg-blue-200 text-white text-md py-1 px-2 rounded-sm transition duration-300 ease-in-out"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <input
                  className="border border-blue-200 rounded-md px-2 py-1 w-12 "
                  type="number"
                  min="1"
                  value={quantities[product.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product.id, parseInt(e.target.value))
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {alertMessage && (
        <div className="fixed inset-x-0 bottom-0 flex items-center justify-center z-50">
          <div className="bg-blue-500 text-white text-center py-2 px-4 rounded">
            {alertMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;