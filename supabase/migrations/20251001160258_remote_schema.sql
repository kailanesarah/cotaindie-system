

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."table_categories" (
    "category_id" character varying NOT NULL,
    "category_name" character varying,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid"
);


ALTER TABLE "public"."table_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."table_clients" (
    "client_id" "text" NOT NULL,
    "client_name" "text",
    "client_category" "text",
    "client_cpf" "text",
    "client_cnpj" "text",
    "client_phone" "text",
    "client_email" "text",
    "client_city" "text",
    "client_zipCode" "text",
    "client_neighborhood" "text",
    "client_address" "text",
    "client_complement" "text",
    "client_notes" "text",
    "user_id" "uuid"
);


ALTER TABLE "public"."table_clients" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."table_condicoes_pagamento" (
    "pag_id" "text" NOT NULL,
    "quotation_id" "text" NOT NULL,
    "pag_previsao_de_entrega" "text" NOT NULL,
    "pag_plano_de_pagamento" "text" NOT NULL,
    "pag_adiantamento" "text" NOT NULL,
    "pag_percentual_de_desconto" numeric(5,2),
    "pag_valor_do_desconto" numeric(12,2),
    "pag_pagamento_principal" "text" NOT NULL,
    "pag_pagamento_do_adiantamento" "text" NOT NULL,
    "pag_pagamento_do_restante" "text" NOT NULL,
    "pag_parcelas_do_restante" integer,
    "pag_restante" "text" NOT NULL,
    "pag_data_da_venda" "text" NOT NULL,
    "pag_observacoes" "text",
    "pag_created_at" timestamp with time zone DEFAULT "now"(),
    "pag_updated_at" timestamp with time zone DEFAULT "now"(),
    "user_id" "uuid",
    CONSTRAINT "table_condicoes_pagamento_pag_parcelas_do_restante_check" CHECK (("pag_parcelas_do_restante" > 0)),
    CONSTRAINT "table_condicoes_pagamento_pag_percentual_de_desconto_check" CHECK ((("pag_percentual_de_desconto" >= (0)::numeric) AND ("pag_percentual_de_desconto" <= (100)::numeric))),
    CONSTRAINT "table_condicoes_pagamento_pag_valor_do_desconto_check" CHECK (("pag_valor_do_desconto" >= (0)::numeric))
);


ALTER TABLE "public"."table_condicoes_pagamento" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."table_costs" (
    "cost_name" "text",
    "cost_quantity" bigint,
    "cost_value_uni" double precision,
    "cost_total_value" double precision,
    "cost_created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" DEFAULT "gen_random_uuid"(),
    "project_id" "text",
    "cost_id" "text" NOT NULL
);


ALTER TABLE "public"."table_costs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."table_infos_adicionais" (
    "info_id" "text" NOT NULL,
    "info_materiais_inclusos" "text",
    "info_materiais_exclusos" "text",
    "info_observacoes_equipe_interna" "text",
    "info_created_at" timestamp with time zone DEFAULT "now"(),
    "info_updated_at" timestamp with time zone DEFAULT "now"(),
    "user_id" "uuid",
    "quotation_id" "text"
);


ALTER TABLE "public"."table_infos_adicionais" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."table_pieces" (
    "piece_id" "text" NOT NULL,
    "piece_name" "text",
    "product_current_value" double precision,
    "piece_height" double precision,
    "piece_width" double precision,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" DEFAULT "gen_random_uuid"(),
    "product_id" "text",
    "project_id" "text"
);


ALTER TABLE "public"."table_pieces" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."table_products" (
    "product_id" "text" NOT NULL,
    "product_name" "text",
    "product_description" "text",
    "product_measurements" "text",
    "product_height" double precision,
    "product_width" double precision,
    "product_price" double precision,
    "product_waste_rate" bigint,
    "user_id" "uuid",
    "product_category" character varying
);


ALTER TABLE "public"."table_products" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."table_projects" (
    "project_id" "text" NOT NULL,
    "project_name" "text",
    "client_id" "text",
    "project_status" "text",
    "project_quantity" bigint,
    "project_profit_margin" double precision,
    "project_allocated_monthly" double precision,
    "project_commission_amount" double precision,
    "project_created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid"
);


ALTER TABLE "public"."table_projects" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."table_quotation" (
    "quo_id" "text" NOT NULL,
    "quo_name" "text",
    "quo_startDate" "text",
    "quo_validity" "text",
    "user_id" "uuid" DEFAULT "gen_random_uuid"(),
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "client_id" "text"
);


ALTER TABLE "public"."table_quotation" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."table_quotation_product" (
    "quo_pro_id" "text" NOT NULL,
    "product_id" "text",
    "quotation_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid"
);


ALTER TABLE "public"."table_quotation_product" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."table_quotation_project" (
    "quo_proj_id" "text" NOT NULL,
    "project_id" "text",
    "quotation_id" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid"
);


