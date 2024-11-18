"use client"; // This is a Client Component
import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation handling
import { supabase } from "@/lib/supabase"; // Import Supabase client
import bcrypt from 'bcryptjs'; // For password hashing

export default function BuyerRegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyID, setCompanyID] = useState("");
  const [error, setError] = useState(null);

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Trim inputs to avoid leading/trailing spaces
    const trimmedEmail = email.trim();
    const trimmedCompanyID = companyID.trim();
    const trimmedCompanyName = companyName.trim();

    // Check if the company ID exists in the companies table
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .select('company_id')
      .eq('company_id', trimmedCompanyID);

    if (companyError || companyData.length === 0) {
      setError("Invalid company ID. Please enter a valid company ID.");
      return;
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Store user registration data in the Supabase buyers table
    const { data, error } = await supabase
      .from('buyers') // Assuming your table is named 'buyers'
      .insert([
        {
          company_name: trimmedCompanyName,
          company_id: trimmedCompanyID,
          email: trimmedEmail,
          password: hashedPassword, // Store the hashed password
        }
      ]);

    if (error) {
      setError("Registration failed. Please try again.");
    } else {
      router.push('/login-buyer'); // Redirect to the login page on successful registration
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Buyer Registration</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
          className="px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="text"
          value={companyID}
          onChange={(e) => setCompanyID(e.target.value)}
          placeholder="Company ID"
          className="px-4 py-2 border rounded-lg"
          required
        />
        <button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg">
          Register
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
