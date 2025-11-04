alter table "public"."materials" alter column "cut_direction" drop not null;

alter table "public"."orders_pieces_materials_snapshot" alter column "cut_direction" drop not null;