ALTER TABLE "public"."table_quotation_project" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."table_users" (
    "user_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_email" character varying,
    "user_name" character varying,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."table_users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."table_clients"
    ADD CONSTRAINT "table-clients_pkey" PRIMARY KEY ("client_id");



ALTER TABLE ONLY "public"."table_products"
    ADD CONSTRAINT "table-products_pkey" PRIMARY KEY ("product_id");



ALTER TABLE ONLY "public"."table_categories"
    ADD CONSTRAINT "table_categorys_pkey" PRIMARY KEY ("category_id");



ALTER TABLE ONLY "public"."table_condicoes_pagamento"
    ADD CONSTRAINT "table_condicoes_pagamento_pkey" PRIMARY KEY ("pag_id");



ALTER TABLE ONLY "public"."table_costs"
    ADD CONSTRAINT "table_costs_pkey" PRIMARY KEY ("cost_id");



ALTER TABLE ONLY "public"."table_infos_adicionais"
    ADD CONSTRAINT "table_infos_adicionais_pkey" PRIMARY KEY ("info_id");



ALTER TABLE ONLY "public"."table_pieces"
    ADD CONSTRAINT "table_pieces_pkey" PRIMARY KEY ("piece_id");



ALTER TABLE ONLY "public"."table_projects"
    ADD CONSTRAINT "table_projects_pkey" PRIMARY KEY ("project_id");



ALTER TABLE ONLY "public"."table_quotation"
    ADD CONSTRAINT "table_quotation_pkey" PRIMARY KEY ("quo_id");



ALTER TABLE ONLY "public"."table_quotation_product"
    ADD CONSTRAINT "table_quotation_product_pkey" PRIMARY KEY ("quo_pro_id");



ALTER TABLE ONLY "public"."table_quotation_project"
    ADD CONSTRAINT "table_quotation_project_pkey" PRIMARY KEY ("quo_proj_id");



ALTER TABLE ONLY "public"."table_users"
    ADD CONSTRAINT "table_users_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."table_categories"
    ADD CONSTRAINT "table_categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."table_users"("user_id");



ALTER TABLE ONLY "public"."table_clients"
    ADD CONSTRAINT "table_clients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."table_users"("user_id");



ALTER TABLE ONLY "public"."table_condicoes_pagamento"
    ADD CONSTRAINT "table_condicoes_pagamento_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "public"."table_quotation"("quo_id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."table_condicoes_pagamento"
    ADD CONSTRAINT "table_condicoes_pagamento_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."table_users"("user_id");



ALTER TABLE ONLY "public"."table_costs"
    ADD CONSTRAINT "table_costs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."table_projects"("project_id");



ALTER TABLE ONLY "public"."table_costs"
    ADD CONSTRAINT "table_costs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."table_users"("user_id");



ALTER TABLE ONLY "public"."table_infos_adicionais"
    ADD CONSTRAINT "table_infos_adicionais_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "public"."table_quotation"("quo_id");



ALTER TABLE ONLY "public"."table_infos_adicionais"
    ADD CONSTRAINT "table_infos_adicionais_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."table_users"("user_id");



ALTER TABLE ONLY "public"."table_pieces"
    ADD CONSTRAINT "table_piece_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."table_products"("product_id");



ALTER TABLE ONLY "public"."table_pieces"
    ADD CONSTRAINT "table_piece_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."table_projects"("project_id");



ALTER TABLE ONLY "public"."table_pieces"
    ADD CONSTRAINT "table_piece_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."table_users"("user_id");



ALTER TABLE ONLY "public"."table_products"
    ADD CONSTRAINT "table_products_product_category_fkey" FOREIGN KEY ("product_category") REFERENCES "public"."table_categories"("category_id");



ALTER TABLE ONLY "public"."table_products"
    ADD CONSTRAINT "table_products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."table_users"("user_id");



ALTER TABLE ONLY "public"."table_projects"
    ADD CONSTRAINT "table_projects_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."table_clients"("client_id");



ALTER TABLE ONLY "public"."table_projects"
    ADD CONSTRAINT "table_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."table_users"("user_id");



ALTER TABLE ONLY "public"."table_quotation"
    ADD CONSTRAINT "table_quotation_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "public"."table_clients"("client_id");



ALTER TABLE ONLY "public"."table_quotation_product"
    ADD CONSTRAINT "table_quotation_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."table_products"("product_id");



ALTER TABLE ONLY "public"."table_quotation_product"
    ADD CONSTRAINT "table_quotation_product_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "public"."table_quotation"("quo_id");



ALTER TABLE ONLY "public"."table_quotation_product"
    ADD CONSTRAINT "table_quotation_product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."table_users"("user_id");



ALTER TABLE ONLY "public"."table_quotation_project"
    ADD CONSTRAINT "table_quotation_project_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "public"."table_projects"("project_id");



ALTER TABLE ONLY "public"."table_quotation_project"
    ADD CONSTRAINT "table_quotation_project_quotation_id_fkey" FOREIGN KEY ("quotation_id") REFERENCES "public"."table_quotation"("quo_id");



ALTER TABLE ONLY "public"."table_quotation_project"
    ADD CONSTRAINT "table_quotation_project_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."table_users"("user_id");



ALTER TABLE ONLY "public"."table_quotation"
    ADD CONSTRAINT "table_quotation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."table_users"("user_id");



CREATE POLICY "Permissão para manipulação de dados" ON "public"."table_quotation" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Permissão para pesquisa e alteração de dados" ON "public"."table_categories" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Permissão para pesquisa e alteração de dados" ON "public"."table_costs" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Permissão para pesquisa e alteração de dados" ON "public"."table_pieces" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Permissão para pesquisa e alteração de dados" ON "public"."table_products" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Permissão para pesquisa e alteração de dados" ON "public"."table_projects" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Permitir atualizar clientes" ON "public"."table_clients" FOR UPDATE USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "Permitir inserir clientes" ON "public"."table_clients" FOR INSERT WITH CHECK (("client_id" IS NOT NULL));



CREATE POLICY "Permitir selecionar clientes" ON "public"."table_clients" FOR SELECT USING (true);



CREATE POLICY "insert" ON "public"."table_users" FOR INSERT WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "permissão manipulação dados" ON "public"."table_condicoes_pagamento" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "permissão manipulação dados" ON "public"."table_infos_adicionais" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "permissão manipulação dados" ON "public"."table_quotation_product" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



CREATE POLICY "permissão manipulação dados" ON "public"."table_quotation_project" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));



