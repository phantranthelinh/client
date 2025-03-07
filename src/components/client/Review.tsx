/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAddReview } from "@/hooks/api/reviews/useAddReview";
import { useGetReviews } from "@/hooks/api/reviews/useGetReviews";
import { feedBackSchema, FeedbackType } from "@/lib/schemas/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useParams } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import Message from "../common/Error/Message";
import Rating from "../common/Rating";
import moment from "moment";
import { useAuth } from "@/hooks/api/useAuth";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ratingOptions } from "@/data";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const Review = () => {
  const form = useForm({
    resolver: zodResolver(feedBackSchema),
    defaultValues: {
      rating: "",
      comment: "",
    },
  });

  const {
    control,
    formState: { isDirty, isValid },
  } = form;

  const { productName } = useParams({
    from: "/products/$productName/",
  });
  const { isAuthenticated } = useAuth();

  const { mutate: addReview } = useAddReview(productName);
  const handleReview: SubmitHandler<FeedbackType> = (data: FeedbackType) => {
    addReview(data, {
      onSuccess: () => {
        form.reset();
        toast.success("Đánh giá thành công");
      },
      onError: () => {
        toast.error("Đánh giá thất bại");
      },
    });
  };

  const { data: reviews } = useGetReviews(productName);

  return (
    <div>
      <div className="my-5 row">
        <div className="col-md-6">
          <h6 className="mb-3">BÌNH LUẬN</h6>
          {reviews?.length === 0 && (
            <Message variant={"alert-info mt-3"}>Không có đánh giá</Message>
          )}
          {reviews?.map((review: any) => {
            return (
              <div
                key={review._id}
                className="bg-light shadow-sm mb-5 mb-md-3 p-3 rounded"
              >
                <div className="my-2 font-bold text-base">
                  {review?.user?.name} - {review?.user?.email}
                </div>

                <Rating rating={review.rating} />
                <span>{moment(review.createdAt).calendar()}</span>
                <div className="mt-3 alert alert-info">{review?.comment}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-8">
          <h5>THÊM ĐÁNH GIÁ</h5>
          {isAuthenticated ? (
            <Form {...form}>
              <form
                className="space-y-2"
                onSubmit={form.handleSubmit(handleReview)}
              >
                <FormField
                  control={control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đánh giá</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Chọn đánh giá" />
                          </SelectTrigger>
                          <SelectContent>
                            {ratingOptions.map((option) => {
                              return (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bình luận</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="my-3">
                  <Button disabled={!isDirty && !isValid}>Đăng</Button>
                </div>
              </form>
            </Form>
          ) : (
            <div className="my-3">
              <Message variant={"alert-warning"}>
                Vui lòng{" "}
                <Link to="/login">
                  " <strong>Đăng nhập</strong> "
                </Link>{" "}
                để thêm đánh giá{" "}
              </Message>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
