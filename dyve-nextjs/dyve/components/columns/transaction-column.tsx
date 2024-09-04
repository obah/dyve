import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { TPaymentStatus, TransactionsData } from "@/lib/types";
import { handleTransactionBadge } from "@/lib/utils";
import { DataTable } from "../ui/data-table";

export const transaction_column: ColumnDef<TransactionsData>[] = [
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
    accessorKey: "id",
    header: () => <div>Tx Id</div>,
  },
  {
    accessorKey: "type",
    header: () => <div>Tx Type</div>,
  },
  {
    accessorKey: "date",
    header: () => <div>Date</div>,
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Badge
          className="capitalize"
          variant={handleTransactionBadge(data.status as TPaymentStatus)}
        >
          {data.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "total",
    header: "Total",
  },
];

{
  /* <DataTable columns={transaction_column} data={dummyTransactions}/> */
}
