"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle } from "lucide-react";

export default function VolunteerPage() {
  const tasks = [
    {
      title: "Assist in community clean-up drive",
      status: "Assigned",
      due: "2 Days Left",
    },
    {
      title: "Streetlight survey in Sector D",
      status: "Completed",
      due: "Completed Yesterday",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Volunteer Center</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Assigned Tasks
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg flex items-center justify-between hover:bg-gray-50"
            >
              <div>
                <p className="font-medium text-gray-800">{task.title}</p>
                <p className="text-xs text-gray-500">{task.due}</p>
              </div>

              <Badge
                className={`px-3 py-1 ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {task.status}
              </Badge>
            </div>
          ))}

          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">No tasks assigned.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
