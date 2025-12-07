"use client";
import Image from "next/image";
import { Users, Heart, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Building a better community by addressing complaints, supporting citizens, and enabling change.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          We aim to provide a reliable and transparent platform where citizens can raise issues, track progress, and contribute to society through donations and volunteering.
        </p>
      </section>

      {/* Icons Section */}
      <section className="grid md:grid-cols-3 gap-8 px-6 py-16 max-w-6xl mx-auto">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-bold text-xl mb-2">Community Driven</h3>
          <p className="text-gray-600">
            Empowering citizens to voice their concerns and collaborate for solutions.
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="font-bold text-xl mb-2">Compassionate Support</h3>
          <p className="text-gray-600">
            Helping citizens through donations and volunteer programs.
          </p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-bold text-xl mb-2">Secure & Transparent</h3>
          <p className="text-gray-600">
            Ensuring privacy, accountability, and transparent complaint resolution.
          </p>
        </div>
      </section>

     {/* Team Section */}
<section className="py-16 bg-gray-100 px-6">
  <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
  <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[
      { name: "Zunair Sohail", role: "Team Lead", img: "/images/Zunair.jpg" },
      { name: "Hassan Abbass", role: "Backend Developer", img: "/images/Hassan.jpg" },
      { name: "Muhammad Umar", role: "Frontend Developer", img: "/images/Umar.jpg" },
    ].map((member, idx) => (
      <div
        key={idx}
        className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
      >
        <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
          <Image
            src={member.img}
            alt={member.name}
            fill
            className="object-cover"
          />
        </div>

        <h3 className="font-bold text-xl">{member.name}</h3>
        <p className="text-blue-600">{member.role}</p>
      </div>
    ))}
  </div>
</section>

    </div>
  );
}
