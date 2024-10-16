"use client"; // Ensure this component is treated as a Client Component

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase'; // Make sure this path is correct

export default function SellEWastePage() {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [image, setImage] = useState(null); // File input for image
  const [message, setMessage] = useState(''); // State for success message

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Set the selected file to state
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Upload image to Supabase storage (optional)
    let imageUrl = '';
    if (image) {
      const { data, error } = await supabase.storage.from('images').upload(`public/${image.name}`, image);
      if (error) {
        console.error('Error uploading image:', error);
        return;
      }
      imageUrl = data.Key; // Get the URL of the uploaded image
    }

    // Insert the item details into the Supabase 'items' table
    const { data, error } = await supabase.from('items').insert([
      { name: itemName, description: itemDescription, image_url: imageUrl },
    ]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Item added:', data);
      setMessage('Item Listed!'); // Set success message
      resetForm(); // Reset the form fields
    }
  };

  const resetForm = () => {
    setItemName('');
    setItemDescription('');
    setImage(null);
    
    // Show the message for 3 seconds
    setTimeout(() => {
      setMessage(''); // Clear message after 3 seconds
    }, 3000);
  };

  return (
    <div className="container mx-auto mt-20 p-8">
      {/* Page Title */}
      <h1 className="text-5xl font-bold mb-8 text-green-700">Sell Your E-Waste</h1>

      {/* Explanation Section */}
      <p className="text-xl mb-6 text-gray-700">
        Contribute to a cleaner environment by selling your unwanted electronic devices. Fill out the form below to get started.
      </p>

      {/* Success Message */}
      {message && (
        <div className="mb-4 text-green-600 text-xl font-semibold">{message}</div>
      )}

      {/* Form */}
      <form className="space-y-6 bg-white p-10 shadow-lg rounded-lg" onSubmit={handleSubmit}>
        <div>
          <label className="block text-lg font-medium text-green-800">Item Name</label>
          <input 
            type="text" 
            className="border border-green-300 rounded w-full p-4 text-lg focus:outline-none focus:border-green-500"
            placeholder="Enter the name of your item"
            value={itemName} // Bind state
            onChange={(e) => setItemName(e.target.value)} // Update state
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-green-800">Item Description</label>
          <textarea 
            className="border border-green-300 rounded w-full p-4 text-lg focus:outline-none focus:border-green-500" 
            placeholder="Describe your item"
            value={itemDescription} // Bind state
            onChange={(e) => setItemDescription(e.target.value)} // Update state
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-lg font-medium text-green-800">Upload Image</label>
          <input 
            type="file" 
            className="border border-green-300 rounded w-full p-4 text-lg focus:outline-none focus:border-green-500" 
            onChange={handleFileChange} // Update state with file
          />
        </div>

        <button 
          type="submit" 
          className="bg-green-600 text-white rounded-lg px-6 py-4 text-xl hover:bg-green-700 focus:outline-none">
          Sell
        </button>
      </form>
    </div>
  );
}
