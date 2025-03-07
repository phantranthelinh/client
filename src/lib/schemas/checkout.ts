import { z } from "zod";

const message = "Vui lòng nhập vào trường này";
export const CheckoutSchema = z.object({
  customerName: z.string().min(1, { message }),
  email: z.string().email().min(1, { message }),
  phoneNumber: z.string().min(1, { message }),
  province: z.string().min(1, { message: "Vui lòng chọn tỉnh" }),
  district: z.string().min(1, { message: "Vui lòng chọn huyện" }),
  ward: z.string().min(1, { message: "Vui lòng chọn xã" }),
  address: z.string(),
  paymentMethod: z.string(),
});

export type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;
