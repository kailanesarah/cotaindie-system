BEGIN;

DO $$
DECLARE
    v_user_id uuid := '00000000-0000-0000-0000-000000000000';
    
    cat_1_id uuid := gen_random_uuid();
    cat_2_id uuid := gen_random_uuid();
    cat_3_id uuid := gen_random_uuid();
    cat_4_id uuid := gen_random_uuid();
    cat_5_id uuid := gen_random_uuid();
    cat_6_id uuid := gen_random_uuid();
    cat_7_id uuid := gen_random_uuid();
    cat_8_id uuid := gen_random_uuid();
    cat_9_id uuid := gen_random_uuid();
    cat_10_id uuid := gen_random_uuid();
    cat_11_id uuid := gen_random_uuid();
    cat_12_id uuid := gen_random_uuid();
    
BEGIN
    
    DELETE FROM public.orders_pieces_materials_snapshot;
    DELETE FROM public.orders_pieces;
    DELETE FROM public.orders_projects;
    DELETE FROM public.orders;
    DELETE FROM public.materials_categories_relation;
    DELETE FROM public.materials;
    DELETE FROM public.clients;
    DELETE FROM public.materials_categories;

    INSERT INTO public.materials_categories (id, name, user_id) VALUES
        (cat_1_id, 'MDF', v_user_id),
        (cat_2_id, 'Compensado', v_user_id),
        (cat_3_id, 'Ferragens', v_user_id),
        (cat_4_id, 'Material de consumo', v_user_id),
        (cat_5_id, 'Fita de borda', v_user_id),
        (cat_6_id, 'Bucha', v_user_id),
        (cat_7_id, 'Metalon', v_user_id),
        (cat_8_id, 'Vidros', v_user_id),
        (cat_9_id, 'Espelhos', v_user_id),
        (cat_10_id, 'Iluminação', v_user_id),
        (cat_11_id, 'Luminária', v_user_id),
        (cat_12_id, 'Outros', v_user_id);
    
END $$;

COMMIT;