import MainLayout from "@/components/client/layout";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
  FormLabel,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createLazyFileRoute("/contact/")({
  component: ContactPage,
});

const FormSchema = z.object({
  content: z.string().min(1),
  phoneNumber: z.string(),
});
function ContactPage() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
      phoneNumber: "",
    },
  });
  return (
    <MainLayout>
      <div className="flex sm:flex-row flex-col sm:justify-center items-center gap-10 px-4 py-6">
        <div className="max-w-[360px]">
          <div className="flex items-center gap-2">
            <Link href="/">
              <img
                src="/logo.svg"
                alt="nike-logo"
                width={60}
                height={60}
                className="w-[40px] md:w-[60px]"
              />
            </Link>
            <span className="font-semibold text-4xl">Sneaker store</span>
          </div>
          <div className="mt-8 font-bold text-2xl leading-10">
            Chúng tôi luôn trân trọng và mong đợi nhận được mọi ý kiến đóng góp
            từ khách hàng để có thể nâng cấp trải nghiệm dịch vụ và sản phẩm tốt
            hơn nữa.
          </div>
          <div className="mt-6">
            <img src="/arrow-right-long.svg" alt="" />
          </div>
        </div>

        <div className="flex flex-col bg-white p-8 rounded-lg">
          <h6 className="font-bold text-[32px] uppercase">Đóng góp ý kiến</h6>
          <div className="space-y-6 mt-6">
            <Form {...form}>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      BẠN CÓ GÌ MUỐN NHẮN NHỦ VỚI NHÀ SNEAKER Ạ?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Hãy nhắn nhủ với nhà Sneaker"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>BẠN CHO HMK XIN SĐT NHÉ ❤️</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: 0901231312" {...field} />
                    </FormControl>
                    <FormDescription>
                      * Vì chắc là Sneaker sẽ cần liên hệ lại trong trường hợp
                      chưa rõ ý kiến của bạn á.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" disabled={!form.formState.isValid}>
                Gửi đi ngay
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
