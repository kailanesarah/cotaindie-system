--====================================================================
-- ORDER 1 (Armário Planejado Quarto Casal) - Total 2 Projetos
-- USA CLIENTE: '00000000-0000-1000-0000-000000000001' (Maria do Carmo Almeida)
--====================================================================

-- Tabela: orders
INSERT INTO "public"."orders" 
("id", "status", "code", "name", "client_id", "expiration_days", "initial_date", "included", "excluded", "team_notes", "raw_amount", "delivery_days", "payment_method", "discount_percent", "installment_count", "advance_amount", "advance_payment_method", "notes", "user_id", "created_at")
VALUES
('00000000-0000-0000-0000-000000000001', 'OPEN', '000000001', 'Armário Planejado Quarto Casal', '00000000-0000-1000-0000-000000000001', 30, '2025-10-01 00:00:00+00', 'Montagem e instalação incluídas', 'Transporte de móveis antigos', 'Agendar visita antes da entrega', 1000, 15, 'CREDIT', 0, 1, 0, 'TO_AGREE', 'Entrega preferencialmente no período da manhã', '00000000-0000-0000-0000-000000000000', '2025-10-01 09:15:00+00');

-- Tabela: orders_projects (Projeto 1/2)
INSERT INTO "public"."orders_projects" 
("id", "name", "qtde", "costs", "profit_rate", "monthly_expense", "comission", "order_id", "created_at")
VALUES
('10000000-0000-0000-0000-000000000001', 'Projeto Principal (Armário)', 1, '[{"name": "Porta de madeira", "qtde": 2, "value": 500}, {"name": "Prateleira", "qtde": 5, "value": 300}]'::jsonb, 20, 0, 0, '00000000-0000-0000-0000-000000000001', '2025-10-01 09:15:10+00');

-- Peças e Snapshots do Projeto 1/2
INSERT INTO "public"."orders_pieces" ("id", "name", "qtde", "measure", "material_id", "project_id", "created_at")
VALUES
-- Peça usa 'MDF Branco'
('20000000-0000-0000-0000-000000000001', 'Porta de madeira', 2, '{70, 200}', '20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', '2025-10-01 09:15:20+00'),
-- Peça usa 'Compensado MDF'
('20000000-0000-0000-0000-000000000002', 'Prateleira', 5, '{30, 120}', '20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', '2025-10-01 09:15:30+00');

INSERT INTO "public"."orders_pieces_materials_snapshot" ("id", "measure_type", "unit", "waste_tax", "base_value", "measure", "cut_direction", "piece_id", "created_at")
VALUES
('30000000-0000-0000-0000-000000000001', 'M2', 'UN', 0.02, 60.00, '{2800, 2070, 18}', 'VH', '20000000-0000-0000-0000-000000000001', '2025-10-01 09:15:25+00'),
('30000000-0000-0000-0000-000000000002', 'M2', 'UN', 0.03, 75.00, '{2440, 1220, 18}', 'VH', '20000000-0000-0000-0000-000000000002', '2025-10-01 09:15:35+00');


-- Tabela: orders_projects (Projeto 2/2)
INSERT INTO "public"."orders_projects" 
("id", "name", "qtde", "costs", "profit_rate", "monthly_expense", "comission", "order_id", "created_at")
VALUES
('10000000-0000-0000-0000-000000000002', 'Projeto (Mesa de Cabeceira)', 2, '[{"name": "Gaveta", "qtde": 2, "value": 100}]'::jsonb, 25, 0, 0, '00000000-0000-0000-0000-000000000001', '2025-10-01 09:20:00+00');

-- Peças e Snapshots do Projeto 2/2
INSERT INTO "public"."orders_pieces" ("id", "name", "qtde", "measure", "material_id", "project_id", "created_at")
VALUES
-- Peça usa 'MDF Branco'
('20000000-0000-0000-0000-000000000003', 'Tampo Mesa Cabeceira', 1, '{40, 40}', '20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', '2025-10-01 09:20:10+00'),
-- Peça usa 'MDF Branco'
('20000000-0000-0000-0000-000000000004', 'Frente Gaveta', 1, '{15, 38}', '20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000002', '2025-10-01 09:20:20+00');

