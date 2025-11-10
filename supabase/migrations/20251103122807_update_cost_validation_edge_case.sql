set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_valid_costs_jsonb(costs_jsonb jsonb)
 RETURNS boolean
 LANGUAGE plpgsql
 SET search_path = ''
 IMMUTABLE
AS $function$DECLARE
    obj jsonb;
    obj_keys text[];
    expected_keys text[] := ARRAY['name', 'qtde', 'value'];
BEGIN
    IF costs_jsonb IS NULL THEN
        RETURN true;
    END IF;

    IF jsonb_typeof(costs_jsonb) != 'array' THEN
        RETURN false;
    END IF;

    IF jsonb_array_length(costs_jsonb) = 0 THEN
        RETURN true;
    END IF;

    FOR obj IN SELECT * FROM jsonb_array_elements(costs_jsonb)
    LOOP
        IF jsonb_typeof(obj) != 'object' THEN
            RETURN false;
        END IF;

        SELECT array_agg(key ORDER BY key) INTO obj_keys
        FROM jsonb_object_keys(obj) key;

        IF obj_keys IS NULL OR obj_keys <> expected_keys THEN
            RETURN false;
        END IF;

        IF jsonb_typeof(obj -> 'name') != 'string' OR
           jsonb_typeof(obj -> 'qtde') != 'number' OR
           jsonb_typeof(obj -> 'value') != 'number' THEN
            RETURN false;
        END IF;
    END LOOP;

    RETURN true;
END;$function$
;


