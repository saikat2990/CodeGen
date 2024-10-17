import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import LocalStorageCRUD from "@/lib/local-storage-crud";

// Define the schema for our form data
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  pageType: z.string({
    required_error: "Please select a page type.",
  }),
  serviceName: z.string({
    required_error: "Please select a service name.",
  }),
});

// Infer the types from our schema
type FormData = z.infer<typeof formSchema>;

// Define the type for our data items
interface DataItem extends FormData {
  id: number;
}

export type ApplicationPage = DataItem;

// Mock data for page types and service names
const pageTypes = ["ListView", "FormView"];
const serviceNames = ["GetEmployee", "GetProduct"];

const CrudPage: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      pageType: "",
      serviceName: "",
    },
  });

  useEffect(() => {
    // Load application_pages when component mounts
    setData(LocalStorageCRUD.getItems<DataItem>("application_pages"));
  }, []);

  const addData = (name: string, pageType: string, serviceName: string) => {
    const newData: DataItem = { id: Date.now(), name, pageType, serviceName };
    LocalStorageCRUD.setItem("application_pages", newData);
    setData([...data, newData]);
  };

  const updateUser = (
    id: number,
    name: string,
    pageType: string,
    serviceName: string
  ) => {
    const updatedUser: DataItem = { id, name, pageType, serviceName };
    LocalStorageCRUD.setItem("application_pages", updatedUser);
    setData(
      data.map((datum: DataItem) => (datum.id === id ? updatedUser : datum))
    );
  };

  const deleteData = (id: number) => {
    LocalStorageCRUD.deleteItem("application_pages", id);
    setData(data.filter((datum: DataItem) => datum.id !== id));
  };

  const onSubmit = (values: FormData) => {
    if (editingId !== null) {
      updateUser(editingId, values.name, values.pageType, values.serviceName);
      setEditingId(null);
    } else {
      addData(values.name, values.pageType, values.serviceName);
    }
    form.reset();
    setIsSheetOpen(false);
  };

  const handleEdit = (item: DataItem) => {
    setEditingId(item.id);
    form.reset(item);
    setIsSheetOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteData(id);
  };

  return (
    <div className="container mx-auto p-4 sm:pl-64">
      <h1 className="text-2xl font-bold mb-4">Application Pages</h1>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            onClick={() => {
              setEditingId(null);
              form.reset();
            }}
          >
            Create New Data
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="min-w-[50%] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>
              {editingId !== null ? "Edit Data" : "Create New Data"}
            </SheetTitle>
            <SheetDescription>
              Fill in the form to {editingId !== null ? "update" : "create"}{" "}
              data.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 py-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a page type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pageTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service name" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {serviceNames.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter>
                <Button type="submit">Submit</Button>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>

      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Page Type</TableHead>
              <TableHead>Service Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.pageType}</TableCell>
                <TableCell>{item.serviceName}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CrudPage;
