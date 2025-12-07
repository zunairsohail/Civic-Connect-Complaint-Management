import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Toaster } from "sonner";

export const metadata = {
  title: "Citizen Complaint Management System",
  description: "A civic engagement platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {/* Global Notification System */}
        <Toaster richColors position="top-right" />

        {/* Public Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="min-h-screen">{children}</main>

        {/* Footer for public pages */}
        <Footer />
      </body>
    </html>
  );
}
