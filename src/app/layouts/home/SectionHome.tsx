"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const SectionHome: React.FC = () => {
  return (
    <main
      className="relative flex flex-col justify-between min-h-screen px-6 overflow-hidden transition-colors duration-500 font-montserrat 
      bg-[#EAE8E1] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#EAE8E1]"
      id="home"
      data-scroll-section
    >
      <div className="flex flex-col items-start justify-between w-full pt-32 md:flex-row md:items-start">
        {/* Headline Kiri */}
        <div className="mb-6 md:mb-0 md:w-1/3">
          <h2
            data-scroll
            data-scroll-speed="1"
            className="text-3xl font-bold leading-tight tracking-tight md:text-4xl"
          >
            A new recipe for
            <br />
            high-end dishes
          </h2>
        </div>

        <div className="md:w-1/3 flex md:justify-end">
          <Link
            href="mailto:INFO@FOODLIST.COM"
            className="text-xs font-bold uppercase underline transition-opacity md:text-sm decoration-1 underline-offset-4 hover:opacity-70"
          >
            INFO@FOODLIST.COM
          </Link>
        </div>
      </div>

      {/* --- MIDDLE SECTION (Image & Label) --- */}
      <section className="flex items-center justify-center grow w-full py-10 relative z-10">
        <div className="relative group">
          <div
            data-scroll
            data-scroll-speed="2"
            className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 
                bg-neutral-200 dark:bg-neutral-800 
                rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center justify-center relative transition-colors duration-500"
          >
            <Image
              src="https://i.pinimg.com/736x/ed/80/de/ed80decb556deb9245a88f793c8de392.jpg"
              alt="Food Art"
              fill
              className="object-cover"
            />
          </div>

          {/* Label Kecil di Kanan Gambar (Floating Text) */}
          <div
            data-scroll
            data-scroll-speed="1.5"
            className="absolute sm:hidden lg:block top-8 -right-16 sm:-right-24 md:-right-32 text-[0.65rem] sm:text-xs font-bold leading-relaxed uppercase tracking-wide text-right"
          >
            TRADITIONAL
            <br />
            CUISINE
            <br />
            <span className="opacity-60">2026</span>
          </div>
        </div>
      </section>

      {/* --- BOTTOM SECTION (Big Typography) --- */}
      <section className="flex items-end justify-center w-full pb-0 pointer-events-none select-none">
        <h1
          data-scroll
          data-scroll-speed="3"
          // Text fluid (vw) agar responsif masif
          className="text-[15vw] font-black leading-none tracking-tighter text-center lowercase whitespace-nowrap transform translate-y-[5%]"
        >
          food list
        </h1>
      </section>
    </main>
  );
};

export default SectionHome;
