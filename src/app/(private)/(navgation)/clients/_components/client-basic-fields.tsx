import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RadioButton,
  RadioButtonGroup,
} from "@/components/ui/radio-button-group";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { clientsCategories } from "../_constants/clients-categories";

export function ClientBasicsFields() {
  const form = useFormContext();
  const category = form.watch("category");

  const isFirstRender = useRef(true);
  const previousCategory = useRef(form.getValues("category"));

  useEffect(() => {
    if (!isFirstRender.current && previousCategory.current !== category) {
      form.setValue("document.value", "");
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    previousCategory.current = category;
  }, [category, form]);

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Ex: Nome da pessoa ou razão social"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem className="col-span-3">
            <FormLabel>Categoria</FormLabel>
            <FormControl>
              <RadioButtonGroup
                value={field.value}
                onValueChange={field.onChange}
              >
                {clientsCategories.map((category, index) => (
                  <RadioButton key={index} value={category.id}>
                    {category.name}
                  </RadioButton>
                ))}
              </RadioButtonGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {category === "pf" && (
        <FormField
          control={form.control}
          name="document.value"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel isOptional>Cpf</FormLabel>
              <FormControl>
                <PatternFormat
                  format="###.###.###-##"
                  mask="_"
                  customInput={Input}
                  placeholder="Cpf: xxx.xxx.xxx-xx"
                  value={field.value || ""}
                  onValueChange={(values) => field.onChange(values.value)}
                  onBlur={field.onBlur}
                  getInputRef={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {category === "pj" && (
        <FormField
          control={form.control}
          name="document.value"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel isOptional>Cnpj</FormLabel>
              <FormControl>
                <PatternFormat
                  format="##.###.###/####-##"
                  mask="_"
                  customInput={Input}
                  placeholder="Cnpj: xx.xxx.xxx/xxxx-xx"
                  value={field.value || ""}
                  onValueChange={(values) => field.onChange(values.value)}
                  onBlur={field.onBlur}
                  getInputRef={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Telefone</FormLabel>
            <FormControl>
              <PatternFormat
                format="(##) #####-####"
                mask="_"
                customInput={Input}
                placeholder="Ex: (xx) x xxxx - xxxx"
                value={field.value || ""}
                onValueChange={(values) => field.onChange(values.value)}
                onBlur={field.onBlur}
                getInputRef={field.ref}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel isOptional>Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Ex: pedido@cliente.com" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
