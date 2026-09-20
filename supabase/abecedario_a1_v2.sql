-- Rehace el contenido de "El abecedario" (A1, sección intro) tras feedback:
-- menos texto (es una clase inicial), y una tabla real del abecedario en vez
-- de un párrafo de gramática. Reemplaza notas_ru por un espejo en ruso por
-- bloque (lectura_ru, conversacion_ru, gramatica_ru, escritura_ru) — ver el
-- comentario en ClaseVersion (src/types/content.ts) sobre cuándo un bloque
-- pasa a ruso entero vs. cuándo el español dentro de él se mantiene.

alter table clase_versiones drop column if exists notas_ru;
alter table clase_versiones add column if not exists lectura_ru text;
alter table clase_versiones add column if not exists conversacion_ru text;
alter table clase_versiones add column if not exists gramatica_ru text;
alter table clase_versiones add column if not exists escritura_ru text;

with clase_abc as (
  select c.id
  from clases c
  join secciones s on s.id = c.seccion_id
  join niveles n on n.id = s.nivel_id
  where n.codigo = 'A1' and s.orden = 0 and c.orden = 1
)
update clase_versiones cv set
  lectura_md = 'El español tiene 27 letras. Casi todas suenan igual siempre.',
  lectura_ru = 'В испанском 27 букв. Почти все звучат одинаково всегда.',
  conversacion_md = 'Deletrea tu nombre en voz alta con un compañero. Ejemplo: ANA = A-ENE-A.',
  conversacion_ru = 'Продиктуй своё имя по буквам вслух с напарником. Пример: ANA = A-ENE-A.',
  gramatica_md = 'Mirá la tabla: cada letra con su nombre, su sonido y un ejemplo.',
  gramatica_ru = 'Смотри таблицу: каждая буква — с названием, звуком и примером.',
  escritura_md = 'Escribe tu nombre y deletréalo debajo, letra por letra.',
  escritura_ru = 'Напиши своё имя и продиктуй его ниже по буквам.'
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
  lectura_md = 'El español usa el alfabeto latino: 27 letras que casi siempre suenan igual.',
  lectura_ru = 'В испанском используется латинский алфавит: 27 букв, которые почти всегда звучат одинаково.',
  conversacion_md = 'Practica deletreando tu nombre y tu correo. En el trabajo es común escuchar: "¿Cómo se escribe?".',
  conversacion_ru = 'Потренируйся диктовать по буквам своё имя и почту. На работе часто слышно: "¿Cómo se escribe?" (Как это пишется?).',
  gramatica_md = 'Mirá la tabla: cada letra con su nombre, su sonido y un ejemplo.',
  gramatica_ru = 'Смотри таблицу: каждая буква — с названием, звуком и примером.',
  escritura_md = 'Escribe tu correo electrónico y deletréalo, letra por letra.',
  escritura_ru = 'Напиши свой email и продиктуй его по буквам.'
from clase_abc
where cv.clase_id = clase_abc.id and cv.perfil = 'trabajo_viajes';
