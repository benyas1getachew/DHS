/* recursive cte building a department > category path string.
   dim_product is denormalized so i fake the hierarchy edges inside the cte */
WITH RECURSIVE CategoryHierarchy AS (
    -- top-level departments
    SELECT DISTINCT 
        department as node_name,
        CAST(NULL AS VARCHAR) as parent_node,
        1 as level,
        department as path
    FROM dim_product
    
    UNION ALL

    SELECT DISTINCT
        p.category as node_name,
        p.department as parent_node,
        h.level + 1 as level,
        h.path || ' > ' || p.category as path
    FROM dim_product p
    JOIN CategoryHierarchy h ON p.department = h.node_name
    WHERE h.level = 1
)
SELECT 
    level,
    node_name,
    parent_node,
    path
FROM CategoryHierarchy
ORDER BY path
LIMIT 20;
