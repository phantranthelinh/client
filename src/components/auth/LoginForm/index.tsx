import { ApiError } from "@/app/api";
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
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const schema = z.object({
  email: z.string().email().min(1).max(255),
  password: z.string().min(6).max(255),
});
const LoginForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const { control } = form;
  const { login } = useAuth();
  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof schema>) => {
    login(data, {
      onSuccess: () => {
        toast({
          title: "Thành công",
          description: "Đăng nhập thành công!",
        });
      },
      onError(error) {
        setErrorMessage((error as unknown as ApiError).response.data.message);
      },
    });
  };
  return (
    <div className="dark:border-gray-700 bg-white dark:bg-gray-800 shadow md:mt-0 xl:p-0 dark:border rounded-lg w-full sm:max-w-md">
      <div className="space-y-4 md:space-y-6 p-6 sm:p-8">
        <h1 className="font-bold text-gray-900 text-xl md:text-2xl dark:text-white leading-tight tracking-tight">
          Đăng nhập
        </h1>
        <span className="mt-0 p-0 text-base text-red-500">{errorMessage}</span>
        <Form {...form}>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-2 font-medium text-gray-900 text-sm dark:text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập địa chỉ email" {...field} />
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
                    <Input
                      placeholder="Nhập mật khẩu"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 border rounded focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 w-4 h-4"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Ghi nhớ
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="font-medium text-primary-600 text-sm dark:text-primary-500 hover:underline"
              >
                Quên mật khẩu?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              Đăng nhập
            </Button>
            <div className="mt-0">
              Bạn chưa có tài khoản?
              <Link className="ml-2" to="/register">
                Đăng ký
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
