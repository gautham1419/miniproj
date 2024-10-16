// app/page.js

"use client"; // This indicates that this is a Client Component

import { Button } from "@/components/ui/button"; // Assuming you have a custom Button component
import { useRouter } from "next/navigation"; // For navigation handling

export default function Home() {
  const router = useRouter();

  const handleSellClick = () => {
    router.push('/sell-ewaste'); // Redirects to the Sell E-Waste page
  };

  const handleBuyClick = () => {
    router.push('/buy-ewaste'); // Redirects to the Buy E-Waste page
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
