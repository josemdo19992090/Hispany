-- Hispany: datos de prueba (mismos que src/lib/mock-data.ts)
-- Ejecutar en el SQL Editor DESPUÉS de schema.sql.

insert into niveles (id, codigo, nombre, orden, descripcion) values
  ('11111111-1111-1111-1111-111111111111', 'A1', 'A1 - Principiante', 1, 'Los primeros pasos: alfabeto, saludos y frases básicas.'),
  ('22222222-2222-2222-2222-222222222222', 'A2', 'A2 - Elemental', 2, 'Conversaciones cotidianas y gramática esencial.');

insert into secciones (id, nivel_id, orden, titulo, es_intro, es_gratis) values
  ('a1000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 0, 'Alfabeto y sonidos', true, true),
  ('a1000000-0000-0000-0000-000000000001', '11111111-1111-1111-1111-111111111111', 1, 'Saludos y presentaciones', false, true),
  ('a1000000-0000-0000-0000-000000000002', '11111111-1111-1111-1111-111111111111', 2, 'La familia', false, false),
  ('a1000000-0000-0000-0000-000000000003', '11111111-1111-1111-1111-111111111111', 3, 'Números y colores', false, false),
  ('a2000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 0, 'Repaso de A1', true, true),
  ('a2000000-0000-0000-0000-000000000001', '22222222-2222-2222-2222-222222222222', 1, 'En el restaurante', false, true),
  ('a2000000-0000-0000-0000-000000000002', '22222222-2222-2222-2222-222222222222', 2, 'De viaje', false, false);

insert into clases (id, seccion_id, orden, titulo) values
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 1, 'Hola, ¿cómo estás?'),
  ('c1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 2, 'Mi nombre es...'),
  ('c1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 3, '¿De dónde eres?'),
  ('c1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000001', 4, 'Despedidas'),
  ('c2000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', 1, 'Miembros de la familia'),
  ('c2000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 2, 'Describir a mi familia'),
  ('c2000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 3, 'Posesivos'),
  ('c2000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002', 4, 'Mi árbol familiar'),
  ('c3000000-0000-0000-0000-000000000001', 'a2000000-0000-0000-0000-000000000001', 1, 'Pedir la comida'),
  ('c3000000-0000-0000-0000-000000000002', 'a2000000-0000-0000-0000-000000000001', 2, 'Hablar de gustos'),
  ('c3000000-0000-0000-0000-000000000003', 'a2000000-0000-0000-0000-000000000001', 3, 'El condicional simple'),
  ('c3000000-0000-0000-0000-000000000004', 'a2000000-0000-0000-0000-000000000001', 4, 'Pedir la cuenta');

insert into clase_versiones (clase_id, perfil, lectura_md, conversacion_md, gramatica_md, escritura_md) values
  (
    'c1000000-0000-0000-0000-000000000001', 'ninos',
    'Chigui saluda a sus amigos del río: **¡Hola! ¿Cómo estás?**',
    'Practica con un amigo: uno saluda, el otro responde.',
    'El verbo *estar* para expresar cómo nos sentimos.',
    'Dibuja a Chigui y escribe cómo se siente hoy.'
  ),
  (
    'c1000000-0000-0000-0000-000000000001', 'trabajo_viajes',
    'En una reunión de trabajo: **Hola, ¿cómo está usted?**',
    'Simula un primer saludo formal en una oficina.',
    'Formal vs. informal: *tú* / *usted* con el verbo *estar*.',
    'Escribe un correo breve de presentación.'
  );

insert into ejercicios (id, clase_id, perfil, tipo, orden, contenido, is_premium, es_variante_ia, estado_revision_ia, variante_base_id) values
  (
    'e1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000001', 'ninos', 'opcion_multiple', 1,
    '{"tipo":"opcion_multiple","pregunta":"¿Cómo saluda Chigui a sus amigos?","opciones":["¡Hola!","Adiós","Gracias"],"respuesta_correcta":0}'::jsonb,
    false, false, null, null
  ),
  (
    'e1000000-0000-0000-0000-000000000002', 'c1000000-0000-0000-0000-000000000001', 'ninos', 'verdadero_falso', 2,
    '{"tipo":"verdadero_falso","afirmacion":"Chigui es un capibara.","es_verdadero":true}'::jsonb,
    true, true, 'aprobado', 'e1000000-0000-0000-0000-000000000001'
  );
