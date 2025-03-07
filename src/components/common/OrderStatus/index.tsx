import { orderStatusMapping } from "@/data";
import { cn } from "@/lib/utils";

const OrderStatusText = ({
  status = "pending",
  classNames = "",
}: {
  status?: string;
  classNames?: string;
}) => {
  return (
    <div
      className={cn("", classNames, {
        "text-red-500": status === "isCancelled",
        "text-green-500": status === "isDelivered",
      })}
    >
      {orderStatusMapping[status] ?? status}
    </div>
  );
};

export default OrderStatusText;