INSERT INTO "public"."orders_pieces_materials_snapshot" ("id", "measure_type", "unit", "waste_tax", "base_value", "measure", "cut_direction", "piece_id", "created_at")
VALUES
('30000000-0000-0000-0000-000000000003', 'M2', 'UN', 0.02, 60.00, '{2800, 2070, 18}', 'VH', '20000000-0000-0000-0000-000000000003', '2025-10-01 09:20:15+00'),
('30000000-0000-0000-0000-000000000004', 'M2', 'UN', 0.02, 60.00, '{2800, 2070, 18}', 'VH', '20000000-0000-0000-0000-000000000004', '2025-10-01 09:20:25+00');


--====================================================================
-- ORDER 2 (Cozinha Completa com Ilha Central) - Total 2 Projetos
-- USA CLIENTE: '00000000-0000-1000-0000-000000000002' (José Roberto Madeiras Ltda)
--====================================================================

-- Tabela: orders
INSERT INTO "public"."orders" 
("id", "status", "code", "name", "client_id", "expiration_days", "initial_date", "included", "excluded", "team_notes", "raw_amount", "delivery_days", "payment_method", "discount_percent", "installment_count", "advance_amount", "advance_payment_method", "notes", "user_id", "created_at")
VALUES
('00000000-0000-0000-0000-000000000002', 'APPROVED', '000000002', 'Cozinha Completa com Ilha Central', '00000000-0000-1000-0000-000000000002', 30, '2025-09-20 00:00:00+00', 'Instalação completa incluída', 'Utensílios de cozinha não incluídos', 'Confirmar medidas exatas da parede', 5000, 20, 'PIX', 5, 2, 1000, 'BANK_TRANSFERENCE', 'Entrega em horário comercial', '00000000-0000-0000-0000-000000000000', '2025-09-20 11:00:00+00');

-- Tabela: orders_projects (Projeto 1/2)
INSERT INTO "public"."orders_projects" 
("id", "name", "qtde", "costs", "profit_rate", "monthly_expense", "comission", "order_id", "created_at")
VALUES
('10000000-0000-0000-0000-000000000003', 'Projeto Cozinha (Ilha e Aéreos)', 1, '[{"name": "Balcão", "qtde": 1, "value": 2000}, {"name": "Armário aéreo", "qtde": 2, "value": 1500}, {"name": "Pia", "qtde": 1, "value": 1500}]'::jsonb, 25, 0, 0, '00000000-0000-0000-0000-000000000002', '2025-09-20 11:00:10+00');

-- Peças e Snapshots do Projeto 1/2
INSERT INTO "public"."orders_pieces" ("id", "name", "qtde", "measure", "material_id", "project_id", "created_at")
VALUES
-- Peça usa 'Madeira Carvalho'
('20000000-0000-0000-0000-000000000005', 'Balcão', 1, '{60, 300}', '20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000003', '2025-09-20 11:00:20+00'),
-- Peça usa 'Madeira Carvalho'
('20000000-0000-0000-0000-000000000006', 'Armário aéreo', 2, '{40, 150}', '20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000003', '2025-09-20 11:00:30+00'),
-- Peça usa 'Compensado Naval' (substituindo o granito que faltava)
('20000000-0000-0000-0000-000000000007', 'Tampo Pia', 1, '{60, 200}', '20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000003', '2025-09-20 11:00:40+00');

INSERT INTO "public"."orders_pieces_materials_snapshot" ("id", "measure_type", "unit", "waste_tax", "base_value", "measure", "cut_direction", "piece_id", "created_at")
VALUES
('30000000-0000-0000-0000-000000000005', 'ML', 'CM', 0.05, 120.00, '{220, 25, 3}', 'VH', '20000000-0000-0000-0000-000000000005', '2025-09-20 11:00:25+00'),
('30000000-0000-0000-0000-000000000006', 'ML', 'CM', 0.05, 120.00, '{220, 25, 3}', 'VH', '20000000-0000-0000-0000-000000000006', '2025-09-20 11:00:35+00'),
('30000000-0000-0000-0000-000000000007', 'M2', 'UN', 0.04, 150.00, '{2440, 1220, 20}', 'VH', '20000000-0000-0000-0000-000000000007', '2025-09-20 11:00:45+00');

