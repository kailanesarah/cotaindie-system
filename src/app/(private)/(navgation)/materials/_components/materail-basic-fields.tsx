"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { categories } from "../../_constants/categories";

export const MaterialBasicFields = () => {
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: Chapa de MDF Arauco 18MM" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormLabel>Categoria</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger placeholder="Selecionar categoria">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="col-span-4">
            <FormLabel isOptional>Descrição</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Ex: Padrão de madeira clássica..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="measureType"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormLabel>Tipo de medida</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger placeholder="Metro quadrado (m²)">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="m2">Metro quadrado (m²)</SelectItem>
                  <SelectItem value="ml">Metro linear (ml)</SelectItem>
                  <SelectItem value="un">Unidade (un)</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="wasteTax"
        render={({ field }) => (
          <FormItem className="col-span-1">
            <FormLabel>Taxa de desperdício</FormLabel>
            <FormControl>
              <NumericFormat
                value={field.value * 100}
                onValueChange={(values) =>
                  field.onChange((values.floatValue ?? 0) / 100)
                }
                decimalScale={0}
                fixedDecimalScale={false}
                suffix="%"
                allowNegative={false}
                customInput={Input}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
