import DataTable from "@/components/general/DataTable";

export const createColumnsFromJson = (columnDefs: any[]): ColumnDef<any>[] => {
  return columnDefs
    .map((colDef) => {
      switch (colDef.type) {
        case "select":
          return {
            id: "select",
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                  table.toggleAllPageRowsSelected(!!value)
                }
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
          };

        case "text":
          return {
            accessorKey: colDef.accessorKey,
            header: colDef.header,
            cell: ({ row }) => <div>{row.getValue(colDef.accessorKey)}</div>,
          };

        case "email":
          return {
            accessorKey: colDef.accessorKey,
            header: ({ column }) => {
              return (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  {colDef.header}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              );
            },
            cell: ({ row }) => (
              <div className="lowercase">
                {row.getValue(colDef.accessorKey)}
              </div>
            ),
          };

        case "amount":
          return {
            accessorKey: colDef.accessorKey,
            header: () => <div className="text-right">{colDef.header}</div>,
            cell: ({ row }) => {
              const amount = parseFloat(row.getValue(colDef.accessorKey));
              const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(amount);

              return <div className="text-right font-medium">{formatted}</div>;
            },
          };

        case "actions":
          return {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
              const payment = row.original;
              return (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => navigator.clipboard.writeText(payment.id)}
                    >
                      Copy payment ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View customer</DropdownMenuItem>
                    <DropdownMenuItem>View payment details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            },
          };

        default:
          return null;
      }
    })
    .filter(Boolean); // Filter out any undefined or null values
};

const Test: React.FC = () => {
  return (
    <div className="sm:pl-64">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
      </div>
      {/* <div className="flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0"> */}
      <DataTable />
      {/* </div> */}
    </div>
  );
};

export default Test;
