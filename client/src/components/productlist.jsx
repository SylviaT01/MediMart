import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <li key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <a href={`/product/${product.id}`} className="text-xl font-semibold text-blue-500">{product.name}</a>
            <p className="text-gray-700 mt-2">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
