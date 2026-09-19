-- Hispany: auth (trigger de perfil automático) + tabla de progreso por clase.

-- Cuando se registra un usuario en Supabase Auth, crear su fila en `usuarios`.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.usuarios (id, nombre, perfil, rol)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nombre', split_part(new.email, '@', 1)),
    'trabajo_viajes',
    'estudiante'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Progreso por clase (necesario para calcular `pasado` a nivel de sección:
-- una sección queda "pasada" cuando sus 4 clases están completadas).
create table progreso_clases (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references usuarios(id) on delete cascade,
  clase_id uuid not null references clases(id) on delete cascade,
  completada boolean not null default false,
  completada_en timestamptz,
  unique (usuario_id, clase_id)
);

alter table progreso_clases enable row level security;

create policy "progreso_clases: leer/editar lo propio"
  on progreso_clases for all
  using (auth.uid() = usuario_id)
  with check (auth.uid() = usuario_id);
