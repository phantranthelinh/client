import MainLayout from "@/components/client/layout";
import Wrapper from "@/components/common/Wrapper";
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
import { useAuth } from "@/hooks/api/useAuth";
import { useUpdateUser } from "@/hooks/api/users/useUpdateUser";

import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createLazyFileRoute("/profile/")({
  component: ProfilePage,
});
const schema = z.object({
  name: z.string().min(1),
  email: z.string().optional(),
  password: z.string().optional(),
});
function ProfilePage() {
  const { data, logout } = useAuth();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { control } = form;

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("email", data.email);
    }
  }, [data, form]);

  const { mutate: updateUserInfo } = useUpdateUser();

  const handleUpdate = async (data: z.infer<typeof schema>) => {
    updateUserInfo(data, {
      onSuccess: () => {
        toast.success("Cập nhật thành công");
        logout();
      },
      onError: () => {
        toast.error("Cập nhật thất bại");
      },
    });
  };

  return (
    <MainLayout classNames="min-h-[70vh]">
      <Wrapper className="pb-10">
        <h2 className="mb-4 text-2xl">Thông tin của bạn</h2>
        <div className="max-w-screen-md">
          <Form {...form}>
            <form
              className="space-y-2 md:space-y-4"
              onSubmit={form.handleSubmit(handleUpdate)}
            >
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">
                      Họ tên
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Họ tên của bạn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Email của bạn" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Mật khẩu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Cập nhật
              </Button>
            </form>
          </Form>
        </div>
      </Wrapper>
    </MainLayout>
  );
}
