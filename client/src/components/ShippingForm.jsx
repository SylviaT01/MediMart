import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/userContext";
import { CartContext } from "./context/cartContext";

const ShippingForm = () => {
  const { currentUser, authToken } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: currentUser.name,
    deliveryLocation: "",
    apartment: "",
    townCity: "",
    mobileNumber: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const addressData = {
      name: formData.name,
      phone_number: formData.mobileNumber,
      city: formData.townCity,
      location: formData.deliveryLocation,
      apartment: formData.apartment,
    };

    try {
      const response = await fetch("http://localhost:5000/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(addressData),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.error || "Failed to save address");
        }
        console.log("Address saved:", result);
        setCart([]); // Empty the cart after successful submission
        setLoading(false);
        navigate("/home"); // Navigate back to home page
        alert("Order placed successfully!");
      } else {
        const errorText = await response.text();
        throw new Error(`Unexpected response format: ${errorText}`);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error saving address:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 py-8 min-h-screen">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Shipping Information
        </h2>
        <p className="text-md font-medium mb-2">
          Welcome back, {currentUser.name}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Delivery Location
            </label>
            <input
              type="text"
              name="deliveryLocation"
              value={formData.deliveryLocation}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Apartment</label>
            <input
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Town/City</label>
            <input
              type="text"
              name="townCity"
              value={formData.townCity}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-300 hover:bg-blue-400 text-white py-2 px-4 rounded"
              disabled={loading || cart.length === 0} // Disable button if cart is empty
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingForm;
