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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePostNotebook } from "@/react-query/notebooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export function NewNotebookPage() {
  const router = useRouter();
  const { mutate: createNotebook, isPending } = usePostNotebook({
    onSuccess: () => {
      toast.success("Notebook successfully created");
      router.push("/");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    createNotebook({
      data: {
        body: {
          name: data.name,
          description: data.description,
        },
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 w-full justify-center items-center max-w-xl m-auto"
      >
        <h1 className="text-2xl font-bold w-full">Create a New Notebook</h1>
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
        <Button
          color="primary"
          type="submit"
          className="w-full mt-4"
          isLoading={isPending}
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
