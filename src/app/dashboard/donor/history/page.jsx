"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { CalendarDays, HandCoins, Filter, Search } from "lucide-react";

export default function DonorHistoryPage() {
  const [filter, setFilter] = useState("all");

  const donations = [
    { id: 1, project: "Flood Relief Fund", amount: "₨ 10,000", date: "Oct 5, 2025", type: "Emergency", status: "completed" },
    { id: 2, project: "Clean Water Drive", amount: "₨ 5,000", date: "Sept 21, 2025", type: "Community", status: "completed" },
    { id: 3, project: "Education Support", amount: "₨ 8,000", date: "Aug 29, 2025", type: "Education", status: "pending" },
    { id: 4, project: "Orphan Care", amount: "₨ 12,000", date: "July 10, 2025", type: "Welfare", status: "completed" },
    { id: 5, project: "Tree Plantation", amount: "₨ 4,500", date: "June 15, 2025", type: "Environment", status: "completed" },
  ];

  const filteredDonations =
    filter === "all"
      ? donations
      : donations.filter((donation) => donation.type === filter);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-semibold text-gray-800">Donation History</h1>
        <Badge variant="secondary" className="text-sm px-3 py-1">
          Total Donations: {donations.length}
        </Badge>
      </div>

      {/* Filters Section */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" /> Filter Donations
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4 items-center">
          <Select onValueChange={(value) => setFilter(value)} defaultValue="all">
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Emergency">Emergency</SelectItem>
              <SelectItem value="Community">Community</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Welfare">Welfare</SelectItem>
              <SelectItem value="Environment">Environment</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Search by Project..."
            className="w-64"
            type="text"
          />

          <Button variant="outline" className="flex items-center gap-2">
            <Search className="h-4 w-4" /> Search
          </Button>
        </CardContent>
      </Card>

      {/* Donations Table */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">
            Past Donations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">Project</th>
                <th className="p-3">Type</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((donation) => (
                <tr
                  key={donation.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 font-medium text-gray-800">
                    {donation.project}
                  </td>
                  <td className="p-3">{donation.type}</td>
                  <td className="p-3 text-gray-700">{donation.amount}</td>
                  <td className="p-3 text-gray-600 flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-400" />
                    {donation.date}
                  </td>
                  <td className="p-3">
                    <Badge
                      className={`${
                        donation.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {donation.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Summary Section */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="flex flex-col md:flex-row justify-between items-center p-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">
              Your Lifetime Impact
            </h3>
            <p className="text-gray-700">
              You’ve contributed to <strong>5 causes</strong> with a total of{" "}
              <strong>₨ 39,500</strong> in donations.
            </p>
          </div>
          <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white">
            <HandCoins className="h-4 w-4 mr-2" /> Donate Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