ALTER TABLE "public"."table_categories" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."table_clients" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."table_condicoes_pagamento" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."table_costs" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."table_infos_adicionais" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."table_pieces" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."table_products" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."table_projects" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."table_quotation" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."table_quotation_product" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."table_quotation_project" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."table_users" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "tudo" ON "public"."table_clients" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."table_categories" TO "anon";
GRANT ALL ON TABLE "public"."table_categories" TO "authenticated";
GRANT ALL ON TABLE "public"."table_categories" TO "service_role";



GRANT ALL ON TABLE "public"."table_clients" TO "anon";
GRANT ALL ON TABLE "public"."table_clients" TO "authenticated";
GRANT ALL ON TABLE "public"."table_clients" TO "service_role";



GRANT ALL ON TABLE "public"."table_condicoes_pagamento" TO "anon";
GRANT ALL ON TABLE "public"."table_condicoes_pagamento" TO "authenticated";
GRANT ALL ON TABLE "public"."table_condicoes_pagamento" TO "service_role";



GRANT ALL ON TABLE "public"."table_costs" TO "anon";
GRANT ALL ON TABLE "public"."table_costs" TO "authenticated";
GRANT ALL ON TABLE "public"."table_costs" TO "service_role";



GRANT ALL ON TABLE "public"."table_infos_adicionais" TO "anon";
GRANT ALL ON TABLE "public"."table_infos_adicionais" TO "authenticated";
GRANT ALL ON TABLE "public"."table_infos_adicionais" TO "service_role";



GRANT ALL ON TABLE "public"."table_pieces" TO "anon";
GRANT ALL ON TABLE "public"."table_pieces" TO "authenticated";
GRANT ALL ON TABLE "public"."table_pieces" TO "service_role";



GRANT ALL ON TABLE "public"."table_products" TO "anon";
GRANT ALL ON TABLE "public"."table_products" TO "authenticated";
GRANT ALL ON TABLE "public"."table_products" TO "service_role";



GRANT ALL ON TABLE "public"."table_projects" TO "anon";
GRANT ALL ON TABLE "public"."table_projects" TO "authenticated";
GRANT ALL ON TABLE "public"."table_projects" TO "service_role";



GRANT ALL ON TABLE "public"."table_quotation" TO "anon";
GRANT ALL ON TABLE "public"."table_quotation" TO "authenticated";
GRANT ALL ON TABLE "public"."table_quotation" TO "service_role";



GRANT ALL ON TABLE "public"."table_quotation_product" TO "anon";
GRANT ALL ON TABLE "public"."table_quotation_product" TO "authenticated";
GRANT ALL ON TABLE "public"."table_quotation_product" TO "service_role";



GRANT ALL ON TABLE "public"."table_quotation_project" TO "anon";
GRANT ALL ON TABLE "public"."table_quotation_project" TO "authenticated";
GRANT ALL ON TABLE "public"."table_quotation_project" TO "service_role";



GRANT ALL ON TABLE "public"."table_users" TO "anon";
GRANT ALL ON TABLE "public"."table_users" TO "authenticated";
GRANT ALL ON TABLE "public"."table_users" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
