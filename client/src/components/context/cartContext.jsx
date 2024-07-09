import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart state from localStorage or initialize as empty array
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);

  // Function to update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex !== -1) {
        // Product exists, update quantity and total price
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity++;
        updatedCart[existingProductIndex].total_price += product.price;
        return updatedCart;
      } else {
        // Product does not exist, add it to cart
        return [
          ...prevCart,
          { ...product, quantity: 1, total_price: product.price },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, clearCart }} // Include setCart in the context value
    >
      {children}
    </CartContext.Provider>
  );
};
