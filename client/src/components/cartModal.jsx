import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./context/cartContext";
import { UserContext } from "./context/userContext";

const CartModal = ({ isOpen, toggleModal }) => {
  const { cart, removeFromCart, setCart } = useContext(CartContext);
  const { currentUser, authToken } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


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
        setOrders(data);
        calculateTotalPrice(data);
        console.log("Fetched orders:", data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (isOpen && authToken && currentUser) {
      fetchOrders();
    }
  }, [isOpen, authToken, currentUser, setCart]);

  useEffect(() => {
    const fetchOrdersOnUserChange = async () => {
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
        setOrders(data);
        calculateTotalPrice(data);
        console.log("Fetched orders:", data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (authToken && currentUser) {
      fetchOrdersOnUserChange();
    }
  }, [authToken, currentUser, setCart]);

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
      const updatedOrders=orders.filter((order) => order.id !== order_id)
      setOrders(updatedOrders);
      calculateTotalPrice(updatedOrders);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  const calculateTotalPrice = (orders) => {
    const total = orders.reduce(
      (sum, order) => sum + order.product.price * order.quantity,
      0
    );
    setTotalPrice(total);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg w-[1000px] max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="sticky top-0 bg-white pb-5 pt-4">
                <div className="flex justify-between items-center border-b border-t border-gray-200 pb-4 pt-4">
                  <h3 className="text-xl font-semibold">Shopping Cart</h3>
                  <button
                    className="text-gray-500 hover:text-gray-600 focus:outline-none"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                </div>
              </div>
              {orders.length === 0 ? (
                <p className="text-center mt-4">Your cart is empty.</p>
              ) : (
                <div>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subtotal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap flex items-center">
                            <img
                              src={order.product.image_url}
                              alt="Product"
                              className="w-16 h-16 object-cover mr-4"
                            />
                            <div>
                              <h4 className="text-sm font-medium">
                                {order.product.title}
                              </h4>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {order.product.price.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {(
                              order.product.price * order.quantity
                            ).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              className="text-red-600 hover:text-red-800"
                              onClick={() => handleDelete(order.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium">Total Price:</h4>
                    <p className="text-sm font-medium">
                      Ksh{" "}                       
                      {totalPrice.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                    <button
                      className="bg-gray-300 hover:bg-gray-500 text-white py-2 px-4 rounded"
                      onClick={toggleModal}
                    >
                      Continue Shopping
                    </button>
                    <button
                      className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
                      onClick={() => {
                      }}
                    >
                      Checkout
                    </button>
                  </div>
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