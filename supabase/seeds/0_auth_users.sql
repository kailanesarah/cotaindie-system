BEGIN;

INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    )
VALUES
    (
        '00000000-0000-0000-0000-000000000000',
        '11111111-1111-1111-1111-111111111111',
        'authenticated',
        'authenticated',
        'alex@cotaindie.com',
        '$2a$06$w0EpUxpUdR3XuyIheqD34.tOznHJez0AnBifcrdStnGI/CsK9ZVY2',
        now (),
        now (),
        now (),
        '{"provider":"email","providers":["email"]}',
        '{}',
        now (),
        now (),
        '',
        '',
        '',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '22222222-2222-2222-2222-222222222222',
        'authenticated',
        'authenticated',
        'gutemberg@quartodeideias.com.br',
        '$2a$06$sH21b7xQIb120WvMk0VMcOWNYEDW1e8MbpEDblNw13DTwZQD18bsi',
        now (),
        now (),
        now (),
        '{"provider":"email","providers":["email"]}',
        '{}',
        now (),
        now (),
        '',
        '',
        '',
        ''
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '33333333-3333-3333-3333-333333333333',
        'authenticated',
        'authenticated',
        'kainalesarahpro@gmail.com',
        '$2a$06$JtOvqCq6UBWSsOC.6W7gduOROs9.sOv50zE/QABcRq8Wh4zdCxMI.',
        now (),
        now (),
        now (),
        '{"provider":"email","providers":["email"]}',
        '{}',
        now (),
        now (),
        '',
        '',
        '',
        ''
    ) ON CONFLICT (id) DO NOTHING;

COMMIT;