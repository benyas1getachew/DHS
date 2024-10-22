{% macro generate_sk(id_col, date_col=None) %}
    {% if date_col %}
        md5(cast({{ id_col }} as varchar) || cast({{ date_col }} as varchar))
    {% else %}
        md5(cast({{ id_col }} as varchar))
    {% endif %}
{% endmacro %}
