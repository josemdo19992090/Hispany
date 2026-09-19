-- Hispany: correcciones de seguridad.
--
-- Problema 1: la política original de `usuarios` era `for all using (auth.uid() = id)`,
-- lo que permitía a cualquier alumno logueado editar CUALQUIER columna de su propia
-- fila — incluidas `rol` y `es_premium`. Es decir, podía regalarse premium y hacerse
-- admin desde la consola del navegador.
--
-- Problema 2: `ejercicios` y `clase_versiones` tenían `using (true)`, así que todo el
-- contenido premium (con las respuestas correctas) era descargable con la key pública
-- sin siquiera iniciar sesión. El bloqueo premium solo existía en la interfaz.

-- ==========================================================
-- 1. Helper: ¿el usuario actual tiene acceso premium?
-- ==========================================================
-- Misma regla que src/lib/premium.ts: cuenta paga, trial de 7 días desde el
-- registro, o admin. SECURITY DEFINER para poder leer `usuarios` sin quedar
-- atrapado en las políticas de esa misma tabla.
create or replace function public.tiene_acceso_premium()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from usuarios u
    where u.id = auth.uid()
      and (
        u.es_premium
        or u.rol = 'admin'
        or u.fecha_inicio > now() - interval '7 days'
      )
  );
$$;

create or replace function public.es_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from usuarios u where u.id = auth.uid() and u.rol = 'admin');
$$;

-- ==========================================================
-- 2. usuarios: cerrar la escalada de privilegios
-- ==========================================================
drop policy if exists "usuarios: leer/editar su propio perfil" on usuarios;

create policy "usuarios: leer su propio perfil"
  on usuarios for select
  using (auth.uid() = id);

create policy "usuarios: editar su propio perfil"
  on usuarios for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- La política de arriba limita la FILA, pero no las COLUMNAS. En Postgres, para
-- limitar columnas hay que quitar el permiso de tabla completa y volver a darlo
-- solo sobre las columnas editables. `rol`, `es_premium` y `fecha_inicio` quedan
-- fuera del alcance del alumno (solo se cambian desde el SQL editor / service role).
revoke update on usuarios from authenticated, anon;
grant update (nombre, perfil) on usuarios to authenticated;

-- ==========================================================
-- 3. Contenido: mover el paywall a la base de datos
-- ==========================================================
-- Los títulos (niveles, secciones, clases) siguen siendo públicos a propósito:
-- son el "escaparate" que necesita el modelo freemium. Lo que se protege es el
-- contenido real y las respuestas.

drop policy if exists "ejercicios: lectura pública" on ejercicios;

create policy "ejercicios: gratis para todos, premium solo con acceso"
  on ejercicios for select
  using (is_premium = false or tiene_acceso_premium());

drop policy if exists "clase_versiones: lectura pública" on clase_versiones;

create policy "clase_versiones: solo secciones gratis o con acceso premium"
  on clase_versiones for select
  using (
    tiene_acceso_premium()
    or exists (
      select 1
      from clases c
      join secciones s on s.id = c.seccion_id
      where c.id = clase_versiones.clase_id
        and s.es_gratis
    )
  );
