"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, PlusCircle, Eye, CheckCircle, Trash2 } from "lucide-react";

export default function UserPage() {
  const [activeTab, setActiveTab] = useState("complaints");

  // User Profile
  const [userProfile, setUserProfile] = useState({
    name: "Zunair",
    email: "user@example.com",
    role: "User",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Complaints
  const [complaints, setComplaints] = useState([
    { id: 1, title: "Street Light Not Working", status: "Pending" },
    { id: 2, title: "Garbage Collection Delay", status: "Resolved" },
  ]);
  const [newComplaint, setNewComplaint] = useState("");

  const handleAddComplaint = () => {
    if (!newComplaint.trim()) return; // ignore empty input
    setComplaints([
      ...complaints,
      { id: Date.now(), title: newComplaint, status: "Pending" },
    ]);
    setNewComplaint(""); // clear input
  };

  const handleRemoveComplaint = (id) => {
    setComplaints(complaints.filter((c) => c.id !== id));
  };

  // Handle Enter key press in complaint input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddComplaint();
    }
  };

  // Volunteer
  const [volunteerActivities, setVolunteerActivities] = useState([
    { id: 1, title: "Tree Plantation Drive", joined: false },
    { id: 2, title: "Beach Cleanup", joined: false },
  ]);
  const toggleJoinActivity = (id) => {
    setVolunteerActivities(volunteerActivities.map((act) =>
      act.id === id ? { ...act, joined: !act.joined } : act
    ));
  };

  return (
    <div className="p-6 overflow-y-auto space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {["complaints", "profile", "volunteer"].map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "outline"}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      {/* Complaints Tab */}
      {activeTab === "complaints" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare size={20} /> My Complaints
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {complaints.length === 0 && <p>No complaints submitted yet.</p>}

            {complaints.map((c) => (
              <div key={c.id} className="flex justify-between items-center border p-2 rounded">
                <div>
                  <p className="font-medium">{c.title}</p>
                  <p className="text-sm text-gray-500">{c.status}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleRemoveComplaint(c.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}

            {/* Add Complaint */}
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={newComplaint}
                onChange={(e) => setNewComplaint(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter new complaint"
                className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Button onClick={handleAddComplaint} variant="outline">
                <PlusCircle className="mr-2" /> Add
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} /> My Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                  className="border p-2 rounded w-full"
                />
                <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
              </div>
            ) : (
              <>
                <p><strong>Name:</strong> {userProfile.name}</p>
                <p><strong>Email:</strong> {userProfile.email}</p>
                <p><strong>Role:</strong> {userProfile.role}</p>
                <Button className="mt-2" variant="outline" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Volunteer Tab */}
      {activeTab === "volunteer" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User size={20} /> Volunteer Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {volunteerActivities.map((act) => (
              <div key={act.id} className="flex justify-between items-center border p-2 rounded">
                <p>{act.title}</p>
                <Button
                  variant={act.joined ? "default" : "outline"}
                  onClick={() => toggleJoinActivity(act.id)}
                >
                  {act.joined ? <CheckCircle className="mr-2" /> : <Eye className="mr-2" />}
                  {act.joined ? "Joined" : "Join"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
