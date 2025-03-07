/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loading } from "@/components/common/Loading";
import Tiptap from "@/components/common/Tiptap";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetCategories } from "@/hooks/api/categories/useGetCategories";
import { useMutationProduct } from "@/hooks/api/products/useMutationProduct";
import useCloudinaryUpload from "@/hooks/useCloudinaryUpload";
import useVisibility from "@/hooks/useVisibility";
import { Category } from "@/models/category";
import { methodType } from "@/models/common";
import { Product, ProductDto, ProductSchema } from "@/models/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, PlusIcon, Trash2, UploadIcon, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IProps {
  productId: string;
  data: Product;
}

const UpdateProduct: React.FC<IProps> = ({ productId, data }) => {
  const form = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: data.name,
      image: data.image,
      shortDescription: data.shortDescription,
      price: data.price,
      description: data.description,
      countInStock: data.countInStock,
      category: data.category?._id,
      sizes: data.sizes.map((item, index) => ({
        id: index + 1,
        size: item.size,
        quantity: item.quantity,
      })),
    },
  });

  const { isVisible, toggleVisibility } = useVisibility(false);

  const { control, watch, setValue } = form;

  const { isPending, mutate: updateProduct } = useMutationProduct();

  const onSubmit = (data: ProductDto) => {
    const payload = {
      type: "update" as methodType,
      data: {
        ...data,
        sizes: data.sizes.map((item) => ({
          size: item.size,
          quantity: item.quantity,
        })),
        id: productId,
      },
    };
    updateProduct(payload as any, {
      onSuccess: () => {
        toast.success("Cập nhật sản phẩm thành công");
      },
      onSettled: () => {
        toggleVisibility();
      },
      onError: () => {
        toast.error("Cập nhật sản phẩm thất bại");
      },
    });
  };
  const { data: categories } = useGetCategories();

  const handleOpenChange = () => {
    toggleVisibility();
    form.reset();
  };
  const { isUploading, uploadedUrl, uploadImage } = useCloudinaryUpload();
  const { fields, replace, append } = useFieldArray({
    name: "sizes",
    control: control,
  });

  const addNewSize = () => {
    append({ id: fields.length + 1, size: "", quantity: 1 });
  };
  const deleteSize = (id: number) => {
    const newSizes = fields.filter((item) => item.id !== id);
    replace(newSizes);
  };
  const sizes = watch("sizes");

  const totalQuantity = sizes.reduce((total, item) => total + item.quantity, 0);

  setValue("countInStock", totalQuantity);

  return (
    <Dialog open={isVisible} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {productId ? (
          <Button variant={"outline"} size="icon">
            <Pencil className="size-4" />
          </Button>
        ) : (
          <Button>Thêm sản phẩm</Button>
        )}
      </DialogTrigger>
      <DialogContent
        style={{ maxWidth: "70vw" }}
        className="p-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="p-4">
          <DialogTitle>Sửa sản phẩm</DialogTitle>
          <DialogDescription className="hidden">Sửa sản phẩm</DialogDescription>
        </DialogHeader>
        <ScrollArea className="p-0 h-[calc(100vh-100px)]">
          <div className="gap-4 grid px-4 pb-4">
            <Form {...form}>
              <form
                className="space-y-2 md:space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">
                        Tên sản phẩm
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Tên sản phẩm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">
                        Mô tả ngắn
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">
                        Danh mục
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn danh mục sản phẩm" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((item: Category) => (
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">
                        Mô tả sản phẩm
                      </FormLabel>
                      <FormControl>
                        <Tiptap {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">
                        Giá sản phẩm
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Giá sản phẩm"
                          type="number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(Number(e.target.value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <div className="flex justify-between items-center">
                    <span>Thêm Size & số lượng</span>
                    <Button
                      size="icon"
                      variant={"outline"}
                      type="button"
                      onClick={addNewSize}
                    >
                      <PlusIcon />
                    </Button>
                  </div>
                  <div className="ml-8">
                    {fields.map((item, index) => {
                      return (
                        <div key={item.id}>
                          <div className="flex flex-row items-end gap-3">
                            <FormField
                              control={form.control}
                              key={item.id}
                              name={`sizes.${index}.size`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Size</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage className="text-red-500 capitalize" />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              key={item.id + 1}
                              name={`sizes.${index}.quantity`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Số lượng</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      onChange={(e) => {
                                        field.onChange(Number(e.target.value));
                                      }}
                                      type="number"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-red-500 capitalize" />
                                </FormItem>
                              )}
                            />
                            <Button
                              size="icon"
                              type="button"
                              variant={"outline"}
                              onClick={() => deleteSize(item.id)}
                            >
                              <Trash2 className="text-red-500" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <FormField
                  control={control}
                  name="countInStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">
                        Tổng số lượng
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          placeholder="Tổng số lượng"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block mb-2 font-medium text-gray-900 dark:text-white text-sm">
                        Hình ảnh
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập url hình ảnh" {...field} />
                      </FormControl>
                      <FormMessage />
                      <div className="flex justify-center items-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="relative flex flex-col justify-center items-center bg-gray-50 hover:bg-gray-100 dark:hover:bg-gray-600 dark:bg-gray-700 border-2 border-gray-300 dark:hover:border-gray-500 dark:border-gray-600 border-dashed rounded-lg w-full h-48 cursor-pointer"
                        >
                          {field.value && (
                            <Button
                              type="button"
                              variant="outline"
                              className="top-2 right-2 absolute p-0"
                              size={"icon"}
                              onClick={() => field.onChange("")}
                            >
                              <X className="size-4" />
                            </Button>
                          )}

                          <div className="flex flex-col justify-center items-center pt-5 pb-6 w-full h-48">
                            {isUploading ? (
                              <Loading />
                            ) : field.value ? (
                              <img
                                src={field.value}
                                alt="image"
                                className="w-[200px] h-[200px] object-cover" // Fixed dimensions
                              />
                            ) : (
                              <>
                                <UploadIcon />
                                <p className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                                  <span className="font-semibold">
                                    Chọn hình ảnh
                                  </span>
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-xs">
                                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                              </>
                            )}
                          </div>
                          <FormControl>
                            <Input
                              id="dropzone-file"
                              type="file"
                              placeholder="Hình ảnh"
                              className="hidden"
                              onChange={async (e) => {
                                await uploadImage(e.target.files);
                                field.onChange(e.target.files);
                                if (!isUploading) {
                                  field.onChange(uploadedUrl);
                                }
                              }}
                            />
                          </FormControl>
                        </label>
                      </div>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">{isPending ? <Loading /> : "Lưu"}</Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProduct;
