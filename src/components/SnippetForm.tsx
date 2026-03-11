import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

import type { SnippetCreate } from "../types/snippest.type";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";

const snippetSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  tags: z.string().min(1, { message: "Tags are required" }),
  type: z.enum(["link", "note", "command"], {
    message: "Type is required",
  }),
});

type FormData = z.infer<typeof snippetSchema>;

interface SnippetFormProps {
  onAdd: (snippet: SnippetCreate) => void;
}

export const SnippetForm = ({ onAdd }: SnippetFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      type: "link",
    },
  });

  const onSubmit = (data: FormData) => {
    const snippet: SnippetCreate = {
      title: data.title,
      content: data.content,
      tags: data.tags?.split(",").map((t) => t.trim()) || [],
      type: data.type,
    };

    onAdd(snippet);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 mb-6"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Content"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="Tags (comma separated)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="note">Note</SelectItem>
                    <SelectItem value="command">Command</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="cursor-pointer">
          Add Snippet
        </Button>
        <Button
          type="button"
          className="cursor-pointer"
          onClick={() => (
            form.clearErrors(),
            form.reset({
              title: "",
              content: "",
              tags: "",
              type: "note",
            })
          )}
        >
          Reset
        </Button>
      </form>
    </Form>
  );
};
