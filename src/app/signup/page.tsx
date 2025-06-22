"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

// MagicUI Components
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { HyperText } from "@/components/magicui/hyper-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";

export default function SignupPage() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success");
      toast.success("Signup successful 🎉");
      router.push(`/login`);
    } catch (error: any) {
      console.log("Signup failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(
      !(user.email.length && user.password.length && user.username.length)
    );
  }, [user]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden px-4">
      {/* Flickering Background */}
      <FlickeringGrid className="absolute inset-0 z-0" />

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-lg p-6 rounded-2xl border shadow-xl space-y-6">
        {/* Heading */}
        <div className="text-center">
          <HyperText>{loading ? "Processing..." : "Create Account"}</HyperText>
        </div>

        {/* Username */}
        <div className="space-y-2">
          <label htmlFor="username" className="block text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-gray-600"
            placeholder="enter username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-gray-600"
            placeholder="enter email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border rounded-lg focus:outline-none focus:border-gray-600"
            placeholder="enter password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        {/* 🔘 Signup Button with onClick */}
        <ShimmerButton
          className="w-full"
          disabled={buttonDisabled || loading}
          onClick={onSignup}
        >
          {buttonDisabled ? "Fill All Fields" : loading ? "Creating..." : "Signup"}
        </ShimmerButton>

        {/* Login link */}
        <p className="text-sm text-center text-black">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
