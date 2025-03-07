/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useMutationCategory } from "@/hooks/api/categories/useMutationCategory";
import useVisibility from "@/hooks/useVisibility";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Category } from "@/models/category";
import { methodType } from "@/models/common";

const schema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

interface IProps {
  id: string;
  data: Category;
}

const UpdateCategory: React.FC<IProps> = ({ id, data }) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  const { isVisible, toggleVisibility } = useVisibility();

  const { control } = form;

  const { mutate: updateCategory } = useMutationCategory();

  const onSubmit = (data: z.infer<typeof schema>) => {
    const payload = {
      type: "update" as methodType,
      data: { ...data, id },
    };
    updateCategory(payload as any, {
      onSuccess: () => {
        toast.success("Cập nhật danh mục thành công");
      },
    });
  };

  return (
    <Dialog open={isVisible} onOpenChange={toggleVisibility}>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="icon">
          <Pencil className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sửa danh mục</DialogTitle>
        </DialogHeader>
        <DialogDescription />

        <div className="gap-4 grid py-4">
          <Form {...form}>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={form.handleSubmit(onSubmit as any)}
            >
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Tên danh mục
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Tên danh mục" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Mô tả danh mục
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Mô tả danh mục" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Cập nhật</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategory;
