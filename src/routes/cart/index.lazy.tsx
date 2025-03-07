/* eslint-disable @typescript-eslint/no-explicit-any */
import CartList from "@/components/client/CartList";
import MainLayout from "@/components/client/layout";
import Wrapper from "@/components/common/Wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCreateOrder } from "@/hooks/api/orders/useCreateOrder";
import { deleteFromCart, TCartItem, useCart } from "@/store/cart.store";
import { formatCurrencyVND } from "@/utils/format-currency";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/cart/")({
  component: CartPage,
});

function CartPage() {
  const { cartItems } = useCart();

  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const handleAddCheckoutItem = (cartItemId: string) => {
    const item = cartItems.find((item) => item.cartItemId === cartItemId);
    if (item) {
      const existingItemIndex = selectedItems.findIndex(
        (existingItem) => existingItem?.cartItemId === item.cartItemId
      );

      if (existingItemIndex !== -1) {
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.map((existingItem, index) =>
            index === existingItemIndex
              ? { ...existingItem, quantity: (existingItem.quantity ?? 0) + 1 }
              : existingItem
          )
        );
      } else {
        setSelectedItems((prevSelectedItems) => [
          ...prevSelectedItems,
          { ...item, quantity: item.quantity },
        ]);
      }
    }
  };

  const handleRemoveSelectedItem = (cartItemId: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  const subTotal = useMemo(() => {
    return selectedItems.reduce(
      (total: number, value: { totalPrice: number }) =>
        total + value.totalPrice,
      0
    );
  }, [selectedItems]);

  useEffect(() => {
    setSelectedItems((prevSelectedItems) => {
      return prevSelectedItems.map((checkoutItem) => {
        const cartItem = cartItems.find(
          (item) => item._id === checkoutItem._id
        );
        return cartItem
          ? { ...checkoutItem, quantity: cartItem.quantity }
          : checkoutItem;
      });
    });
  }, [cartItems]);

  const { mutate: createOrder } = useCreateOrder();

  const handleCheckout = () => {
    const orderItems = selectedItems.map((item: TCartItem) => ({
      product: item._id,
      name: item.name,
      image: item.image,
      qty: item.quantity,
      price: item.price,
      size: item.size,
    }));
    const totalPrice = orderItems.reduce(
      (total: number, item: any) => total + item.price * item.qty,
      0
    );

    const dataSubmit = {
      orderItems,
      totalPrice,
    };

    createOrder(dataSubmit, {
      onSuccess: (data) => {
        selectedItems.forEach((item: TCartItem) => {
          deleteFromCart(item.cartItemId);
        });
        navigate({ to: `/checkout/${data._id}` });
      },
      onError: () => {
        toast.error("Đặt hàng thất bại!");
      },
    });
  };

  return (
    <MainLayout>
      <Wrapper>
        {cartItems.length > 0 ? (
          <>
            <div className="mx-auto mt-8 md:mt-0">
              <div className="mb-5 font-semibold text-[28px] md:text-[32px] leading-tight">
                Giỏ hàng của bạn
              </div>
            </div>
            <div className="flex flex-col gap-12 py-10">
              <section className="flex-[2]">
                <CartList
                  cartItems={cartItems}
                  addItem={handleAddCheckoutItem}
                  deleteItem={handleRemoveSelectedItem}
                />
              </section>
              <section className="flex-1">
                <div className="flex justify-between">
                  <Link
                    to="/"
                    className={buttonVariants({
                      variant: "secondary",
                    })}
                  >
                    <ChevronLeft />
                    Tiếp tục mua hàng
                  </Link>
                  <div className="rounded-xl">
                    <table className="mb-4 border border-gray-300 w-full border-collapse">
                      <tbody>
                        <tr>
                          <td className="p-2 border border-gray-300 text-black text-base md:text-lg">
                            Tạm tính
                          </td>
                          <td className="p-2 border border-gray-300 text-black text-base md:text-lg">
                            {formatCurrencyVND(subTotal)}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2 border border-gray-300 text-black text-base md:text-lg">
                            Tổng tiền thanh toán
                          </td>
                          <td className="p-2 border border-gray-300 text-black text-base md:text-lg">
                            {formatCurrencyVND(subTotal)}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <Button
                      onClick={handleCheckout}
                      disabled={selectedItems.length === 0}
                      className="flex justify-center items-center gap-5 bg-black hover:opacity-75 mb-3 py-4 w-full font-medium text-white text-lg active:scale-95 transition-transform"
                    >
                      Tiến hàng thanh toán
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          </>
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

              <span className="font-bold text-xl">
                Giỏ hàng của bạn đang trống
              </span>
              <span className="mt-4 text-center">
                Có vẻ như bạn chưa thêm bất kỳ sản phẩm nào vào giỏ hàng.
                <br />
                Hãy khám phá các danh mục hàng đầu ngay bây giờ.
              </span>

              <Link
                className="bg-black hover:opacity-75 mt-8 mb-3 px-8 py-4 rounded-full font-medium text-white text-lg active:scale-95 transition-transform"
                href="/"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </>
        )}
      </Wrapper>
    </MainLayout>
  );
}
