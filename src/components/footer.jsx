"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
        
        {/* Logo + About */}
        <div>
          <h2 className="text-xl font-bold text-white mb-2">CivicConnect</h2>
          <p className="text-sm">
            Empowering citizens to raise complaints, donate, and volunteer for a better society.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
            <li><Link href="/donations" className="hover:text-blue-400">Donations</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <p className="text-sm">📍 Islamabad, Pakistan</p>
          <p className="text-sm">📧 support@civicconnect.com</p>
          <p className="text-sm">📞 +92 123 456789</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} CivicConnect. All rights reserved.
      </div>
    </footer>
  );
}
