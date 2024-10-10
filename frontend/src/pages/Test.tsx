import DataTable from "@/components/general/DataTable";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// A method that will take JSON input and create column definitions
export const createColumnsFromJson = (columnDefs: any[]): ColumnDef<any>[] => {
  return columnDefs
    .map((colDef) => {
      switch (colDef.type) {
        // case "select":
        //   return {
        //     id: "select",
        //     header: ({ table }) => (
        //       <Checkbox
        //         checked={
        //           table.getIsAllPageRowsSelected() ||
        //           (table.getIsSomePageRowsSelected() && "indeterminate")
        //         }
        //         onCheckedChange={(value) =>
        //           table.toggleAllPageRowsSelected(!!value)
        //         }
        //         aria-label="Select all"
        //       />
        //     ),
        //     cell: ({ row }) => (
        //       <Checkbox
        //         checked={row.getIsSelected()}
        //         onCheckedChange={(value) => row.toggleSelected(!!value)}
        //         aria-label="Select row"
        //       />
        //     ),
        //     enableSorting: colDef.enableSorting ?? false,
        //     enableHiding: colDef.enableHiding ?? false,
        //   };

        case "text":
          return {
            accessorKey: colDef.accessorKey,
            header: colDef.header,
            cell: ({ row }) => <div>{row.getValue(colDef.accessorKey)}</div>,
            enableSorting: colDef.enableSorting ?? true,
            enableHiding: colDef.enableHiding ?? true,
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
            enableSorting: colDef.enableSorting ?? true,
            enableHiding: colDef.enableHiding ?? true,
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
            enableSorting: colDef.enableSorting ?? true,
            enableHiding: colDef.enableHiding ?? true,
          };

        case "actions":
          return {
            id: "actions",
            header: () => <div className="text-left">Actions</div>,
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
            enableSorting: colDef.enableSorting ?? false,
            enableHiding: colDef.enableHiding ?? false,
          };

        default:
          return null;
      }
    })
    .filter(Boolean); // Filter out any undefined or null values
};

const Test: React.FC = () => {
  const json = {
    title: "Test Title",
    subtitle: "Test Subtitle",
    columns: [
      // {
      //   type: "select",
      //   enableSorting: false,
      //   enableHiding: false,
      // },
      {
        type: "text",
        accessorKey: "id",
        header: "Code",
        enableSorting: true,
        enableHiding: true,
      },
      {
        type: "text",
        accessorKey: "status",
        header: "Status",
        enableSorting: true,
        enableHiding: true,
      },
      {
        type: "email",
        accessorKey: "email",
        header: "Email",
        enableSorting: true,
        enableHiding: true,
      },
      {
        type: "amount",
        accessorKey: "amount",
        header: "Amount",
        enableSorting: true,
        enableHiding: true,
      },
      {
        type: "actions",
        enableSorting: false,
        enableHiding: false,
      },
    ],
    data: [
      {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@yahoo.com",
      },
      {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@gmail.com",
      },
      {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@gmail.com",
      },
      {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
      },
      {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
      },
    ],
    searchPlaceholder: "Search email",
    searchableColumn: "email",
  };

  return (
    <div className="sm:pl-64">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{json.title}</h2>
          <p className="text-muted-foreground">{json.subtitle}</p>
        </div>
      </div>
      <DataTable
        columns={createColumnsFromJson(json.columns)}
        data={json.data}
        searchPlaceholder={json.searchPlaceholder}
        searchableColumn={json.searchableColumn}
      />
    </div>
  );
};

export default Test;
