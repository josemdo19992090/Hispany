-- Hispany: políticas RLS para que un usuario con rol='admin' pueda
-- crear/editar/borrar ejercicios y gestionar (actualizar estado de) reportes.

create policy "ejercicios: admin puede insertar"
  on ejercicios for insert
  with check (exists (select 1 from usuarios where id = auth.uid() and rol = 'admin'));

create policy "ejercicios: admin puede editar"
  on ejercicios for update
  using (exists (select 1 from usuarios where id = auth.uid() and rol = 'admin'))
  with check (exists (select 1 from usuarios where id = auth.uid() and rol = 'admin'));

create policy "ejercicios: admin puede borrar"
  on ejercicios for delete
  using (exists (select 1 from usuarios where id = auth.uid() and rol = 'admin'));

create policy "reportes: admin puede leer y actualizar todos"
  on reportes_ejercicio for select
  using (exists (select 1 from usuarios where id = auth.uid() and rol = 'admin'));

create policy "reportes: admin puede actualizar estado"
  on reportes_ejercicio for update
  using (exists (select 1 from usuarios where id = auth.uid() and rol = 'admin'))
  with check (exists (select 1 from usuarios where id = auth.uid() and rol = 'admin'));
