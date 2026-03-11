import type { Snippet } from "../types/snippest.type";
import { SnippetItem } from "./SnippetItem";

interface SnippetListProps {
  snippets: Snippet[];
  onDelete: (id: string) => void;
  onUpdate: (snippet: Snippet) => void;
}

export const SnippetList = ({
  snippets,
  onDelete,
  onUpdate,
}: SnippetListProps) => {
  if (snippets.length === 0) return <p>No snippets yet.</p>;

  return (
    <div className="flex flex-col gap-3">
      {snippets.map((s) => (
        <SnippetItem
          key={s.id}
          snippet={s}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};
