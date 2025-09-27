import { Button } from "@/components/ui/button";
import { DialogBody } from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { InputDisabled } from "@/components/ui/input-disabled";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldArray, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { currencyFormatter } from "../_utils/currency-formatter";
import { calculateProjectValue } from "../functions/calculate-project-value";
import { OrderEmptyTable } from "./order-empty-table";
import {
  PiecesCosts,
  PiecesCostsActions,
  PiecesCostsContent,
  PiecesCostsTotal,
} from "./pieces-costs";

export const ProjectStepTwo = () => {
  const form = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "costs",
  });

  const costs = form.watch("costs");
  const totalCosts = costs.reduce(
    (total: number, cost: Cost) => total + (cost.qtde || 0) * (cost.value || 0),
    0,
  );

  const { rawAmount, monthlyExpense, profitRate, comission, qtde } =
    form.watch();

  const { finalValue: totalValue = 0 } = calculateProjectValue(
    rawAmount,
    totalCosts,
    monthlyExpense,
    profitRate,
    comission,
    qtde,
  );

  return (
    <>
      <DialogBody>
        <PiecesCosts>
          <PiecesCostsContent>
            <div className="flex flex-col gap-3">
              {!fields.length && (
                <OrderEmptyTable
                  title="Adicione até 5 custos"
                  text="Custos são opcionais e ajudam a precificar melhor."
                />
              )}
              {fields.length > 0 && (
                <div className="text-title-light grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 text-sm font-semibold">
                  <div>Nome do custo</div>
                  <div>Quantidade</div>
                  <div>Valor unitário</div>
                  <div>Total</div>
                  <div className="w-[2.75rem]"></div>
                </div>
              )}

              {fields.map((field, index) => {
                const costs = form.watch("costs");
                const total =
                  (costs[index]?.qtde || 0) * (costs[index]?.value || 0);

                const currencyTotal = currencyFormatter.format(total);

                return (
                  <div
                    key={field.id}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-start gap-3"
                  >
                    <FormField
                      control={form.control}
                      name={`costs.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="grow">
                          <FormControl>
                            <Input {...field} placeholder="Custo aplicado..." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`costs.${index}.qtde`}
                      render={({ field }) => (
                        <FormItem className="grow">
                          <FormControl>
                            <Select
                              value={String(field.value || 1)}
                              onValueChange={(val) =>
                                field.onChange(Number(val))
                              }
                            >
                              <SelectTrigger
                                truncate
                                placeholder="Qtde..."
                                className="justify-between"
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent align="end">
                                {Array.from({ length: 10 }).map((_, i) => {
                                  const value = i + 1;
                                  return (
                                    <SelectItem
                                      key={value}
                                      value={String(value)}
                                    >
                                      {value}
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
                    <FormField
                      control={form.control}
                      name={`costs.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="max-w-[10.25rem] grow">
                          <FormControl>
                            <NumericFormat
                              value={field.value ?? ""}
                              onValueChange={(values) =>
                                field.onChange(values.floatValue ?? 0)
                              }
                              thousandSeparator="."
                              decimalSeparator=","
                              decimalScale={2}
                              fixedDecimalScale
                              prefix="R$ "
                              allowNegative={false}
                              customInput={Input}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <InputDisabled>{currencyTotal}</InputDisabled>
                    <Button
                      variant="secondary"
                      square
                      onClick={() => remove(index)}
                    >
                      <Icon name="close" />
                    </Button>
                  </div>
                );
              })}
            </div>
            {fields.length < 5 && <PiecesCostsActions append={append} />}
          </PiecesCostsContent>
          <PiecesCostsTotal total={totalCosts} />
        </PiecesCosts>
      </DialogBody>
      <DialogBody className="grid grid-cols-12 items-start gap-3">
        <FormField
          control={form.control}
          name="profitRate"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>Margem de lucro</FormLabel>
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
                    const decimalPercent = percent / 100;

                    field.onChange(decimalPercent);
                  }}
                  allowNegative={false}
                  decimalScale={2}
                  fixedDecimalScale
                  suffix="%"
                  decimalSeparator=","
                  placeholder="Ex: 10%"
                  customInput={Input}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return (floatValue ?? 0) <= 100;
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monthlyExpense"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>Despesa mensal</FormLabel>
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
                    const decimalPercent = percent / 100;

                    field.onChange(decimalPercent);
                  }}
                  allowNegative={false}
                  decimalScale={2}
                  fixedDecimalScale
                  suffix="%"
                  decimalSeparator=","
                  placeholder="Ex: 10%"
                  customInput={Input}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return (floatValue ?? 0) <= 100;
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comission"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>Comissão</FormLabel>
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
                    const decimalPercent = percent / 100;

                    field.onChange(decimalPercent);
                  }}
                  allowNegative={false}
                  decimalScale={2}
                  fixedDecimalScale
                  suffix="%"
                  decimalSeparator=","
                  placeholder="Ex: 10%"
                  customInput={Input}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return (floatValue ?? 0) <= 100;
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </DialogBody>
      <DialogBody className="flex flex-col gap-2 text-right">
        <span>Resumo do projeto</span>
        <h6 className="!text-[1.0625rem]">
          Valor total: {currencyFormatter.format(totalValue)}
        </h6>
      </DialogBody>
    </>
  );
};
