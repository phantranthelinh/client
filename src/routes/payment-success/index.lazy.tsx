/* eslint-disable react-hooks/exhaustive-deps */
import MainLayout from "@/components/client/layout";
import Wrapper from "@/components/common/Wrapper";
import { usePaidOrder } from "@/hooks/api/orders/usePaidOrder";
import { PaymentParams } from "@/models/payment";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { MoveRight } from "lucide-react";
import { useEffect } from "react";

export const Route = createLazyFileRoute("/payment-success/")({
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  const search = Route.useSearch() as PaymentParams;

  const orderId = search?.vnp_OrderInfo?.split(":")[1];
  const success = search.vnp_ResponseCode === "00";
  const { mutate: paidOrder } = usePaidOrder(orderId as string);

  useEffect(() => {
    if (success) paidOrder();
  }, [orderId, success]);

  return (
    <MainLayout classNames="min-h-[60vh]">
      <Wrapper>
        <section className="flex flex-col mx-auto p-5 border border-black rounded-lg max-w-[600px]">
          <h1 className="font-bold text-2xl">
            {success ? "Thanh toán thành công!" : "Đặt hàng thành công"}{" "}
          </h1>

          <div className="mt-2 font-bold text-lg">
            {success
              ? "Vui lòng tiếp tục qua trình đặt hàng."
              : " Đơn hàng của bạn đã được đặt thành công."}
          </div>

          <div className="mt-5 text-base">
            Đối với bất kỳ câu hỏi liên quan đến sản phẩm, vui lòng gửi email
            đến
          </div>

          <Link href="mailto:aslinikecontact@nike.com">
            <div className="underline hover:cursor-pointer">
              aslinikecontact@nike.com
            </div>
          </Link>
          <div className="flex justify-between items-center mt-5">
            <Link
              to={success ? `/checkout/${orderId}` : "/orders"}
              className="font-bold underline cursor-pointer"
            >
              Xem đơn hàng của bạn
            </Link>
            <Link
              to="/"
              className="flex gap-2 font-bold underline cursor-pointer"
            >
              Tiếp tục mua sắm
              <MoveRight />
            </Link>
          </div>
        </section>
      </Wrapper>
    </MainLayout>
  );
}
