import { Order } from "@/models/order";

const ShippingAddress = ({ data }: { data: Order }) => {
  return (
    <div className="flex flex-col flex-none gap-4 w-full max-w-[300px]">
      <div className="space-y-2">
        <div className="font-bold text-2xl">Thông tin khách hàng</div>
        <div></div>
        <div>{data?.user?.name}</div>
        <div>{data?.user?.email}</div>
      </div>
      <div className="font-bold text-2xl">Thông tin vận chuyển</div>
      <div className="space-y-2">
        <div>Số điện thoại: {data?.shippingInfo?.phoneNumber}</div>
        <div>Địa chỉ: {data?.shippingInfo?.address}</div>
        <div>{data?.shippingInfo?.ward.name}</div>
        <div>{data?.shippingInfo?.district.name}</div>
        <div>{data?.shippingInfo?.province.name}</div>
      </div>
    </div>
  );
};

export default ShippingAddress;
