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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import LocalStorageCRUD from "@/lib/local-storage-crud";
import { ApplicationPage } from "../ApplicationPages";

// Define the schema for our form data
const formSchema = z.object({
  pageId: z.number({
    required_error: "Please select a page ID.",
  }),
  name: z.string({
    required_error: "Name must be defined!",
  }),
  url: z.string({
    required_error: "URL must be defined!",
  }),
});

// Infer the types from our schema
type FormData = z.infer<typeof formSchema>;

// Define the type for our data items
interface DataItem extends FormData {
  id: number;
}

export type ApplicationMenu = DataItem;

const CrudPage: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [pages, setPages] = useState<ApplicationPage[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    // Load application_menus when component mounts
    setData(LocalStorageCRUD.getItems<DataItem>("application_menus"));
    setPages(LocalStorageCRUD.getItems<ApplicationPage>("application_pages"));
  }, []);

  const addData = (payload: DataItem) => {
    const newData: DataItem = { ...payload, id: Date.now() };

    LocalStorageCRUD.setItem("application_menus", newData);

    setData([...data, newData]);
  };

  const updateUser = (payload: DataItem) => {
    const updatedUser: DataItem = { ...payload };

    LocalStorageCRUD.setItem("application_menus", updatedUser);

    setData(
      data.map((datum: DataItem) =>
        datum.id === payload.id ? updatedUser : datum
      )
    );
  };

  const deleteData = (id: number) => {
    LocalStorageCRUD.deleteItem("application_menus", id);

    setData(data.filter((datum: DataItem) => datum.id !== id));
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageId: undefined,
      url: "",
      name: "",
    },
  });

  const onSubmit = (values: FormData) => {
    if (editingId !== null) {
      updateUser({ ...values, id: editingId });
      setEditingId(null);
    } else {
      addData({ ...values, id: 0 });
    }

    form.reset();
    setIsDrawerOpen(false);
  };

  const handleEdit = (item: DataItem) => {
    setEditingId(item.id);
    form.reset(item);

    setIsDrawerOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteData(id);
  };

  return (
    <div className="container mx-auto p-4 sm:pl-64">
      <h1 className="text-2xl font-bold mb-4">Application Menus</h1>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            onClick={() => {
              setEditingId(null);
              form.reset();
            }}
          >
            Create New Data
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {editingId !== null ? "Edit Data" : "Create New Data"}
            </DrawerTitle>
            <DrawerDescription>
              Fill in the form to {editingId !== null ? "update" : "create"}{" "}
              data.
            </DrawerDescription>
          </DrawerHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 p-4"
            >
              <FormField
                control={form.control}
                name="pageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page ID</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a page ID" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pages.map((page: ApplicationPage) => (
                          <SelectItem key={page.id} value={page.id.toString()}>
                            {page.id}
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
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <DrawerFooter>
                <Button type="submit">Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.pageId}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.url}</TableCell>
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
