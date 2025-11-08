CREATE UNIQUE INDEX users_user_id_key ON public.users USING btree (user_id);

alter table "public"."users" add constraint "users_user_id_key" UNIQUE using index "users_user_id_key";


