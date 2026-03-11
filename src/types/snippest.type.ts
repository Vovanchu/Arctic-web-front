export type SnippetType = "link" | "note" | "command";

export interface SnippetData {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Snippet {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
  createdAt: string;
  updatedAt: string;
}

export interface SnippetCreate {
  title: string;
  content: string;
  tags: string[];
  type: SnippetType;
}
