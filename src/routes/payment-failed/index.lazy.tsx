import MainLayout from "@/components/client/layout";
import Wrapper from "@/components/common/Wrapper";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/payment-failed/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout classNames="min-h-[60vh]">
      <Wrapper>
        <section className="flex flex-col mx-auto p-5 border border-black rounded-lg max-w-[600px]">
          <h1 className="font-bold text-2xl">Thanh Toán Thất Bại!</h1>
          <div className="mt-5 text-base">
            Đối với bất kỳ câu hỏi liên quan đến sản phẩm, vui lòng gửi email
            đến
          </div>
          <Link href="mailto:aslinikecontact@nike.com">
            <div className="underline hover:cursor-pointer">
              aslinikecontact@nike.com
            </div>
          </Link>

          <Link href="/" className="mt-5 font-bold cursor-pointer">
            Tiếp tục mua sắm
          </Link>
        </section>
      </Wrapper>
    </MainLayout>
  );
}
