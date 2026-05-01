import { addCustomFood } from "./neon";

export interface Recipe {
  key: string;
  title: string;
  thumb: string;
  times: string;
  portion: string;
  difficulty: string;
  category: string;
}

interface SpoonacularRecipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  dishTypes: string[];
}

/**
 * Mengambil API Key dari .env.local
 * Pastikan kamu sudah menambahkan NEXT_PUBLIC_SPOONACULAR_API_KEY di file .env.local
 */
const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

export const fetchGlobalRecipes = async (): Promise<Recipe[]> => {
  // Guard clause jika API Key lupa dipasang
  if (!API_KEY) {
    console.warn("API Key Spoonacular tidak ditemukan. Menggunakan data fallback statis.");
    return STATIC_RECIPES;
  }

  try {
    /**
     * Mengambil resep global dengan parameter:
     * - addRecipeInformation: true (untuk dapat data durasi masak & porsi)
     * - number: 10 (agar pas dengan layout Bento Grid kamu)
     */
    const response = await fetch(
      `${BASE_URL}?apiKey=${API_KEY}&addRecipeInformation=true&number=27`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    // Jika hasil kosong, gunakan data statis
    if (!data.results || data.results.length === 0) {
      return STATIC_RECIPES;
    }

    return data.results.map((res: SpoonacularRecipe): Recipe => {
      // Menentukan tingkat kesulitan berdasarkan waktu masak
      let difficulty = "Sedang";
      if (res.readyInMinutes <= 20) difficulty = "Mudah";
      if (res.readyInMinutes > 50) difficulty = "Sulit";

      return {
        key: res.id.toString(),
        title: res.title,
        thumb: res.image,
        times: `${res.readyInMinutes} mnt`,
        portion: `${res.servings} Porsi`,
        difficulty: difficulty,
        // Ambil kategori pertama jika ada, jika tidak default ke 'Main Course'
        category: res.dishTypes?.[0] 
          ? res.dishTypes[0].charAt(0).toUpperCase() + res.dishTypes[0].slice(1) 
          : "Main Course",
      };
    });
  } catch (error) {
    console.error("Gagal fetch data dari Spoonacular:", error);
    return STATIC_RECIPES; // Return data statis jika internet mati atau API limit habis
  }
};

// Data cadangan jika API bermasalah (Fallback)
export const STATIC_RECIPES: Recipe[] = [
  {
    key: "st-1",
    title: "Rendang Sapi Padang",
    thumb: "https://i.pinimg.com/736x/8c/24/9f/8c249f1c5a07371b5ae0f36fe7a13692.jpg",
    times: "4 Jam",
    portion: "4 Porsi",
    difficulty: "Sulit",
    category: "Main Course",
  },
  {
    key: "st-2",
    title: "Sate Ayam Madura",
    thumb: "https://i.pinimg.com/1200x/8a/0b/b9/8a0bb90c9124817be2045da8a4c4e98e.jpg",
    times: "45 mnt",
    portion: "2 Porsi",
    difficulty: "Sedang",
    category: "Grill",
  },
];

export const syncToCloud = async (recipe: Recipe) => {
  const { key, ...foodData } = recipe;
  return await addCustomFood(foodData);
};