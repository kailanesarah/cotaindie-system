INSERT INTO public.materials (
    id, code, name, description, measure_type, unit, waste_tax, base_value, measure, cut_direction, user_id
) VALUES
(
    '20000000-0000-0000-0000-000000000001',
    '000000001',
    'Madeira Pinus',
    'Madeira de Pinus de alta qualidade para móveis.',
    'ML',
    'CM',
    0.05,
    25.50,
    ARRAY[200, 20, 2],
    'V',
    '00000000-0000-0000-0000-000000000000'
),
(
    '20000000-0000-0000-0000-000000000002',
    '000000002',
    'Compensado MDF',
    'Placa de MDF para móveis planejados.',
    'M2',
    'UN',
    0.03,
    75.00,
    ARRAY[2440, 1220, 18],
    'VH',
    '00000000-0000-0000-0000-000000000000'
),
(
    '20000000-0000-0000-0000-000000000003',
    '000000003',
    'Pinus Tratado',
    'Madeira de Pinus tratada para ambientes externos.',
    'ML',
    'CM',
    0.06,
    30.00,
    ARRAY[300, 25, 3],
    'V',
    '00000000-0000-0000-0000-000000000000'
),
(
    '20000000-0000-0000-0000-000000000004',
    '000000004',
    'MDF Branco',
    'Placa de MDF branca para revestimentos internos.',
    'M2',
    'UN',
    0.02,
    60.00,
    ARRAY[2800, 2070, 18],
    'VH',
    '00000000-0000-0000-0000-000000000000'
),
(
    '20000000-0000-0000-0000-000000000005',
    '000000005',
    'Madeira Cumaru',
    'Madeira nobre Cumaru para pisos e móveis.',
    'ML',
    'CM',
    0.07,
    90.00,
    ARRAY[250, 30, 4],
    'V',
    '00000000-0000-0000-0000-000000000000'
),
(
    '20000000-0000-0000-0000-000000000006',
    '000000006',
    'Madeira Carvalho',
    'Madeira de Carvalho de alta durabilidade.',
    'ML',
    'CM',
    0.05,
    120.00,
    ARRAY[220, 25, 3],
    'VH',
    '00000000-0000-0000-0000-000000000000'
),
(
    '20000000-0000-0000-0000-000000000007',
    '000000007',
    'Compensado Naval',
    'Compensado resistente à água para móveis e barcos.',
    'M2',
    'UN',
    0.04,
    150.00,
    ARRAY[2440, 1220, 20],
    'VH',
    '00000000-0000-0000-0000-000000000000'
);
