"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";

export default function AddApplication() {
  const router = useRouter();

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");

  // 🔒 Redirect to login if token missing
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/api/applications",
        { company, position, status, notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      router.push("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Failed to create application");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border p-6 rounded w-96"
      >
        <h1 className="text-xl font-bold">Add Job Application</h1>

        <input
          placeholder="Company"
          className="border p-2"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          placeholder="Position"
          className="border p-2"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <select
          className="border p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Rejected</option>
          <option>Offer</option>
        </select>

        <textarea
          placeholder="Notes"
          className="border p-2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button className="bg-black text-white p-2">
          Add Application
        </button>
      </form>
    </div>
  );
}