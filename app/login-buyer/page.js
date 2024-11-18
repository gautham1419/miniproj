"use client"; // This is a Client Component
import { useState } from 'react';
import { supabase } from '@/lib/supabase'; // Adjust the import based on your structure
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

const BuyerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error message

    try {
      // Query the buyers table to find the buyer with the given email
      const { data: buyer, error: queryError } = await supabase
        .from('buyers')
        .select('*')
        .eq('email', email)
        .single(); // single() gets one record

      if (queryError || !buyer) {
        setError('Invalid email or password');
        return;
      }

      // Compare the provided password with the hashed password from the database
      const isPasswordMatch = await bcrypt.compare(password, buyer.password);

      if (!isPasswordMatch) {
        setError('Invalid email or password');
        return;
      }

      // If login is successful, redirect to the buyer dashboard
      router.push('/buy-ewaste');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please try again later.');
    }
  };

  const handleRegisterClick = () => {
    router.push('/register-buyer'); // Redirect to the Register page
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Buyer Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <p className="text-center mt-6">
          Not registered?{' '}
          <span
            onClick={handleRegisterClick}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Register here!
          </span>
        </p>
      </div>
    </div>
  );
};

export default BuyerLogin;
