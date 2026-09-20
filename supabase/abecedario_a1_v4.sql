-- Cuarta pasada sobre "El abecedario" (A1): correcciones de LÓGICA de los 12
-- ejercicios (no de idioma, eso ya quedó bien en v3), tras revisión de un
-- agente especialista en pedagogía:
-- 1) La pregunta sobre el sonido de la C no acotaba región ("en Latinoamérica"),
--    a diferencia de la de Z que sí — inconsistencia real: mismo fenómeno
--    (variación C/Z ante e/i), tratado distinto en dos preguntas de la
--    misma clase.
-- 2) El emparejar de sonidos mezclaba símbolos fonéticos (/x/, /b/, /ɲ/) con
--    la palabra suelta "muda" para H — se saca H de ese ejercicio (ya se
--    cubre en "encontrar error") y se usa notación consistente en las 4
--    parejas restantes.
-- 3) La pregunta de completar-espacio sobre G/gente pedía inferir el sonido
--    de G ante e/i Y cruzarlo con la fila de J — dos saltos de fila, mucha
--    inferencia para la primera clase. Se reemplaza por una de opción
--    múltiple de un solo paso (leer directo la fila de G).
-- 4) Las dos "encontrar error" tenían una corrección ambigua: nombraban la
--    palabra que el alumno tocó pero no el sujeto real de la regla
--    ("K → muda" sin decir que la muda es la H). Reescritas como oración
--    completa.
-- De paso, el símbolo fonético /ɲ/ se cambió a la notación simple /ny/ en
-- toda la tabla del abecedario (src/lib/abecedario.ts, ya deployado con el
-- código) porque la fuente del PDF no tenía ese glifo y lo mostraba como
-- basura — por consistencia, el ejercicio de emparejar usa la misma
-- notación /ny/ en vez de /ɲ/.

do $do$
declare
  v_clase_id uuid;
  v_perfil perfil_alumno;
begin
  select c.id into v_clase_id
  from clases c
  join secciones s on s.id = c.seccion_id
  join niveles n on n.id = s.nivel_id
  where n.codigo = 'A1' and s.orden = 0 and c.orden = 1;

  delete from ejercicios where clase_id = v_clase_id;

  foreach v_perfil in array array['ninos', 'trabajo_viajes']::perfil_alumno[]
  loop
    insert into ejercicios (clase_id, perfil, tipo, orden, contenido, is_premium)
    values
      (v_clase_id, v_perfil, 'emparejar', 1,
        '{"tipo":"emparejar","pares":[{"izquierda":"B","derecha":"bueno"},{"izquierda":"LL","derecha":"lluvia"},{"izquierda":"Ñ","derecha":"niño"},{"izquierda":"J","derecha":"jamón"},{"izquierda":"Q","derecha":"queso"}]}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'verdadero_falso', 2,
        '{"tipo":"verdadero_falso","afirmacion":"En español, B y V suenan igual.","afirmacion_ru":"В испанском B и V звучат одинаково.","es_verdadero":true}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'verdadero_falso', 3,
        '{"tipo":"verdadero_falso","afirmacion":"La LL suena parecido a la ''y'' en la mayoría de países hispanohablantes.","afirmacion_ru":"Буква LL в большинстве испаноязычных стран звучит похоже на «й».","es_verdadero":true}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'verdadero_falso', 4,
        '{"tipo":"verdadero_falso","afirmacion":"La Y puede sonar como vocal (en ''y'') o como consonante (en ''yo'').","afirmacion_ru":"Буква Y может звучать как гласная (в ''y'') или как согласная (в ''yo'').","es_verdadero":true}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'opcion_multiple', 5,
        '{"tipo":"opcion_multiple","pregunta":"En ''queso'', ¿qué pasa con la U?","pregunta_ru":"В слове ''queso'', что происходит с буквой U?","opciones":["Se pronuncia","Es muda","Se pronuncia como O"],"respuesta_correcta":1}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'opcion_multiple', 6,
        '{"tipo":"opcion_multiple","pregunta":"¿Cómo suena la C en la palabra ''cine'' en Latinoamérica?","pregunta_ru":"Как звучит буква C в слове ''cine'' в Латинской Америке?","opciones":["/k/","/s/","/g/"],"respuesta_correcta":1}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'opcion_multiple', 7,
        '{"tipo":"opcion_multiple","pregunta":"¿Cómo suena la Z en ''zapato'' en Latinoamérica?","pregunta_ru":"Как звучит Z в слове ''zapato'' в Латинской Америке?","opciones":["/s/","/k/","/g/"],"respuesta_correcta":0}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'completar_espacio', 8,
        '{"tipo":"completar_espacio","texto":"La letra ___ no existe en el alfabeto inglés ni en el ruso, y aparece en la palabra ''niño''.","texto_ru":"Буквы ___ нет ни в английском, ни в русском алфавите, она есть в слове ''niño''.","respuestas":["ñ"]}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'encontrar_error', 9,
        '{"tipo":"encontrar_error","texto":"La H suena como una K fuerte.","texto_ru":"Буква H звучит как сильная K.","palabra_incorrecta":"K","correccion":"La H no suena: es una letra muda. No suena como la K."}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'encontrar_error', 10,
        '{"tipo":"encontrar_error","texto":"La V suena distinta a la B en español.","texto_ru":"Буква V звучит иначе, чем B в испанском.","palabra_incorrecta":"B","correccion":"La V y la B suenan igual en español. No son distintas."}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'emparejar', 11,
        '{"tipo":"emparejar","pares":[{"izquierda":"/x/","derecha":"J"},{"izquierda":"/b/","derecha":"V"},{"izquierda":"/ny/","derecha":"Ñ"},{"izquierda":"/k/","derecha":"Q"}]}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'opcion_multiple', 12,
        '{"tipo":"opcion_multiple","pregunta":"¿Cómo suena la G en la palabra ''gente''?","pregunta_ru":"Как звучит буква G в слове ''gente''?","opciones":["/g/","/x/","/k/"],"respuesta_correcta":1}'::jsonb,
        false);
  end loop;
end
$do$;
