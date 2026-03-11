import { useEffect, useState, useMemo } from "react";
import type { Snippet, SnippetCreate } from "./types/snippest.type";
import { SnippetForm } from "./components/SnippetForm";
import { SnippetList } from "./components/SnippetList";
import { SnippetFilter } from "./components/SnippetFilter";
import { Loader } from "./components/Loader";

import {
  createSnippet,
  deleteSnippetAPI,
  fetchSnippets,
  updateSnippetAPI,
} from "./api/snippets";

function App() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSnippets();
        setSnippets(data);
      } catch {
        setError("Failed to load snippets. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const addSnippet = async (snippet: SnippetCreate) => {
    try {
      const newSnippetFromServer = await createSnippet(snippet);

      const newSnippet: Snippet = {
        id: newSnippetFromServer._id,
        title: newSnippetFromServer.title,
        content: newSnippetFromServer.content,
        tags: newSnippetFromServer.tags,
        type: newSnippetFromServer.type,
        createdAt: newSnippetFromServer.createdAt,
        updatedAt: newSnippetFromServer.updatedAt,
      };

      setSnippets((prev) => [newSnippet, ...prev]);
    } catch {
      setError("Failed to create snippet.");
    }
  };

  const deleteSnippet = async (id: string) => {
    try {
      await deleteSnippetAPI(id);
      setSnippets((prev) => prev.filter((s) => s.id !== id));
    } catch {
      setError("Failed to delete snippet.");
    }
  };

  const updateSnippet = async (updated: Snippet) => {
    try {
      const updatedSnippetFromServer = await updateSnippetAPI(
        updated.id,
        updated,
      );

      const updatedSnippet: Snippet = {
        id: updatedSnippetFromServer._id,
        title: updatedSnippetFromServer.title,
        content: updatedSnippetFromServer.content,
        tags: updatedSnippetFromServer.tags,
        type: updatedSnippetFromServer.type,
        createdAt: updatedSnippetFromServer.createdAt,
        updatedAt: updatedSnippetFromServer.updatedAt,
      };

      setSnippets((prev) =>
        prev.map((s) => (s.id === updatedSnippet.id ? updatedSnippet : s)),
      );
    } catch {
      setError("Failed to update snippet.");
    }
  };

  const tags = useMemo(() => {
    const allTags = snippets.flatMap((s) => s.tags);
    return [...new Set(allTags)];
  }, [snippets]);

  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      const matchesSearch =
        snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        snippet.content.toLowerCase().includes(search.toLowerCase());

      const matchesTag = tag ? snippet.tags.includes(tag) : true;

      return matchesSearch && matchesTag;
    });
  }, [snippets, search, tag]);

  if (loading) return <Loader />;

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Snippet Vault</h1>

      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <SnippetForm onAdd={addSnippet} />

      <SnippetFilter
        search={search}
        setSearch={setSearch}
        tag={tag}
        setTag={setTag}
        tags={tags}
      />

      <SnippetList
        snippets={filteredSnippets}
        onDelete={deleteSnippet}
        onUpdate={updateSnippet}
      />
    </div>
  );
}

export default App;
