drop policy "All" on "public"."materials_categories_relation";

alter table "public"."materials_categories" alter column "user_id" set not null;


  create policy "All"
  on "public"."materials_categories_relation"
  as permissive
  for all
  to authenticated
using ((EXISTS ( SELECT 1
   FROM public.materials_categories c
  WHERE ((c.id = materials_categories_relation.category_id) AND (c.user_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM public.materials_categories c
  WHERE ((c.id = materials_categories_relation.category_id) AND (c.user_id = auth.uid())))));



