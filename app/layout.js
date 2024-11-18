"use client";

import localFont from "next/font/local";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation"; // Import usePathname to get the current path
import Header from "./_components/Header"; // Adjust the import path if necessary

// Load fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Root Layout component
export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current path

  console.log(pathname); // Log the current pathname for debugging

  // Define the pages where the header should not be shown
  const noHeaderPages = ['/', '/login', '/register', '/register-buyer','/login-buyer','/buy-ewaste']; // Add '/register-buyer' here

  return (
    <ClerkProvider>
      <html lang="en">
        {/* Add the <head> tag with favicon link */}
        <head>
          <link rel="icon" href="/favicon.png" /> {/* Ensure favicon is in /public folder */}
          <title>Ewaste Cycle</title> {/* Optionally, customize the tab title */}
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Provider>
            {/* Only render the header if the current path is not in noHeaderPages */}
            {!noHeaderPages.includes(pathname) && <Header />}

            {/* Render the children (other components/pages) */}
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
