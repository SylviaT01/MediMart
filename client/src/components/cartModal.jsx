import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './context/cartContext';

const CartModal = ({ isOpen, toggleModal }) => {
  const { cart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);

  const handleClose = () => {
    toggleModal(); 
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          {/* Modal content */}
          <div className="bg-white rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h3 className="text-xl font-semibold">Shopping Cart</h3>
                <button
                  className="text-gray-500 hover:text-gray-600 focus:outline-none"
                  onClick={handleClose} 
                >
                  <svg
                    className="w-6 h-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6 flex-auto">
                <ul className="divide-y divide-gray-200 overflow-y-auto max-h-[50vh]">
                  {cart.map((item) => (
                    <li key={item.id} className="py-2">
                      <p className="text-lg font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </li>
                  ))}
                  {/* Display fetched orders */}
                  {orders.map((order) => (
                    <li key={order.id} className="py-2">
                      <p className="text-lg font-medium">Order ID: {order.id}</p>
                      <p className="text-sm text-gray-500">Total Price: {order.total_price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
