import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./context/cartContext";
import { UserContext } from "./context/userContext";

const CartModal = ({ isOpen, toggleModal }) => {
  const { cart, removeFromCart, setCart } = useContext(CartContext); // Ensure setCart is included
  const { currentUser, authToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  // Fetch orders and update cart when modal opens
  useEffect(() => {
    const fetchOrders = async () => {
      const token = authToken || localStorage.getItem("access_token");
      if (!token) {
        console.error("No auth token available");
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/orders?user_id=${currentUser.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setCart(data);
        setOrders(data); // Set fetched orders to state // Update cart context with fetched orders
        console.log("Fetched orders:", data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (isOpen && authToken && currentUser) {
      fetchOrders();
    }
  }, [isOpen, authToken, currentUser, setCart]);

  // Handle order deletion
  const handleDelete = async (order_id) => {
    const token = authToken || localStorage.getItem("access_token");
    if (!token) {
      console.error("No auth token available");
      return;
    }

    try {
      console.log("Deleting order with ID:", order_id);
      const response = await fetch(`http://127.0.0.1:5000/orders/${order_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete order: ${errorMessage}`);
      }

      removeFromCart(order_id);
      setOrders(orders.filter((order) => order.id !== order_id)); // Remove the deleted order from state
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Render cart modal content
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold">Shopping Cart</h3>
                <button
                  className="text-gray-500 hover:text-gray-600 focus:outline-none"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
              {orders.length === 0 ? (
                <p className="text-center mt-4">Your cart is empty.</p>
              ) : (
                <div>
                  {/* Render each order */}
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex justify-between items-center py-4"
                    >
                      <div className="flex items-center">
                        <img
                          src={order.product.image_url}
                          alt="Product"
                          className="w-16 h-16 object-cover mr-4"
                        />
                        <div>
                          <h4 className="text-lg font-medium">
                            Name: {order.product.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Price: {order.product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-lg font-medium">
                          Ksh {order.total_price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(order.id)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  {/* Render total */}
                  <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                    <h4 className="text-lg font-medium">Total:</h4>
                    <p className="text-lg font-medium">
                      Ksh{" "}
                      {orders.reduce(
                        (total, order) => total + order.total_price,
                        0
                      )}
                    </p>
                  </div>
                  {/* Checkout button */}
                  <button
                    className="bg-blue-300 hover:bg-blue-200 text-white py-2 px-4 rounded-md mt-4 w-full"
                    onClick={() => {
                      /* Handle checkout */
                    }}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
