"use client"

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage, FormField as ShadcnFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Controller, FieldValues, Path, Control } from "react-hook-form"

interface FormFieldProps <T extends FieldValues>{
  control: Control<T>;
  name: Path<T>;
  label: string
  placeholder?: string
  description?: string
  type?: 'text' | 'email' | 'password' | 'file'
}

const FormField = <T extends FieldValues>({ control, name, label, placeholder, description, type = "text" }: FormFieldProps<T>) => (
  <ShadcnFormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input className="input" placeholder={placeholder} type={type} {...field} />
        </FormControl>
         {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
)

export default FormField
