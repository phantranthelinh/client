import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
  pageSizes?: number[];
};

const MAX_PAGE_BUTTONS = 4;
export default function DataTablePagination<TData>({
  table,
  pageSizes = [10, 20, 50, 100],
}: DataTablePaginationProps<TData>) {
  const renderPageButtons = () => {
    const totalPages = table.getPageCount();
    const maxPageButtons = MAX_PAGE_BUTTONS;
    const pages = [];

    const startPage = Math.max(
      0,
      Math.min(
        table.getState().pagination.pageIndex - 2,
        totalPages - maxPageButtons
      )
    );
    const endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => table.setPageIndex(i)}
          className={`text-center min-w-8 min-h-8 rounded-md text-sm font-regular leading-5 ${
            table.getState().pagination.pageIndex === i
              ? "bg-slate-800 text-white "
              : "bg-white text-gray-900 "
          }`}
        >
          {i + 1}
        </button>
      );
    }

    return (
      <>
        {startPage > 0 && (
          <>
            <button
              onClick={() => table.setPageIndex(0)}
              className={` text-center min-w-8 min-h-8 p-2 rounded-md text-sm font-regular leading-5 ${
                table.getState().pagination.pageIndex === startPage
                  ? "bg-slate-800 text-white "
                  : "bg-white text-gray-900 "
              }`}
            >
              1
            </button>
            {startPage > 1 && <span className="px-2">...</span>}
          </>
        )}
        {pages}
        {endPage < totalPages - 1 && (
          <>
            {endPage < totalPages - 2 && <span className="px-2">...</span>}
            <button
              onClick={() => table.setPageIndex(totalPages - 1)}
              className={` text-center min-w-8 min-h-8 p-2 rounded-md text-sm font-regular leading-5 ${
                table.getState().pagination.pageIndex === endPage
                  ? "bg-slate-800 text-white "
                  : "bg-white text-gray-900 "
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
      </>
    );
  };

  return (
    <>
      <p className="text-sm leading-5">
        Tổng <b>{table.getRowCount().toLocaleString()}</b> bản ghi
      </p>
      <div className="flex justify-center items-center space-x-2">
        <Button
          variant="outline"
          className="p-0 w-8 h-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        {renderPageButtons()}
        <Button
          variant="outline"
          className="p-0 w-8 h-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(value) => {
          table.setPageSize(Number(value));
        }}
      >
        <SelectTrigger className="focus:ring-0 focus:ring-offset-0 w-[200px]">
          <SelectValue
            placeholder={`Hàng trên mỗi trang: ${table.getState().pagination.pageSize}`}
          />
        </SelectTrigger>
        <SelectContent>
          {pageSizes.map((pageSize) => (
            <SelectItem
              key={pageSize}
              value={`${pageSize}`}
              className="rounded-md"
            >
              <span className="leading-[18px]">Hãng trên một trang: </span>
              <b>{pageSize}</b>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
