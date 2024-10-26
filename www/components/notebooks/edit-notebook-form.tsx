"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormLabel,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TagInput } from "@/components/ui/tag-input";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).optional(),
});

export default function EditNotebookForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      tags: [],
    },
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "Notebook successfully created",
      description: `Name: ${data.name}, Tags: ${data.tags
        ?.map((tag) => tag)
        .join(", ")}`,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 w-full justify-center items-center max-w-xl m-auto"
      >
        <h1 className="text-2xl font-bold w-full">Edit Notebook</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagInput
                  tags={field.value || []}
                  setTags={(newTags) => field.onChange(newTags)}
                />
              </FormControl>
            </FormItem>
          )}
        /> */}
        <Button color="primary" type="submit" className="w-full mt-4">
          Create
        </Button>
      </form>
    </Form>
  );
}
