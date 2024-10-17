"use client"; // Ensure this component is treated as a Client Component

import React, { useState } from 'react';
import { supabase } from '../../lib/supabase'; // Make sure the path is correct

export default function SellerForm({ onSubmit }) {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Optional loading state for form

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Set the selected file to state
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state to true

    try {
      let imageUrl = '';

      // If image is selected, upload it to Supabase storage
      if (image) {
        const { data: storageData, error: storageError } = await supabase
          .storage
          .from('images') // Assumes you have a bucket called "images" in Supabase
          .upload(`public/${image.name}`, image);

        if (storageError) {
          console.error('Error uploading image:', storageError.message);
          setLoading(false);
          return;
        }

        // **Changes: Get the public URL of the uploaded image**.
        const { publicURL, error: urlError } = supabase
          .storage
          .from('images')
          .getPublicUrl(storageData.path); // Fetch the public URL

        if (urlError) {
          console.error('Error getting image URL:', urlError.message);
          setLoading(false);
          return;
        }

        imageUrl = publicURL; // Set the image URL
      }

      // Pass form data to the onSubmit handler
      const success = await onSubmit(itemName, itemDescription, imageUrl);

      if (success) {
        // **Clear the form fields after successful submission**
        setItemName('');
        setItemDescription('');
        setImage(null);
      }

    } catch (error) {
      console.error('Error handling form submission:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form className="space-y-6 bg-white p-10 shadow-lg rounded-lg" onSubmit={handleSubmit}>
      {/* Item Name Field */}
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

      {/* Item Description Field */}
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

      {/* Image Upload Field */}
      <div>
        <label className="block text-lg font-medium text-green-800">Upload Image</label>
        <input 
          type="file" 
          className="border border-green-300 rounded w-full p-4 text-lg focus:outline-none focus:border-green-500" 
          onChange={handleFileChange} // Update state with file
        />
      </div>

      {/* Submit Button */}
      <button 
        type="submit" 
        className={`bg-green-600 text-white rounded-lg px-6 py-4 text-xl hover:bg-green-700 focus:outline-none ${loading ? 'opacity-50' : ''}`} 
        disabled={loading}>
        {loading ? 'Submitting...' : 'Sell'}
      </button>
    </form>
  );
}
