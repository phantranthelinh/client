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
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1).max(255),
  password: z.string().min(6).max(255),
});
const RegisterForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { control } = form;
  const { register } = useAuth();
  const router = useRouter();
  const onSubmit = (data: z.infer<typeof schema>) => {
    register(data, {
      onSuccess: () => {
        toast.success("Đăng ký thành công!");
        router.navigate({
          to: "/login",
        });
      },
      onError() {
        toast.error("Đăng ký thất bại!");
      },
    });
  };
  return (
    <div className="dark:border-gray-700 bg-white dark:bg-gray-800 shadow md:mt-0 xl:p-0 dark:border rounded-lg w-full sm:max-w-md">
      <div className="space-y-4 md:space-y-6 p-6 sm:p-8">
        <h1 className="font-bold text-gray-900 text-xl md:text-2xl dark:text-white leading-tight tracking-tight">
          Đăng ký
        </h1>
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
                  <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Email của bạn" {...field} />
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
                  <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                    Mật khẩu
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Mật khẩu" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              Đăng ký
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
