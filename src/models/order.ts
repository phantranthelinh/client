import { Product } from "./product";

type Province = {
  name: string;
  code: number;
  _id: string;
};

export type Order = {
  shippingInfo: {
    address: string;
    customerName: string;
    phoneNumber: string;
    province: Province;
    district: Province;
    ward: Province;
  };
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: Array<{
    name: string;
    qty: number;
    size: string;
    price: number;
    image: string;
    product: Product;
    _id: string;
  }>;
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  status: boolean;
  orderStatus: string;
};
