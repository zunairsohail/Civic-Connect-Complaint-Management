"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function UserComplaintsPage() {
  const [filter, setFilter] = useState("All");
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      title: "Streetlight not working",
      status: "Resolved",
      date: "2025-01-12",
    },
    {
      id: 2,
      title: "Garbage collection delayed",
      status: "Pending",
      date: "2025-01-10",
    },
    {
      id: 3,
      title: "Sewerage overflow",
      status: "In Progress",
      date: "2025-01-05",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const filtered =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  const statusBadge = (status) => {
    if (status === "Resolved")
      return "bg-green-100 text-green-700 border border-green-300";
    if (status === "Pending")
      return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    return "bg-blue-100 text-blue-700 border border-blue-300";
  };

  const addComplaint = () => {
    if (newTitle.trim() === "") return;

    const today = new Date().toISOString().split("T")[0];

    const newComplaint = {
      id: complaints.length + 1,
      title: newTitle,
      description: newDesc,
      status: "Pending",
      date: today,
    };

    setComplaints([newComplaint, ...complaints]);
    setNewTitle("");
    setNewDesc("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">My Complaints</h1>

        {/* Add Complaint Modal Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <PlusCircle className="mr-2 h-4 w-4" /> File New Complaint
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit a New Complaint</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Complaint Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />

              <Textarea
                placeholder="Describe the issue..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button onClick={addComplaint} className="bg-blue-600 text-white">
                Submit Complaint
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        {["All", "Resolved", "Pending", "In Progress"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Complaints Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Complaint Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="p-2">Title</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-2 font-medium text-gray-800">{c.title}</td>
                  <td className="p-2">
                    <Badge className={statusBadge(c.status)}>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="p-2 text-gray-600">{c.date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center py-4 text-gray-500">
              No complaints found.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
