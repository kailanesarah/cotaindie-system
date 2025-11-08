"use client";

import { Button } from "@/components/temp/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/temp/form";
import { Icon } from "@/components/temp/icon";
import { Input } from "@/components/temp/input";
import { InputPassword } from "@/components/temp/input-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useSignIn } from "../_hooks/use-login";
import { loginDefaultValues, loginSchema } from "../_schema/sign-in-schema";

export const SignInForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  });

  const { execute } = useSignIn();
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    execute(values);
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: sistema@cotaindie.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <InputPassword {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">
          Entrar no sistema <Icon name="login" />
        </Button>
      </form>
    </Form>
  );
};
