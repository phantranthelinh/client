/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loading } from "@/components/common/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Order } from "@/models/order";
import { formatCurrencyVND } from "@/utils/format-currency";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

const ReviewCheckout = ({
  handleOrder,
  form,
  data,
  isLoading,
}: {
  handleOrder: (data: any) => void;
  form: any;
  data?: Partial<Order>;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-slate-50 px-6 py-4 w-[600px] h-full">
          <h6 className="mb-2 text-lg">{`Đơn hàng (${data?.orderItems?.length}) sản phẩm`}</h6>
          <hr />
          <ScrollArea className="h-[260px]">
            <div className="flex flex-col gap-5 mt-6">
              {data?.orderItems?.map((item: any) => (
                <div className="flex gap-3 mf:gap-5 border-0" key={item?._id}>
                  <div className="relative flex justify-center items-center bg-slate-100 border rounded-lg w-[120px]">
                    <img src={item?.image} alt={item?.name} />
                    <Badge className="-top-2 -right-2 absolute px-2 rounded-full text-[10px]">
                      {item.qty}
                    </Badge>
                  </div>
                  <div className="flex flex-col justify-between w-full">
                    <div className="font-bold text-base">{item?.name}</div>
                    <div className="text-md">Size: {item?.size}</div>
                  </div>
                  <div className="flex flex-col justify-end">
                    <div className="text-md">
                      {formatCurrencyVND(item?.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex flex-col gap-3 mt-6 text-base">
            <div className="flex justify-between">
              <span>Tạm tính </span>
              <span className="font-bold">
                {formatCurrencyVND(data?.totalPrice)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span className="font-bold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Tổng cộng</span>
              <span className="font-bold">
                {formatCurrencyVND(data?.totalPrice)}
              </span>
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between items-center w-full">
            <Link href="/cart" className="flex items-center">
              <ChevronLeft className="size-4" />
              Quay về giỏ hàng
            </Link>
            <Button onClick={form.handleSubmit(handleOrder)} className="mt-4">
              Đặt hàng
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCheckout;
