import MainLayout from "@/components/client/layout";
import OrderList from "@/components/client/OrderList";
import { Loading } from "@/components/common/Loading";
import Wrapper from "@/components/common/Wrapper";
import { useGetOrders } from "@/hooks/api/orders/useGetOrders";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/orders/")({
  component: OrderPage,
});

function OrderPage() {
  const { data, isLoading } = useGetOrders({ isAdmin: false });

  return (
    <MainLayout classNames="justify-start mt-10 min-h-[60vh]">
      <Wrapper className="max-w-screen-xl">
        <div className="font-bold text-2xl">Đơn hàng của bạn</div>
        {isLoading ? (
          <Loading />
        ) : data?.length > 0 ? (
          <OrderList data={data} />
        ) : (
          <>
            <div className="flex flex-col flex-[2] items-center md:-mt-14 pb-[50px]">
              <img
                src="/empty-cart.jpg"
                alt="Empty Cart"
                width={300}
                height={300}
                className="w-[300px] md:w-[400px]"
              />

              <span className="mt-4 text-center">
                Dường như bạn chưa đặt một đơn hàng nào
                <br />
                Hãy khám phá các danh mục hàng đầu.
              </span>

              <Link
                className="bg-black hover:opacity-75 mt-8 mb-3 px-8 py-4 rounded-full font-medium text-white text-lg active:scale-95 transition-transform"
                href="/"
              >
                Hãy bắt đầu mua sắm
              </Link>
            </div>
          </>
        )}
      </Wrapper>
    </MainLayout>
  );
}
