"use client"; // Ensure this component is treated as a Client Component

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase'; // Ensure the path is correct
import SellerForm from '../_components/SellerForm'; // Adjust path as necessary

export default function SellEWastePage() {
  const [message, setMessage] = useState(''); // State for success message

  // Form submit callback function
  const handleSubmit = async (itemName, itemDescription, imageUrl) => {
    try {
      // **Changes: Console log to debug**
      console.log('Attempting to insert item:', { itemName, itemDescription, imageUrl });

      const { data, error } = await supabase.from('item').insert([
        { 
          item_name: itemName, 
          item_desc: itemDescription, 
          item_img: imageUrl ? imageUrl : '' 
        },
      ]);

      if (error) {
        console.error('Error inserting data into Supabase:', error);  // Log the exact error
        setMessage('Failed to list item!');
        return { success: false };
      } else {
        console.log('Item added:', data);
        setMessage('Item Listed!');
        return { success: true };
      }
    } catch (e) {
      console.error('Unexpected error during insert:', e);  // Catch unexpected errors
      setMessage('Unexpected error occurred!');
      return { success: false };
    }
  };

  return (
    <div className="container mx-auto mt-20 p-8">
      {/* Page Title */}
      <h1 className="text-5xl font-bold mb-8 text-green-700">Sell Your E-Waste</h1>

      {/* Explanation Section */}
      <p className="text-xl mb-6 text-gray-700">
        Contribute to a cleaner environment by selling your unwanted electronic devices. Fill out the form below to get started.
      </p>

      {/* Success/Failure Message */}
      {message && (
        <div className={`mb-4 text-xl font-semibold ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </div>
      )}

      {/* Seller Form Component */}
      <SellerForm onSubmit={handleSubmit} />
    </div>
  );
}
