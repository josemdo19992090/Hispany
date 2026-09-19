-- Hispany: ejercicios de prueba adicionales para probar los 4 tipos que faltaban
-- (completar_espacio, emparejar, ordenar_palabras, encontrar_error) en la clase
-- "Hola, ¿cómo estás?" (A1 > Saludos y presentaciones), perfil "ninos".

insert into ejercicios (clase_id, perfil, tipo, orden, contenido, is_premium) values
  (
    'c1000000-0000-0000-0000-000000000001', 'ninos', 'completar_espacio', 3,
    '{"tipo":"completar_espacio","texto":"Hola, ¿cómo ___ tú?","respuestas":["estás"]}'::jsonb,
    false
  ),
  (
    'c1000000-0000-0000-0000-000000000001', 'ninos', 'emparejar', 4,
    '{"tipo":"emparejar","pares":[{"izquierda":"Hola","derecha":"Hello"},{"izquierda":"Adiós","derecha":"Goodbye"},{"izquierda":"Gracias","derecha":"Thanks"}]}'::jsonb,
    true
  ),
  (
    'c1000000-0000-0000-0000-000000000001', 'ninos', 'ordenar_palabras', 5,
    '{"tipo":"ordenar_palabras","palabras":["cómo","¿","estás","?"],"orden_correcto":[1,0,2,3]}'::jsonb,
    true
  ),
  (
    'c1000000-0000-0000-0000-000000000001', 'ninos', 'encontrar_error', 6,
    '{"tipo":"encontrar_error","texto":"Hola, cómo estas tú","palabra_incorrecta":"estas","correccion":"estás"}'::jsonb,
    true
  );
