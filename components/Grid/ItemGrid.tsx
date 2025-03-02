"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { fetchItems, fetchItemsByUser, fetchItemsByTags, Item } from "@/app/api/lib/api"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ItemDialog from "./ItemDialog";
import ItemCard from "./ItemCard";
import { columns } from "./ItemColumns";

export default function ItemGrid() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedTag, setSelectedTag] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<string | null>(null);

  // Fetch items
  const { data: items, isLoading, error } = useQuery<Item[]>({
    queryKey: ["items", selectedTag, viewingUser],
    queryFn: async () => {
      if (selectedTag) {
        return await fetchItemsByTags([selectedTag]);
      } else if (viewingUser) {
        return await fetchItemsByUser(viewingUser);
      } else {
        return await fetchItems();
      }
    },
  });

  const table = useReactTable({
    data: items || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
  });

  return (
    <div className="container mx-auto py-10">
      {/* Filters & Controls */}
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Marketplace Items</h1>
        <div className="flex items-center space-x-4">
          <Select onValueChange={setSelectedTag} value={selectedTag}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Tags</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Search items..."
            className="max-w-sm"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
          />

          <Button onClick={() => setIsDialogOpen(true)}>Add Item</Button>
        </div>
      </div>

      {/* Loading and Error Handling */}
      {isLoading && <div className="text-center py-4">Loading items...</div>}
      {error && <div className="text-center text-red-500 py-4">Error loading items</div>}

      {/* Grid View */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => <ItemCard key={row.original.id} item={row.original} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">No items found.</div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>

      {/* Add Item Dialog */}
      <ItemDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}
