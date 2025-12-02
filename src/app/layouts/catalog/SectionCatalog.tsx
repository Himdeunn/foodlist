"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import recipesData from "@/lib/recipes";

const SectionCatalog: React.FC = () => {
  const recipes = recipesData;

  return (
    <section
      className="relative w-full px-6 py-32 transition-colors duration-500 font-montserrat
      bg-[#EAE8E1] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#EAE8E1]"
      id="catalog"
      data-scroll-section
    >
      {/* --- HEADER --- */}
      <div className="flex flex-col items-start justify-between mb-16 md:flex-row md:items-end">
        <div className="max-w-xl">
          <h3 className="text-xs font-bold tracking-[0.2em] uppercase opacity-60 mb-3 text-neutral-500 dark:text-neutral-400">
            Daily Inspiration
          </h3>
          <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tight">
            Authentic <br />
            <span className="italic font-serif font-normal text-neutral-600 dark:text-neutral-400">
              Indonesian
            </span>{" "}
            Flavors.
          </h2>
        </div>

        <div className="mt-8 md:mt-0">
          <Link
            href="/recipes"
            className="group relative inline-flex items-center px-8 py-3 text-sm font-bold border rounded-full overflow-hidden transition-all
            border-[#1a1a1a] text-[#1a1a1a]
            dark:border-[#EAE8E1] dark:text-[#EAE8E1]"
          >
            <span className="absolute inset-0 w-full h-full bg-[#1a1a1a] dark:bg-[#EAE8E1] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative group-hover:text-[#EAE8E1] dark:group-hover:text-[#1a1a1a] transition-colors duration-300">
              Explore All Recipes
            </span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px]">
        {recipes.map((item, index) => {
          const isLarge = index === 0 || index === 6;
          const isTall = index === 3;

          return (
            <div
              key={item.key}
              className={`relative group overflow-hidden rounded-4xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-1
              ${isLarge ? "lg:col-span-2" : "lg:col-span-1"}
              ${isTall ? "lg:row-span-2" : "lg:row-span-1"}
              bg-white dark:bg-neutral-800 border border-transparent dark:border-neutral-700/50
              `}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={item.thumb}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
              </div>

              <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md border border-white/20 shadow-sm
                      ${
                        item.dificulty === "Mudah"
                          ? "bg-green-500/80 text-white"
                          : item.dificulty === "Sedang"
                          ? "bg-yellow-500/80 text-black"
                          : "bg-red-500/80 text-white"
                      }
                  `}
                >
                  {item.dificulty}
                </span>
                
                {/* Time Badge */}
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                  ⏱ {item.times}
                </span>
              </div>
              
               <div className="absolute top-4 left-4">
                 <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10">
                   {item.category}
                 </span>
               </div>

              <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                <div className="flex items-center gap-2 mb-2 opacity-80">
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    {item.portion}
                  </span>
                </div>

                <h3
                  className={`font-bold leading-tight mb-1 text-white
                  ${isLarge ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}
                >
                  {item.title}
                </h3>

                {/* Hover Action */}
                <div className="h-0 overflow-hidden group-hover:h-auto group-hover:mt-4 transition-all duration-300">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-300 group-hover:text-white transition-colors">
                    <span>View Recipe</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCatalog;