-- El nombre y la descripción de nivel (ej. "A1 - Principiante") son metadata
-- de navegación, no contenido pedagógico: el alumno los usa para elegir qué
-- nivel abrir, igual que "NIVELES" o "Elige un nivel...". Por eso deben
-- traducirse con el selector de idioma, igual que hacen Duolingo/Busuu/Babbel
-- (separan el idioma de interfaz del idioma que se está aprendiendo).
--
-- El código del nivel (columna `codigo`: "A1", "A2"...) NO se traduce: es el
-- estándar CEFR, universal en cualquier idioma.

alter table niveles add column if not exists nombre_ru text;
alter table niveles add column if not exists descripcion_ru text;

update niveles set
  nombre_ru = 'A1 - Начальный уровень',
  descripcion_ru = 'Первые шаги: алфавит, приветствия и базовые фразы.'
where codigo = 'A1';

update niveles set
  nombre_ru = 'A2 - Элементарный уровень',
  descripcion_ru = 'Повседневное общение и основы грамматики.'
where codigo = 'A2';
