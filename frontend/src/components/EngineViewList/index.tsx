import React, { useState } from "react";
import DataTable from "@/components/general/DataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import { useMoodToggle } from "@/hooks/useMoodToggle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ColumnType = "text" | "email" | "amount" | "actions";

interface BaseColumnDefinition {
  type: ColumnType;
  header: string;
  enableSorting?: boolean;
  enableHiding?: boolean;
}

interface DataColumnDefinition extends BaseColumnDefinition {
  type: "text" | "email" | "amount";
  fieldName: string;
}

interface ActionsColumnDefinition extends BaseColumnDefinition {
  type: "actions";
}

type ColumnDefinition = DataColumnDefinition | ActionsColumnDefinition;

interface DataItem {
  id: string;
  amount: string;
  status: string;
  email: string;
  [key: string]: string;
}

interface JsonData {
  title: string;
  subtitle: string;
  columns: ColumnDefinition[];
  data: DataItem[];
  searchPlaceholder: string;
  searchableColumn: keyof DataItem;
}

export const createColumnsFromJson = (
  columnDefs: ColumnDefinition[],
  onEdit: (item: DataItem) => void,
  onDelete: (id: string) => void
): ColumnDef<DataItem>[] => {
  return columnDefs
    .map((colDef): ColumnDef<DataItem> | null => {
      switch (colDef.type) {
        case "text":
        case "email":
          return {
            accessorKey: colDef.fieldName,
            header: colDef.header,
            cell: ({ row }: { row: Row<DataItem> }) => <div>{row.getValue(colDef.fieldName)}</div>,
            enableSorting: colDef.enableSorting ?? true,
            enableHiding: colDef.enableHiding ?? true,
          };
        case "amount":
          return {
            accessorKey: colDef.fieldName,
            header: () => <div className="text-right">{colDef.header}</div>,
            cell: ({ row }: { row: Row<DataItem> }) => {
              const amount = parseFloat(row.getValue(colDef.fieldName));
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
            header: () => <div className="text-left">{colDef.header}</div>,
            cell: ({ row }: { row: Row<DataItem> }) => {
              const item = row.original;
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
                      onClick={() => navigator.clipboard.writeText(item.id)}
                    >
                      Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onEdit(item)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(item.id)}>
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
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
    .filter((col): col is ColumnDef<DataItem> => col !== null);
};

interface EngineViewListProps {
  name: string;
}

const EngineViewList: React.FC<EngineViewListProps> = ({ name }) => {
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [jsonData, setJsonData] = useState<JsonData>({
    title: "Test Title",
    subtitle: "Test Subtitle",
    columns: [
      {
        type: "text",
        fieldName: "id",
        header: "Code",
        enableSorting: true,
        enableHiding: true,
      },
      {
        type: "text",
        fieldName: "status",
        header: "Status",
        enableSorting: true,
        enableHiding: true,
      },
      {
        type: "email",
        fieldName: "email",
        header: "Email",
        enableSorting: true,
        enableHiding: true,
      },
      {
        type: "amount",
        fieldName: "amount",
        header: "Amount",
        enableSorting: true,
        enableHiding: true,
      },
      {
        type: "actions",
        header: "Actions",
        enableSorting: false,
        enableHiding: false,
      },
    ],
    data: [
      {
        id: "m5gr84i9",
        amount: "316",
        status: "success",
        email: "ken99@yahoo.com",
      },
      {
        id: "3u1reuv4",
        amount: "242",
        status: "success",
        email: "Abe45@gmail.com",
      },
      {
        id: "derv1ws0",
        amount: "837",
        status: "processing",
        email: "Monserrat44@gmail.com",
      },
      {
        id: "5kma53ae",
        amount: "874",
        status: "success",
        email: "Silas22@gmail.com",
      },
      {
        id: "bhqecj4p",
        amount: "721",
        status: "failed",
        email: "carmella@hotmail.com",
      },
    ],
    searchPlaceholder: "Search taka",
    searchableColumn: "amount",
  });
  const [newColumnName, setNewColumnName] = useState("");
  const { mood } = useMoodToggle();
  const isZenMood = mood === "zen";

  const handleEdit = (item: DataItem) => {
    setEditingItem(item);
    setIsEditSheetOpen(true);
  };

  const handleDelete = (id: string) => {
    // Implement delete functionality
    console.log("Delete item with id:", id);
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement edit submission logic here
    console.log("Edited item:", editingItem);
    setIsEditSheetOpen(false);
    setEditingItem(null);
  };

  const handleAddColumn = () => {
    if (newColumnName.trim() === "") return;

    const newColumn: DataColumnDefinition = {
      type: "text",
      fieldName: newColumnName.toLowerCase(),
      header: newColumnName,
      enableSorting: true,
      enableHiding: true,
    };

    const updatedColumns = [...jsonData.columns, newColumn];
    const updatedData = jsonData.data.map(item => ({
      ...item,
      [newColumn.fieldName]: ""
    }));

    setJsonData({
      ...jsonData,
      columns: updatedColumns,
      data: updatedData,
    });

    setNewColumnName("");
  };

  return (
    <div className="p-8 sm:pl-96">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
          <p className="text-muted-foreground">{jsonData.subtitle}</p>
        </div>
        {isZenMood && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Add Column</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Add New Column</h4>
                  <p className="text-sm text-muted-foreground">
                    Enter the name for the new column.
                  </p>
                </div>
                <div className="grid gap-2">
                  <Input
                    id="newColumn"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    placeholder="Enter column name"
                  />
                  <Button onClick={handleAddColumn}>Add Column</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <DataTable
        columns={createColumnsFromJson(jsonData.columns, handleEdit, handleDelete)}
        data={jsonData.data}
        searchPlaceholder={jsonData.searchPlaceholder}
        searchableColumn={jsonData.searchableColumn}
      />

      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent side="right" className="w-[50%] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Edit Item</SheetTitle>
            <SheetDescription>
              Make changes to the item here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
            {editingItem &&
              Object.entries(editingItem).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <label htmlFor={key} className="text-sm font-medium">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <Input
                    id={key}
                    value={value}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        [key]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            <SheetFooter>
              <Button type="submit">Save changes</Button>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EngineViewList;