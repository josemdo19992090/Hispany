-- Primera clase real de la sección intro "Alfabeto y sonidos" de A1.
-- Contenido original (no copiado de libros comerciales), usando "Español en
-- Marcha" solo como referencia de qué temas cubrir. La nota de pronunciación
-- en ruso (notas_ru) compara sonidos difíciles del español con el ruso —
-- ver src/types/content.ts para el porqué de ese campo separado.

alter table clase_versiones add column if not exists notas_ru text;

with seccion_abc as (
  select s.id
  from secciones s
  join niveles n on n.id = s.nivel_id
  where n.codigo = 'A1' and s.orden = 0
),
clase_abc as (
  insert into clases (seccion_id, orden, titulo)
  select id, 1, 'El abecedario' from seccion_abc
  on conflict (seccion_id, orden) do update set titulo = excluded.titulo
  returning id
)
insert into clase_versiones
  (clase_id, perfil, lectura_md, conversacion_md, gramatica_md, escritura_md, notas_ru)
select id, 'ninos'::perfil_alumno,
  '¡Vamos a conocer las letras del español! El español tiene 27 letras y, casi siempre, cada una suena igual sin importar dónde esté en la palabra.

Hay una letra muy especial que no existe en otros idiomas: la **Ñ**. Tiene una rayita ondulada arriba (la *virgulilla*) y suena distinto a la N: *niño*, *año*, *Chigui es muy risueño*.

Otra letra curiosa es la **H**: nunca se pronuncia. Es una letra silenciosa.',
  'Con un compañero, digan su nombre deletreando letra por letra. Por ejemplo: CHIGUI se dice CHE-HACHE-I-GE-U-I. Túrnense para adivinar qué nombre deletreó el otro.',
  'Las **vocales** (a, e, i, o, u) siempre suenan igual, cortas y claras — nunca se alargan como en inglés.

Las **consonantes** casi siempre suenan como se espera, pero hay grupos con reglas fijas:
ca, que, qui, co, cu suenan como "k"
za, ce, ci, zo, zu tienen un sonido propio (cambia según el país)
ga, gue, gui, go, gu suenan con la "g" fuerte; ge, gi suenan como una "j"
ja, je, ji, jo, ju siempre suenan fuerte, como una "j" con aire

La **H** nunca suena. La **Ñ** es una letra propia del español.',
  'Escribe tu nombre completo y, debajo, deletréalo letra por letra, como hiciste en el ejercicio de conversación.',
  $$Сложные буквы и особенности испанского алфавита 🇪🇸
Некоторые буквы работают не так, как в русском — вот на что обратить внимание:

🔸 B и V — звучат ОДИНАКОВО (в отличие от русского, где б и в разные звуки)
bueno и vaso — оба начинаются с мягкого звука «б», без сильного нажима губ

🔸 C — два звука:
перед a, o, u звучит как «к»: casa (ка-са), copa (ко-па)
перед e, i — произношение зависит от страны: в Латинской Америке, Андалусии и на Канарах — «с» (cielo, cena); в остальной Испании — межзубное «с» (язык между зубами, похоже на английское th). Оба варианта правильные — это региональная норма (distinción в Испании, seseo в Латинской Америке)

🔸 G — два звука в зависимости от следующей буквы:
перед e, i звучит как «х» (как J): gente (хэн-тэ), girar (хи-рар)
перед a, o, u звучит как русская «г»: gato (га-то), amigo (а-ми-го)

🔸 GU — перед e, i буква U не произносится: guitarra (ги-тарра), guerra (гэ-рра)
⚠️ Исключение: если над u стоят две точки (ü), звук возвращается — pingüino (пин-гуи-но)

🔸 H — почти всегда немая буква, не произносится: hola (о-ла), hermano (эр-ма-но). Звучит только в некоторых заимствованных словах (напр. hámster)

🔸 J — звучит как русская «х», но более резко и с придыханием: jamón (ха-мон), jugo (ху-го)

🔸 LL — произношение сильно зависит от страны: в большинстве стран — как русская «й» (llamar, lluvia — это называется yeísmo, так говорит большинство испаноговорящих); в Аргентине и Уругвае — как «ж» или «ш» (llamar → жа-мар/ша-мар)

🔸 Ñ — мягкая «нь», отдельная буква (не n + мягкий знак): año (а-ньо), niño (ни-ньо)

🔸 QU — буква U не произносится, звучит просто как «к»: queso (кэ-со), aquí (а-ки)
💡 Сочетание C + e/i никогда не даёт звук «к» в испанском

🔸 Y — может быть гласной («и») или согласной (звук «й», как LL): y (и — союз «и»), yo (йо — «я»)

🔸 Z — та же особенность, что у C перед e/i: «с» в Латинской Америке и Андалусии, межзубное «с» в остальной Испании: zapato

💡 Совет: не пытайся запомнить всё сразу — эти правила закрепятся сами по мере практики, а звучание отличается от страны к стране$$
from clase_abc
union all
select id, 'trabajo_viajes'::perfil_alumno,
  'El español usa el alfabeto latino: 27 letras, de la A a la Z. Casi todas se pronuncian siempre igual — algo que no pasa en inglés, donde una misma letra suena distinto según la palabra.

Una letra no tiene equivalente en otros idiomas: la **Ñ** (con la *virgulilla*, esa rayita ondulada arriba), como en *señor* o *compañía*. Otra particularidad: la **H** nunca se pronuncia.',
  '"¿Cómo se escribe?" es una de las preguntas más comunes en el trabajo. Practica deletreando en voz alta tu nombre, apellido y correo electrónico.',
  'Las **vocales** (a, e, i, o, u) siempre suenan igual, cortas y claras — a diferencia del inglés, no se alargan ni cambian de sonido.

