"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Image from "next/image";
import Link from "next/link";

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
    if (isDark) {
        root.classList.add("dark");
    } else {
        root.classList.remove("dark");
    }

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
  const { isDarkMode, setIsDarkMode, mounted } = useDarkMode();

  useEffect(() => {
    if (!mounted) return;

    const links = document.querySelectorAll('a[href^="#"]');
    const handleSmoothScroll = (e: Event) => {
      const targetHref = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (!targetHref || targetHref === "#") return;

      e.preventDefault();
      const target = document.querySelector(targetHref);
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power2.inOut",
        });
      }
    };

    links.forEach((link) => link.addEventListener("click", handleSmoothScroll));
    return () => {
      links.forEach((link) => link.removeEventListener("click", handleSmoothScroll));
    };
  }, [mounted]);

  if (!mounted) return null;

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Catalog", href: "/catalog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 font-montserrat">
      <div className="max-w-[1400px] mx-auto 
        bg-white/90 backdrop-blur-md border border-neutral-200 shadow-sm 
        dark:bg-[#262626]/90 dark:border-neutral-700 
        rounded-full pl-6 pr-2 py-2 flex items-center justify-between transition-colors duration-500">
        
        {/* --- KIRI: LOGO --- */}
        <div className="shrink-0 flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8">
              <Image
                src="/img/icon/favicon.jpg"
                fill
                className="object-contain hidden dark:block"
                alt="Logo Light"
              />
              <Image
                src="/img/icon/favicon.jpg"
                fill
                className="object-contain block dark:hidden"
                alt="Logo Dark"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#1a1a1a] dark:text-[#EAE8E1] group-hover:opacity-80 transition-opacity">
              FoodList
            </span>
          </Link>
        </div>
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

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden md:flex items-center px-5 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 border
            border-neutral-300 text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#EAE8E1]
            dark:border-neutral-600 dark:text-[#EAE8E1] dark:hover:bg-[#EAE8E1] dark:hover:text-[#1a1a1a]"
          >
            Schedule a meeting
          </Link>

          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-full border transition-colors
            bg-neutral-50 border-neutral-200 hover:bg-neutral-100
            dark:bg-[#1a1a1a] dark:border-neutral-700 dark:hover:bg-[#333333]"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-600">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={toggleMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full transition-colors lg:hidden
            bg-[#1a1a1a] text-white hover:bg-neutral-800
            dark:bg-[#EAE8E1] dark:text-[#1a1a1a] dark:hover:bg-white"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU (Dropdown) --- */}
      <div
        className={`mt-2 mx-auto max-w-[1400px] overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 shadow-lg rounded-3xl flex flex-col gap-2 border
         bg-white border-neutral-200
         dark:bg-[#262626] dark:border-neutral-700">
          
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between px-6 py-4 rounded-2xl transition-colors group
              bg-neutral-50 hover:bg-neutral-100
              dark:bg-[#1a1a1a] dark:hover:bg-[#333333]"
            >
              <span className="text-lg font-medium text-[#1a1a1a] dark:text-[#EAE8E1]">
                {label}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 text-center px-6 py-4 rounded-2xl font-semibold transition-opacity
            bg-[#1a1a1a] text-white hover:opacity-90
            dark:bg-[#EAE8E1] dark:text-[#1a1a1a]"
          >
            Schedule a meeting
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;