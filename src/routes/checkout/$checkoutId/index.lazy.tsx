import CheckoutForm from "@/components/client/checkout/CheckoutForm";
import ReviewCheckout from "@/components/client/checkout/ReviewCheckout";
import { useUpdateOrder } from "@/hooks/api/orders/useCreateOrder";
import { useGetOrder } from "@/hooks/api/orders/useGetOrder";
import { useAuth } from "@/hooks/api/useAuth";
import { CheckoutSchema, CheckoutSchemaType } from "@/lib/schemas/checkout";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/checkout/$checkoutId/")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const form = useForm({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phoneNumber: "",
      province: "",
      district: "",
      ward: "",
      address: "",
      paymentMethod: "cod",
    },
  });

  const { data } = useAuth();

  useEffect(() => {
    if (data) {
      form.setValue("customerName", data.name);
      form.setValue("email", data.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const { checkoutId } = Route.useParams();

  const { mutate: updateOrder } = useUpdateOrder(checkoutId);

  const navigate = useNavigate();

  const { isLoading, data: order } = useGetOrder(checkoutId);

  const handleOrder = async (formData: CheckoutSchemaType) => {
    const dataSubmit = {
      shippingInfo: {
        customerName: formData.customerName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        province: formData.province,
        district: formData.district,
        ward: formData.ward,
        address: formData.address,
      },
      paymentMethod: formData.paymentMethod,
    };

    updateOrder(dataSubmit, {
      onSuccess: () => {
        console.log("thanh cong");
        form.reset();
        toast.success("Đặt hàng thành công");
        navigate({
          to: "/payment-success",
        });
      },
      onError: () => {
        toast.error("Đặt hàng thất bại!");
        navigate({
          to: "/payment-failed",
        });
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex w-full max-w-screen-xl">
        <CheckoutForm form={form} orderData={order} />
        <ReviewCheckout
          form={form}
          handleOrder={handleOrder}
          data={order}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
