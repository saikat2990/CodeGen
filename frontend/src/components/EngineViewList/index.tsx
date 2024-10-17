import React, { useState, useEffect } from "react";
import DataTable from "@/components/general/DataTable";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TemplateConfig {
  title: string;
  subtitle: string;
  columns: any[];
  searchPlaceholder?: string;
  searchableColumn?: string;
  actions?: {
    label: string;
    items: { label: string; action: string }[];
  };
}

interface EngineViewListProps {
  pageId: string | number;
}

const EngineViewList: React.FC<EngineViewListProps> = ({ pageId }) => {
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState<TemplateConfig | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTemplateAndData = async () => {
      try {
        // Simulate API call for template configuration
        const mockTemplateData: TemplateConfig = {
          title: "Mock Table",
          subtitle: "This is a mock table for testing",
          columns: [
            {
              type: "text",
              fieldName: "id",
              header: "ID",
              enableSorting: true,
              enableHiding: true,
            },
            {
              type: "text",
              fieldName: "name",
              header: "Name",
              enableSorting: true,
              enableHiding: true,
            },
            {
              type: "text",
              fieldName: "name",
              header: "Name",
              enableSorting: true,
              enableHiding: true,
            },
            {
              type: "text",
              fieldName: "name",
              header: "Name",
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
            },
          ],
          searchPlaceholder: "Search by name",
          searchableColumn: "name",
          actions: {
            label: "Actions",
            items: [
              { label: "View", action: "view" },
              { label: "Edit", action: "edit" },
              { label: "Delete", action: "delete" },
            ],
          },
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setTemplate(mockTemplateData);

        // Simulate API call for table data
        const mockTableData = [
          { id: 1, name: "John Doe", email: "john@example.com", amount: 100 },
          { id: 2, name: "Jane Smith", email: "jane@example.com", amount: 200 },
          { id: 3, name: "Bob Johnson", email: "bob@example.com", amount: 300 },
          // Add more mock data as needed
        ];

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(mockTableData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchTemplateAndData();
  }, [pageId]);

  const createColumnsFromJson = (columnDefs: any[]): ColumnDef<any>[] => {
    return columnDefs
      .map((colDef) => {
        switch (colDef.type) {
          case "text":
            return {
              accessorKey: colDef.fieldName,
              header: colDef.header,
              cell: ({ row }) => <div>{row.getValue(colDef.fieldName)}</div>,
              enableSorting: colDef.enableSorting ?? true,
              enableHiding: colDef.enableHiding ?? true,
            };

          case "email":
            return {
              accessorKey: colDef.fieldName,
              header: ({ column }) => (
                <Button
                  variant="ghost"
                  onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                  }
                >
                  {colDef.header}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              ),
              cell: ({ row }) => (
                <div className="lowercase">
                  {row.getValue(colDef.fieldName)}
                </div>
              ),
              enableSorting: colDef.enableSorting ?? true,
              enableHiding: colDef.enableHiding ?? true,
            };

          case "amount":
            return {
              accessorKey: colDef.fieldName,
              header: () => <div className="text-right">{colDef.header}</div>,
              cell: ({ row }) => {
                const amount = parseFloat(row.getValue(colDef.fieldName));
                const formatted = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(amount);
                return (
                  <div className="text-right font-medium">{formatted}</div>
                );
              },
              enableSorting: colDef.enableSorting ?? true,
              enableHiding: colDef.enableHiding ?? true,
            };

          case "actions":
            return {
              id: "actions",
              cell: ({ row }) => (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {template?.actions?.label || "Actions"}
                    </DropdownMenuLabel>
                    {template?.actions?.items.map((item, index) => (
                      <DropdownMenuItem
                        key={index}
                        onClick={() => handleAction(item.action, row.original)}
                      >
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
              enableSorting: false,
              enableHiding: false,
            };

          default:
            return null;
        }
      })
      .filter(Boolean) as ColumnDef<any>[];
  };

  const handleAction = (action: string, rowData: any) => {
    // Implement action handling logic here
    console.log(`Action: ${action}`, rowData);
  };

  if (loading) {
    return (
      <div className="sm:pl-64">
        <Skeleton className="h-8 w-[250px] mb-4" />
        <Skeleton className="h-4 w-[300px] mb-8" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  if (!template) {
    return <div className="sm:pl-64">Error loading template</div>;
  }

  return (
    <div className="sm:pl-64">
      <div className="mb-2 flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {template.title}
          </h2>
          <p className="text-muted-foreground">{template.subtitle}</p>
        </div>
      </div>
      <DataTable
        columns={createColumnsFromJson(template.columns)}
        data={data}
        searchPlaceholder={template.searchPlaceholder}
        searchableColumn={template.searchableColumn}
      />
    </div>
  );
};

export default EngineViewList;
