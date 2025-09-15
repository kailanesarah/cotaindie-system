"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  orderIncludedSchema,
  type orderIncludedType,
} from "../schema/order-included-schema";

export const OrderIncludedForm = () => {
  const form = useForm<orderIncludedType>({
    resolver: zodResolver(orderIncludedSchema),
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-12 items-start gap-3">
        <FormField
          control={form.control}
          name="included"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Materiais inclusos</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Utilizados na fabricação..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="excluded"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Materiais exclusos</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Não faz parte..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="teamNotes"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Observações (equipe interna)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Ex: Cuidado com..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
