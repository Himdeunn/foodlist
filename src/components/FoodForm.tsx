"use client";

import React, { useState } from "react";
import { Recipe } from "@/lib/recipes";

interface FoodFormProps {
  onSubmit: (food: Omit<Recipe, "key">) => void;
  initialData?: Recipe | null;
  onCancel: () => void;
}

const FoodForm: React.FC<FoodFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    thumb: initialData?.thumb || "",
    times: initialData?.times || "",
    portion: initialData?.portion || "",
    difficulty: initialData?.difficulty || "Sedang",
    category: initialData?.category || "Main Course",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white dark:bg-[#1a1a1a] rounded-[2rem] border border-neutral-200 dark:border-neutral-800 shadow-xl">
      <h3 className="text-xl font-black uppercase tracking-tighter mb-4 text-[#1a1a1a] dark:text-[#EAE8E1]">
        {initialData ? "Update" : "Add New"} <span className="text-neutral-500">Dish</span>
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Dish Name</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="p-3 rounded-xl bg-neutral-100 dark:bg-black/40 border border-transparent focus:border-neutral-300 outline-none transition-all text-sm"
            placeholder="e.g. Nasi Goreng Gila"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Image URL</label>
          <input
            type="text"
            required
            value={formData.thumb}
            onChange={(e) => setFormData({ ...formData, thumb: e.target.value })}
            className="p-3 rounded-xl bg-neutral-100 dark:bg-black/40 border border-transparent focus:border-neutral-300 outline-none transition-all text-sm"
            placeholder="https://..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Cooking Time</label>
          <input
            type="text"
            required
            value={formData.times}
            onChange={(e) => setFormData({ ...formData, times: e.target.value })}
            className="p-3 rounded-xl bg-neutral-100 dark:bg-black/40 border border-transparent focus:border-neutral-300 outline-none transition-all text-sm"
            placeholder="e.g. 30 mnt"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Portion</label>
          <input
            type="text"
            required
            value={formData.portion}
            onChange={(e) => setFormData({ ...formData, portion: e.target.value })}
            className="p-3 rounded-xl bg-neutral-100 dark:bg-black/40 border border-transparent focus:border-neutral-300 outline-none transition-all text-sm"
            placeholder="e.g. 2 Porsi"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Difficulty</label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
            className="p-3 rounded-xl bg-neutral-100 dark:bg-black/40 border border-transparent focus:border-neutral-300 outline-none transition-all text-sm"
          >
            <option value="Mudah">Mudah</option>
            <option value="Sedang">Sedang</option>
            <option value="Sulit">Sulit</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-widest opacity-50">Category</label>
          <input
            type="text"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="p-3 rounded-xl bg-neutral-100 dark:bg-black/40 border border-transparent focus:border-neutral-300 outline-none transition-all text-sm"
            placeholder="e.g. Main Course"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 border border-neutral-200 dark:border-neutral-800 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-neutral-50 dark:hover:bg-white/5 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-3 bg-[#1a1a1a] dark:bg-[#EAE8E1] text-white dark:text-[#1a1a1a] rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-lg"
        >
          {initialData ? "Update" : "Save"} Dish
        </button>
      </div>
    </form>
  );
};

export default FoodForm;
