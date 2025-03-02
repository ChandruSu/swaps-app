"use client";

import { useEffect, useState } from "react";
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
import { fetchItems, fetchItemsByUser, fetchItemsByTags, Item } from "@/app/api/lib/api";
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
  useEffect(() => {fetchData()}, [selectedTag])

  async function fetchData(){
    let res;
    if (selectedTag) {
      res =  await fetchItemsByTags([selectedTag]);
    } else if (viewingUser) {
      res = await fetchItemsByUser(viewingUser);
    } else {
      res = await fetchItems();
    }
    console.log(res)
    alert(res)
  }
  

  // const table = useReactTable({
  //   data: res,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   onSortingChange: setSorting,
  //   getSortedRowModel: getSortedRowModel(),
  //   onColumnFiltersChange: setColumnFilters,
  //   getFilteredRowModel: getFilteredRowModel(),
  //   state: { sorting, columnFilters },
  // });

  return (
    <div className="container mx-auto py-10">
      {/* Filters & Controls */}

      {/* Add Item Dialog */}
      {/* <ItemDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} /> */}
    </div>
  );
}