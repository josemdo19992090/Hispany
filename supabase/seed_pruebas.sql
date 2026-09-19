-- Hispany: ejercicios de prueba para la prueba de cierre de sección
-- (A1 > Saludos y presentaciones) y la prueba final de nivel (A1), perfil "ninos".

insert into ejercicios (seccion_id, perfil, tipo, orden, contenido, is_premium) values
  (
    'a1000000-0000-0000-0000-000000000001', 'ninos', 'opcion_multiple', 1,
    '{"tipo":"opcion_multiple","pregunta":"¿Cómo te despides en español?","opciones":["Adiós","Hola","Por favor"],"respuesta_correcta":0}'::jsonb,
    false
  ),
  (
    'a1000000-0000-0000-0000-000000000001', 'ninos', 'verdadero_falso', 2,
    '{"tipo":"verdadero_falso","afirmacion":"\"¿De dónde eres?\" pregunta por tu origen.","es_verdadero":true}'::jsonb,
    true
  ),
  (
    'a1000000-0000-0000-0000-000000000001', 'ninos', 'completar_espacio', 3,
    '{"tipo":"completar_espacio","texto":"Mi ___ es Chigui.","respuestas":["nombre"]}'::jsonb,
    true
  );

insert into ejercicios (nivel_id, perfil, tipo, orden, contenido, is_premium) values
  (
    '11111111-1111-1111-1111-111111111111', 'ninos', 'opcion_multiple', 1,
    '{"tipo":"opcion_multiple","pregunta":"¿Cuál es la primera letra del alfabeto español?","opciones":["A","B","Z"],"respuesta_correcta":0}'::jsonb,
    false
  ),
  (
    '11111111-1111-1111-1111-111111111111', 'ninos', 'verdadero_falso', 2,
    '{"tipo":"verdadero_falso","afirmacion":"Chigui es un capibara venezolano.","es_verdadero":true}'::jsonb,
    true
  );
