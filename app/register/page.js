"use client"; // This is a Client Component
import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation handling
import { supabase } from "@/lib/supabase"; // Import Supabase client
import bcrypt from 'bcryptjs'; // For password hashing

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Store user registration data in the Supabase database
    const { data, error } = await supabase
      .from('users') // Assuming your table is named 'users'
      .insert([
        {
          username: username,
          phone: phone,
          email: email,
          password: hashedPassword, // store the hashed password
        }
      ]);

    if (error) {
      setError("Registration failed. Please try again.");
    } else {
      router.push('/login'); // Redirect to the login page on successful registration
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="bg-green-600 text-white hover:bg-green-700 px-6 py-2 rounded-lg">
          Register
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
