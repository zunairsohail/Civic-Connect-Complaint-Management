"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-center py-20 px-4 min-h-screen flex flex-col justify-center">
        {/* Background image with overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
           src="/images/hero-image.jpg" 
            alt="Community working together"
            fill
            className="object-cover"
            priority
          />
          {/* Soft overlay gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-gray-100/50 to-gray-200/70" />
        </div>

        {/* Hero Content */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 drop-shadow-md"
        >
          Together, we fix what’s broken.
        </motion.h1>

        <p className="mt-6 text-lg md:text-xl text-gray-800 max-w-2xl mx-auto">
          Join a growing community of changemakers working to rebuild our cities —
          one street, one project, one act of kindness at a time.
        </p>

        

<div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

  <Link href="/auth/login">
    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg">
      Report an Issue
    </Button>
  </Link>

  <Link href="/auth/login">
    <Button
      variant="outline"
      className="px-6 py-3 rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50"
    >
      Join as Volunteer
    </Button>
  </Link>

</div>

      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 text-center bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Report",
              desc: "Share the issues that need attention — from damaged roads to water leaks.",
              img: "/images/report.jpg",
            },
            {
              title: "Support",
              desc: "Volunteers and donors come together to solve the problem as a team.",
              img: "/images/support.jpg",
            },
            {
              title: "Resolve",
              desc: "Celebrate collective effort as the issue gets fixed — stronger, cleaner, and better.",
              img: "/images/resolving.jpg",
            },
          ].map((step, index) => (
            <Card
              key={index}
              className="shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 rounded-2xl overflow-hidden"
            >
              <Image
                src={step.img}
                alt={step.title}
                width={500}
                height={300}
                className="object-cover w-full h-56"
              />
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-gray-50 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We believe that change starts with awareness — and grows through action. Our
            mission is to create a unified society where citizens collaborate to restore
            dignity, cleanliness, and hope in every corner of our community.
          </p>

          <blockquote className="mt-10 italic text-gray-600">
            “Be the change that you wish to see in the world.” <br />
            <span className="not-italic font-semibold">– Mahatma Gandhi</span>
          </blockquote>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Beach Cleanup Drive",
              img: "/images/beach clean.jpg",
            },
            {
              name: "Neighborhood Road Repair",
              img: "/images/road repair.jpg",
            },
            {
              name: "Flood Relief Donations",
              img: "/images/food donation.jpg",
            },
          ].map((project, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform hover:-translate-y-2"
            >
              <Image
                src={project.img}
                alt={project.name}
                width={600}
                height={400}
                className="object-cover w-full h-60"
              />
              <div className="p-5 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-blue-500 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Small actions create big change.
        </h2>
        <p className="max-w-2xl mx-auto text-lg mb-10">
          Every voice matters, every effort counts. Be part of a community that turns
          complaints into progress.
        </p>
        <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl">
          <Link href="/auth/login">Get Started</Link> 
        </Button>
      </section>
    </div>
  );
}
