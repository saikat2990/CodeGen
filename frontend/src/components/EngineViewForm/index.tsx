import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
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
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import FormGenerator from "./FormGenerator";

// Field builder schema
const fieldSchema = z.object({
  type: z.string(),
  name: z.string().min(1, "Field name is required"),
  label: z.string().min(1, "Field label is required"),
  placeholder: z.string().optional(),
  initialValue: z.string().optional(),
  isRequired: z.boolean().optional(),
  isDisabled: z.boolean().optional(),
  col: z.number().min(1).max(12).default(12),
  options: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
});

const formBuilderSchema = z.object({
  formName: z.string().min(1, "Form name is required"),
  fields: z.array(fieldSchema),
});

const fieldTypes = [
  { label: "Text Input", value: "text" },
  { label: "Email", value: "email" },
  { label: "Password", value: "password" },
  { label: "Number", value: "number" },
  { label: "Textarea", value: "textarea" },
  { label: "Select", value: "select" },
  { label: "Date", value: "date" },
];

function EngineViewForm() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [previewForm, setPreviewForm] = React.useState<any>(null);

  const form = useForm({
    resolver: zodResolver(formBuilderSchema),
    defaultValues: {
      formName: "",
      fields: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const onSubmit = (data: any) => {
    setPreviewForm(data);
    setIsDrawerOpen(true);
  };

  const addNewField = () => {
    append({
      name: "",
      type: "",
      label: "",
      placeholder: "",
      initialValue: "",
      isRequired: false,
      isDisabled: false,
      col: 12,
    });
  };

  return (
    <div className="container mx-auto p-8 sm:pl-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="formName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Form Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter form name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            {fields.map((field, index) => (
              <Card key={field.id}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`fields.${index}.type`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field Type</FormLabel>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select field type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {fieldTypes.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`fields.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter field name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`fields.${index}.label`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field Label</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter field label"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`fields.${index}.placeholder`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Field Label</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter field placeholder"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`fields.${index}.col`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Column Width</FormLabel>
                            <Select
                              value={field.value.toString()}
                              onValueChange={(val) =>
                                field.onChange(parseInt(val))
                              }
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select width" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[...Array(12)].map((_, i) => (
                                  <SelectItem
                                    key={i + 1}
                                    value={(i + 1).toString()}
                                  >
                                    {i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="col-span-1 flex items-end">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={addNewField}
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Field
          </Button>

          <Button type="submit" className="w-full">
            Preview Form
          </Button>
        </form>
      </Form>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Form Preview</DrawerTitle>
            <DrawerDescription>
              This is how your form will look
            </DrawerDescription>
          </DrawerHeader>

          {previewForm && (
            <div className="p-4">
              <FormGenerator
                fields={previewForm.fields}
                onSubmit={console.log}
                showSubmitButton={true}
              />
            </div>
          )}

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close Preview</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default EngineViewForm;
