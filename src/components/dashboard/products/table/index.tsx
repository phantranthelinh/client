/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Trash2 } from "lucide-react";

import DataTable from "@/components/common/DataTable";
import DataTablePagination from "@/components/common/DataTable/DataTablePagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useMutationProduct } from "@/hooks/api/products/useMutationProduct";
import useDataGrid from "@/hooks/useDataGrid";
import { cn } from "@/lib/utils";
import { formatCurrencyVND } from "@/utils/format-currency";
import { toast } from "sonner";
import UpdateProduct from "../UpdateProduct";
import { Product } from "@/models/product";

interface IProps {
  data: Product[];
}
export function ProductTable({ data }: IProps) {
  const { mutate } = useMutationProduct();

  const handleDelete = async (product: Product) => {
    const payload = {
      type: "delete",
      data: product,
    };
    mutate(payload as any, {
      onSuccess: () => {
        toast.success("Xóa sản phẩm thành công!");
      },
      onError: () => {
        toast.error("Xóa sản phẩm thất bại!");
      },
    });
  };
  const columns: ColumnDef<Product>[] = [
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
      accessorKey: "name",
      header: "Tên sản phẩm",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "image",
      header: "Hình ảnh",
      cell: ({ row }) => (
        <div className="lowercase">
          <img
            src={row.getValue("image")}
            className="rounded size-20"
            alt={row.original.name}
          />
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Danh mục sản phẩm",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {row.original.category ? (
              <Badge variant="outline">{row.original.category?.name}</Badge>
            ) : (
              "Chưa có danh mục"
            )}
          </div>
        );
      },
    },

    {
      accessorKey: "price",
      header: "Giá sản phẩm",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));

        const formatted = formatCurrencyVND(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },

    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="">Thao tác</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-3">
            <UpdateProduct
              productId={row.original._id as string}
              data={row.original}
            />
            <Button
              variant={"outline"}
              size="icon"
              onClick={() => handleDelete(row.original)}
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
          placeholder="Tìm kiếm theo tên"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
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
