"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

export default function DonationPage() {
  const [filterType, setFilterType] = useState("all");
  const [topDonor, setTopDonor] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newDonation, setNewDonation] = useState({
    name: "",
    amount: "",
    type: "",
    date: "",
  });

  const [donations, setDonations] = useState([
    { name: "Ali Khan", amount: 5000, type: "Cash", date: "2025-09-01" },
    { name: "Sara Ahmed", amount: 2000, type: "Item", date: "2025-08-20" },
    { name: "John Doe", amount: 10000, type: "Cash", date: "2025-09-15" },
  ]);

  const handleAddDonation = () => {
    setDonations([...donations, newDonation]);
    setNewDonation({ name: "", amount: "", type: "", date: "" });
    setIsModalOpen(false);
  };

  const filteredDonations = donations
    .filter(donation => filterType === "all" || donation.type === filterType)
    .sort((a, b) => (topDonor === "top" ? b.amount - a.amount : 0));

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Donation Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center mb-4">
            {/* Filter by Type */}
            <Select onValueChange={setFilterType} defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Item">Item</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            {/* Top Donors */}
            <Select onValueChange={setTopDonor} defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Normal View</SelectItem>
                <SelectItem value="top">Top Donors</SelectItem>
              </SelectContent>
            </Select>

            {/* Add Donation Button */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button>Add Donation</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Donation</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Input
                    placeholder="Donor Name"
                    value={newDonation.name}
                    onChange={(e) => setNewDonation({ ...newDonation, name: e.target.value })}
                  />
                  <Input
                    placeholder="Amount"
                    type="number"
                    value={newDonation.amount}
                    onChange={(e) => setNewDonation({ ...newDonation, amount: e.target.value })}
                  />
                  <Select
                    onValueChange={(val) => setNewDonation({ ...newDonation, type: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Item">Item</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Date"
                    type="date"
                    value={newDonation.date}
                    onChange={(e) => setNewDonation({ ...newDonation, date: e.target.value })}
                  />
                </div>
                <DialogFooter className="mt-4">
                  <Button onClick={handleAddDonation}>Save Donation</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Donation Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Donor Name</TableHead>
                <TableHead>Amount (PKR)</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation, idx) => (
                <TableRow key={idx}>
                  <TableCell>{donation.name}</TableCell>
                  <TableCell>{donation.amount}</TableCell>
                  <TableCell>{donation.type}</TableCell>
                  <TableCell>{donation.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
