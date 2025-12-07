"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function MakeDonation() {
  const [formData, setFormData] = useState({
    amount: "",
    cause: "",
    method: "Credit/Debit Card",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.cause) {
      toast.error("Please fill all fields!");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      toast.success(
        `Thank you for donating PKR ${formData.amount} for ${formData.cause}!`
      );
      setFormData({ amount: "", cause: "", method: "Credit/Debit Card" });
      setIsLoading(false);
    }, 1500);
  };

  // Dummy donation suggestions
  const presetDonations = [500, 1000, 2500, 5000];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <h1 className="text-2xl font-semibold text-gray-800">Make a Donation</h1>

      <Card className="max-w-lg mx-auto shadow-md hover:shadow-lg transition-all">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Enter Donation Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Quick Donate Options */}
            <div>
              <Label className="mb-2 block text-gray-700">
                Quick Select Amount
              </Label>
              <div className="flex flex-wrap gap-3">
                {presetDonations.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={
                      formData.amount == amount ? "default" : "outline"
                    }
                    onClick={() => setFormData({ ...formData, amount })}
                    className={`px-4 py-2 ${
                      formData.amount == amount
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    ₨ {amount}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <Label>Donation Amount (PKR)</Label>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                placeholder="Enter amount"
                onChange={handleChange}
              />
            </div>

            {/* Cause */}
            <div>
              <Label>Purpose / Cause</Label>
              <Input
                type="text"
                name="cause"
                value={formData.cause}
                placeholder="e.g., Education Fund, Flood Relief"
                onChange={handleChange}
              />
            </div>

            {/* Payment Method */}
            <div>
              <Label>Payment Method</Label>
              <select
                name="method"
                value={formData.method}
                onChange={handleChange}
                className="w-full border rounded-md p-2 mt-1"
              >
                <option>Credit/Debit Card</option>
                <option>JazzCash</option>
                <option>EasyPaisa</option>
                <option>Bank Transfer</option>
              </select>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              {isLoading ? "Processing..." : "Donate Now"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Recent Dummy Donations */}
      <Card className="max-w-3xl mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Recent Donations (Demo Data)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y text-sm text-gray-700">
            {[
              { name: "Ali Raza", amount: 2000, cause: "Tree Plantation" },
              { name: "Hassan Khan", amount: 5000, cause: "Flood Relief" },
              { name: "Sara Ahmed", amount: 1500, cause: "Education Fund" },
            ].map((donation, i) => (
              <div key={i} className="flex justify-between py-2">
                <span>
                  <strong>{donation.name}</strong> donated for{" "}
                  {donation.cause}
                </span>
                <span className="text-blue-600 font-semibold">
                  ₨ {donation.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
