"use client"; // This is a Client Component
import { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation handling
import { supabase } from "@/lib/supabase"; // Import Supabase client
import bcrypt from 'bcryptjs'; // For comparing hashed password

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // Fetch user data from Supabase
    const { data: user, error: fetchError } = await supabase
      .from('users') // Assuming your table is named 'users'
      .select('email, password') // Select the fields needed
      .eq('email', email) // Find user with the entered email
      .single(); // We expect only one user

    if (fetchError || !user) {
      setError("User not found. Please check your email.");
      return;
    }

    // Compare the entered password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      setError("Invalid password. Please try again.");
    } else {
      router.push('/sell-ewaste'); // Redirect to the Sell page on success
    }
  };

  // Handle "Register" link click
  const handleRegisterClick = () => {
    router.push('/register'); // Redirect to the Register page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          Log In
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <p className="mt-4">
        Not registered?{" "}
        <br/>
        <br/>
        <span
          onClick={handleRegisterClick}
          className="text-blue-600 cursor-pointer hover:underline"
        >
          Register now
        </span>
      </p>
    </div>
  );
}
