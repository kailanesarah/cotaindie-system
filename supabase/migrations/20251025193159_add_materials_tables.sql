create type "public"."material_cut_direction" as enum ('V', 'VH');

create type "public"."material_measure_type" as enum ('M2', 'ML', 'UN');

create type "public"."material_unit" as enum ('CM', 'UN');

create table "public"."materials" (
    "id" uuid not null default gen_random_uuid(),
    "code" character varying not null,
    "name" character varying not null,
    "description" text not null,
    "measure_type" material_measure_type not null,
    "unit" material_unit not null,
    "waste_tax" numeric not null,
    "base_value" numeric not null,
    "measure" numeric[] not null,
    "cut_direction" material_cut_direction not null,
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."materials" enable row level security;

create table "public"."materials_categories" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying not null,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid
);


alter table "public"."materials_categories" enable row level security;

create table "public"."materials_categories_relation" (
    "id" uuid not null default gen_random_uuid(),
    "material_id" uuid not null,
    "category_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."materials_categories_relation" enable row level security;

CREATE UNIQUE INDEX materials_categories_pkey ON public.materials_categories USING btree (id);

CREATE UNIQUE INDEX materials_categories_relation_pkey ON public.materials_categories_relation USING btree (id);

CREATE UNIQUE INDEX materials_code_key ON public.materials USING btree (code);

CREATE UNIQUE INDEX materials_pkey ON public.materials USING btree (id);

alter table "public"."materials" add constraint "materials_pkey" PRIMARY KEY using index "materials_pkey";

alter table "public"."materials_categories" add constraint "materials_categories_pkey" PRIMARY KEY using index "materials_categories_pkey";

alter table "public"."materials_categories_relation" add constraint "materials_categories_relation_pkey" PRIMARY KEY using index "materials_categories_relation_pkey";

alter table "public"."materials" add constraint "materials_code_key" UNIQUE using index "materials_code_key";

alter table "public"."materials" add constraint "materials_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."materials" validate constraint "materials_user_id_fkey";

alter table "public"."materials_categories" add constraint "materials_categories_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."materials_categories" validate constraint "materials_categories_user_id_fkey";

alter table "public"."materials_categories_relation" add constraint "materials_categories_relation_category_id_fkey" FOREIGN KEY (category_id) REFERENCES materials_categories(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."materials_categories_relation" validate constraint "materials_categories_relation_category_id_fkey";

alter table "public"."materials_categories_relation" add constraint "materials_categories_relation_material_id_fkey" FOREIGN KEY (material_id) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."materials_categories_relation" validate constraint "materials_categories_relation_material_id_fkey";

grant delete on table "public"."materials" to "anon";

grant insert on table "public"."materials" to "anon";

grant references on table "public"."materials" to "anon";

grant select on table "public"."materials" to "anon";

grant trigger on table "public"."materials" to "anon";

grant truncate on table "public"."materials" to "anon";

grant update on table "public"."materials" to "anon";

grant delete on table "public"."materials" to "authenticated";

grant insert on table "public"."materials" to "authenticated";

grant references on table "public"."materials" to "authenticated";

grant select on table "public"."materials" to "authenticated";

grant trigger on table "public"."materials" to "authenticated";

grant truncate on table "public"."materials" to "authenticated";

grant update on table "public"."materials" to "authenticated";

grant delete on table "public"."materials" to "service_role";

grant insert on table "public"."materials" to "service_role";

grant references on table "public"."materials" to "service_role";

grant select on table "public"."materials" to "service_role";

grant trigger on table "public"."materials" to "service_role";

grant truncate on table "public"."materials" to "service_role";

grant update on table "public"."materials" to "service_role";

grant delete on table "public"."materials_categories" to "anon";

grant insert on table "public"."materials_categories" to "anon";

grant references on table "public"."materials_categories" to "anon";

grant select on table "public"."materials_categories" to "anon";

grant trigger on table "public"."materials_categories" to "anon";

grant truncate on table "public"."materials_categories" to "anon";

grant update on table "public"."materials_categories" to "anon";

grant delete on table "public"."materials_categories" to "authenticated";

grant insert on table "public"."materials_categories" to "authenticated";

grant references on table "public"."materials_categories" to "authenticated";

grant select on table "public"."materials_categories" to "authenticated";

grant trigger on table "public"."materials_categories" to "authenticated";

grant truncate on table "public"."materials_categories" to "authenticated";

grant update on table "public"."materials_categories" to "authenticated";

grant delete on table "public"."materials_categories" to "service_role";

grant insert on table "public"."materials_categories" to "service_role";

grant references on table "public"."materials_categories" to "service_role";

grant select on table "public"."materials_categories" to "service_role";

grant trigger on table "public"."materials_categories" to "service_role";

grant truncate on table "public"."materials_categories" to "service_role";

grant update on table "public"."materials_categories" to "service_role";

grant delete on table "public"."materials_categories_relation" to "anon";

grant insert on table "public"."materials_categories_relation" to "anon";

grant references on table "public"."materials_categories_relation" to "anon";

grant select on table "public"."materials_categories_relation" to "anon";

grant trigger on table "public"."materials_categories_relation" to "anon";

grant truncate on table "public"."materials_categories_relation" to "anon";

grant update on table "public"."materials_categories_relation" to "anon";

grant delete on table "public"."materials_categories_relation" to "authenticated";

grant insert on table "public"."materials_categories_relation" to "authenticated";

grant references on table "public"."materials_categories_relation" to "authenticated";

grant select on table "public"."materials_categories_relation" to "authenticated";

grant trigger on table "public"."materials_categories_relation" to "authenticated";

grant truncate on table "public"."materials_categories_relation" to "authenticated";

grant update on table "public"."materials_categories_relation" to "authenticated";

grant delete on table "public"."materials_categories_relation" to "service_role";

grant insert on table "public"."materials_categories_relation" to "service_role";

grant references on table "public"."materials_categories_relation" to "service_role";

grant select on table "public"."materials_categories_relation" to "service_role";

grant trigger on table "public"."materials_categories_relation" to "service_role";

grant truncate on table "public"."materials_categories_relation" to "service_role";

grant update on table "public"."materials_categories_relation" to "service_role";

create policy "All"
on "public"."materials"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "All"
on "public"."materials_categories"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "All"
on "public"."materials_categories_relation"
as permissive
for all
to authenticated
using ((EXISTS ( SELECT 1
   FROM (materials m
     JOIN materials_categories mc ON ((mc.id = materials_categories_relation.category_id)))
  WHERE ((materials_categories_relation.material_id = m.id) AND (m.user_id = auth.uid()) AND (mc.user_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM (materials m
     JOIN materials_categories mc ON ((mc.id = materials_categories_relation.category_id)))
  WHERE ((materials_categories_relation.material_id = m.id) AND (m.user_id = auth.uid()) AND (mc.user_id = auth.uid())))));



