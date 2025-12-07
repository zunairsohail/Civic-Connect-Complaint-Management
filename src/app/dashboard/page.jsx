"use client";

import { useState } from "react";
import { ClipboardCheck, CheckCircle, FileText } from "lucide-react";

export default function VolunteerDashboard() {
  // Dummy tasks
  const tasks = [
    {
      id: 1,
      title: "Visit Complaint Site – Streetlight Issue",
      location: "Park Road",
      assignedAt: "2 days ago",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Inspect Garbage Overflow",
      location: "Sector D",
      assignedAt: "5 days ago",
      status: "Pending",
    },
    {
      id: 3,
      title: "Follow-up on Pothole Repair",
      location: "Main Road",
      assignedAt: "1 week ago",
      status: "Completed",
    },
  ];

  // Dummy reports
  const reports = [
    {
      id: 101,
      title: "Streetlight Fixed",
      submittedAt: "1 day ago",
      status: "Approved",
    },
    {
      id: 102,
      title: "Garbage Complaint Verified",
      submittedAt: "3 days ago",
      status: "Under Review",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">Welcome, Volunteer 👋</h1>
      <p className="text-gray-600">
        Here’s a summary of your assigned tasks and recent activity.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white shadow rounded-xl border flex items-center gap-4">
          <ClipboardCheck className="h-8 w-8 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Active Tasks</p>
            <h2 className="text-xl font-semibold">
              {tasks.filter((t) => t.status !== "Completed").length}
            </h2>
          </div>
        </div>

        <div className="p-5 bg-white shadow rounded-xl border flex items-center gap-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Completed Tasks</p>
            <h2 className="text-xl font-semibold">
              {tasks.filter((t) => t.status === "Completed").length}
            </h2>
          </div>
        </div>

        <div className="p-5 bg-white shadow rounded-xl border flex items-center gap-4">
          <FileText className="h-8 w-8 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Reports Submitted</p>
            <h2 className="text-xl font-semibold">{reports.length}</h2>
          </div>
        </div>
      </div>

      {/* Assigned Tasks */}
      <div className="bg-white shadow rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Assigned Tasks</h2>
          <button className="text-blue-600 hover:underline">View All Tasks</button>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-800">{task.title}</p>
                <p className="text-sm text-gray-500">{task.location}</p>
                <p className="text-xs text-gray-400 mt-1">{task.assignedAt}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-600"
                    : task.status === "In Progress"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white shadow rounded-xl border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Reports</h2>
          <button className="text-blue-600 hover:underline">View All Reports</button>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="border p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-800">{report.title}</p>
                <p className="text-xs text-gray-400">{report.submittedAt}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  report.status === "Approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {report.status}
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Submit New Report
          </button>
          <button className="border px-4 py-2 rounded-lg">Assigned Tasks</button>
        </div>
      </div>
    </div>
  );
}
