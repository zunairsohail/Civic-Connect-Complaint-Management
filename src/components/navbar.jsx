"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          CivicConnect
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-200">Home</Link>
          <Link href="/about" className="hover:text-gray-200">About Us</Link>
          <Link href="/contact" className="hover:text-gray-200">Contact</Link>
          <Link href="/auth/login" className="hover:text-gray-200">Donations</Link>
          <Link href="/auth/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200">
            Login
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-500 p-4 space-y-2">
          <Link href="/" className="block hover:text-gray-200">Home</Link>
          <Link href="/about" className="block hover:text-gray-200">About Us</Link>
          <Link href="/contact" className="block hover:text-gray-200">Contact</Link>
          <Link href="/donations" className="block hover:text-gray-200">Donations</Link>
          <Link href="/auth/login" className="block bg-white text-blue-600 px-4 py-2 rounded-lg">Login</Link>
        </div>
      )}
    </nav>
  );
}
