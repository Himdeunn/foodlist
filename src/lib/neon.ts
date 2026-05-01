import { Recipe } from "./recipes";

// We now call our local API routes instead of the external Neon URL directly
const API_BASE = "/api/foods";

export const fetchCustomFoods = async (): Promise<Recipe[]> => {
  try {
    const response = await fetch(API_BASE);
    const data = await response.json();
    if (Array.isArray(data)) return data;
    return [];
  } catch (error) {
    console.error("Error fetching foods:", error);
    return [];
  }
};

export const addCustomFood = async (food: Omit<Recipe, "key">): Promise<Recipe | null> => {
  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(food),
    });
    if (!response.ok) throw new Error("Failed to add");
    return await response.json();
  } catch (error) {
    console.error("Error adding food:", error);
    return null;
  }
};

export const updateCustomFood = async (key: string, food: Partial<Recipe>): Promise<Recipe | null> => {
  try {
    const response = await fetch(`${API_BASE}/${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(food),
    });
    if (!response.ok) throw new Error("Failed to update");
    return await response.json();
  } catch (error) {
    console.error("Error updating food:", error);
    return null;
  }
};

export const deleteCustomFood = async (key: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE}/${key}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting food:", error);
    return false;
  }
};
