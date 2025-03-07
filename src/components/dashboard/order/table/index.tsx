/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Eye, Trash2 } from "lucide-react";

import DataTable from "@/components/common/DataTable";
import DataTablePagination from "@/components/common/DataTable/DataTablePagination";
import OrderStatusText from "@/components/common/OrderStatus";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { orderStatusMapping } from "@/data";
import { useDeleteOrder } from "@/hooks/api/orders/useDeleteOrder";
import useDataGrid from "@/hooks/useDataGrid";
import { cn } from "@/lib/utils";
import { Order } from "@/models/order";
import { formatCurrencyVND } from "@/utils/format-currency";
import { formatDate } from "@/utils/format-date";
import { getOrderCode } from "@/utils/helper";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export type Review = {
  name: string;
  rating: number;
  comment: string;
  user: string;
};

interface IProps {
  data: Order[];
}
export function OrderTable({ data }: IProps) {
  const { mutate } = useDeleteOrder({ isAdmin: true });

  const handleDeleteOrder = (id: string) => {
    mutate(id, {
      onSuccess: () => {
        toast.success("Xóa đơn hàng thành công");
      },
      onError: () => {
        toast.error("Xóa đơn hàng thất bại");
      },
    });
  };

  const columns: ColumnDef<Order>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Mã đơn hàng",
      cell: ({ row }) => (
        <Link
          to={`/dashboard/orders/${row.original?._id}`}
          className="text-blue-500 underline"
        >
          <div className="capitalize"> {getOrderCode(row.original?._id)}</div>
        </Link>
      ),
    },
    {
      accessorFn: (row) => row.shippingInfo?.customerName,
      id: "customerName",
      header: "Tên khách hàng",
      cell: ({ row }) => (
        <div className="lowercase">
          {row.original?.shippingInfo?.customerName}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Ngày đặt hàng",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {formatDate(row.original?.createdAt)}
          </div>
        );
      },
    },
    {
      accessorKey: "totalPrice",
      header: "Tổng tiền",
      cell: ({ row }) => {
        return (
          <b className="font-medium">
            {formatCurrencyVND(row.original?.totalPrice)}
          </b>
        );
      },
    },
    {
      accessorKey: "orderStatus",
      header: "Trạng thái",
      cell: ({ row }) => {
        return (
          <Badge
            variant="outline"
            className={cn("font-medium", {
              "border-green-500": row.original?.isPaid,
              "border-slate-500": !row.original?.isPaid,
            })}
          >
            {orderStatusMapping[row.original.orderStatus as string] ||
              row.original.orderStatus}
          </Badge>
        );
      },
    },
    {
      accessorKey: "isPaid",
      header: "Thanh toán",
      cell: ({ row }) => {
        return row.original?.isPaid ? (
          <OrderStatusText classNames="text-green-500" status="Đã thanh toán" />
        ) : (
          <OrderStatusText status={"Chưa thanh toán"} />
        );
      },
    },

    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="">Thao tác</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-3">
            <Link
              to={`/dashboard/orders/${row.original._id}`}
              className={buttonVariants({ size: "icon", variant: "outline" })}
            >
              <Eye />
            </Link>

            <Button
              variant={"outline"}
              size="icon"
              onClick={() => handleDeleteOrder(row.original._id)}
            >
              <Trash2 className="size-4 text-red-500" />
            </Button>
          </div>
        );
      },
    },
  ];

  const { table } = useDataGrid(columns, data);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm kiếm theo tên khách hàng"
          value={
            (table.getColumn("customerName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("customerName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Cột <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {(column.columnDef.header as string) || ""}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className={cn("text-sm text-muted-foreground opacity-0 pb-2 -mt-2", {
          "opacity-1": table.getFilteredSelectedRowModel().rows.length > 0,
        })}
      >
        Đã chọn {table.getFilteredSelectedRowModel().rows.length} hàng (
        {table.getFilteredRowModel().rows.length} hàng tổng cộng)
      </div>

      <div className="border rounded-md">
        <DataTable table={table} columns={columns} />
      </div>
      <div className="flex justify-between items-center py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
