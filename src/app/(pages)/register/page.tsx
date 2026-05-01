"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, User, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EAE8E1] dark:bg-[#1a1a1a] flex items-center justify-center p-6 font-montserrat transition-colors duration-500">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-12">
          <ArrowLeft className="w-3 h-3" /> Back to Login
        </Link>

        <div className="bg-white dark:bg-black/20 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 rounded-[3rem] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1a1a1a] dark:bg-[#EAE8E1] rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 text-white dark:text-[#1a1a1a]" />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-[#1a1a1a] dark:text-[#EAE8E1]">
              Join <span className="text-neutral-500">Hub</span>
            </h1>
            <p className="text-sm text-neutral-500 mt-2 font-medium">Create your Bento Hub account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-xs font-bold text-center uppercase tracking-widest">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-4">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-100 dark:bg-black/40 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 outline-none transition-all text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-100 dark:bg-black/40 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 outline-none transition-all text-sm"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-100 dark:bg-black/40 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 outline-none transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full py-5 bg-[#1a1a1a] dark:bg-[#EAE8E1] text-white dark:text-[#1a1a1a] rounded-2xl font-black uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-xl disabled:opacity-50"
            >
              {loading ? "CREATING ACCOUNT..." : "REGISTER NOW"}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs text-neutral-500 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1a1a1a] dark:text-[#EAE8E1] font-bold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
