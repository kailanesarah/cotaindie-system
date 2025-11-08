"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/temp/form";
import { Input } from "@/components/temp/input";
import { Textarea } from "@/components/temp/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOrderStore } from "../_stores/order-store";
import {
  orderIncludedSchema,
  type orderIncludedType,
} from "../schema/order-included-schema";

export const OrderIncludedForm = () => {
  const setExcluded = useOrderStore((state) => state.setExcluded);
  const setTrigger = useOrderStore((state) => state.setTrigger);
  const order = useOrderStore((state) => state.order);

  const form = useForm<orderIncludedType>({
    resolver: zodResolver(orderIncludedSchema),
    mode: "onBlur",
    defaultValues: {
      included: order.included,
      excluded: order.excluded,
      teamNotes: order.teamNotes,
    },
  });

  useEffect(() => {
    setTrigger("excludedForm", form.trigger);
  }, [form.trigger, setTrigger]);

  return (
    <Form {...form}>
      <form className="grid grid-cols-12 items-start gap-3">
        <FormField
          control={form.control}
          name="included"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel isOptional>Materiais inclusos</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Utilizados na fabricação..."
                  onBlur={(e) => {
                    field.onBlur();
                    setExcluded({ included: e.target.value });
                  }}
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
              <FormLabel isOptional>Materiais exclusos</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Não faz parte..."
                  onBlur={(e) => {
                    field.onBlur();
                    setExcluded({ excluded: e.target.value });
                  }}
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
              <FormLabel isOptional>Observações (equipe interna)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Ex: Cuidado com..."
                  onBlur={(e) => {
                    field.onBlur();
                    setExcluded({ teamNotes: e.target.value });
                  }}
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
