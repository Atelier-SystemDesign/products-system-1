DROP FUNCTION IF EXISTS time_query(text, integer);
CREATE OR REPLACE FUNCTION time_query(query_text TEXT, num_iterations INT)
RETURNS TABLE (query TEXT, iteration INT, duration INTERVAL)
AS $$
DECLARE
    i INT := 1;
    start_time TIMESTAMP;
    end_time TIMESTAMP;
    random_id INT;
BEGIN
    WHILE i <= num_iterations LOOP
        -- Generate a random id within the desired range
        random_id := floor(random() * 20) + 900000;

        -- Capture the start time
        start_time := clock_timestamp();

        -- Execute the query with the random id
        EXECUTE REPLACE(query_text, 'RANDOM_ID', random_id::TEXT);

        -- Capture the end time
        end_time := clock_timestamp();

        -- Calculate the duration
        duration := end_time - start_time;

        -- Return the query, iteration, and duration
        query := query_text;
        iteration := i;
        RETURN NEXT;
        i := i + 1;
    END LOOP;
END;
$$ LANGUAGE plpgsql;


WITH query_list AS (
    SELECT CONCAT('SELECT * FROM features WHERE product_id = ', FLOOR(900000 + RANDOM() * 100000)::INT, ' ORDER BY id ASC') AS query
    UNION ALL
    SELECT CONCAT('SELECT * FROM products WHERE (id >= ', FLOOR(900000 + RANDOM() * 10000)::INT, ') LIMIT 10')
    UNION ALL
    SELECT CONCAT('SELECT * FROM products WHERE id = ', FLOOR(920000 + RANDOM() * 100000)::INT)
    UNION ALL
    SELECT CONCAT('SELECT (related_product_id) FROM related_products WHERE current_product_id = ', FLOOR(920000 + RANDOM() * 20000)::INT)
    UNION ALL
    -- SELECT CONCAT('SELECT * FROM product_styles WHERE productId = ', FLOOR(920000 + RANDOM() * 20000)::INT)
    -- UNION ALL
    SELECT CONCAT('
        SELECT
            s.id AS style_id,
            s.name,
            s.original_price,
            s.sale_price,
            s.default_style AS "default?",
            json_agg(
                json_build_object(
                    "thumbnail_url", p.thumbnail_url,
                    "url", p.url
                )
            ) AS photos,
            json_object_agg(
                sk.id,
                json_build_object(
                    "quantity", sk.quantity,
                    "size", sk.size
                )
            ) AS skus
        FROM styles AS s
        LEFT JOIN photos AS p ON p.styleId = s.id
        LEFT JOIN skus AS sk ON sk.styleId = s.id
        WHERE s.productId = ', FLOOR(920000 + RANDOM() * 20000)::INT ,'
        GROUP BY s.id, s.name, s.original_price, s.sale_price, s.default_style;
    ')
)
SELECT ql.query, AVG(tq.duration) AS avg_duration
FROM query_list ql
CROSS JOIN LATERAL time_query(ql.query, 1) AS tq
GROUP BY ql.query;
