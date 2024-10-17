// app/page.js

"use client"; // This is a Client Component
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a custom Button component
import { useRouter } from "next/navigation"; // For navigation handling
import { auth } from "@/lib/firebase"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth"; // Firebase method to track auth state

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Track the authentication state of the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // User is logged in
      } else {
        setUser(null); // No user is logged in
      }
    });
    
    return () => unsubscribe(); // Clean up listener on component unmount
  }, []);

  // Handle Sell button click
  const handleSellClick = () => {
    if (user) {
      // User is logged in, go to the Sell E-Waste form
      router.push('/sell-ewaste');
    } else {
      // User is not logged in, redirect to Login page
      router.push('/login');
    }
  };

  // Handle Buy button click (this could remain as-is)
  const handleBuyClick = () => {
    router.push('/buy-ewaste');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-8 text-green-700">Welcome to E-Waste Management</h1>
      <div className="space-x-4">
        <Button onClick={handleSellClick} className="bg-green-600 text-white hover:bg-green-700 px-6 py-3 rounded-lg text-xl">
          Sell E-Waste
        </Button>
        <Button onClick={handleBuyClick} className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg text-xl">
          Buy E-Waste
        </Button>
      </div>
    </div>
  );
}
