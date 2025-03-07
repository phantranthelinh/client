import { Order } from "@/models/order";
import { formatCurrencyVND } from "@/utils/format-currency";
import { Link } from "@tanstack/react-router";

const OrderItems = ({ data }: { data: Order["orderItems"] }) => {
  return (
    <div>
      <div className="mb-4 font-bold text-2xl">Sản phẩm</div>
      <table className="rtl:text-right w-full text-gray-500 text-left text-sm dark:text-gray-400">
        <thead className="bg-gray-50 dark:bg-gray-700 text-base text-gray-700 dark:text-gray-400 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Tên sản phẩm
            </th>
            <th scope="col" className="px-6 py-3">
              Đơn giá
            </th>
            <th scope="col" className="px-6 py-3">
              Số lượng
            </th>
            <th scope="col" className="px-6 py-3">
              Size
            </th>
            <th scope="col" className="px-6 py-3">
              Tổng
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: Order["orderItems"][0]) => (
            <tr
              key={item._id}
              className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 border-b"
            >
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                <Link
                  className="text-blue-500 underline"
                  to={`/products/${item?.product.slug}`}
                >
                  {item.name}
                </Link>
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {formatCurrencyVND(item.price)}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {item.qty}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {item.size}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
              >
                {formatCurrencyVND(item.price * item.qty)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderItems;
