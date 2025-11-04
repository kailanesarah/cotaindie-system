create type "public"."project_payment" as enum ('CREDIT', 'DEBIT', 'BANK_TRANSFERENCE', 'PIX', 'TO_AGREE', 'OTHERS');

create type "public"."project_status" as enum ('APPROVED', 'OPEN');

create table "public"."orders" (
    "id" uuid not null default gen_random_uuid(),
    "status" project_status not null default 'OPEN'::project_status,
    "code" character varying not null,
    "name" character varying not null,
    "client_id" uuid not null,
    "expiration_days" integer not null,
    "initial_date" timestamp with time zone not null,
    "included" text,
    "excluded" text,
    "team_notes" text,
    "raw_amount" numeric not null,
    "delivery_days" integer not null,
    "payment_method" project_payment not null,
    "discount_percent" numeric not null,
    "installment_count" integer not null,
    "advance_amount" numeric not null,
    "advance_payment_method" project_payment not null,
    "notes" text,
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid
);

alter table "public"."orders" enable row level security;

create table "public"."orders_pieces" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" character varying not null,
    "qtde" integer not null,
    "measure" numeric[] not null,
    "material_id" uuid not null,
    "project_id" uuid not null
);

alter table "public"."orders_pieces" enable row level security;

create table "public"."orders_pieces_materials_snapshot" (
    "id" uuid not null default gen_random_uuid(),
    "measure_type" material_measure_type not null,
    "unit" material_unit not null,
    "waste_tax" numeric not null,
    "base_value" numeric not null,
    "measure" numeric[] not null,
    "cut_direction" material_cut_direction not null,
    "created_at" timestamp with time zone not null default now(),
    "piece_id" uuid not null
);

alter table "public"."orders_pieces_materials_snapshot" enable row level security;

CREATE OR REPLACE FUNCTION public.is_valid_costs_jsonb(costs_jsonb jsonb)
RETURNS boolean AS $$
DECLARE
    obj jsonb;
    obj_keys text[];
    expected_keys text[] := ARRAY['name', 'qtde', 'value'];
BEGIN
    IF costs_jsonb IS NULL THEN
        RETURN true;
    END IF;

    IF jsonb_typeof(costs_jsonb) != 'array' THEN
        RETURN false;
    END IF;

    IF jsonb_array_length(costs_jsonb) = 0 THEN
        RETURN false;
    END IF;

    FOR obj IN SELECT * FROM jsonb_array_elements(costs_jsonb)
    LOOP
        IF jsonb_typeof(obj) != 'object' THEN
            RETURN false;
        END IF;

        SELECT array_agg(key order by key) INTO obj_keys FROM jsonb_object_keys(obj) key;
        IF obj_keys IS NULL OR obj_keys <> expected_keys THEN
             RETURN false;
        END IF;

        IF jsonb_typeof(obj -> 'name') != 'string' OR
           jsonb_typeof(obj -> 'qtde') != 'number' OR
           jsonb_typeof(obj -> 'value') != 'number' THEN
            RETURN false;
        END IF;

    END LOOP;

    RETURN true;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

create table "public"."orders_projects" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying not null,
    "qtde" integer not null,
    "costs" jsonb,
    "profit_rate" numeric not null,
    "monthly_expense" numeric not null,
    "comission" numeric not null,
    "order_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    CONSTRAINT "costs_format_check" CHECK (public.is_valid_costs_jsonb(costs))
);

alter table "public"."orders_projects" enable row level security;

CREATE UNIQUE INDEX order_projects_pieces_pkey ON public.orders_pieces USING btree (id);

CREATE UNIQUE INDEX orders_pieces_materials_snapshot_pkey ON public.orders_pieces_materials_snapshot USING btree (id);

CREATE UNIQUE INDEX projects_code_key ON public.orders USING btree (code);

CREATE UNIQUE INDEX projects_pieces_pkey ON public.orders_projects USING btree (id);

CREATE UNIQUE INDEX projects_pkey ON public.orders USING btree (id);

alter table "public"."orders" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."orders_pieces" add constraint "order_projects_pieces_pkey" PRIMARY KEY using index "order_projects_pieces_pkey";

