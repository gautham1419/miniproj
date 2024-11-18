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

  // Handle Buy button click
  const handleBuyClick = () => {
    if (user) {
      // User is logged in, go to the Buy E-Waste page
      router.push('/buy-ewaste');
    } else {
      // User is not logged in, redirect to Login page
      router.push('/login-buyer');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-5xl font-extrabold mb-12 text-green-800 shadow-lg transition-all duration-500 transform hover:scale-105 overflow-hidden">
        <span className="typing-effect">Welcome to E-Waste Management</span>
      </h1>
      <div className="space-y-6 flex flex-col justify-center w-full max-w-md">
        <Button onClick={handleSellClick} className="bg-green-600 text-white hover:bg-green-700 px-12 py-6 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-110 text-2xl">
          Sell E-Waste
        </Button>
        <Button onClick={handleBuyClick} className="bg-blue-600 text-white hover:bg-blue-700 px-12 py-6 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-110 text-2xl">
          Buy E-Waste
        </Button>
      </div>
      <style jsx>{`
        .typing-effect {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
          border-right: 3px solid;
          animation: typing 4s steps(30) 1s forwards, blink 0.75s step-end infinite;
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
      `}</style>
    </div>
  );
}
