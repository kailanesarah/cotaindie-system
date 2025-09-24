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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOrderStore } from "../_stores/order-store";
import {
  orderReferenceSchema,
  type orderReferenceType,
} from "../schema/order-reference-schema";

export const OrderReferenceForm = ({ clients }: { clients: Client[] }) => {
  const setReference = useOrderStore((state) => state.setReference);
  const setTrigger = useOrderStore((state) => state.setTrigger);

  const form = useForm<orderReferenceType>({
    resolver: zodResolver(orderReferenceSchema),
    defaultValues: { startsAt: new Date(), endsAt: "" },
  });

  useEffect(() => {
    setTrigger("referencesForm", form.trigger);
  }, [form.trigger, setTrigger]);

  return (
    <Form {...form}>
      <form className="grid grid-cols-12 items-start gap-3">
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
                  onBlur={(e) => {
                    field.onBlur();
                    setReference({ name: e.target.value });
                  }}
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
                  value={field.value ?? ""}
                  onValueChange={(val) => {
                    field.onChange(val);
                    const client = clients.find((c) => c.id === val);
                    if (client) {
                      setReference({
                        client: { id: client.id, name: client.name },
                      });
                    }
                  }}
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
                  onBlur={() => {
                    field.onBlur();
                    if (field.value) {
                      setReference({ initialDate: field.value.toISOString() });
                    }
                  }}
                  onChange={(val) => {
                    field.onChange(val);
                    if (val) {
                      setReference({ initialDate: val.toISOString() });
                    }
                  }}
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
                  onValueChange={(val) => {
                    field.onChange(val);
                    setReference({ expirationDays: Number(val) });
                  }}
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
