// Crear la Base de datos
CREATE DATABASE idsdb;  

// Creando los tipos de rol
CREATE TYPE user_rol AS ENUM (
    'Administrador'
    'ESI Superior',
    'ESI',
    'Director', 
    'Director General'
    'Usuario'
);

// Tablas
CREATE TABLE usuario (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ci VARCHAR(11) UNIQUE NOT NULL,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    contra VARCHAR(100),
    rol user_rol NOT NULL DEFAULT 'Usuario'
);

CREATE TABLE tipo_criterio (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo VARCHAR(100),
    cantidad INT
);

CREATE TABLE valor_criterio (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tipo VARCHAR(100),
    criterio VARCHAR(200)
);
