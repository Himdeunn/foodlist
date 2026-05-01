"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import Link from "next/link";
import { LogOut, User as UserIcon, LayoutDashboard, Key } from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const root = window.document.documentElement;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = theme === "dark" || (!theme && systemPrefersDark);

    setIsDarkMode(isDark);
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode, mounted]);

  return { isDarkMode, setIsDarkMode, mounted };
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const { isDarkMode, setIsDarkMode, mounted } = useDarkMode();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/auth/session");
      const data = await res.json();
      setSession(data);
    };
    fetchSession();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "Contact", href: "/contact" },
  ];

  if (session?.role === "ADMIN") {
    navItems.push({ label: "Admin Hub", href: "/dashboard" });
  }

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 font-montserrat">
      <div className="max-w-[1400px] mx-auto 
        bg-white/90 backdrop-blur-md border border-neutral-200 shadow-sm 
        dark:bg-[#262626]/90 dark:border-neutral-700 
        rounded-full pl-6 pr-2 py-2 flex items-center justify-between transition-colors duration-500">
        
        {/* --- LEFT: LOGO --- */}
        <div className="shrink-0 flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <Image src="/img/icon/favicon.png" fill className="object-contain" alt="Logo" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#1a1a1a] dark:text-[#EAE8E1] group-hover:opacity-80 transition-opacity">
              Bento Hub
            </span>
          </Link>
        </div>

        {/* --- CENTER: NAV --- */}
        <div className="hidden lg:flex items-center gap-1 bg-neutral-100 dark:bg-[#1a1a1a] rounded-full px-2 py-1.5 border border-transparent dark:border-neutral-700">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300
              text-neutral-600 hover:text-black hover:bg-white hover:shadow-sm
              dark:text-neutral-400 dark:hover:text-[#EAE8E1] dark:hover:bg-[#333333]"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* --- RIGHT: ACTIONS --- */}
        <div className="flex items-center gap-2">
          {!session ? (
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-full transition-all duration-300 border
              border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#EAE8E1]
              dark:border-[#EAE8E1] dark:text-[#EAE8E1] dark:hover:bg-[#EAE8E1] dark:hover:text-[#1a1a1a] uppercase tracking-widest text-[10px]"
            >
              <Key className="w-3 h-3" /> Hub Login
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <span className="hidden md:block text-[10px] font-black uppercase opacity-50 tracking-widest mr-2">
                {session.role} hub
              </span>
              <button
                onClick={handleLogout}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 flex items-center justify-center rounded-full border transition-colors
            bg-neutral-50 border-neutral-200 hover:bg-neutral-100
            dark:bg-[#1a1a1a] dark:border-neutral-700 dark:hover:bg-[#333333]"
          >
            {isDarkMode ? <span className="text-yellow-400">☀</span> : <span className="text-neutral-600">🌙</span>}
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-colors lg:hidden
            bg-[#1a1a1a] text-white dark:bg-[#EAE8E1] dark:text-[#1a1a1a]"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <div className={`mt-2 mx-auto max-w-[1400px] overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="p-4 shadow-lg rounded-3xl flex flex-col gap-2 border bg-white dark:bg-[#262626] border-neutral-200 dark:border-neutral-700">
          {navItems.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setIsMenuOpen(false)} className="px-6 py-4 rounded-2xl bg-neutral-50 dark:bg-[#1a1a1a] text-lg font-medium">
              {label}
            </Link>
          ))}
          {!session && (
            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="mt-2 text-center px-6 py-4 rounded-2xl font-bold bg-[#1a1a1a] text-white dark:bg-[#EAE8E1] dark:text-[#1a1a1a]">
              Hub Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;