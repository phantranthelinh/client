/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { paymentMethods } from "@/data";
import useGetDistrict from "@/hooks/api/provinces/useGetDistricts";
import useGetProvinces from "@/hooks/api/provinces/useGetProvinces";
import useGetWards from "@/hooks/api/provinces/useGetWards";
import { useAuth } from "@/hooks/api/useAuth";
import { cn } from "@/lib/utils";
import { Order } from "@/models/order";
import { District, Province, Ward } from "@/models/province";
import { Link } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import moment from "moment-timezone";
import * as forge from "node-forge";
import * as qs from "qs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";
import OrderStatusText from "@/components/common/OrderStatus";
const CheckoutForm = ({
  form,
  orderData,
}: {
  form: any;
  orderData?: Partial<Order>;
}) => {
  const { control, watch, setValue } = form;

  const { data: provinces } = useGetProvinces();
  const { isLogged } = useAuth();

  const provinceId = watch("province");
  const districtId = watch("district");

  const { data: districts } = useGetDistrict(provinceId);
  const { data: wards } = useGetWards(districtId);

  function sortObject(obj: any) {
    return Object.entries(obj)
      .sort(([key1], [key2]) => key1.toString().localeCompare(key2.toString()))
      .reduce((result, item: any) => {
        result = {
          ...result,
          [item[0]]: encodeURIComponent(item[1].toString().replace(/ /g, "+")),
        };

        return result;
      }, {});
  }

  const generatePaymentUrl = () => {
    const vnpTmnCode = "1VYBIYQP"; // VNPay Merchant Code
    const vnpHashSecret = "NOH6MBGNLQL9O9OMMFMZ2AX8NIEP50W1"; // VNPay Hash Secret
    const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"; // VNPay URL
    const vnpReturnUrl = "http://localhost:5173/payment-success"; // Return URL

    const vnpCreateDate = moment
      .tz("Asia/Ho_Chi_Minh")
      .format("YYYYMMDDHHmmss"); // VN timezone

    const vnpExpireDate = moment
      .tz("Asia/Ho_Chi_Minh")
      .add(15, "minutes")
      .format("YYYYMMDDHHmmss"); // Expire +15m

    const orderId = orderData?._id ?? moment().format("DDHHmmss"); // Unique transaction ID
    const vnpParams = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: vnpTmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,

      vnp_Amount: (orderData?.totalPrice ?? 50000) * 100,
      vnp_OrderInfo: `Thanh toan cho maGD:${orderId}`,
      vnp_OrderType: "other",
      vnp_ReturnUrl: vnpReturnUrl,
      vnp_IpAddr: "127.0.0.1",
      vnp_BankCode: "VNBANK",
      vnp_CreateDate: vnpCreateDate,
      vnp_ExpireDate: vnpExpireDate,
    };
    // Sort parameters
    const sortedVnpParams = sortObject(vnpParams);

    // Create query string
    const vnpParamsString = qs.stringify(sortedVnpParams, { encode: false });

    // Generate HMAC-SHA512 hash using `forge`
    const hmac = forge.hmac.create();
    hmac.start("sha512", vnpHashSecret);
    hmac.update(vnpParamsString);
    const hashValue = hmac.digest().toHex();

    // Construct final payment URL
    const paymentUrl = `${vnpUrl}?${vnpParamsString}&vnp_SecureHash=${hashValue}`;

    window.open(paymentUrl, "_blank");
  };

  if (orderData?.isPaid) {
    setValue("paymentMethod", "pay_online");
  }

  return (
    <div className="pr-6 w-full">
      <Link href="/" className="flex mb-4">
        <img
          src="/logo.svg"
          alt="nike-logo"
          width={60}
          height={60}
          className="w-[40px] md:w-[60px]"
        />
      </Link>
      <div className="flex justify-between items-center max-w-[400px]">
        <h2 className="text-xl">Thông tin nhận hàng</h2>
        {!isLogged && (
          <Link href="/login" className="flex items-center gap-1">
            <UserRound className="size-4" />
            Đăng nhập
          </Link>
        )}
      </div>
      <Form {...form}>
        <form className="mt-4 w-full">
          <div className="flex gap-4">
            <div className="flex-1">
              <FormField
                control={control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên khách hàng</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tỉnh/Thành phố</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.resetField("district");
                          form.resetField("ward");
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                        </SelectTrigger>
                        <SelectContent>
                          {provinces &&
                            provinces.map((item: Province) => (
                              <SelectItem value={item._id} key={item._id}>
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quận/Huyện</FormLabel>
                    <FormControl>
                      <Select
                        disabled={!provinceId}
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.resetField("ward");
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn Quận/Huyện" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts &&
                            districts.map((item: District) => (
                              <SelectItem value={item._id} key={item._id}>
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phường/Xã</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                        disabled={!districtId}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Phường/Xã" />
                        </SelectTrigger>
                        <SelectContent>
                          {wards &&
                            wards.map((item: Ward) => (
                              <SelectItem value={item._id} key={item._id}>
                                {item.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ cụ thể</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-none w-[300px]">
              <FormField
                control={control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thanh toán</FormLabel>
                    {orderData?.isPaid ? (
                      <OrderStatusText
                        classNames="text-green-500"
                        status="Đã thanh toán"
                      />
                    ) : (
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col gap-2"
                        >
                          {paymentMethods.map((method) => (
                            <div key={method.id}>
                              <RadioGroupItem
                                value={method.value}
                                id={method.value}
                                hidden
                              />
                              <Label
                                htmlFor={method.value}
                                onClick={async () => {
                                  if (method.value === "pay_online") {
                                    await generatePaymentUrl();
                                  }
                                }}
                                className={cn(
                                  "flex items-center justify-between  gap-2 p-4 border rounded-lg w-full cursor-pointer",
                                  {
                                    "border-primary":
                                      method.value === field.value,
                                  }
                                )}
                              >
                                <span>{method.name}</span>
                                <img
                                  src={method.icon}
                                  alt={method.name}
                                  className="size-8"
                                />
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    )}

                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
