"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { supportDefaultValues, supportSchema } from "../_schema/support-schema";

export const SupportForm = () => {
  const form = useForm<z.infer<typeof supportSchema>>({
    resolver: zodResolver(supportSchema),
    defaultValues: supportDefaultValues,
  });

  const onSubmit = (values: z.infer<typeof supportSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de ocorrência:</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || undefined}
                  >
                    <SelectTrigger placeholder="Selecione uma opção">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sugestão de melhoria">
                        Sugestão de melhoria
                      </SelectItem>
                      <SelectItem value="Feedback">Feedback</SelectItem>
                      <SelectItem value="Problemas técnicos">
                        Problemas técnicos
                      </SelectItem>
                      <SelectItem value="Mudança de senha">
                        Mudança de senha
                      </SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
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
              <FormItem>
                <FormLabel>Descreva o ocorrido</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Conte com detalhes..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Enviar mensagem</Button>
      </form>
    </Form>
  );
};
