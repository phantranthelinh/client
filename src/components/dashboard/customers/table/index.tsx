import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

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
import useDataGrid from "@/hooks/useDataGrid";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format-date";
import { User } from "@/models/user";

interface IProps {
  data: User[];
}
export function CustomerTable({ data }: IProps) {
  const columns: ColumnDef<User>[] = [
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
      header: "Tên khách hàng",
      cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
    },
    {
      id: "customerName",
      header: "Địa chỉ email",
      cell: ({ row }) => <div className="lowercase">{row.original.email}</div>,
    },
    {
      accessorKey: "phoneNumber",
      header: "Số điện thoại",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {row?.original?.phoneNumber ? row?.original?.phoneNumber : "-"}{" "}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Ngày đăng ký",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {formatDate(row.original?.createdAt)}
          </div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Ngày hoạt động gần nhất",
      cell: ({ row }) => {
        return (
          <div className="font-medium">
            {formatDate(row.original?.createdAt)}
          </div>
        );
      },
    },

    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="">Thao tác</div>,
      cell: ({ row }) => {
        return <div className="flex gap-3">-</div>;
      },
    },
  ];

  const { table } = useDataGrid(columns, data);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm kiếm theo tên khách hàng"
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
