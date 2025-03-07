import { z } from "zod";

export const feedBackSchema = z.object({
  comment: z.string().min(1, { message: "Vui lòng nhập bình luận" }),
  rating: z.string().min(1, { message: "Vui lòng chọn đánh giá" }),
});

export type FeedbackType = z.infer<typeof feedBackSchema>;
