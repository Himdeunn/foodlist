"use client";

import React, { useEffect, useState } from "react";
import { Recipe } from "@/lib/recipes";
import { fetchCustomFoods, addCustomFood, updateCustomFood, deleteCustomFood } from "@/lib/neon";
import FoodForm from "@/components/FoodForm";
import { Plus, Edit2, Trash2, LayoutDashboard, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const [foods, setFoods] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingFood, setEditingFood] = useState<Recipe | null>(null);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    setLoading(true);
    const data = await fetchCustomFoods();
    setFoods(data);
    setLoading(false);
  };

  const handleAdd = async (formData: Omit<Recipe, "key">) => {
    const newFood = await addCustomFood(formData);
    if (newFood) {
      setFoods([...foods, newFood]);
      setIsAdding(false);
    }
  };

  const handleUpdate = async (formData: Omit<Recipe, "key">) => {
    if (!editingFood) return;
    const updated = await updateCustomFood(editingFood.key, formData);
    if (updated) {
      setFoods(foods.map((f) => (f.key === editingFood.key ? updated : f)));
      setEditingFood(null);
    }
  };

  const handleDelete = async (key: string) => {
    if (confirm("Are you sure you want to delete this dish?")) {
      const success = await deleteCustomFood(key);
      if (success) {
        setFoods(foods.filter((f) => f.key !== key));
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#EAE8E1] dark:bg-[#1a1a1a] transition-colors duration-500 pt-32 px-6 pb-20 font-montserrat">
      <div className="max-w-[1200px] mx-auto">
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity mb-4">
              <ArrowLeft className="w-3 h-3" /> Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-[#1a1a1a] dark:text-[#EAE8E1]">
              Manage <span className="text-neutral-500">My List</span>
            </h1>
          </div>
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] dark:bg-[#EAE8E1] text-white dark:text-[#1a1a1a] rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" /> Add New Dish
          </button>
        </div>

        {/* --- FORM MODAL --- */}
        {(isAdding || editingFood) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-2xl">
              <FoodForm
                onSubmit={isAdding ? handleAdd : handleUpdate}
                initialData={editingFood}
                onCancel={() => {
                  setIsAdding(false);
                  setEditingFood(null);
                }}
              />
            </div>
          </div>
        )}

        {/* --- LIST --- */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a1a1a] dark:border-[#EAE8E1]" />
          </div>
        ) : foods.length === 0 ? (
          <div className="text-center py-20 bg-white/50 dark:bg-black/20 rounded-[3rem] border border-dashed border-neutral-300 dark:border-neutral-800">
            <LayoutDashboard className="w-12 h-12 mx-auto opacity-20 mb-4" />
            <p className="text-neutral-500 uppercase font-bold tracking-widest">No custom dishes found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {foods.map((food) => (
              <div
                key={food.key}
                className="group flex items-center gap-6 p-4 bg-white dark:bg-black/20 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
              >
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                  <Image src={food.thumb} alt={food.title} fill className="object-cover" />
                </div>
                <div className="grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-neutral-100 dark:bg-white/10 px-2 py-0.5 rounded">
                      {food.category}
                    </span>
                    <span className="text-[9px] font-bold opacity-50 uppercase tracking-widest">
                      {food.times} • {food.portion}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg uppercase tracking-tight text-[#1a1a1a] dark:text-[#EAE8E1]">
                    {food.title}
                  </h3>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditingFood(food)}
                    className="p-3 bg-neutral-100 dark:bg-white/5 rounded-full hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(food.key)}
                    className="p-3 bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
