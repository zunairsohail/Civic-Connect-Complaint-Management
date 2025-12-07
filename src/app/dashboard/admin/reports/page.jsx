"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Button,
} from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FileText, Filter } from "lucide-react";

export default function AdminReportsPage() {
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const reports = [
    {
      id: 1,
      title: "Complaint Summary – Q1 2025",
      type: "Performance",
      status: "Reviewed",
      date: "2025-02-10",
      author: "Zunair Sohail",
    },
    {
      id: 2,
      title: "Donation Activity Report",
      type: "Finance",
      status: "Pending",
      date: "2025-03-02",
      author: "Ayesha Khan",
    },
    {
      id: 3,
      title: "Volunteer Task Review",
      type: "Operational",
      status: "Reviewed",
      date: "2025-04-20",
      author: "Ali Raza",
    },
  ];

  const filteredReports = reports.filter((r) => {
    return (
      (filterType ? r.type === filterType : true) &&
      (filterStatus ? r.status === filterStatus : true) &&
      r.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-blue-600" />
            Reports Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Select onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Performance">Performance</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Operational">Operational</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Reviewed">Reviewed</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[220px]"
            />

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" /> Apply Filters
            </Button>
          </div>

          {/* Reports Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr className="text-left text-gray-700">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Type</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Author</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((r, i) => (
                  <tr key={r.id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4">{i + 1}</td>
                    <td className="py-2 px-4 font-medium">{r.title}</td>
                    <td className="py-2 px-4">{r.type}</td>
                    <td
                      className={`py-2 px-4 font-medium ${
                        r.status === "Pending"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {r.status}
                    </td>
                    <td className="py-2 px-4">{r.date}</td>
                    <td className="py-2 px-4">{r.author}</td>
                    <td className="py-2 px-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedReport(r)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredReports.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center text-gray-500 py-4 italic"
                    >
                      No reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Report Modal */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedReport?.title}</DialogTitle>
            <DialogDescription>
              Detailed information about this report.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 mt-3 text-sm text-gray-600">
            <p>
              <strong>Type:</strong> {selectedReport?.type}
            </p>
            <p>
              <strong>Status:</strong> {selectedReport?.status}
            </p>
            <p>
              <strong>Date:</strong> {selectedReport?.date}
            </p>
            <p>
              <strong>Author:</strong> {selectedReport?.author}
            </p>
            <p className="text-gray-700 leading-relaxed">
              This report provides an overview of the latest system activities,
              user engagement, and complaint resolution performance.
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={() => setSelectedReport(null)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