-- Tabela: orders_projects (Projeto 2/2)
INSERT INTO "public"."orders_projects" 
("id", "name", "qtde", "costs", "profit_rate", "monthly_expense", "comission", "order_id", "created_at")
VALUES
('10000000-0000-0000-0000-000000000004', 'Projeto (Despensa)', 1, '[{"name": "Prateleira", "qtde": 6, "value": 400}]'::jsonb, 30, 0, 0, '00000000-0000-0000-0000-000000000002', '2025-09-20 11:05:00+00');

-- Peças e Snapshots do Projeto 2/2
INSERT INTO "public"."orders_pieces" ("id", "name", "qtde", "measure", "material_id", "project_id", "created_at")
VALUES
-- Peça usa 'Madeira Carvalho'
('20000000-0000-0000-0000-000000000008', 'Porta Despensa', 1, '{210, 80}', '20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000004', '2025-09-20 11:05:10+00'),
-- Peça usa 'Compensado MDF'
('20000000-0000-0000-0000-000000000009', 'Prateleira Interna', 6, '{50, 78}', '20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000004', '2025-09-20 11:05:20+00');

INSERT INTO "public"."orders_pieces_materials_snapshot" ("id", "measure_type", "unit", "waste_tax", "base_value", "measure", "cut_direction", "piece_id", "created_at")
VALUES
('30000000-0000-0000-0000-000000000008', 'ML', 'CM', 0.05, 120.00, '{220, 25, 3}', 'VH', '20000000-0000-0000-0000-000000000008', '2025-09-20 11:05:15+00'),
('30000000-0000-0000-0000-000000000009', 'M2', 'UN', 0.03, 75.00, '{2440, 1220, 18}', 'VH', '20000000-0000-0000-0000-000000000009', '2025-09-20 11:05:25+00');


--====================================================================
-- ORDER 3 (Estante Sob Medida para Escritório) - Total 3 Projetos
-- USA CLIENTE: '00000000-0000-1000-0000-000000000004' (Moveis Delmar ME)
--====================================================================

-- Tabela: orders
INSERT INTO "public"."orders" 
("id", "status", "code", "name", "client_id", "expiration_days", "initial_date", "included", "excluded", "team_notes", "raw_amount", "delivery_days", "payment_method", "discount_percent", "installment_count", "advance_amount", "advance_payment_method", "notes", "user_id", "created_at")
VALUES
('00000000-0000-0000-0000-000000000003', 'OPEN', '000000003', 'Estante Sob Medida para Escritório', '00000000-0000-1000-0000-000000000004', 30, '2025-10-05 00:00:00+00', 'Montagem incluída', 'Decoração e iluminação', 'Confirmar cor do aço', 1500, 10, 'DEBIT', 0, 1, 0, 'TO_AGREE', 'Entrega em horário comercial', '00000000-0000-0000-0000-000000000000', '2025-10-05 15:00:00+00');

-- Tabela: orders_projects (Projeto 1/3)
INSERT INTO "public"."orders_projects" 
("id", "name", "qtde", "costs", "profit_rate", "monthly_expense", "comission", "order_id", "created_at")
VALUES
('10000000-0000-0000-0000-000000000005', 'Projeto Estante', 1, '[{"name": "Prateleira de madeira", "qtde": 4, "value": 800}, {"name": "Portas de madeira", "qtde": 2, "value": 700}]'::jsonb, 18, 0, 0, '00000000-0000-0000-0000-000000000003', '2025-10-05 15:00:10+00');

-- Peças e Snapshots do Projeto 1/3
INSERT INTO "public"."orders_pieces" ("id", "name", "qtde", "measure", "material_id", "project_id", "created_at")
VALUES
-- Peça usa 'Madeira Pinus' (substituindo o aço que faltava)
('20000000-0000-0000-0000-000000000010', 'Prateleira de Pinus', 4, '{30, 200}', '20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000005', '2025-10-05 15:00:20+00'),
-- Peça usa 'MDF Branco' (substituindo o vidro que faltava)
('20000000-0000-0000-0000-000000000011', 'Portas de MDF', 2, '{70, 200}', '20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000005', '2025-10-05 15:00:30+00');

