"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Search, Plus } from "lucide-react";

export default function AdminUsersPage() {
  // Dummy user data
  const [users, setUsers] = useState([
    { id: 1, name: "Ali Raza", email: "ali.raza2@.com", role: "User", status: "Active" },
    { id: 2, name: "Sara Khan", email: "sara.khan786@.com", role: "Volunteer", status: "Pending" },
    { id: 3, name: "Hassan Ahmed", email: "hassan.ahmed911@.com", role: "Donor", status: "Active" },
    { id: 4, name: "Ayesha Noor", email: "ayesha.noor56@.com", role: "User", status: "Suspended" },
  ]);

  const [filterRole, setFilterRole] = useState("all");
  const [search, setSearch] = useState("");

  // Modal fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("User");
  const [status, setStatus] = useState("Active");

  const handleAddUser = () => {
    if (!name.trim() || !email.trim()) return;

    const newUser = {
      id: users.length + 1,
      name,
      email,
      role,
      status,
    };

    setUsers([newUser, ...users]);

    // Clear
    setName("");
    setEmail("");
    setRole("User");
    setStatus("Active");
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    alert("User deleted (dummy action)");
  };

  // Filtered users
  const filteredUsers = users.filter(
    (user) =>
      (filterRole === "all" || user.role === filterRole) &&
      user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Users</h1>

        {/* Add User Modal Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" /> Add New User
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New User</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Role Select */}
              <div>
                <p className="text-sm mb-1 text-gray-700">Role</p>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                    <SelectItem value="Donor">Donor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Status Select */}
              <div>
                <p className="text-sm mb-1 text-gray-700">Status</p>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleAddUser} className="bg-blue-600 text-white">
                Add User
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex items-center border rounded-lg px-3 w-full sm:w-1/3">
          <Search className="h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-none focus-visible:ring-0"
          />
        </div>

        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="Volunteer">Volunteer</SelectItem>
            <SelectItem value="Donor">Donor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800">User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-2 font-medium text-gray-800">{user.name}</td>
                    <td className="px-4 py-2 text-gray-600">{user.email}</td>
                    <td className="px-4 py-2 text-gray-700">{user.role}</td>
                    <td className="px-4 py-2">
                      <Badge
                        className={
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : user.status === "Suspended"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredUsers.length === 0 && (
              <p className="text-center py-6 text-gray-500">No users found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
