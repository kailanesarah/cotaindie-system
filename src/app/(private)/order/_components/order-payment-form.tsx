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
import { InputDisabled } from "@/components/ui/input-disabled";
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
import { NumericFormat } from "react-number-format";
import { paymentCategories } from "../_constants/payment-categories";
import { rawOrderValue } from "../_constants/raw-order-value";
import {
  orderPaymentSchema,
  type orderPaymentType,
} from "../schema/order-payment-schema";

export const OrderPaymentForm = () => {
  const form = useForm<orderPaymentType>({
    resolver: zodResolver(orderPaymentSchema),
  });

  const discount = form.watch("discount");

  const discountFormated = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(discount);

  const discountMessage = discount
    ? `Desconto final: ${discountFormated}`
    : "Insira um desconto";

  return (
    <Form {...form}>
      <form className="grid grid-cols-12 items-start gap-3">
        <FormField
          control={form.control}
          name="deliveryDays"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Previsão de entrega</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value ?? ""}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue ?? "");
                  }}
                  allowNegative={false}
                  decimalScale={0}
                  suffix={` ${field.value === 1 ? "dia útil" : "dias úteis"}`}
                  placeholder="Número de dias úteis"
                  customInput={Input}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return floatValue === undefined || floatValue >= 1;
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="upfrontPaymentMethod"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Pagamento principal</FormLabel>
              <FormControl>
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    truncate
                    placeholder="Selecione uma opção"
                    className="justify-between"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {paymentCategories.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
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
          name="discountPercentage"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Percentual do desconto</FormLabel>
              <FormControl>
                <NumericFormat
                  value={
                    field.value != null
                      ? Math.min(Math.max(field.value * 100, 0), 100)
                      : ""
                  }
                  onValueChange={(values) => {
                    const percent = Math.min(
                      Math.max(values.floatValue ?? 0, 0),
                      100,
                    );
                    field.onChange(percent / 100);
                    form.setValue("discount", (percent / 100) * rawOrderValue, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                  }}
                  isAllowed={(values) => {
                    const floatValue = values.floatValue ?? 0;
                    return floatValue >= 0 && floatValue <= 100;
                  }}
                  allowNegative={false}
                  decimalScale={3}
                  fixedDecimalScale={true}
                  suffix="%"
                  decimalSeparator=","
                  placeholder="Ex: 10%"
                  customInput={Input}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => {
            const handleChange = (values: any) => {
              const floatValue = values.floatValue;
              field.onChange(floatValue ?? 0);
              if (floatValue != null) {
                form.setValue(
                  "discountPercentage",
                  floatValue / rawOrderValue,
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  },
                );
              }
            };

            const handleBlur = () => {
              if ((field.value ?? 0) > rawOrderValue) {
                field.onChange(rawOrderValue);
                form.setValue("discountPercentage", 1, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }
            };

            return (
              <FormItem className="col-span-5">
                <FormLabel>Valor do desconto</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value ?? ""}
                    onValueChange={handleChange}
                    onBlur={handleBlur}
                    allowNegative={false}
                    decimalScale={2}
                    fixedDecimalScale
                    prefix="R$ "
                    thousandSeparator="."
                    decimalSeparator=","
                    placeholder="Ex: R$ 500,00"
                    customInput={Input}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <InputDisabled className="col-span-4 mt-[1.375rem]">
          {discountMessage}
        </InputDisabled>
        <FormField
          control={form.control}
          name="remainingAmount"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Adiantamento</FormLabel>
              <FormControl>
                <NumericFormat
                  value={field.value ?? ""}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue ?? "");
                  }}
                  allowNegative={false}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  prefix="R$ "
                  thousandSeparator="."
                  decimalSeparator=","
                  placeholder="Ex: R$ 250,00"
                  customInput={Input}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="remainingPaymentMethod"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Pagamento do restante</FormLabel>
              <FormControl>
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    truncate
                    placeholder="Selecione uma opção"
                    className="justify-between"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {paymentCategories.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
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
          name="remainingInstallmentCount"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Par. do restante</FormLabel>
              <FormControl>
                <Select
                  value={field.value ?? ""}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    truncate
                    placeholder="N° de parcelas"
                    className="justify-between"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="end">
                    {Array.from({ length: 24 }).map((_, index) => {
                      const installment = index + 1;
                      const formatedInstallment =
                        installment > 1 ? "parcelas" : "parcela";
                      return (
                        <SelectItem
                          key={installment}
                          value={String(installment)}
                        >
                          {installment} {formatedInstallment}
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
        <InputDisabled className="col-span-4 mt-[1.375rem]">
          Restante: 5 parcelas de R$ 2.281,00
        </InputDisabled>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem className="col-span-12">
              <FormLabel>Observações (cliente)</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Ex: Cliente deseja..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
