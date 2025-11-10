create type "public"."user_role" as enum ('ADMIN');

create table "public"."users" (
    "id" uuid not null default gen_random_uuid(),
    "name" character varying not null,
    "role" user_role not null default 'ADMIN'::user_role,
    "avatar" character varying,
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."users" add constraint "users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."users" validate constraint "users_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public."getUser"()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$SELECT jsonb_build_object(
    'id', au.id,
    'name', u.name,
    'email', au.email,
    'role', u.role,
    'avatar', u.avatar
)
FROM public.users u
JOIN auth.users au ON u.user_id = au.id
WHERE au.id = auth.uid()$function$
;

CREATE OR REPLACE FUNCTION public.getuser()
 RETURNS jsonb
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path = ''
AS $function$
SELECT jsonb_build_object(
    'id', au.id,
    'name', u.name,
    'email', au.email,
    'role', u.role,
    'avatar', u.avatar
)
FROM public.users u
JOIN auth.users au ON u.user_id = au.id
WHERE au.id = auth.uid()
$function$
;

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Select"
on "public"."users"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Update"
on "public"."users"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));



