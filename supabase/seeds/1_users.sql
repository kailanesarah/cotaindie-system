INSERT INTO public.users (
    id,
    name,
    role,
    user_id,
    created_at
) VALUES (
    gen_random_uuid(),
    'Alex Magalhães',
    'ADMIN',
    '00000000-0000-0000-0000-000000000000',
    current_timestamp 
);
