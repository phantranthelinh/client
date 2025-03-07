import { Loading } from "@/components/common/Loading";
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
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Plus } from "lucide-react";
import { methodType } from "@/models/common";

type FormFields = {
  name: string;
  description: string;
};
const schema = z.object({
  name: z.string(),
  description: z.string(),
});

const AddCategory = () => {
  const { isVisible, toggleVisibility } = useVisibility(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { control } = form;
  const { mutate, isPending, error } = useMutationCategory();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const payload = {
      type: "create" as methodType,
      data,
    };
    mutate(payload, {
      onSuccess: () => {
        toast.success("Thêm danh mục sản phẩm thành công");
        form.reset();
      },

      onSettled: () => {
        toggleVisibility();
      },
    });
  };

  if (error && error instanceof AxiosError) {
    toast.error(error?.response?.data.message);
  }

  return (
    <Dialog open={isVisible} onOpenChange={toggleVisibility}>
      <DialogTrigger asChild>
        <Button>
          Thêm
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm danh mục sản phẩm</DialogTitle>
        </DialogHeader>
        <DialogDescription />
        <div className="gap-4 grid py-4">
          <Form {...form}>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                      Tên danh mục sản phẩm
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Tên danh mục sản phẩm" {...field} />
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
                      Mô tả danh mục sản phẩm
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mô tả danh mục sản phẩm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">{isPending ? <Loading /> : "Thêm"}</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
