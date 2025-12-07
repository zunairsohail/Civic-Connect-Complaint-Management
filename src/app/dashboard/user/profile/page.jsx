"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function UserProfilePage() {
  const user = {
    name: "Zunair Sohail",
    email: "zunair@example.com",
    phone: "0333-0334888",
    address: "Bahria Town, Islamabad",
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">User Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div>
              <label className="text-gray-600 text-sm">Full Name</label>
              <input
                type="text"
                defaultValue={user.name}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm">Email</label>
              <input
                type="email"
                defaultValue={user.email}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm">Phone</label>
              <input
                type="text"
                defaultValue={user.phone}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="text-gray-600 text-sm">Address</label>
              <textarea
                defaultValue={user.address}
                className="w-full border rounded-lg p-2"
              ></textarea>
            </div>
          </div>

          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Save Changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
