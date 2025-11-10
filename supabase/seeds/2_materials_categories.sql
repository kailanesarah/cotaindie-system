BEGIN;

DO $$
DECLARE
    user_1 uuid := '11111111-1111-1111-1111-111111111111';
    user_2 uuid := '22222222-2222-2222-2222-222222222222';
    user_3 uuid := '33333333-3333-3333-3333-333333333333';

    cat_names text[] := ARRAY[
        'MDF','Compensado','Ferragens','Material de consumo','Fita de borda',
        'Bucha','Metalon','Vidros','Espelhos','Iluminação','Luminária','Outros'
    ];

    u uuid;
    cat text;
BEGIN
    DELETE FROM public.orders_pieces_materials_snapshot;
    DELETE FROM public.orders_pieces;
    DELETE FROM public.orders_projects;
    DELETE FROM public.orders;
    DELETE FROM public.materials_categories_relation;
    DELETE FROM public.materials;
    DELETE FROM public.clients;
    DELETE FROM public.materials_categories;

    FOREACH u IN ARRAY ARRAY[user_1, user_2, user_3]
    LOOP
        FOREACH cat IN ARRAY cat_names
        LOOP
            INSERT INTO public.materials_categories (id, name, user_id)
            VALUES (gen_random_uuid(), cat, u);
        END LOOP;
    END LOOP;

END $$;

COMMIT;
