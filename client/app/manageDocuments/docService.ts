// docService.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/docs", // Adjust the base URL as needed
  withCredentials: true, // Include credentials if using sessions
});

// Fetch all documents
export const fetchDocs = async () => {
  const response = await api.get("/fetch");
  return response.data;
};

// Add a document
export const addDoc = async (
  name: string,
  type: string,
  parentId: string | null
) => {
  const response = await api.post("/add", { name, type, parentId });
  return response.data;
};

// Rename a document
export const renameDoc = async (id: string, newName: string) => {
  const response = await api.patch(`/rename/${id}`, { newName });
  return response.data;
};

// Delete a document
export const deleteDoc = async (id: string) => {
  const response = await api.delete(`/delete/${id}`);
  return response.data;
};

// Move a document
export const moveDoc = async (id: string, newParentId: string) => {
  const response = await api.patch(`/move/${id}`, { newParentId });
  return response.data;
};
