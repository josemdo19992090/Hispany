-- Hispany: otorgar rol de admin a un usuario existente (ya registrado vía la app).
update usuarios set rol = 'admin' where id = (select id from auth.users where email = 'jmdo.wab@gmail.com');
