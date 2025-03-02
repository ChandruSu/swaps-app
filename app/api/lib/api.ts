const API_BASE_URL = "api/py"; // Change for deployment

// Define the Item type
export interface Item {
  id: string;
  ownerId: string;
  owner: { id: string; name: string };
  title: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  tags: string[];
}

// Fetch all items
export const fetchItems = async (): Promise<Item[]> => {
  const response = await fetch(`${API_BASE_URL}/items`);
  if (!response.ok) throw new Error("Failed to fetch items");
  return await response.json();
};

// Fetch items by user ID
export const fetchItemsByUser = async (userId: string): Promise<Item[]> => {
  const response = await fetch(`${API_BASE_URL}/items/user/${userId}`);
  if (!response.ok) throw new Error("Failed to fetch user items");
  return await response.json();
};

// Fetch items by tags
export const fetchItemsByTags = async (tags: string[]): Promise<Item[]> => {
  const url = new URL(`${API_BASE_URL}/items/by-tags`);
  tags.forEach((tag) => url.searchParams.append("tags", tag));

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch items by tags");
  return await response.json();
};

// Define the type for new item creation request
export interface CreateItemRequest {
  ownerId: string;
  title: string;
  description?: string;
  imageUrl?: string;
  tags: string[];
}


export const createItem = async (formData: FormData): Promise<Item> => {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    body: formData, // ✅ Use FormData to handle file uploads
  });

  if (!response.ok) throw new Error("Failed to create item");
  return await response.json();
};
