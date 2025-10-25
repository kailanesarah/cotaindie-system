create type "public"."client_type" as enum ('CNPJ', 'CPF');

create table "public"."clients" (
    "id" uuid not null default gen_random_uuid(),
    "code" character varying not null,
    "name" character varying not null,
    "notes" text,
    "type" client_type not null,
    "document" character varying,
    "email" character varying,
    "phone" character varying,
    "cep" character varying,
    "city" character varying not null,
    "neighborhood" character varying not null,
    "street" character varying not null,
    "complement" text,
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."clients" enable row level security;

CREATE UNIQUE INDEX clients_code_key ON public.clients USING btree (code);

CREATE UNIQUE INDEX clients_pkey ON public.clients USING btree (id);

alter table "public"."clients" add constraint "clients_pkey" PRIMARY KEY using index "clients_pkey";

alter table "public"."clients" add constraint "clients_code_key" UNIQUE using index "clients_code_key";

alter table "public"."clients" add constraint "clients_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."clients" validate constraint "clients_user_id_fkey";

grant delete on table "public"."clients" to "anon";

grant insert on table "public"."clients" to "anon";

grant references on table "public"."clients" to "anon";

grant select on table "public"."clients" to "anon";

grant trigger on table "public"."clients" to "anon";

grant truncate on table "public"."clients" to "anon";

grant update on table "public"."clients" to "anon";

grant delete on table "public"."clients" to "authenticated";

grant insert on table "public"."clients" to "authenticated";

grant references on table "public"."clients" to "authenticated";

grant select on table "public"."clients" to "authenticated";

grant trigger on table "public"."clients" to "authenticated";

grant truncate on table "public"."clients" to "authenticated";

grant update on table "public"."clients" to "authenticated";

grant delete on table "public"."clients" to "service_role";

grant insert on table "public"."clients" to "service_role";

grant references on table "public"."clients" to "service_role";

grant select on table "public"."clients" to "service_role";

grant trigger on table "public"."clients" to "service_role";

grant truncate on table "public"."clients" to "service_role";

grant update on table "public"."clients" to "service_role";

create policy "All"
on "public"."clients"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));



