import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

export interface ISelectOption {
  //   parentValue?: number | string;
  value?: boolean | number | string;
  label: string;
}

export interface IMultiSelectOption extends ISelectOption {
  items?: { value: boolean | number | string; label: string }[];
}

// Keeping the original IField interface
export interface IField {
  name: string;
  type:
    | ("text" | "email" | "password" | "tel" | "number")
    | "textarea"
    | "select";
  label: string;
  placeholder: string;
  initialValue: string | number | boolean | null;
  options?: ISelectOption[] | IMultiSelectOption[];
  isDisabled?: boolean;
  show?: (values: any) => boolean;
  validate?: (values: any) => string | null;
  onChange?: (
    name: string,
    value: any,
    setValue: (name: string, value: any) => void
  ) => void;
  colSpan?: number;
}

interface FormGeneratorProps {
  fields: IField[];
  onSubmit: (data: any) => void;
  defaultValues?: any;
  submitButtonText?: string;
  resetButtonText?: string;
  showSubmitButton?: boolean;
  showResetButton?: boolean;
}

export default function FormGenerator({
  fields,
  onSubmit,
  defaultValues = {},
  submitButtonText = "Submit",
  resetButtonText = "Reset",
  showSubmitButton = true,
  showResetButton = false,
}: FormGeneratorProps) {
  // console.debug({ defaultValues });

  // Generate Zod schema based on fields
  const generateSchema = (fields: IField[]) => {
    const schemaMap: Record<string, any> = {};

    fields.forEach((field) => {
      let fieldSchema = z.any();

      // Add basic validation based on field type
      switch (field.type) {
        case "text":
        case "email":
          fieldSchema = z.string().min(1, "This field is required");
          if (field.type === "email") {
            fieldSchema = fieldSchema.email("Invalid email address");
          }
          break;
        case "number":
          fieldSchema = z.number();
          break;
        case "date":
          fieldSchema = z.date();
          break;
        // Add more field types as needed
      }

      // Add custom validation if provided
      if (field.validate) {
        fieldSchema = fieldSchema.refine(
          (value) => !field.validate!(value),
          (value) => ({ message: field.validate!(value) || "Invalid value" })
        );
      }

      schemaMap[field.name] = fieldSchema;
    });

    return z.object(schemaMap);
  };

  const form = useForm({
    resolver: zodResolver(generateSchema(fields)),
    defaultValues,
  });

  const getField = (field: IField) => {
    const commonProps = {
      disabled: field.isDisabled,
      placeholder: field.placeholder,
    };

    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "tel":
      case "number":
        return (
          <FormField
            control={form.control}
            name={field.name}
            defaultValue={field.initialValue}
            render={({ field: formField }) => {
              return (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input type={field.type} {...formField} {...commonProps} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        );

      case "textarea":
        return (
          <FormField
            control={form.control}
            name={field.name}
            defaultValue={field.initialValue}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Textarea {...formField} {...commonProps} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "select":
        return (
          <FormField
            control={form.control}
            name={field.name}
            render={({ field: formField }) => {
              console.debug({ formField });

              return (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <Select
                    onValueChange={formField.onChange}
                    value={formField.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {field.options?.map((option: any) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    console.debug({ defaultValues });
    form.reset(defaultValues);
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-12 gap-4">
          {fields.map((field) => {
            if (field.show && !field.show(form.getValues())) {
              return null;
            }

            return (
              <div
                key={field.name}
                className={`col-span-${field.colSpan || 12}`}
              >
                {getField(field)}
              </div>
            );
          })}
        </div>

        <div className="flex gap-4">
          {showSubmitButton && (
            <Button type="submit">{submitButtonText}</Button>
          )}
          {showResetButton && (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              {resetButtonText}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