INSERT INTO "public"."orders_pieces_materials_snapshot" ("id", "measure_type", "unit", "waste_tax", "base_value", "measure", "cut_direction", "piece_id", "created_at")
VALUES
('30000000-0000-0000-0000-000000000010', 'ML', 'CM', 0.05, 25.50, '{200, 20, 2}', 'V', '20000000-0000-0000-0000-000000000010', '2025-10-05 15:00:25+00'),
('30000000-0000-0000-0000-000000000011', 'M2', 'UN', 0.02, 60.00, '{2800, 2070, 18}', 'VH', '20000000-0000-0000-0000-000000000011', '2025-10-05 15:00:35+00');


-- Tabela: orders_projects (Projeto 2/3)
INSERT INTO "public"."orders_projects" 
("id", "name", "qtde", "costs", "profit_rate", "monthly_expense", "comission", "order_id", "created_at")
VALUES
('10000000-0000-0000-0000-000000000006', 'Projeto (Mesa Escritório)', 2, '[{"name": "Tampo", "qtde": 1, "value": 200}]'::jsonb, 20, 0, 0, '00000000-0000-0000-0000-000000000003', '2025-10-05 15:05:00+00');

-- Peças e Snapshots do Projeto 2/3
INSERT INTO "public"."orders_pieces" ("id", "name", "qtde", "measure", "material_id", "project_id", "created_at")
VALUES
-- Peça usa 'Compensado MDF'
('20000000-0000-0000-0000-000000000012', 'Tampo Mesa', 1, '{70, 150}', '20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000006', '2025-10-05 15:05:10+00'),
-- Peça usa 'Compensado MDF'
('20000000-0000-0000-0000-000000000013', 'Pé Mesa', 2, '{75, 70}', '20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000006', '2025-10-05 15:05:20+00');

INSERT INTO "public"."orders_pieces_materials_snapshot" ("id", "measure_type", "unit", "waste_tax", "base_value", "measure", "cut_direction", "piece_id", "created_at")
VALUES
('30000000-0000-0000-0000-000000000012', 'M2', 'UN', 0.03, 75.00, '{2440, 1220, 18}', 'VH', '20000000-0000-0000-0000-000000000012', '2025-10-05 15:05:15+00'),
('30000000-0000-0000-0000-000000000013', 'M2', 'UN', 0.03, 75.00, '{2440, 1220, 18}', 'VH', '20000000-0000-0000-0000-000000000013', '2025-10-05 15:05:25+00');


-- Tabela: orders_projects (Projeto 3/3)
INSERT INTO "public"."orders_projects" 
("id", "name", "qtde", "costs", "profit_rate", "monthly_expense", "comission", "order_id", "created_at")
VALUES
('10000000-0000-0000-0000-000000000007', 'Projeto (Gaveteiro)', 2, '[{"name": "Rodízio", "qtde": 4, "value": 60}]'::jsonb, 20, 0, 0, '00000000-0000-0000-0000-000000000003', '2025-10-05 15:10:00+00');

-- Peças e Snapshots do Projeto 3/3
INSERT INTO "public"."orders_pieces" ("id", "name", "qtde", "measure", "material_id", "project_id", "created_at")
VALUES
-- Peça usa 'Compensado MDF'
('20000000-0000-0000-0000-000000000014', 'Caixaria Gaveteiro', 1, '{50, 40}', '20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000007', '2025-10-05 15:10:10+00'),
-- Peça usa 'Compensado MDF'
('20000000-0000-0000-0000-000000000015', 'Frente Gaveta', 2, '{15, 38}', '20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000007', '2025-10-05 15:10:20+00');

INSERT INTO "public"."orders_pieces_materials_snapshot" ("id", "measure_type", "unit", "waste_tax", "base_value", "measure", "cut_direction", "piece_id", "created_at")
VALUES
('30000000-0000-0000-0000-000000000014', 'M2', 'UN', 0.03, 75.00, '{2440, 1220, 18}', 'VH', '20000000-0000-0000-0000-000000000014', '2025-10-05 15:10:15+00'),
('30000000-0000-0000-0000-000000000015', 'M2', 'UN', 0.03, 75.00, '{2440, 1220, 18}', 'VH', '20000000-0000-0000-0000-000000000015', '2025-10-05 15:10:25+00');