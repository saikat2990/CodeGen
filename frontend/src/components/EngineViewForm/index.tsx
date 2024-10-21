import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import FormGenerator, { IField } from "./FormGenerator";

// Field builder schema
const fieldSchema = z.object({
  name: z.string().min(1, "Field name is required"),
  type: z.string().min(1, "Field type is required"),
  label: z.string().min(1, "Field label is required"),
  placeholder: z.string().optional(),
  initialValue: z.string().optional(),
  options: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  isDisabled: z.boolean().optional(),
  colSpan: z.number().min(1).max(12).default(12),
});

const formBuilderSchema = z.object({
  title: z.string().min(1, "Form title is required"),
  subtitle: z.string().optional(),
  fields: z.array(fieldSchema),
});

type FieldData = z.infer<typeof fieldSchema>;
type FormData = z.infer<typeof formBuilderSchema>;

interface TemplateConfig {
  title: string;
  subtitle?: string;
  fields: IField[];
}

interface EngineViewFormProps {
  pageId: string | number;
}

const EngineViewForm: React.FC<EngineViewFormProps> = ({ pageId }) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formBuilderSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.debug({ data });

    setTemplate({
      title: data.title,
      subtitle: data.subtitle,
      fields: [
        ...data.fields.map((field) => ({
          name: field.name,
          type: field.type as IField["type"],
          label: field.label,
          placeholder: field.placeholder ?? "Enter value",
          initialValue: field.initialValue ?? "",
          options: field.options,
          isDisabled: field.isDisabled,
          colSpan: field.colSpan,
        })),
      ],
    });
    setIsDrawerOpen(false);
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [template, setTemplate] = React.useState<TemplateConfig | null>(null);
  const [data, setData] = useState<unknown | null>(null);

  useEffect(() => {
    const fetchTemplateAndData = async () => {
      try {
        // Simulate API call for template configuration
        const mockTemplateData: TemplateConfig = {
          title: "Mock Form",
          subtitle: "This is a mock form for testing",
          fields: [
            {
              name: "name",
              type: "text",
              label: "Name",
              placeholder: "Enter your name",
              initialValue: "",
              isDisabled: false,
              colSpan: 12,
            },
            {
              name: "email",
              type: "email",
              label: "Email",
              placeholder: "Enter your email",
              initialValue: "",
              isDisabled: false,
              colSpan: 12,
            },
            {
              name: "age",
              type: "number",
              label: "Age (In Years)",
              placeholder: "Enter your age",
              initialValue: "",
              isDisabled: false,
              colSpan: 12,
            },
            {
              name: "gender",
              type: "select",
              label: "Gender",
              placeholder: "Select your gender",
              initialValue: "",
              options: [
                {
                  label: "Male",
                  value: "male",
                },
                {
                  label: "Female",
                  value: "female",
                },
                {
                  label: "Other",
                  value: "other",
                },
              ],
              isDisabled: false,
              colSpan: 12,
            },
          ],
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setTemplate(mockTemplateData);
        form.reset({
          title: mockTemplateData.title,
          subtitle: mockTemplateData.subtitle,
          fields: mockTemplateData.fields.map((field) => ({
            name: field.name,
            type: field.type as string,
            label: field.label,
            placeholder: field.placeholder,
            initialValue: field.initialValue ? String(field.initialValue) : "",
            options: field.options?.map((option) => ({
              label: option.label,
              value: option.value,
            })),
            isDisabled: field.isDisabled ?? false,
            colSpan: field.colSpan ?? 12,
          })) as FieldData[],
        });

        // Simulate API call for table data
        const mockTableData = {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          age: 45,
          gender: "male",
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(mockTableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTemplateAndData();
  }, [form, pageId]);

  return (
    <div className="container mx-auto p-8 sm:pl-96">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        onClick={() => {
          setIsDrawerOpen(true);
        }}
      >
        Form Builder
      </Button>

      {template && (
        <div className="p-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {template?.title}
            </h2>
            <p className="text-muted-foreground">{template?.subtitle}</p>
          </div>
          <div>
            <FormGenerator
              fields={template.fields}
              defaultValues={data}
              onSubmit={console.log}
              showSubmitButton={true}
            />
          </div>
        </div>
      )}

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Form Builder</DrawerTitle>{" "}
            <DrawerDescription>
              This is where you design your form
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Form Title</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter form title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Form Subtitle</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter form subtitle" />
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
                          <div className="col-span-2">
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
                          <div className="col-span-2">
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
                                      {[
                                        { label: "Text", value: "text" },
                                        { label: "Email", value: "email" },
                                        {
                                          label: "Password",
                                          value: "password",
                                        },
                                        { label: "Number", value: "number" },
                                        {
                                          label: "Textarea",
                                          value: "textarea",
                                        },
                                        { label: "Select", value: "select" },
                                      ].map((type) => (
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
                          <div className="col-span-2">
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
                          <div className="col-span-2">
                            <FormField
                              control={form.control}
                              name={`fields.${index}.placeholder`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Field Placeholder</FormLabel>
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
                              name={`fields.${index}.colSpan`}
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
                          <div className="col-span-2 flex items-end">
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
                  onClick={() => {
                    append({
                      name: "",
                      type: "",
                      label: "",
                      placeholder: "",
                      initialValue: "",
                      isDisabled: false,
                      colSpan: 12,
                    });
                  }}
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Field
                </Button>

                <Button type="submit" className="w-full">
                  Save
                </Button>
              </form>
            </Form>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close Builder</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default EngineViewForm;
