# Hispany

App web para enseñar español a rusohablantes (a futuro, otros idiomas). Mascota: Chigui, un capibara. Presupuesto **$0**: solo planes/librerías gratuitas. Cualquier dependencia o servicio con costo requiere confirmación explícita del dueño antes de agregarse.

## Stack (fijo, no cambiar sin confirmar)

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Supabase (Postgres, Auth, Storage). Desplegado en Vercel (`hispany.vercel.app`, dominio estable — no usar las URLs con hash de cada deploy).

## Estructura de contenido

Niveles (A1, A2...) → secciones (10-15 por nivel) → 4 clases por sección. Cada clase: lectura, conversación, gramática, escritura, ejercicios. Contenido versionado por perfil de alumno (`ninos`, `trabajo_viajes`). Prueba de cierre por sección, prueba final por nivel. 6 tipos de ejercicio interactivo (ver `src/types/content.ts` → `EjercicioContenido`).

## Seguridad — no romper esto

**El paywall vive en las políticas RLS de Supabase, no en la interfaz.** `src/lib/data.ts` lee con el cliente autenticado de la request (`createSupabaseServerClient`), nunca con una key anónima sin sesión — así la base de datos decide qué contenido devuelve según quién pregunta. Ver `supabase/seguridad.sql` para el porqué (hubo una fuga real de contenido premium y una escalada de privilegios, ambas cerradas ahí).

Reglas derivadas:
- **Nunca** reintroducir un cliente de Supabase con la key anónima sin sesión para leer contenido de usuario o premium. Si hace falta un cliente sin sesión (ej. para un caso público muy específico), pregunta primero.
- Cualquier tabla nueva con datos de usuario necesita política RLS explícita — Supabase deniega por defecto, pero es fácil dejar un `using (true)` de más (ya pasó).
- Los alumnos solo pueden editar `nombre` y `perfil` en su propia fila de `usuarios`. `rol` y `es_premium` están bloqueados a nivel de columna (`revoke/grant` en `seguridad.sql`), nunca a nivel de fila solamente — una política `for all using(auth.uid()=id)` sin restricción de columnas permite auto-otorgarse admin/premium.
- El estado premium (pago, trial de 7 días, o admin) se calcula en un solo lugar: `src/lib/premium.ts` (`calcularEstadoPremium`) en el servidor, y su espejo en SQL `tiene_acceso_premium()` en la base de datos. Si cambia la regla de negocio, hay que actualizar los dos.

## Sistema de diseño — usar esto, no reinventar por pantalla

- `src/components/ui/Boton.tsx` y `ui/Tarjeta.tsx`: toda pantalla nueva los reutiliza en vez de escribir clases de Tailwind sueltas.
- Sombras (`shadow-soft` / `shadow-soft-lg`), no bordes (`border-2 border-chigui-tan`) — así se ve app moderna, no plantilla.
- Radios: `rounded-field` (campos/inputs) y `rounded-card` (tarjetas/contenedores). No usar otros radios sueltos.
- Iconos: `lucide-react`, nunca emojis como icono funcional.
- Color primario de acción: `brand-green` (#1A7F58, ya pasa contraste AA sobre blanco — no volver al verde claro `green-light` para texto/botones, ese es solo decorativo).
- Tipografía: Nunito (`next/font/google`, subsets `latin` + `cyrillic`). El subset cirílico es obligatorio, no quitarlo.
- Mascota Chigui: `src/components/ChiguiMascot.tsx`, prop `pose` (`saludando`, `celebrando`, `aprobando`, `animando`, `durmiendo`, `bloqueado`). Antes de agregar una pose nueva, verificar que el PNG con fondo transparente ya esté en `public/mascota/` (JPEG con fondo sólido no sirve, se nota el recuadro).

## React — cuidado con esto

Ya pasó un bug real por esto: **cada `key` de React debe ser única entre hermanos**, no solo "no vacía". Dos elementos hermanos con la misma key (ej. el mismo `ejercicio.id` en dos componentes distintos) rompe la reconciliación silenciosamente — React inserta en vez de reemplazar, sin ningún error visible. Si algo "se duplica" o "no se resetea" al cambiar de estado, revisar las `key` primero.

## Idioma de la interfaz

**Selector ES/RU, no bilingüe simultáneo.** La app muestra un solo idioma de UI a la vez (nunca los dos apilados en pantalla — eso se probó y no gustó). Hay un selector de idioma disponible en toda la web app, en el header (`src/components/ui/SelectorIdioma.tsx`).

Cómo funciona:
- `src/lib/i18n/idioma.ts`: tipo `Idioma = "es" | "ru"`, nombre de la cookie (`hispany-idioma`) y default (`es`).
- `src/lib/i18n/server.ts`: `obtenerIdioma()` lee la cookie desde Server Components (`cookies()` de `next/headers`).
- `src/lib/i18n/context.tsx`: `IdiomaProvider` (client, montado en `src/app/layout.tsx`) + hook `useIdioma()`. Cambiar de idioma escribe la cookie y llama `router.refresh()` para que las Server Components (páginas de niveles, clases, etc.) se vuelvan a renderizar en el idioma nuevo.
- `src/components/ui/Texto.tsx`: componente client que renderiza `ui[clave][idioma]` — úsalo en vez de escribir el patrón a mano cuando el texto no tiene variables interpoladas.
- Para texto con variables interpoladas (no cabe en `<Texto clave="..." />`): en Server Components, `obtenerIdioma()` y usar `ui.clave[idioma]` directo; en Client Components, `const { idioma } = useIdioma()` y lo mismo. Nunca apilar `.es` y `.ru` en el mismo render.

Diccionario de UI en `src/lib/i18n/diccionario.ts`, cada entrada `{ ru, es }` — es solo para el *chrome* de la app (botones, menús, mensajes), no para contenido pedagógico.

El panel `/admin` es solo para el dueño, se queda en español únicamente — no traducir nada ahí.

## Contenido real

El contenido de prueba actual es placeholder, no evaluar su calidad pedagógica. Para contenido real: nunca copiar texto de libros con copyright (ver conversación sobre "Español en Marcha" — son libros comerciales, usar solo como referencia de estructura curricular, generar contenido original con Gemini o buscar material con licencia abierta). El botón de IA en `/admin/ia` genera variantes de ejercicios con Gemini (free tier) con paso de revisión manual antes de publicar — nunca auto-publicar sin ese paso.

## Flujo de trabajo

- Fases pequeñas y siempre funcionales. Probar en el navegador (local y, cuando aplique, en `hispany.vercel.app`) antes de dar algo por terminado — no basta con que compile.
- `git push` a `main` dispara deploy automático en Vercel. Antes de un push a producción, correr `npm run build` localmente.
- Preguntar antes de decisiones de diseño/estructura no cubiertas aquí ni en el historial de la conversación.
