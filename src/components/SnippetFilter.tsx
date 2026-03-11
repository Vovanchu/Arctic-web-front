type Props = {
  search: string;
  setSearch: (v: string) => void;
  tag: string;
  setTag: (v: string) => void;
  tags: string[];
};

export const SnippetFilter = ({
  search,
  setSearch,
  tag,
  setTag,
  tags,
}: Props) => {
  return (
    <div className="flex gap-4 mb-6">
      <input
        className="border p-2 flex-1"
        placeholder="Search snippets..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      >
        <option value="">All tags</option>

        {tags.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
    </div>
  );
};
