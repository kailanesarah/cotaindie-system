"use client";

import { DatePicker } from "@/components/ui/date-picker";
import {
  Form,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { orderReferenceSchema } from "../schema/order-reference-schema";

export const OrderReferenceForm = ({ clients }: { clients: Client[] }) => {
  const form = useForm<z.infer<typeof orderReferenceSchema>>({
    resolver: zodResolver(orderReferenceSchema),
    defaultValues: { startsAt: new Date() },
  });

  return (
    <Form {...form}>
      <form className="grid grid-cols-12 gap-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="col-span-5">
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Título do orçamento"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Cliente</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    truncate
                    placeholder="Selecione um cliente"
                    className="justify-between"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {clients.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.name}
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
          name="startsAt"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Data inicial</FormLabel>
              <FormControl>
                <DatePicker
                  {...field}
                  placeholder="Início..."
                  allowFutureDates
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endsAt"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Validade</FormLabel>
              <FormControl>
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    truncate
                    placeholder="Expira em..."
                    className="justify-between"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {Array.from({ length: 15 }).map((_, index) => {
                      const day = index + 1;
                      const formatedDay = day > 1 ? "dias" : "dia";
                      return (
                        <SelectItem key={day} value={String(day)}>
                          {day} {formatedDay}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
