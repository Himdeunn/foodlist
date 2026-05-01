"use client";

import React, { useState } from "react";
import { Recipe } from "@/lib/recipes";
import { Sparkles, RefreshCcw } from "lucide-react";

interface RandomizerProps {
  localRecipes: Recipe[];
  globalRecipes: Recipe[];
}

const Randomizer: React.FC<RandomizerProps> = ({ localRecipes, globalRecipes }) => {
  const [source, setSource] = useState<"local" | "global">("global");
  const [result, setResult] = useState<Recipe | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRandomize = () => {
    setIsAnimating(true);
    setResult(null);

    setTimeout(() => {
      const targetPool = source === "local" ? localRecipes : globalRecipes;
      if (targetPool.length > 0) {
        const randomIndex = Math.floor(Math.random() * targetPool.length);
        setResult(targetPool[randomIndex]);
      }
      setIsAnimating(false);
    }, 800);
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl">
      <div className="flex flex-col items-center gap-6">
        <h3 className="text-2xl font-black uppercase tracking-tighter text-[#EAE8E1]">
          Food <span className="text-neutral-500">Randomizer</span>
        </h3>

        <div className="flex bg-black/20 p-1 rounded-full border border-white/10 w-full max-w-[300px]">
          <button
            onClick={() => setSource("global")}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all ${
              source === "global" ? "bg-[#EAE8E1] text-[#1a1a1a]" : "text-[#EAE8E1]/50"
            }`}
          >
            GLOBAL
          </button>
          <button
            onClick={() => setSource("local")}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-bold transition-all ${
              source === "local" ? "bg-[#EAE8E1] text-[#1a1a1a]" : "text-[#EAE8E1]/50"
            }`}
          >
            MY LIST
          </button>
        </div>

        <div className="relative w-full h-48 flex items-center justify-center bg-black/40 rounded-3xl overflow-hidden border border-white/5">
          {isAnimating ? (
            <div className="flex flex-col items-center gap-2 animate-pulse">
              <RefreshCcw className="w-8 h-8 text-[#EAE8E1] animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#EAE8E1]/40">Picking...</span>
            </div>
          ) : result ? (
            <div className="flex flex-col items-center text-center p-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2">You should eat:</span>
              <h4 className="text-xl font-bold text-[#EAE8E1] leading-tight mb-2 uppercase">{result.title}</h4>
              <span className="px-3 py-1 bg-[#EAE8E1]/10 rounded-full text-[9px] font-bold text-[#EAE8E1] uppercase">
                {result.category} • {result.times}
              </span>
            </div>
          ) : (
            <Sparkles className="w-12 h-12 text-[#EAE8E1]/10" />
          )}
        </div>

        <button
          onClick={handleRandomize}
          disabled={isAnimating}
          className="w-full py-4 bg-[#EAE8E1] text-[#1a1a1a] rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
        >
          {isAnimating ? "SHUFFLING..." : "GET RECOMMENDATION"}
        </button>
      </div>
    </div>
  );
};

export default Randomizer;
