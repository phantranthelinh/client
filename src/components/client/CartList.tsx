/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteFromCart, TCartItem, updateCart } from "@/store/cart.store";
import { formatCurrencyVND } from "@/utils/format-currency";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

interface CartListProps {
  cartItems: TCartItem[];
  addItem: (id: any) => void;
  deleteItem: (id: string) => void;
}
const CartList = ({ cartItems, addItem, deleteItem }: CartListProps) => {
  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border-2 border-gray-300 p-2 w-[50px]">Chọn</th>
            <th className="border-2 border-gray-300 p-2">Ảnh sản phẩm</th>
            <th className="border-2 border-gray-300 p-2">Tên sản phẩm</th>
            <th className="border-2 border-gray-300 p-2">Size</th>
            <th className="border-2 border-gray-300 p-2">Số lượng</th>
            <th className="border-2 border-gray-300 p-2">Đơn giá</th>
            <th className="border-2 border-gray-300 p-2 w-[50px]">Xoá</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item: any) => (
            <CartItem
              key={item.cartItemId}
              data={item}
              addItem={addItem}
              deleteItem={deleteItem}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

const CartItem = ({
  data,
  addItem,
  deleteItem,
}: {
  data: TCartItem;
  addItem: (id: string) => void;
  deleteItem: (id: string) => void;
}) => {
  const updateCartItem = (e: any, key: any) => {
    const payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      cartItemId: data.cartItemId,
    };
    updateCart(payload.cartItemId, payload.key, payload.val);
  };
  return (
    <tr>
      <td className="border-2 border-gray-300 p-2 text-center">
        <div className="flex justify-center items-center">
          <Checkbox
            onCheckedChange={(state) => {
              if (state) {
                addItem(data.cartItemId);
              } else {
                deleteItem(data.cartItemId);
              }
            }}
          />
        </div>
      </td>
      <td className="border-2 border-gray-300 p-2 text-center">
        <div className="flex justify-center items-center">
          <Link
            href={`/products/${data?.slug}`}
            className="border-2 bg-slate-200 w-[100px] h-[100px]"
          >
            <img
              src={data?.image}
              alt={data?.name}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </td>
      <td className="border-2 border-gray-300 p-2 text-center">
        <h2 className="text-black/[.8] text-lg md:text-xl">{data?.name}</h2>
      </td>
      <td className="border-2 border-gray-300 p-2 text-center">{data.size}</td>
      <td className="border-2 border-gray-300 p-2 text-center">
        <div className="flex items-center gap-2 md:gap-6 text-gray-600 text-sm md:text-md">
          <div className="flex justify-center items-center gap-3 w-full">
            <Button
              size="icon"
              variant="outline"
              onClick={() =>
                updateCartItem(
                  { target: { value: data.quantity - 1 } },
                  "quantity"
                )
              }
              disabled={data.quantity <= 1}
            >
              <Minus />
            </Button>
            <span className="font-medium text-lg">{data.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                updateCartItem(
                  { target: { value: data.quantity + 1 } },
                  "quantity"
                )
              }
            >
              <Plus />
            </Button>
          </div>
        </div>
      </td>
      <td className="border-2 border-gray-300 p-2 text-center">
        <h3 className="mt-2 font-bold text-md">
          {formatCurrencyVND(data?.price)}
        </h3>
      </td>
      <td className="border-2 border-gray-300 p-2 text-center">
        <Button
          size="icon"
          variant="outline"
          onClick={() => deleteFromCart(data.cartItemId)}
        >
          <Trash2 className="text-red-500 size-5" />
        </Button>
      </td>
    </tr>
  );
};

export default CartList;
