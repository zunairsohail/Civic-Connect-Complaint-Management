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
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Filter } from "lucide-react";

export default function AdminComplaintsPage() {
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const complaints = [
    {
      id: 1,
      title: "Road maintenance issue in Block A",
      category: "Infrastructure",
      status: "Pending",
      priority: "High",
      date: "2025-03-15",
      submittedBy: "Ali Raza",
      description:
        "There is a large pothole causing traffic jams and risk to drivers.",
    },
    {
      id: 2,
      title: "Streetlight not working",
      category: "Utilities",
      status: "Resolved",
      priority: "Medium",
      date: "2025-02-12",
      submittedBy: "Ayesha Khan",
      description: "The streetlight near the park hasn’t been working for 2 weeks.",
    },
    {
      id: 3,
      title: "Garbage collection delay",
      category: "Sanitation",
      status: "In Progress",
      priority: "High",
      date: "2025-04-05",
      submittedBy: "Zunair Sohail",
      description: "Waste not collected regularly in Sector B, unpleasant odor.",
    },
  ];

  const filteredComplaints = complaints.filter((c) => {
    return (
      (filterStatus ? c.status === filterStatus : true) &&
      (filterCategory ? c.category === filterCategory : true) &&
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Complaint Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Select onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                <SelectItem value="Sanitation">Sanitation</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
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

          {/* Table */}
     <div className="overflow-x-auto overflow-y-visible">



            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr className="text-left text-gray-700">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Priority</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Submitted By</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((c, i) => (
                  <tr key={c.id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4">{i + 1}</td>
                    <td className="py-2 px-4 font-medium">{c.title}</td>
                    <td className="py-2 px-4">{c.category}</td>
                    <td className="py-2 px-4">
                      <Badge
                        variant={
                          c.priority === "High"
                            ? "destructive"
                            : c.priority === "Medium"
                            ? "secondary"
                            : "default"
                        }
                      >
                        {c.priority}
                      </Badge>
                    </td>
                    <td
                      className={`py-2 px-4 font-medium ${
                        c.status === "Pending"
                          ? "text-yellow-600"
                          : c.status === "In Progress"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {c.status}
                    </td>
                    <td className="py-2 px-4">{c.submittedBy}</td>
                    <td className="py-2 px-4">{c.date}</td>
                    <td className="py-2 px-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedComplaint(c)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
                {filteredComplaints.length === 0 && (
                  <tr>
                    <td
                      colSpan="8"
                      className="text-center text-gray-500 py-4 italic"
                    >
                      No complaints found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Dialog open={!!selectedComplaint} onOpenChange={() => setSelectedComplaint(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedComplaint?.title}</DialogTitle>
            <DialogDescription>
              View details or update complaint status.
            </DialogDescription>
          </DialogHeader>

          {selectedComplaint && (
            <div className="space-y-3 mt-3 text-sm text-gray-600">
              <p>
                <strong>Category:</strong> {selectedComplaint.category}
              </p>
              <p>
                <strong>Status:</strong> {selectedComplaint.status}
              </p>
              <p>
                <strong>Priority:</strong> {selectedComplaint.priority}
              </p>
              <p>
                <strong>Date:</strong> {selectedComplaint.date}
              </p>
              <p>
                <strong>Submitted By:</strong> {selectedComplaint.submittedBy}
              </p>
              <p className="leading-relaxed">
                {selectedComplaint.description}
              </p>

              <div className="flex justify-end gap-2 mt-5">
                {selectedComplaint.status !== "Resolved" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      alert(`Complaint "${selectedComplaint.title}" marked as resolved!`);
                      setSelectedComplaint(null);
                    }}
                  >
                    Mark as Resolved
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedComplaint(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
