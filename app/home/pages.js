// app/home/page.js
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleSellClick = () => {
    router.push('/sell-ewaste'); // Redirects to the Sell E-Waste page
  };

  const handleBuyClick = () => {
    // Redirect logic for Buy E-Waste page can be added here
    // Example: router.push('/buy-ewaste');
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
