import { z } from "zod";
import { Category } from "./category";
import { Review } from "./review";

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "Vui lòng nhập trường này" }),
  image: z.string().url({ message: "Không đúng định dạng url" }),
  shortDescription: z.optional(z.string()),
  images: z.optional(z.array(z.string())),
  price: z.number().min(1, { message: "Vui lòng nhập trường này" }),
  sizes: z.array(z.object({ size: z.string(), quantity: z.number() })),
  description: z.string(),
  countInStock: z.number(),
  category: z.string().min(1, { message: "Vui lòng chọn danh mục" }),
});
export type ProductDto = z.infer<typeof ProductSchema> & {
  _id?: string;
  id?: string;
  slug?: string;
};
export type Product = {
  _id?: string;
  id?: string;
  rating: number;
  numReviews: number;
  reviews: Review[];
  createdAt?: string;
  updatedAt?: string;
  category: Category;
} & ProductDto;
