"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  HandCoins,
  PlusCircle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";

export default function DonorDashboard() {
  // Dummy state for donations
  const [donations, setDonations] = useState([
    { id: 1, project: "Education Fund", type: "Education", amount: "₨ 10,000", date: "2025-10-01", status: "Completed" },
    { id: 2, project: "Flood Relief", type: "Emergency", amount: "₨ 7,500", date: "2025-09-22", status: "Completed" },
  ]);

  const [myDonations, setMyDonations] = useState([
    { id: 1, project: "Food for All", type: "Welfare", amount: "₨ 5,000", date: "2025-10-09", status: "Pending" },
  ]);

  // Form state for new donation
  const [form, setForm] = useState({
    project: "",
    type: "",
    amount: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.project || !form.type || !form.amount) {
      toast.error("Please fill all fields.");
      return;
    }

    const newDonation = {
      id: Date.now(),
      ...form,
      date: new Date().toISOString().split("T")[0],
      status: "Pending",
    };

    setMyDonations([...myDonations, newDonation]);
    setForm({ project: "", type: "", amount: "" });
    toast.success("Donation added successfully!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <HandCoins className="h-6 w-6 text-green-600" /> Donor Dashboard
        </h1>

        {/* Add Donation Button with Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Make a Donation
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make a New Donation</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <Input
                placeholder="Project Name"
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
              />

              <Select
                onValueChange={(value) => setForm({ ...form, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Donation Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Emergency">Emergency</SelectItem>
                  <SelectItem value="Welfare">Welfare</SelectItem>
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Donation Amount (₨)"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: `₨ ${e.target.value}` })}
              />

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Confirm Donation
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* My Donations Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-yellow-600" />
            My Donations (Pending / Active)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {myDonations.length === 0 ? (
            <p className="text-gray-500 text-sm">No active donations at the moment.</p>
          ) : (
            <table className="w-full text-sm text-left border-t">
              <thead className="text-gray-600">
                <tr>
                  <th className="py-2">Project</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {myDonations.map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="py-2">{d.project}</td>
                    <td>{d.type}</td>
                    <td>{d.amount}</td>
                    <td>{d.date}</td>
                    <td>
                      <span className="text-yellow-600 font-medium">{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Donation History Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Donation History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm text-left border-t">
            <thead className="text-gray-600">
              <tr>
                <th className="py-2">Project</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="py-2">{d.project}</td>
                  <td>{d.type}</td>
                  <td>{d.amount}</td>
                  <td>{d.date}</td>
                  <td>
                    <span className="text-green-600 font-medium">{d.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
