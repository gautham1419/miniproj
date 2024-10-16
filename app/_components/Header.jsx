// app/header.js

"use client"; // Ensure this component is treated as a Client Component

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter
import { Plus } from 'lucide-react';

function Header() {
  const path = usePathname();
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    console.log(path);
  }, [path]);

  const handleLoginClick = () => {
    router.push('/login'); // Redirects to the Login page
  };

  return (
    <div className='p-4 px-8 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white border-b border-green-200'>
      <div className='flex gap-8 items-center'>
        <Image src='logo.svg' width={50} height={50} alt='logo' />
        <ul className='hidden md:flex gap-8'>
          <Link href={'/'}>
            <li className={`hover:text-green-600 font-medium text-xl cursor-pointer ${path === "/" && 'text-green-600'}`}>
              Home
            </li>
          </Link>
          <Link href={'/sell-ewaste'}>
            <li className={`hover:text-green-600 font-medium text-xl cursor-pointer ${path === '/sell-ewaste' && 'text-green-600'}`}>
              Sell EWaste
            </li>
          </Link>
          <Link href={'/pickup-history'}>
            <li className={`hover:text-green-600 font-medium text-xl cursor-pointer ${path === '/pickup-history' && 'text-green-600'}`}>
              PickUp History
            </li>
          </Link>
          <li className='hover:text-green-600 font-medium text-xl cursor-pointer'>Agent Finder</li>
        </ul>
      </div>
      <div className='flex gap-3'>
        <Button className="flex gap-2 bg-green-600 text-white hover:bg-green-700 px-4 py-2 text-lg">
          <Plus />Post Your Ad
        </Button>
        <Button 
          variant="outline" 
          className="border-green-600 text-green-600 hover:bg-green-100 px-4 py-2 text-lg"
          onClick={handleLoginClick} // Attach click handler here
        >
          Login
        </Button>
      </div>
    </div>
  );
}

export default Header;
