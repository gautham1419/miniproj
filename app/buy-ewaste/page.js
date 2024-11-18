"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function BuyEwaste() {
  const [userName, setUserName] = useState("");
  const [eWasteRequests, setEWasteRequests] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch the logged-in user's name
  useEffect(() => {
    const fetchUserName = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else if (user) {
        console.log("User object:", user); // Debug: log the user object
        setUserName(user.user_metadata.full_name); // Adjust this if your metadata field is different
      }
    };
    fetchUserName();
  }, []);

  const eWasteItems = [
    { name: "Old Smartphones", description: "Used smartphones, any brand.", image: "/phone.png" },
    { name: "Laptops", description: "Old laptops, working or non-working.", image: "/laptop.webp" },
    { name: "Television Sets", description: "Old CRT or flat-screen TVs.", image: "/TV.jpg" },
    { name: "Batteries", description: "Used or expired batteries.", image: "/battery.jpeg" },
  ];

  // Function to handle weight input for each e-waste item
  const handleRequest = (item, weight) => {
    const parsedWeight = parseFloat(weight);
    if (!isNaN(parsedWeight) && parsedWeight > 0) {
      setEWasteRequests((prevRequests) => ({
        ...prevRequests,
        [item.name]: parsedWeight,
      }));
    } else {
      setEWasteRequests((prevRequests) => ({
        ...prevRequests,
        [item.name]: null,
      }));
    }
  };

  // Function to submit request data to Supabase
  const submitRequest = async (itemName, weight) => {
    if (!userName) {
      alert("Please log in first.");
      return;
    }
    if (weight <= 0 || isNaN(weight)) {
      alert("Please enter a valid weight.");
      return;
    }

    setLoading(true); // Show loading state

    const { error } = await supabase.from("required_waste").insert([
      { user_name: userName, item_name: itemName, weight_kg: weight },
    ]);

    setLoading(false); // Hide loading state

    if (error) {
      console.error("Error inserting request:", error.message);
      alert("Failed to submit request.");
    } else {
      alert(`Request submitted successfully for ${itemName}!`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-24">
      <h1 className="text-6xl font-extrabold mb-12 text-blue-700">
        {Array.from("Buy E-Waste").map((letter, index) => (
          <span
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="inline-block opacity-0 animate-fadeIn"
          >
            {letter}
          </span>
        ))}
      </h1>
      <p className="mb-12 text-center text-xl text-gray-700">
        Here you can find various e-waste items available for purchase. Enter the amount in kg you want to buy for each type of e-waste.
      </p>

      {/* E-Waste Boxes */}
      <div className="w-full max-w-4xl px-4">
        {eWasteItems.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-xl rounded-lg p-6 mb-6 flex flex-col md:flex-row items-start justify-between space-y-6 md:space-y-0 md:space-x-6 transition-transform transform hover:scale-105"
          >
            <div className="flex flex-col items-start">
              <h2 className="text-3xl font-semibold text-green-600 mb-4">{item.name}</h2>
              <p className="mb-4 text-gray-700">{item.description}</p>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700" htmlFor={`amount-${index}`}>
                  Amount (kg):
                </label>
                <input
                  id={`amount-${index}`}
                  type="number"
                  className="px-4 py-2 border rounded-lg w-32"
                  placeholder="0"
                  min="0"
                  onChange={(e) => handleRequest(item, e.target.value)}
                />
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => submitRequest(item.name, eWasteRequests[item.name])}
                  disabled={loading || !eWasteRequests[item.name]}
                >
                  {loading ? "Submitting..." : "Request"}
                </button>
              </div>
            </div>

            {/* Image on the right */}
            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-contain rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