alter table "public"."orders_pieces_materials_snapshot" add constraint "orders_pieces_materials_snapshot_pkey" PRIMARY KEY using index "orders_pieces_materials_snapshot_pkey";

alter table "public"."orders_projects" add constraint "projects_pieces_pkey" PRIMARY KEY using index "projects_pieces_pkey";

alter table "public"."orders" add constraint "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."orders" validate constraint "orders_user_id_fkey";

alter table "public"."orders" add constraint "projects_client_id_fkey" FOREIGN KEY (client_id) REFERENCES clients(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."orders" validate constraint "projects_client_id_fkey";

alter table "public"."orders" add constraint "projects_code_key" UNIQUE using index "projects_code_key";

alter table "public"."orders_pieces" add constraint "order_projects_pieces_material_id_fkey" FOREIGN KEY (material_id) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."orders_pieces" validate constraint "order_projects_pieces_material_id_fkey";

alter table "public"."orders_pieces" add constraint "orders_pieces_project_id_fkey" FOREIGN KEY (project_id) REFERENCES orders_projects(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."orders_pieces" validate constraint "orders_pieces_project_id_fkey";

alter table "public"."orders_pieces_materials_snapshot" add constraint "orders_pieces_materials_snapshot_piece_id_fkey" FOREIGN KEY (piece_id) REFERENCES orders_pieces(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."orders_pieces_materials_snapshot" validate constraint "orders_pieces_materials_snapshot_piece_id_fkey";

alter table "public"."orders_projects" add constraint "orders_projects_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."orders_projects" validate constraint "orders_projects_order_id_fkey";

grant delete on table "public"."orders" to "anon";

grant insert on table "public"."orders" to "anon";

grant references on table "public"."orders" to "anon";

grant select on table "public"."orders" to "anon";

grant trigger on table "public"."orders" to "anon";

grant truncate on table "public"."orders" to "anon";

grant update on table "public"."orders" to "anon";

grant delete on table "public"."orders" to "authenticated";

grant insert on table "public"."orders" to "authenticated";

grant references on table "public"."orders" to "authenticated";

grant select on table "public"."orders" to "authenticated";

grant trigger on table "public"."orders" to "authenticated";

grant truncate on table "public"."orders" to "authenticated";

grant update on table "public"."orders" to "authenticated";

grant delete on table "public"."orders" to "service_role";

grant insert on table "public"."orders" to "service_role";

grant references on table "public"."orders" to "service_role";

grant select on table "public"."orders" to "service_role";

grant trigger on table "public"."orders" to "service_role";

grant truncate on table "public"."orders" to "service_role";

grant update on table "public"."orders" to "service_role";

grant delete on table "public"."orders_pieces" to "anon";

grant insert on table "public"."orders_pieces" to "anon";

grant references on table "public"."orders_pieces" to "anon";

grant select on table "public"."orders_pieces" to "anon";

grant trigger on table "public"."orders_pieces" to "anon";

grant truncate on table "public"."orders_pieces" to "anon";

grant update on table "public"."orders_pieces" to "anon";

grant delete on table "public"."orders_pieces" to "authenticated";

grant insert on table "public"."orders_pieces" to "authenticated";

grant references on table "public"."orders_pieces" to "authenticated";

grant select on table "public"."orders_pieces" to "authenticated";

grant trigger on table "public"."orders_pieces" to "authenticated";

grant truncate on table "public"."orders_pieces" to "authenticated";

grant update on table "public"."orders_pieces" to "authenticated";

grant delete on table "public"."orders_pieces" to "service_role";

grant insert on table "public"."orders_pieces" to "service_role";

grant references on table "public"."orders_pieces" to "service_role";

grant select on table "public"."orders_pieces" to "service_role";

grant trigger on table "public"."orders_pieces" to "service_role";

grant truncate on table "public"."orders_pieces" to "service_role";

grant update on table "public"."orders_pieces" to "service_role";

grant delete on table "public"."orders_pieces_materials_snapshot" to "anon";

grant insert on table "public"."orders_pieces_materials_snapshot" to "anon";

grant references on table "public"."orders_pieces_materials_snapshot" to "anon";

grant select on table "public"."orders_pieces_materials_snapshot" to "anon";

grant trigger on table "public"."orders_pieces_materials_snapshot" to "anon";

grant truncate on table "public"."orders_pieces_materials_snapshot" to "anon";

grant update on table "public"."orders_pieces_materials_snapshot" to "anon";

grant delete on table "public"."orders_pieces_materials_snapshot" to "authenticated";

grant insert on table "public"."orders_pieces_materials_snapshot" to "authenticated";

grant references on table "public"."orders_pieces_materials_snapshot" to "authenticated";

grant select on table "public"."orders_pieces_materials_snapshot" to "authenticated";

grant trigger on table "public"."orders_pieces_materials_snapshot" to "authenticated";

grant truncate on table "public"."orders_pieces_materials_snapshot" to "authenticated";

grant update on table "public"."orders_pieces_materials_snapshot" to "authenticated";

grant delete on table "public"."orders_pieces_materials_snapshot" to "service_role";

grant insert on table "public"."orders_pieces_materials_snapshot" to "service_role";

grant references on table "public"."orders_pieces_materials_snapshot" to "service_role";

grant select on table "public"."orders_pieces_materials_snapshot" to "service_role";

grant trigger on table "public"."orders_pieces_materials_snapshot" to "service_role";

grant truncate on table "public"."orders_pieces_materials_snapshot" to "service_role";

grant update on table "public"."orders_pieces_materials_snapshot" to "service_role";

grant delete on table "public"."orders_projects" to "anon";

grant insert on table "public"."orders_projects" to "anon";

grant references on table "public"."orders_projects" to "anon";

grant select on table "public"."orders_projects" to "anon";

grant trigger on table "public"."orders_projects" to "anon";

grant truncate on table "public"."orders_projects" to "anon";

grant update on table "public"."orders_projects" to "anon";

grant delete on table "public"."orders_projects" to "authenticated";

grant insert on table "public"."orders_projects" to "authenticated";

grant references on table "public"."orders_projects" to "authenticated";

grant select on table "public"."orders_projects" to "authenticated";

grant trigger on table "public"."orders_projects" to "authenticated";

grant truncate on table "public"."orders_projects" to "authenticated";

grant update on table "public"."orders_projects" to "authenticated";

grant delete on table "public"."orders_projects" to "service_role";

grant insert on table "public"."orders_projects" to "service_role";

grant references on table "public"."orders_projects" to "service_role";

grant select on table "public"."orders_projects" to "service_role";

grant trigger on table "public"."orders_projects" to "service_role";

grant truncate on table "public"."orders_projects" to "service_role";

grant update on table "public"."orders_projects" to "service_role";

create policy "All"
on "public"."orders"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));

create policy "All"
on "public"."orders_pieces"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
    FROM (orders_projects p
      JOIN orders o ON ((o.id = p.order_id)))
  WHERE ((p.id = orders_pieces.project_id) AND (o.user_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
    FROM (orders_projects p
      JOIN orders o ON ((o.id = p.order_id)))
  WHERE ((p.id = orders_pieces.project_id) AND (o.user_id = auth.uid())))));

create policy "All"
on "public"."orders_pieces_materials_snapshot"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
    FROM ((orders_pieces piece
      JOIN orders_projects proj ON ((proj.id = piece.project_id)))
      JOIN orders o ON ((o.id = proj.order_id)))
  WHERE ((piece.id = orders_pieces_materials_snapshot.piece_id) AND (o.user_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
    FROM ((orders_pieces piece
      JOIN orders_projects proj ON ((proj.id = piece.project_id)))
      JOIN orders o ON ((o.id = proj.order_id)))
  WHERE ((piece.id = orders_pieces_materials_snapshot.piece_id) AND (o.user_id = auth.uid())))));

create policy "All"
on "public"."orders_projects"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
    FROM orders o
  WHERE ((o.id = orders_projects.order_id) AND (o.user_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
    FROM orders o
  WHERE ((o.id = orders_projects.order_id) AND (o.user_id = auth.uid())))));