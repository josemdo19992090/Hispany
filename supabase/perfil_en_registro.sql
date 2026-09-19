-- Hispany: el trigger de registro ignoraba el perfil elegido por el alumno y
-- siempre asignaba 'trabajo_viajes'. Ahora lo lee de los metadatos que manda
-- el formulario de registro (src/app/login/page.tsx), con ese mismo valor
-- como respaldo si faltara.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.usuarios (id, nombre, perfil, rol)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email, '@', 1)),
    coalesce(
      (new.raw_user_meta_data->>'perfil')::perfil_alumno,
      'trabajo_viajes'
    ),
    'estudiante'
  );
  return new;
end;
$$;
