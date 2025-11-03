alter table "public"."orders" alter column "advance_payment_method" drop not null;

CREATE UNIQUE INDEX orders_pieces_materials_snapshot_piece_id_key ON public.orders_pieces_materials_snapshot USING btree (piece_id);

alter table "public"."orders_pieces_materials_snapshot" add constraint "orders_pieces_materials_snapshot_piece_id_key" UNIQUE using index "orders_pieces_materials_snapshot_piece_id_key";


