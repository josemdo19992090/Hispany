-- Hispany: campo de prueba para simular estudiantes premium (sin pasarela de pago real).
alter table usuarios add column es_premium boolean not null default false;
