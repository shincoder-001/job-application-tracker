"use client";

import { useEffect, useState } from "react";
import API from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect if no token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchApplications();
  }, []);

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(res.data);
    } catch (error) {
      console.error("Error fetching applications", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete application
  const deleteApplication = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/applications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchApplications();
    } catch (error) {
      console.error("Error deleting application", error);
    }
  };

  // Update status
  const updateStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/api/applications/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchApplications();
    } catch (error) {
      console.error("Error updating status", error);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-xl">Loading applications...</h1>
      </div>
    );
  }

  return (
    <div className="p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Applications</h1>

        <div className="flex gap-3">
          <Link
            href="/add"
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Application
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Applications List */}
      <div className="grid gap-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{app.company}</h2>
              <p>{app.position}</p>

              <select
                value={app.status}
                onChange={(e) =>
                  updateStatus(app.id, e.target.value)
                }
                className="border p-1 mt-1"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>

            <button
              onClick={() => deleteApplication(app.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}