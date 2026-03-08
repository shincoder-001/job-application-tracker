"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/services/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      router.push("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-6 border rounded w-80"
      >
        <h1 className="text-xl font-bold">Login</h1>

        <input
          type="email"
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
          Login
        </button>

        {/* Register link */}
        <p className="text-sm text-center mt-2">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Register
          </a>
        </p>

      </form>
    </div>
  );
}