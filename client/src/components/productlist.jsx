import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto bg-blue-50 z-100 px-4 py-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 flex flex-col justify-between shadow-xl rounded-lg overflow-hidden bg-white">
            <h2 className="font-medium text-lg mb-2 overflow-hidden relative">
              <span className="marquee">{product.title}</span>
            </h2>
            <div className="border border-gray-200 h-80 mb-4 overflow-hidden relative text-center">
              <img
                src={product.image_url}
                alt={product.title}
                className="p-4 mr-2 w-80 h-80 object-contain "
                style={{ maxHeight: "300px" }}
              />
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
