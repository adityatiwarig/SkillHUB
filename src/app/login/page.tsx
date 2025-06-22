"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

// 🔮 MagicUI
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { HyperText } from "@/components/magicui/hyper-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success");
      router.push("/"); // ✅ No profile page, redirect to home or dashboard
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length && user.password.length));
  }, [user]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden px-4">
      <Toaster position="top-right" />

      {/* 🔮 Background Animation */}
      <FlickeringGrid className="absolute inset-0 z-0" />

      {/* 🧊 Foreground Login Box */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-lg p-6 rounded-2xl border shadow-xl space-y-6 text-black">
        {/* 🔮 Hyper Animated Heading */}
        <div className="text-center">
          <HyperText>{loading ? "Processing..." : "Login"}</HyperText>
        </div>

        {/* 📧 Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-3 rounded-xl border border-gray-400 bg-white/60 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        {/* 🔑 Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-3 rounded-xl border border-gray-400 bg-white/60 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        {/* ✨ Shimmer Login Button */}
        <ShimmerButton
          className="w-full"
          disabled={buttonDisabled}
          onClick={onLogin}
        >
          {buttonDisabled ? "Fill Fields" : "Login"}
        </ShimmerButton>

        {/* 🔗 Forgot Password & Signup */}
        <div className="flex justify-between text-sm mt-2">
          <Link href="/forgotpassword" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
          <Link href="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
}
