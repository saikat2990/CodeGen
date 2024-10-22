// types.ts
interface Pagination {
  pageNumber: number;
  pageSize: number;
}

interface Search {
  value: string;
  operator: string;
  fields: string[];
}

interface Sort {
  fieldName: string;
  direction: string;
}

interface AppComponent {
  id: number;
  moduleId: number;
  name: string;
  templateName: string;
  serviceName: string;
  entryFunc: string;
  pageType: string;
  pageLayout: string;
  isActive: boolean;
}

interface Model<T> {
  dataRow: T;
  totalRwCount: number;
}

interface ApiResponse<T> {
  model: Model<T>;
  success: boolean;
  message: string | null;
}

// api.ts
import axios from "axios";

const instance = axios.create({
  baseURL: "http://18.153.101.31:5000",
  timeout: 30000,
  validateStatus: (status) => status === 200,
});

const api = {
  getList: async (params: {
    pagination: Pagination;
    search: Search;
    sort: Sort;
  }): Promise<ApiResponse<AppComponent[]>> => {
    const response = await instance.post("/api/AppComponent/GetList", params);
    return response.data;
  },

  getById: async (id: number): Promise<ApiResponse<AppComponent>> => {
    const response = await instance.get(`/api/AppComponent/GetById/${id}`);
    return response.data;
  },

  addOrUpdate: async (
    data: AppComponent
  ): Promise<ApiResponse<AppComponent>> => {
    const response = await instance.post("/api/AppComponent/AddOrUpdate", data);
    return response.data;
  },

  delete: async (idList: number[]): Promise<ApiResponse<void>> => {
    const response = await instance.post("/api/AppComponent/Delete", {
      idList,
    });
    return response.data;
  },
};

// AppComponentPage.tsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
// const formSchema = z.object({
//   id: z.number(),
//   moduleId: z.number(),
//   name: z.string().min(1, "Name is required"),
//   templateName: z.string().min(1, "Template name is required"),
//   serviceName: z.string().min(1, "Service name is required"),
//   entryFunc: z.string(),
//   pageType: z.string(),
//   pageLayout: z.string(),
//   isActive: z.boolean(),
// });

const AppComponentPage: React.FC = () => {
  const { toast } = useToast();

  const [data, setData] = useState<AppComponent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [pagination, setPagination] = useState<Pagination>({
    pageNumber: 1,
    pageSize: 10,
  });
  const [sort, setSort] = useState<Sort>({
    fieldName: "name",
    direction: "asc",
  });
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<AppComponent | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      moduleId: 0,
      name: "",
      templateName: "",
      serviceName: "",
      entryFunc: "",
      pageType: "",
      pageLayout: "",
      isActive: true,
    },
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.getList({
        pagination: {
          pageNumber: pagination.pageNumber - 1,
          pageSize: pagination.pageSize,
        },
        search: {
          value: searchValue,
          operator: "contains",
          fields: ["name", "templateName"],
        },
        sort,
      });

      console.debug(response);

      if (response.success) {
        setData(response.model.dataRow);
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch data",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pagination, sort, searchValue]);

  const handleSort = (fieldName: string) => {
    setSort((prev) => ({
      fieldName,
      direction:
        prev.fieldName === fieldName && prev.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const handleEdit = async (id: number) => {
    window.alert("we are in edit");

    return;
    /*try {
      const response = await api.getById(id);
      console.debug(response);

      if (response.success) {
        setSelectedItem(response.model);
        form.reset(response.model);
        setIsEditDrawerOpen(true);
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to fetch item",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to fetch item",
        variant: "destructive",
      });
    }*/
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await api.delete([id]);
        if (response.success) {
          toast({
            title: "Success",
            description: "Item deleted successfully",
          });
          fetchData();
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to delete item",
            variant: "destructive",
          });
        }
      } catch (error: unknown) {
        console.error(error);

        toast({
          title: "Error",
          description: "Failed to delete item",
          variant: "destructive",
        });
      }
    }
  };

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    console.debug(formData);

    try {
      const response = await api.addOrUpdate(formData);
      if (response.success) {
        toast({
          title: "Success",
          description: "Item saved successfully",
        });
        setIsEditDrawerOpen(false);
        fetchData();
        form.reset();
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to save item",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      console.error(error);

      toast({
        title: "Error",
        description: "Failed to save item",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 sm:pl-64">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search..."
          className="max-w-sm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          onClick={() => {
            setSelectedItem(null);
            form.reset();
            setIsEditDrawerOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> New Item
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name <ArrowUpDown className="ml-2 h-4 w-4 inline" />
              </TableHead>
              <TableHead>Template Name</TableHead>
              <TableHead>Service Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.templateName}</TableCell>
                <TableCell>{item.serviceName}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(item.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDrawerOpen} onOpenChange={setIsEditDrawerOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedItem ? "Edit Item" : "Create New Item"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="templateName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Template Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pageType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select page type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="List">List</SelectItem>
                        <SelectItem value="Detail">Detail</SelectItem>
                        <SelectItem value="Form">Form</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppComponentPage;
