"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from 'next/navigation';

export default function home() {
  const path = usePathname();
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    console.log(path);
  }, [path]);


  const handleSellClick = () => {
    console.log("Sell button clicked"); 
    router.push('/login'); // Redirects to the Login page
  };

  const handleBuyClick = () => {
    // Redirect logic for Buy E-Waste page can be added here
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Welcome to E-Waste Management</h2>
      <div className="flex gap-4">
        <Button onClick={handleSellClick} className="bg-green-600 text-white hover:bg-green-700 px-4 py-2">
          Sell E-Waste
        </Button>
        <Button onClick={handleBuyClick} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2">
          Buy E-Waste
        </Button>
      </div>
    </div>
  );
}
