export const getDiscount = (originalPrice: number, discountedPrice: number) =>
  (((originalPrice - discountedPrice) / originalPrice) * 100).toFixed(2);

export const getOrderCode = (id: string = "") => {
  return `NIK-${id.slice(0, 6)}`;
};

export const isShowCancelOrderButton = (orderStatus?: string) => {
  if (!orderStatus) return false;
  return orderStatus === "isOrdered";
};

export const isShowDeleteOrderButton = (orderStatus?: string) => {
  if (!orderStatus) return false;
  return orderStatus === "isCancelled" || orderStatus === "pending";
};