Las **consonantes** casi siempre coinciden con lo esperado, salvo estos grupos:
ca, que, qui, co, cu suenan como "k"
za, ce, ci, zo, zu tienen un sonido propio (varía según el país)
ga, gue, gui, go, gu suenan con la "g" fuerte; ge, gi suenan como una "j"
ja, je, ji, jo, ju siempre suenan fuerte, como una "j" aspirada

La **H** nunca se pronuncia. La **Ñ** es exclusiva del español.',
  'Escribe cómo deletrearías tu correo electrónico en español, letra por letra.',
  $$Сложные буквы и особенности испанского алфавита 🇪🇸
Некоторые буквы работают не так, как в русском — вот на что обратить внимание:

🔸 B и V — звучат ОДИНАКОВО (в отличие от русского, где б и в разные звуки)
bueno и vaso — оба начинаются с мягкого звука «б», без сильного нажима губ

🔸 C — два звука:
перед a, o, u звучит как «к»: casa (ка-са), copa (ко-па)
перед e, i — произношение зависит от страны: в Латинской Америке, Андалусии и на Канарах — «с» (cielo, cena); в остальной Испании — межзубное «с» (язык между зубами, похоже на английское th). Оба варианта правильные — это региональная норма (distinción в Испании, seseo в Латинской Америке)

🔸 G — два звука в зависимости от следующей буквы:
перед e, i звучит как «х» (как J): gente (хэн-тэ), girar (хи-рар)
перед a, o, u звучит как русская «г»: gato (га-то), amigo (а-ми-го)

🔸 GU — перед e, i буква U не произносится: guitarra (ги-тарра), guerra (гэ-рра)
⚠️ Исключение: если над u стоят две точки (ü), звук возвращается — pingüino (пин-гуи-но)

🔸 H — почти всегда немая буква, не произносится: hola (о-ла), hermano (эр-ма-но). Звучит только в некоторых заимствованных словах (напр. hámster)

🔸 J — звучит как русская «х», но более резко и с придыханием: jamón (ха-мон), jugo (ху-го)

🔸 LL — произношение сильно зависит от страны: в большинстве стран — как русская «й» (llamar, lluvia — это называется yeísmo, так говорит большинство испаноговорящих); в Аргентине и Уругвае — как «ж» или «ш» (llamar → жа-мар/ша-мар)

🔸 Ñ — мягкая «нь», отдельная буква (не n + мягкий знак): año (а-ньо), niño (ни-ньо)

🔸 QU — буква U не произносится, звучит просто как «к»: queso (кэ-со), aquí (а-ки)
💡 Сочетание C + e/i никогда не даёт звук «к» в испанском

🔸 Y — может быть гласной («и») или согласной (звук «й», как LL): y (и — союз «и»), yo (йо — «я»)

🔸 Z — та же особенность, что у C перед e/i: «с» в Латинской Америке и Андалусии, межзубное «с» в остальной Испании: zapato

💡 Совет: не пытайся запомнить всё сразу — эти правила закрепятся сами по мере практики, а звучание отличается от страны к стране$$
from clase_abc
on conflict (clase_id, perfil) do update set
  lectura_md = excluded.lectura_md,
  conversacion_md = excluded.conversacion_md,
  gramatica_md = excluded.gramatica_md,
  escritura_md = excluded.escritura_md,
  notas_ru = excluded.notas_ru;

-- Ejercicios de comprobación (mismos para los dos perfiles: el abecedario no
-- cambia entre niños y adultos). Se insertan solo si la clase todavía no
-- tiene ejercicios, para poder correr este script más de una vez sin
-- duplicar (no hay unique constraint natural en ejercicios para on conflict).
do $do$
declare
  v_clase_id uuid;
begin
  select c.id into v_clase_id
  from clases c
  join secciones s on s.id = c.seccion_id
  join niveles n on n.id = s.nivel_id
  where n.codigo = 'A1' and s.orden = 0 and c.orden = 1;

  if not exists (select 1 from ejercicios where clase_id = v_clase_id) then
    insert into ejercicios (clase_id, perfil, tipo, orden, contenido, is_premium)
    values
      (v_clase_id, 'ninos', 'opcion_multiple', 1,
        '{"tipo":"opcion_multiple","pregunta":"¿Qué letra nunca se pronuncia en español?","opciones":["H","Ñ","J"],"respuesta_correcta":0}'::jsonb,
        false),
      (v_clase_id, 'ninos', 'verdadero_falso', 2,
        '{"tipo":"verdadero_falso","afirmacion":"La Ñ es una letra propia del español y no existe en el alfabeto inglés.","es_verdadero":true}'::jsonb,
        false),
      (v_clase_id, 'ninos', 'completar_espacio', 3,
        '{"tipo":"completar_espacio","texto":"La letra ___ suena como en la palabra ''niño''.","respuestas":["ñ"]}'::jsonb,
        false),
      (v_clase_id, 'trabajo_viajes', 'opcion_multiple', 1,
        '{"tipo":"opcion_multiple","pregunta":"¿Qué letra nunca se pronuncia en español?","opciones":["H","Ñ","J"],"respuesta_correcta":0}'::jsonb,
        false),
      (v_clase_id, 'trabajo_viajes', 'verdadero_falso', 2,
        '{"tipo":"verdadero_falso","afirmacion":"La Ñ es una letra propia del español y no existe en el alfabeto inglés.","es_verdadero":true}'::jsonb,
        false),
      (v_clase_id, 'trabajo_viajes', 'completar_espacio', 3,
        '{"tipo":"completar_espacio","texto":"La letra ___ suena como en la palabra ''niño''.","respuestas":["ñ"]}'::jsonb,
        false);
  end if;
end
$do$;
