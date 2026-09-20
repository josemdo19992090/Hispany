-- Tercera pasada sobre "El abecedario" (A1), tras revisión de un agente
-- especialista en pedagogía + ruso + español:
-- 1) Lectura/Conversación tenían poco valor pedagógico real — ahora enseñan
--    a deletrear el propio nombre/email, un uso real del abecedario.
-- 2) Se reemplazan los 3 ejercicios (todos sobre H/Ñ) por 12 que cubren
--    B/V, C, G, H, J, LL, Ñ, Q, V, Y, Z.
-- Las notas en ruso de las letras difíciles (columna "Nota" de la tabla) NO
-- viven en la base — son datos fijos en src/lib/abecedario.ts — así que esa
-- corrección de mezcla de idiomas ya quedó resuelta solo con el deploy del
-- código, sin necesidad de SQL.

with clase_abc as (
  select c.id
  from clases c
  join secciones s on s.id = c.seccion_id
  join niveles n on n.id = s.nivel_id
  where n.codigo = 'A1' and s.orden = 0 and c.orden = 1
)
update clase_versiones cv set
  lectura_md = 'El abecedario sirve para algo muy práctico: deletrear tu nombre en voz alta. Por eso cada letra tiene su propio nombre.',
  lectura_ru = 'Алфавит нужен для практических вещей: продиктовать своё имя вслух. Поэтому у каждой буквы есть своё название.',
  conversacion_md = 'Con un compañero, deletreen en voz alta sus nombres. Usa la tabla de abajo para recordar el nombre de cada letra.',
  conversacion_ru = 'С напарником продиктуйте вслух свои имена. Используй таблицу ниже, чтобы вспомнить названия букв.'
from clase_abc
where cv.clase_id = clase_abc.id and cv.perfil = 'ninos';

with clase_abc as (
  select c.id
  from clases c
  join secciones s on s.id = c.seccion_id
  join niveles n on n.id = s.nivel_id
  where n.codigo = 'A1' and s.orden = 0 and c.orden = 1
)
update clase_versiones cv set
  lectura_md = 'El abecedario sirve para algo muy práctico: deletrear tu nombre o tu email en voz alta, por ejemplo por teléfono. Por eso cada letra tiene su propio nombre.',
  lectura_ru = 'Алфавит нужен для практических вещей: продиктовать своё имя или email вслух, например по телефону. Поэтому у каждой буквы есть своё название.',
  conversacion_md = 'Con tu compañero, deletreen en voz alta sus nombres y un email inventado. Usa la tabla de abajo para recordar el nombre de cada letra.',
  conversacion_ru = 'Со своим напарником продиктуйте вслух свои имена и один придуманный email. Используй таблицу ниже, чтобы вспомнить названия букв.'
from clase_abc
where cv.clase_id = clase_abc.id and cv.perfil = 'trabajo_viajes';

-- Reemplaza los ejercicios: borra los 3 viejos (todos H/Ñ) y carga 12
-- nuevos por perfil (24 en total), iguales para los dos perfiles porque el
-- abecedario no cambia entre niños y adultos.
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
      (v_clase_id, v_perfil, 'opcion_multiple', 1,
        '{"tipo":"opcion_multiple","pregunta":"¿Cómo suena la C en la palabra ''cine''?","pregunta_ru":"Как звучит буква C в слове ''cine''?","opciones":["/k/","/s/","/g/"],"respuesta_correcta":1}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'verdadero_falso', 2,
        '{"tipo":"verdadero_falso","afirmacion":"En español, B y V suenan igual.","afirmacion_ru":"В испанском B и V звучат одинаково.","es_verdadero":true}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'completar_espacio', 3,
        '{"tipo":"completar_espacio","texto":"La palabra ''gente'' empieza con el mismo sonido que la letra ___.","texto_ru":"Слово ''gente'' начинается со звука, который совпадает со звуком буквы ___.","respuestas":["j"]}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'emparejar', 4,
        '{"tipo":"emparejar","pares":[{"izquierda":"B","derecha":"bueno"},{"izquierda":"LL","derecha":"lluvia"},{"izquierda":"Ñ","derecha":"niño"},{"izquierda":"J","derecha":"jamón"},{"izquierda":"Q","derecha":"queso"}]}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'encontrar_error', 5,
        '{"tipo":"encontrar_error","texto":"La H suena como una K fuerte.","texto_ru":"Буква H звучит как сильная K.","palabra_incorrecta":"K","correccion":"muda (no suena)"}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'opcion_multiple', 6,
        '{"tipo":"opcion_multiple","pregunta":"En ''queso'', ¿qué pasa con la U?","pregunta_ru":"В слове ''queso'', что происходит с буквой U?","opciones":["Se pronuncia","Es muda","Se pronuncia como O"],"respuesta_correcta":1}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'verdadero_falso', 7,
        '{"tipo":"verdadero_falso","afirmacion":"La Y puede sonar como vocal (en ''y'') o como consonante (en ''yo'').","afirmacion_ru":"Буква Y может звучать как гласная (в ''y'') или как согласная (в ''yo'').","es_verdadero":true}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'completar_espacio', 8,
        '{"tipo":"completar_espacio","texto":"La letra ___ no existe en el alfabeto inglés ni en el ruso, y aparece en la palabra ''niño''.","texto_ru":"Буквы ___ нет ни в английском, ни в русском алфавите, она есть в слове ''niño''.","respuestas":["ñ"]}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'opcion_multiple', 9,
        '{"tipo":"opcion_multiple","pregunta":"¿Cómo suena la Z en ''zapato'' en Latinoamérica?","pregunta_ru":"Как звучит Z в слове ''zapato'' в Латинской Америке?","opciones":["/s/","/k/","/g/"],"respuesta_correcta":0}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'encontrar_error', 10,
        '{"tipo":"encontrar_error","texto":"La V suena distinta a la B en español.","texto_ru":"Буква V звучит иначе, чем B в испанском.","palabra_incorrecta":"B","correccion":"igual (V y B suenan igual)"}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'verdadero_falso', 11,
        '{"tipo":"verdadero_falso","afirmacion":"La LL suena parecido a la ''y'' en la mayoría de países hispanohablantes.","afirmacion_ru":"Буква LL в большинстве испаноязычных стран звучит похоже на «й».","es_verdadero":true}'::jsonb,
        false),
      (v_clase_id, v_perfil, 'emparejar', 12,
        '{"tipo":"emparejar","pares":[{"izquierda":"/x/","derecha":"J"},{"izquierda":"/b/","derecha":"V"},{"izquierda":"/ɲ/","derecha":"Ñ"},{"izquierda":"muda","derecha":"H"}]}'::jsonb,
        false);
  end loop;
end
$do$;
