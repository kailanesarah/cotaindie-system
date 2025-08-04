"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ClientInput, clientSchema } from "@/modules/clients/schema";
import { useEffect } from "react";


interface ClientFormProps {
  initialData?: ClientInput;
  onSubmitAction: (data: ClientInput) => void;
  isEditing?: boolean;
}
export function ClientForm({
  initialData,
  onSubmitAction,
  isEditing,
}: ClientFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ClientInput>({
    resolver: zodResolver(clientSchema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);


  const category = watch("category");

  const onSubmit = (data: ClientInput) => {
    const cleanedData = {
      ...data,
      cpf: data.category === "Pessoa física" ? data.cpf : "",
      cnpj: data.category === "Pessoa jurídica" ? data.cnpj : "",
    };

    onSubmitAction(cleanedData);
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-2xl shadow-md grid gap-6 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {isEditing ? "Atualizar Cliente" : "Novo Cliente"}
      </h2>

      {/* Nome e Categoria */}
      <div className="grid md:grid-cols-2 gap-4">
        <input type="hidden" {...register("id")} />
        <div>
          <label className="block mb-1 text-sm font-medium">Nome</label>
          <input
            {...register("name")}
            className="w-full border rounded-md p-2"
            placeholder="Nome completo"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Categoria</label>
          <select
            {...register("category")}
            className="w-full border rounded-md p-2"
          >
            <option value="">Selecione</option>
            <option value="Pessoa física">Pessoa física</option>
            <option value="Pessoa jurídica">Pessoa jurídica</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      {/* CPF / CNPJ (condicional) */}
      <div className="grid md:grid-cols-2 gap-4">
        {category === "Pessoa física" && (
          <div>
            <label className="block mb-1 text-sm font-medium">CPF</label>
            <input
              {...register("cpf")}
              className="w-full border rounded-md p-2"
              placeholder="123.456.789-00"
            />
            {errors.cpf && (
              <p className="text-red-500 text-sm mt-1">{errors.cpf.message}</p>
            )}
          </div>
        )}

        {category === "Pessoa jurídica" && (
          <div>
            <label className="block mb-1 text-sm font-medium">CNPJ</label>
            <input
              {...register("cnpj")}
              className="w-full border rounded-md p-2"
              placeholder="12.345.678/0001-00"
            />
            {errors.cnpj && (
              <p className="text-red-500 text-sm mt-1">{errors.cnpj.message}</p>
            )}
          </div>
        )}
      </div>

      {/* Contato */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Telefone</label>
          <input
            {...register("phone")}
            className="w-full border rounded-md p-2"
            placeholder="(88) 99999-8888"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            {...register("email")}
            className="w-full border rounded-md p-2"
            placeholder="cliente@email.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Endereço */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Cidade</label>
          <input
            {...register("city")}
            className="w-full border rounded-md p-2"
            placeholder="Ex: Fortaleza"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">CEP</label>
          <input
            {...register("zipCode")}
            className="w-full border rounded-md p-2"
            placeholder="68300-000"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.zipCode.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Bairro</label>
          <input
            {...register("neighborhood")}
            className="w-full border rounded-md p-2"
            placeholder="Ex: Centro"
          />
          {errors.neighborhood && (
            <p className="text-red-500 text-sm mt-1">
              {errors.neighborhood.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Endereço</label>
          <input
            {...register("address")}
            className="w-full border rounded-md p-2"
            placeholder="Rua Exemplo, nº 123"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
      </div>

      {/* Complemento e Observações */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Complemento</label>
          <input
            {...register("complement")}
            className="w-full border rounded-md p-2"
            placeholder="Casa, apto, etc."
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Observações</label>
          <textarea
            {...register("notes")}
            className="w-full border rounded-md p-2 h-24"
            placeholder="Anotações gerais sobre o cliente"
          />
        </div>
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {isEditing ? "Salvar Alterações" : "Cadastrar Cliente"}
      </button>
    </form>
  );
}
