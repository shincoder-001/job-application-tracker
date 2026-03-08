"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration successful!");

      router.push("/login");

    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">

      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 p-6 border rounded w-96"
      >

        <h1 className="text-xl font-bold">Register</h1>

        <input
          placeholder="Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white p-2">
          Register
        </button>

      </form>

    </div>
  );
}