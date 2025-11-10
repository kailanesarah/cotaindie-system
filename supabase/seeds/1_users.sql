BEGIN;

INSERT INTO
    public.users (id, name, role, user_id, created_at)
VALUES
    (
        gen_random_uuid (),
        'Alex Magalhães',
        'ADMIN',
        '11111111-1111-1111-1111-111111111111',
        current_timestamp
    ),
    (
        gen_random_uuid (),
        'Gutemberg',
        'ADMIN',
        '22222222-2222-2222-2222-222222222222',
        current_timestamp
    ),
    (
        gen_random_uuid (),
        'Kainale Sarah',
        'ADMIN',
        '33333333-3333-3333-3333-333333333333',
        current_timestamp
    ) ON CONFLICT (user_id) DO NOTHING;

COMMIT;