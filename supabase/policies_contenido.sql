-- Hispany: políticas de lectura pública para las tablas de contenido.
-- Supabase activa RLS por defecto en tablas nuevas; sin política, ni el
-- rol anon puede leer. El contenido (niveles/secciones/clases/ejercicios)
-- debe ser legible por cualquiera por ahora (el bloqueo freemium se hace
-- en la app, no en la base de datos).

alter table niveles enable row level security;
alter table secciones enable row level security;
alter table clases enable row level security;
alter table clase_versiones enable row level security;
alter table ejercicios enable row level security;

create policy "niveles: lectura pública"
  on niveles for select
  using (true);

create policy "secciones: lectura pública"
  on secciones for select
  using (true);

create policy "clases: lectura pública"
  on clases for select
  using (true);

create policy "clase_versiones: lectura pública"
  on clase_versiones for select
  using (true);

create policy "ejercicios: lectura pública"
  on ejercicios for select
  using (true);
