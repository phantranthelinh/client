/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, Trash2 } from "lucide-react";

import DataTable from "@/components/common/DataTable";
import DataTablePagination from "@/components/common/DataTable/DataTablePagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useMutationCategory } from "@/hooks/api/categories/useMutationCategory";
import useDataGrid from "@/hooks/useDataGrid";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import UpdateCategory from "../UpdateCategory";
import { Category } from "@/models/category";

interface IProps {
  data?: Category[];
}
export function CategoryTable({ data = [] }: IProps) {
  const { mutate } = useMutationCategory();

  const handleDelete = async (data: Category) => {
    const payload = {
      type: "delete",
      data,
    };
    mutate(payload as any, {
      onSuccess: () => {
        toast.success("Xóa danh mục thành công!");
      },
      onError: () => {
        toast.error("Xóa danh mục thất bại!");
      },
    });
  };
  const columns: ColumnDef<Category>[] = [
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
      header: "Tên danh mục",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },

    {
      accessorKey: "description",
      header: "Mô tả danh mục",
      cell: ({ row }) => {
        return <div className="">{row.getValue("description")}</div>;
      },
    },

    {
      accessorKey: "slug",
      header: "Đường dẫn",
      cell: ({ row }) => {
        return <div className="">{row.getValue("slug")}</div>;
      },
    },

    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="">Thao tác</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-3">
            <UpdateCategory id={row.original._id} data={row.original} />
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
