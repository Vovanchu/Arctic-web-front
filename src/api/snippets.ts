import axios from "axios";
import type { SnippetData, SnippetCreate } from "../types/snippest.type";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const fetchSnippets = async () => {
  const res = await axios.get<SnippetData[]>(`${API_URL}/snippets`);

  return res.data.map((s) => ({
    id: s._id,
    title: s.title,
    content: s.content,
    tags: s.tags,
    type: s.type,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  }));
};

export const createSnippet = async (data: SnippetCreate) => {
  const res = await axios.post<SnippetData>(`${API_URL}/snippets`, data);
  return res.data;
};

export const deleteSnippetAPI = async (id: string) => {
  await axios.delete(`${API_URL}/snippets/${id}`);
};

export const updateSnippetAPI = async (
  id: string,
  data: Partial<SnippetData>,
) => {
  const res = await axios.put<SnippetData>(`${API_URL}/snippets/${id}`, data);
  return res.data;
};
