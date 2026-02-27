"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Recipe, fetchGlobalRecipes } from "@/lib/recipes";

const SectionCatalog: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      const data = await fetchGlobalRecipes();
      setRecipes(data);
      setLoading(false);
    };
    getRecipes();
  }, []);

  return (
    <section
      className="relative w-full px-6 py-32 transition-colors duration-500 font-montserrat
      bg-[#EAE8E1] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#EAE8E1]"
      id="catalog"
      data-scroll-section
    >
      <div className="max-w-[1400px] mx-auto">
        {/* --- HEADER (Matched with Contact Style) --- */}
        <div className="mb-20">
          <h3 className="text-xs font-bold tracking-[0.4em] uppercase opacity-50 mb-6">
            Global Inspiration / 2026
          </h3>
          <h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase mb-8">
            Authentic <span className="text-neutral-400 dark:text-neutral-600">World</span><br/>
            Cuisines <span className="italic font-serif font-normal text-neutral-500 dark:text-neutral-400">Archive.</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <p className="text-lg md:text-xl max-w-xl opacity-80 leading-relaxed">
              Explore a curated selection of extraordinary dishes from across the globe. 
              Each recipe is a testament to cultural heritage and culinary mastery.
            </p>
            <Link
              href="/recipes"
              className="group relative inline-flex items-center px-10 py-5 text-lg font-bold border rounded-full overflow-hidden transition-all
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

        {/* --- GRID SYSTEM --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[320px]">
          {loading
            ? Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`animate-pulse bg-black/5 dark:bg-white/5 rounded-[2rem] 
                  ${i === 0 || i === 6 ? "lg:col-span-2" : "lg:col-span-1"}
                  ${i === 3 ? "lg:row-span-2" : "lg:row-span-1"}`}
                />
              ))
            : recipes.map((item, index) => {
                const isLarge = index === 0 || index === 6;
                const isTall = index === 3;

                return (
                  <div
                    key={item.key}
                    className={`relative group overflow-hidden rounded-[2rem] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${isLarge ? "lg:col-span-2" : "lg:col-span-1"}
                    ${isTall ? "lg:row-span-2" : "lg:row-span-1"}
                    bg-neutral-200 dark:bg-neutral-800
                    `}
                  >
                    {/* Image Background */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={item.thumb}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay: Matched with rich black #1a1a1a */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    </div>

                    {/* Content Layer */}
                    <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className="px-4 py-1.5 rounded-full bg-[#EAE8E1]/10 backdrop-blur-xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#EAE8E1]">
                          {item.category}
                        </span>
                        <div className="flex gap-2">
                           <span className="text-[10px] font-black uppercase bg-[#EAE8E1] text-[#1a1a1a] px-2 py-0.5 rounded-sm">
                            {item.dificulty}
                          </span>
                        </div>
                      </div>

                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="flex items-center gap-3 mb-3 text-[#EAE8E1]/60 text-[10px] font-bold uppercase tracking-widest">
                          <span>⏱ {item.times}</span>
                          <span className="w-1 h-1 bg-[#EAE8E1]/40 rounded-full"></span>
                          <span>{item.portion}</span>
                        </div>

                        <h3 className={`font-black leading-none text-[#EAE8E1] tracking-tighter uppercase
                          ${isLarge ? "text-3xl md:text-5xl max-w-md" : "text-xl md:text-2xl"}
                        `}>
                          {item.title}
                        </h3>

                        <div className="flex items-center gap-4 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAE8E1]">View Recipe</span>
                          <div className="flex-grow h-[1px] bg-[#EAE8E1]/30"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Overlay Link */}
                    <Link href={`/recipes/${item.key}`} className="absolute inset-0 z-20" aria-label={item.title} />
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default SectionCatalog;