// app/contact/page.tsx
"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";;



export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            Have questions or feedback? Get in touch with us—we’d love to hear from you.
          </p>
        </div>

        {/* Contact Info + Form */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact Info */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@CivicConnect.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-primary" />
                <span>+92 123456789</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Karachi, Pakistan</span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input type="text" placeholder="Your Name" required />
                <Input type="email" placeholder="Your Email" required />
                <Textarea placeholder="Your Message" rows={4} required />
                <Button className="w-full" type="submit">Submit</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <AccordionItem value="q1">
              <AccordionTrigger>How can I create an account?</AccordionTrigger>
              <AccordionContent>
                You can sign up using the registration page. Just provide your email, set a password, and you’re good to go.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>How to volunteer?</AccordionTrigger>
              <AccordionContent>
                Go on to the volunteer section present in the dashboard and fill out the form.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>How do I reset my password?</AccordionTrigger>
              <AccordionContent>
                Click on "Forgot Password" at the login screen and follow the instructions sent to your email.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>How do I contact support?</AccordionTrigger>
              <AccordionContent>
                You can fill out the contact form above or email us directly at support@plano.com.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
