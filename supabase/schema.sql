-- Hispany: esquema inicial de base de datos (Supabase / Postgres)
-- Ejecutar en el SQL Editor del proyecto Supabase (plan free).

create extension if not exists "pgcrypto";

-- ==========================================================
-- Enums
-- ==========================================================
create type perfil_alumno as enum ('ninos', 'trabajo_viajes');

create type tipo_ejercicio as enum (
  'opcion_multiple',
  'completar_espacio',
  'emparejar',
  'ordenar_palabras',
  'verdadero_falso',
  'encontrar_error'
);

create type estado_revision_ia as enum ('pendiente', 'aprobado', 'rechazado');
create type estado_reporte as enum ('abierto', 'revisado', 'descartado');
create type rol_usuario as enum ('estudiante', 'admin');

-- ==========================================================
-- Contenido
-- ==========================================================
create table niveles (
  id uuid primary key default gen_random_uuid(),
  codigo text not null unique,        -- 'A1', 'A2', 'B1'...
  nombre text not null,
  orden int not null,
  descripcion text
);

create table secciones (
  id uuid primary key default gen_random_uuid(),
  nivel_id uuid not null references niveles(id) on delete cascade,
  orden int not null,
  titulo text not null,
  es_intro boolean not null default false, -- alfabeto (A1) / repaso (A2+)
  es_gratis boolean not null default false, -- true solo en la 1a sección real
  unique (nivel_id, orden)
);

create table clases (
  id uuid primary key default gen_random_uuid(),
  seccion_id uuid not null references secciones(id) on delete cascade,
  orden int not null check (orden between 1 and 4),
  titulo text not null,
  unique (seccion_id, orden)
);

-- Contenido de una clase, versionado por perfil de alumno.
create table clase_versiones (
  id uuid primary key default gen_random_uuid(),
  clase_id uuid not null references clases(id) on delete cascade,
  perfil perfil_alumno not null,
  lectura_md text not null default '',
  conversacion_md text not null default '',
  gramatica_md text not null default '',
  escritura_md text not null default '',
  imagen_url text,   -- preparado para Supabase Storage, sin uso todavía
  audio_url text,    -- preparado para Supabase Storage, sin uso todavía
  unique (clase_id, perfil)
);

-- ==========================================================
-- Ejercicios
-- ==========================================================
-- Un ejercicio pertenece a UNA de estas tres cosas (exactamente una):
--  - una clase (ejercicio de comprobación de la clase)
--  - una sección (prueba de cierre de sección, mezcla las 4 clases)
--  - un nivel (prueba final de nivel, mezcla todas las secciones)
create table ejercicios (
  id uuid primary key default gen_random_uuid(),
  clase_id uuid references clases(id) on delete cascade,
  seccion_id uuid references secciones(id) on delete cascade,
  nivel_id uuid references niveles(id) on delete cascade,
  perfil perfil_alumno not null,
  tipo tipo_ejercicio not null,
  orden int not null default 1,
  contenido jsonb not null,           -- forma específica según `tipo`
  imagen_url text,                    -- preparado, sin uso todavía
  audio_url text,                     -- preparado, sin uso todavía
  is_premium boolean not null default true,
  es_variante_ia boolean not null default false,
  estado_revision_ia estado_revision_ia, -- null si no es IA; 'pendiente' hasta que admin revise
  variante_base_id uuid references ejercicios(id) on delete set null,
  created_by uuid, -- referencia a auth.users del admin/profesor que generó/editó
  created_at timestamptz not null default now(),
  constraint ejercicio_pertenece_a_un_solo_contenedor check (
    (case when clase_id is not null then 1 else 0 end) +
    (case when seccion_id is not null then 1 else 0 end) +
    (case when nivel_id is not null then 1 else 0 end) = 1
  )
);

create table reportes_ejercicio (
  id uuid primary key default gen_random_uuid(),
  ejercicio_id uuid not null references ejercicios(id) on delete cascade,
  usuario_id uuid not null references auth.users(id) on delete cascade,
  mensaje text not null,
  estado estado_reporte not null default 'abierto',
  created_at timestamptz not null default now()
);

-- ==========================================================
-- Usuarios y progreso
-- ==========================================================
-- Perfil de aplicación 1:1 con auth.users
create table usuarios (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null,
  perfil perfil_alumno not null default 'trabajo_viajes',
  rol rol_usuario not null default 'estudiante',
  fecha_inicio timestamptz not null default now()
);

create table progreso_secciones (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references usuarios(id) on delete cascade,
  seccion_id uuid not null references secciones(id) on delete cascade,
  pasado boolean not null default false, -- true solo si completó TODOS los ejercicios
  repeticiones_aprobadas int not null default 0, -- solo cuentan intentos >= 60%
  rango int not null default 1 check (rango between 1 and 5),
  unique (usuario_id, seccion_id)
);

-- Historial de intentos de prueba (sección o nivel), para calcular repeticiones_aprobadas.
create table intentos_prueba (
  id uuid primary key default gen_random_uuid(),
  usuario_id uuid not null references usuarios(id) on delete cascade,
  seccion_id uuid references secciones(id) on delete cascade,
  nivel_id uuid references niveles(id) on delete cascade,
  puntaje numeric not null, -- 0..1
  aprobado boolean not null, -- puntaje >= 0.60
  created_at timestamptz not null default now(),
  constraint intento_pertenece_a_seccion_o_nivel check (
    (seccion_id is not null and nivel_id is null) or
    (seccion_id is null and nivel_id is not null)
  )
);

-- ==========================================================
-- Row Level Security (activar antes de exponer la app a usuarios reales)
-- ==========================================================
alter table usuarios enable row level security;
alter table progreso_secciones enable row level security;
alter table intentos_prueba enable row level security;
alter table reportes_ejercicio enable row level security;

create policy "usuarios: leer/editar su propio perfil"
  on usuarios for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "progreso: leer/editar su propio progreso"
  on progreso_secciones for all
  using (auth.uid() = usuario_id)
  with check (auth.uid() = usuario_id);

create policy "intentos: leer/crear sus propios intentos"
  on intentos_prueba for all
  using (auth.uid() = usuario_id)
  with check (auth.uid() = usuario_id);

create policy "reportes: crear y leer los propios"
  on reportes_ejercicio for all
  using (auth.uid() = usuario_id)
  with check (auth.uid() = usuario_id);

-- Contenido (niveles, secciones, clases, clase_versiones, ejercicios) queda de lectura
-- pública por ahora; se restringirá por perfil/rol admin cuando se implemente auth+admin.
