export const navList = [
  { id: 1, name: "Trang chủ", url: "/" },
  { id: 3, name: "Danh mục", subMenu: true },
  { id: 2, name: "Giới thiệu", url: "/about" },
  { id: 4, name: "Liên hệ", url: "/contact" },
];

export const paymentMethods = [
  {
    id: 1,
    name: "Thanh toán khi nhận hàng (COD)",
    value: "cod",
    icon: "/icons/payment-cod.png",
  },
  {
    id: 2,
    name: "Thanh toán online",
    value: "pay_online",
    icon: "/icons/payment-card.png",
  },
];

export const ratingOptions = [
  { value: "1", label: "⭐ Chưa tốt" },
  { value: "2", label: "⭐⭐ Cần cải thiện" },
  { value: "3", label: "⭐⭐⭐ Bình thường" },
  { value: "4", label: "⭐⭐⭐⭐ Hài lòng" },
  { value: "5", label: "⭐⭐⭐⭐⭐ Rất hài lòng" },
];

export const defaultSizes = [
  {
    id: 1,
    size: "37",
    quantity: 2,
  },

  {
    id: 2,
    size: "39",
    quantity: 2,
  },

  {
    id: 4,
    size: "41",
    quantity: 2,
  },
];

export const orderStatusMapping: { [key: string]: string } = {
  pending: "Chưa hoàn tất đặt hàng",
  isOrdered: "Đang chờ xử lý",
  isDelivering: "Đang giao hàng",
  isDelivered: "Đã giao hàng",
  isCancelled: "Đã huỷ",
};
