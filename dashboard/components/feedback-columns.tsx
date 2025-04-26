'use client'

import { ColumnDef } from "@tanstack/react-table"
import { Feedback } from "@/actions/types"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export const columns: ColumnDef<Feedback>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="truncate max-w-[100px]">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "overallSatisfaction",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Overall Satisfaction
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "challengeDifficulty",
    header: "Challenge Difficulty",
  },
  {
    accessorKey: "mentorSupport",
    header: "Mentor Support",
  },
  {
    accessorKey: "favoritePart",
    header: "Favorite Part",
    cell: ({ row }) => {
      const favoritePart = row.getValue("favoritePart") as string
      return <div className="truncate max-w-[200px]">{favoritePart || "N/A"}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Submitted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
] 