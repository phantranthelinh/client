import MainLayout from "@/components/client/layout";
import Address from "@/components/common/Address";
import { Loading } from "@/components/common/Loading";
import Wrapper from "@/components/common/Wrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAddress } from "@/hooks/api/address/useCreateAddress";
import { useDeleteAddress } from "@/hooks/api/address/useDeleteAddress";
import { useUpdateAddress } from "@/hooks/api/address/useUpdateAddress";
import useGetDistrict from "@/hooks/api/provinces/useGetDistricts";
import useGetProvinces from "@/hooks/api/provinces/useGetProvinces";
import useGetWards from "@/hooks/api/provinces/useGetWards";
import { useGetUserAddress } from "@/hooks/api/users/useGetUserAddress";
import useVisibility from "@/hooks/useVisibility";
import { AddressSchema, TAddress } from "@/models/address";
import { District, Province, Ward } from "@/models/province";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createLazyFileRoute("/my-address/")({
  component: MyAddress,
});

function MyAddress() {
  const form = useForm<z.infer<typeof AddressSchema>>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      addressLine: "",
      province: "",
      district: "",
      ward: "",
      isDefault: false,
    },
  });
  const { control, watch } = form;

  const { data: provinces } = useGetProvinces();

  const provinceId = watch("province");
  const districtId = watch("district");

  const { data: districts } = useGetDistrict(provinceId);
  const { data: wards } = useGetWards(districtId);

  const { data: addresses, isLoading } = useGetUserAddress();

  const { isVisible, setIsVisible, toggleVisibility } = useVisibility(false);

  const [addressId, setAddressId] = useState("");

  const handleSelectAddress = (address: TAddress) => {
    setIsVisible(true);
    form.setValue("addressLine", address.addressLine);
    setAddressId(address._id);
    form.setValue("province", address.province._id);
    form.setValue("district", address.district._id);
    form.setValue("ward", address.ward._id);
    form.setValue("isDefault", address.isDefault);
  };

  const { mutate: updateAddress } = useUpdateAddress();
  const { mutate: createAddress } = useCreateAddress();
  const { mutate: deleteAddress } = useDeleteAddress();

  const handleSave = () => {
    if (addressId) {
      updateAddress({ _id: addressId, ...form.getValues() });
    } else {
      createAddress(form.getValues());
    }
  };

  const handleDelete = () => {
    deleteAddress(addressId, {
      onSuccess: () => {
        toast.success("Xóa địa chỉ thành công");
      },
      onError: () => {
        toast.error("Xóa địa chỉ thất bại");
      },
    });
  };

  return (
    <MainLayout>
      <Wrapper>
        <div className="flex lg:flex-row flex-col gap-8">
          <div className="flex-none w-[500px]">
            <h2 className="mb-4 text-xl">Địa chỉ </h2>
            {isLoading ? (
              <Loading />
            ) : (
              <ScrollArea className="max-h-[400px]">
                <div className="flex flex-col gap-2 mr-4">
                  {addresses?.length === 0 && <p>Chưa cập nhật</p>}
                  {addresses?.map((address: TAddress) => {
                    return (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleSelectAddress(address)}
                        key={address?._id}
                      >
                        <Address
                          data={address}
                          classNames={`${addressId === address._id ? "border-2 border-gray-700" : ""} ${address.isDefault ? "bg-black/[0.05]" : ""}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            )}

            <Button
              className="mt-4"
              onClick={() => {
                toggleVisibility();
                form.reset();
                setAddressId("");
              }}
              variant={"outline"}
            >
              Thêm mới địa chỉ
            </Button>
          </div>
          {isVisible && (
            <div className="flex flex-col flex-1 gap-4">
              <Form {...form}>
                <FormField
                  control={control}
                  name="addressLine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">
                        Địa chỉ
                      </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Địa chỉ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="gap-4 grid grid-cols-3">
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
                            disabled={!districtId}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            value={field.value}
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
                    name="isDefault"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <div className="peer-disabled:opacity-70 font-medium text-slate-500 text-sm leading-none peer-disabled:cursor-not-allowed">
                              Chọn làm địa chỉ mặc định
                            </div>
                          </div>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>
              <div className="flex justify-between">
                <Button className="max-w-32" onClick={handleSave}>
                  {addressId ? "Cập nhật" : "Thêm"} địa chỉ
                </Button>
                {addressId && (
                  <Button
                    className="max-w-32"
                    onClick={handleDelete}
                    variant={"destructive"}
                  >
                    Xoá địa chỉ
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    </MainLayout>
  );
}
