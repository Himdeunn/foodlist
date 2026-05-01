import { Recipe } from "./recipes";

const NEON_API_URL = process.env.NEXT_PUBLIC_NEON_API_URL;
const NEON_API_KEY = process.env.NEXT_PUBLIC_NEON_API_KEY;

export const fetchCustomFoods = async (): Promise<Recipe[]> => {
  if (!NEON_API_URL) {
    console.warn("Neon API URL tidak ditemukan.");
    return [];
  }

  try {
    const response = await fetch(NEON_API_URL, {
      headers: {
        "Authorization": `Bearer ${NEON_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Neon: ${response.status}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching from NeonDB:", error);
    return [];
  }
};

export const addCustomFood = async (food: Omit<Recipe, "key">): Promise<Recipe | null> => {
  if (!NEON_API_URL) return null;

  try {
    const response = await fetch(NEON_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NEON_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    });

    if (!response.ok) throw new Error("Failed to add food");
    return await response.json();
  } catch (error) {
    console.error("Error adding to NeonDB:", error);
    return null;
  }
};

export const updateCustomFood = async (key: string, food: Partial<Recipe>): Promise<Recipe | null> => {
  if (!NEON_API_URL) return null;

  try {
    const response = await fetch(`${NEON_API_URL}/${key}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${NEON_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(food),
    });

    if (!response.ok) throw new Error("Failed to update food");
    return await response.json();
  } catch (error) {
    console.error("Error updating NeonDB:", error);
    return null;
  }
};

export const deleteCustomFood = async (key: string): Promise<boolean> => {
  if (!NEON_API_URL) return false;

  try {
    const response = await fetch(`${NEON_API_URL}/${key}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${NEON_API_KEY}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Error deleting from NeonDB:", error);
    return false;
  }
};
