import { useState } from "react";
import type { Snippet, SnippetType } from "../types/snippest.type";
import { Button } from "./components/ui/button";

interface SnippetItemProps {
  snippet: Snippet;
  onDelete: (id: string) => void;
  onUpdate: (snippet: Snippet) => void;
}

export const SnippetItem = ({
  snippet,
  onDelete,
  onUpdate,
}: SnippetItemProps) => {
  const [editing, setEditing] = useState(false);

  const [title, setTitle] = useState(snippet.title);
  const [content, setContent] = useState(snippet.content);
  const [type, setType] = useState<SnippetType>(snippet.type);
  const [tags, setTags] = useState(snippet.tags.join(", "));

  const [copied, setCopied] = useState(false);

  const save = () => {
    const updatedSnippet: Snippet = {
      ...snippet,
      title,
      content,
      type,
      tags: tags.split(",").map((t) => t.trim()),
      updatedAt: new Date().toISOString(),
    };

    onUpdate(updatedSnippet);
    setEditing(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(snippet.content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const typeColor =
    {
      note: "bg-blue-100 text-blue-700",
      link: "bg-purple-100 text-purple-700",
      command: "bg-green-100 text-green-700",
    }[snippet.type] || "bg-gray-100 text-gray-700";

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-3 shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-start">
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full mr-4"
          />
        ) : (
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-lg">{snippet.title}</h2>

            <span
              className={`text-xs px-2 py-1 rounded w-fit font-medium ${typeColor}`}
            >
              {snippet.type}
            </span>
          </div>
        )}

        <div className="flex gap-2 text-sm">
          <Button
            className="text-green-500 hover:text-gray-700 cursor-pointer"
            onClick={copy}
          >
            {copied ? "Copied ✓" : "Copy"}
          </Button>
          <Button
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => setEditing(!editing)}
          >
            {editing ? "Cancel" : "Edit"}
          </Button>
          <Button
            className="text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => onDelete(snippet.id)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Type */}
      {editing && (
        <select
          value={type}
          onChange={(e) => setType(e.target.value as SnippetType)}
          className="border p-2 rounded w-40"
        >
          <option value="note">note</option>
          <option value="link">link</option>
          <option value="command">command</option>
        </select>
      )}

      {/* Tags */}
      {editing ? (
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="border p-2 rounded"
          placeholder="tag1, tag2"
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {snippet.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Content */}
      {editing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded"
          rows={4}
        />
      ) : snippet.type === "command" ? (
        <pre className="bg-neutral-900 text-green-400 p-4 rounded text-sm font-mono overflow-x-auto">
          <code>
            <span className="text-gray-400">$ </span>
            {snippet.content}
          </code>
        </pre>
      ) : snippet.type === "link" ? (
        <a
          href={snippet.content}
          target="_blank"
          className="text-blue-600 underline break-all"
        >
          {snippet.content}
        </a>
      ) : (
        <p className="text-gray-800 whitespace-pre-wrap">{snippet.content}</p>
      )}

      {editing && (
        <Button
          className="bg-green-500 hover:bg-green-600 text-white"
          onClick={save}
        >
          Save changes
        </Button>
      )}
    </div>
  );
};
