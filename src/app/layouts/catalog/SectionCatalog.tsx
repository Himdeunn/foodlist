"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Recipe, fetchGlobalRecipes, syncToCloud } from "@/lib/recipes";
import { fetchCustomFoods } from "@/lib/neon";
import Randomizer from "@/components/Randomizer";
import { Search, Plus, CloudUpload, Filter } from "lucide-react";

const SectionCatalog: React.FC = () => {
  const [globalRecipes, setGlobalRecipes] = useState<Recipe[]>([]);
  const [localRecipes, setLocalRecipes] = useState<Recipe[]>([]);
  const [displayRecipes, setDisplayRecipes] = useState<Recipe[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"all" | "global" | "local">("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getAllData = async () => {
      setLoading(true);
      const [gData, lData] = await Promise.all([
        fetchGlobalRecipes(),
        fetchCustomFoods()
      ]);
      setGlobalRecipes(gData);
      setLocalRecipes(lData);
      setLoading(false);
    };
    getAllData();
  }, []);

  useEffect(() => {
    let combined = [];
    if (source === "all") combined = [...localRecipes, ...globalRecipes];
    else if (source === "global") combined = globalRecipes;
    else combined = localRecipes;

    if (searchQuery) {
      combined = combined.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setDisplayRecipes(combined);
  }, [source, globalRecipes, localRecipes, searchQuery]);

  const handleSync = async (recipe: Recipe) => {
    const success = await syncToCloud(recipe);
    if (success) {
      const updatedLocal = await fetchCustomFoods();
      setLocalRecipes(updatedLocal);
      alert("Recipe synced to your cloud list!");
    }
  };

  return (
    <section
      className="relative w-full px-6 py-32 transition-colors duration-500 font-montserrat
      bg-[#EAE8E1] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-[#EAE8E1]"
      id="catalog"
      data-scroll-section
    >
      <div className="max-w-[1400px] mx-auto">
        {/* --- HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-2xl">
            <h3 className="text-xs font-bold tracking-[0.4em] uppercase opacity-50 mb-6">
              {source === "local" ? "Personal Collection" : "Global Inspiration"} / 2026
            </h3>
            <h2 className="text-5xl md:text-8xl font-black leading-none tracking-tighter uppercase mb-8">
              {source === "local" ? "My Personal" : "Authentic"} <span className="text-neutral-400 dark:text-neutral-600">{source === "local" ? "Dishes" : "World"}</span><br/>
              {source === "local" ? "Archive" : "Cuisines"} <span className="italic font-serif font-normal text-neutral-500 dark:text-neutral-400">Archive.</span>
            </h2>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <button 
                onClick={() => setSource("all")}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${source === "all" ? "bg-[#1a1a1a] text-white dark:bg-[#EAE8E1] dark:text-[#1a1a1a] border-transparent" : "border-neutral-300 dark:border-neutral-800"}`}
              >
                All Mix
              </button>
              <button 
                onClick={() => setSource("global")}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${source === "global" ? "bg-[#1a1a1a] text-white dark:bg-[#EAE8E1] dark:text-[#1a1a1a] border-transparent" : "border-neutral-300 dark:border-neutral-800"}`}
              >
                Global
              </button>
              <button 
                onClick={() => setSource("local")}
                className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${source === "local" ? "bg-[#1a1a1a] text-white dark:bg-[#EAE8E1] dark:text-[#1a1a1a] border-transparent" : "border-neutral-300 dark:border-neutral-800"}`}
              >
                My List
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
             <Randomizer localRecipes={localRecipes} globalRecipes={globalRecipes} />
          </div>
        </div>

        {/* --- ACTIONS BAR --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 p-4 bg-white/50 dark:bg-black/20 backdrop-blur-md rounded-3xl border border-neutral-200 dark:border-neutral-800">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-30" />
            <input 
              type="text" 
              placeholder="Search by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-transparent outline-none text-sm font-medium"
            />
          </div>
          
          <div className="flex gap-4">
            <Link 
              href="/dashboard"
              className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] dark:bg-[#EAE8E1] text-white dark:text-[#1a1a1a] rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-lg"
            >
              <Plus className="w-3 h-3" /> Manage My List
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
            : Array.isArray(displayRecipes) && displayRecipes.map((item, index) => {
                // Bento logic remains the same for the first few items
                const isLarge = index === 0 || index === 6;
                const isTall = index === 3;
                const isLocal = localRecipes.some(l => l.key === item.key);

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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/90 via-[#1a1a1a]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                    </div>

                    {/* Content Layer */}
                    <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                           <span className="w-fit px-4 py-1.5 rounded-full bg-[#EAE8E1]/10 backdrop-blur-xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#EAE8E1]">
                            {item.category}
                          </span>
                          {isLocal && (
                             <span className="w-fit px-2 py-0.5 bg-yellow-500 text-black text-[8px] font-black uppercase rounded">MY LIST</span>
                          )}
                        </div>
                        
                        {!isLocal && (
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              handleSync(item);
                            }}
                            className="p-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full hover:bg-[#EAE8E1] hover:text-[#1a1a1a] transition-all opacity-0 group-hover:opacity-100"
                            title="Sync to my list"
                          >
                            <CloudUpload className="w-4 h-4" />
                          </button>
                        )}
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
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAE8E1]">
                            {isLocal ? "Manage Dish" : "View Recipe"}
                          </span>
                          <div className="flex-grow h-[1px] bg-[#EAE8E1]/30"></div>
                        </div>
                      </div>
                    </div>
                    
                    <Link href={isLocal ? "/dashboard" : `/recipes/${item.key}`} className="absolute inset-0 z-20" aria-label={item.title} />
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default SectionCatalog;