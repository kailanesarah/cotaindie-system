"use client";

import { DialogBody } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { clientSchema, getClientDefaultValues } from "../_schema/client-schema";
import { ClientActions } from "./client-actions";
import { ClientAdressFields } from "./client-address-feilds";
import { ClientBasicsFields } from "./client-basic-fields";

export const ClientForm = ({ client }: { client?: Client }) => {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: getClientDefaultValues(client),
  });

  const onSubmit = (values: z.infer<typeof clientSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogBody className="grid grid-cols-6 items-start gap-3">
          <ClientBasicsFields />
        </DialogBody>
        <DialogBody className="grid grid-cols-6 items-start gap-3">
          <ClientAdressFields />
        </DialogBody>
        <DialogBody>
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel isOptional>Observações</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Ex: Cliente deseja..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </DialogBody>
        <ClientActions />
      </form>
    </Form>
  );
};
