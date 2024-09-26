-- CREAR LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS ProyectoAYD2;
USE ProyectoAYD2;

-- TABLA USERS (Incluye todos los usuarios: Conductores, Administradores, Usuarios, Asistentes)
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    numero_telefono VARCHAR(15) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('M', 'F', 'Otro') NOT NULL,
    fotografia_dpi LONGBLOB,
    password VARCHAR(255) NOT NULL, -- Almacenar el password encriptado
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA PARA ROLES (RBAC)
CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL
);

-- TABLA PARA PERMISOS (RBAC)
CREATE TABLE Permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    permission_name VARCHAR(100) NOT NULL
);

-- TABLA PARA RELACIÓN ENTRE ROLES Y PERMISOS (RBAC)
CREATE TABLE RolePermissions (
    role_id INT NOT NULL,
    permission_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES Roles(id),
    FOREIGN KEY (permission_id) REFERENCES Permissions(id),
    PRIMARY KEY (role_id, permission_id)
);

-- TABLA PARA ASIGNAR ROLES A USUARIOS (RBAC)
CREATE TABLE UserRoles (
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (role_id) REFERENCES Roles(id),
    PRIMARY KEY (user_id, role_id)
);

-- TABLA DE DIRECCIONES (Puede ser utilizada tanto para conductores como para viajes)
CREATE TABLE Direcciones (
    id_direccion INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) DEFAULT NULL,
    zona VARCHAR(50) NOT NULL
);

-- TABLA PARA LOS VEHÍCULOS
CREATE TABLE Vehiculos (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    id_conductor INT NOT NULL,
    marca VARCHAR(50) NOT NULL,
    ano INT NOT NULL,
    numero_placa VARCHAR(20) NOT NULL,
    fotografia_vehiculo LONGBLOB,
    FOREIGN KEY (id_conductor) REFERENCES Users(id)
);

-- TABLA PARA LOS MÉTODOS DE PAGO
CREATE TABLE MetodosPago (
    id_metodo_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    numero_tarjeta VARCHAR(20) NOT NULL, -- Se recomienda encriptar este campo
    fecha_expiracion DATE NOT NULL,
    cvv VARCHAR(5) NOT NULL, -- Se recomienda encriptar este campo
    tipo ENUM('Debito', 'Credito') NOT NULL,
    nombre_propietario VARCHAR(100) NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Users(id)
);

-- TABLA PARA TARIFAS (Asociada a las direcciones)
CREATE TABLE Tarifas (
    id_tarifa INT AUTO_INCREMENT PRIMARY KEY,
    punto_partida INT NOT NULL,
    punto_llegada INT NOT NULL,
    monto DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (punto_partida) REFERENCES Direcciones(id_direccion),
    FOREIGN KEY (punto_llegada) REFERENCES Direcciones(id_direccion)
);

-- TABLA PARA GESTIONAR VIAJES
CREATE TABLE Viajes (
    id_viaje INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_conductor INT NOT NULL,
    id_tarifa INT NOT NULL,
    punto_partida INT NOT NULL,
    punto_llegada INT NOT NULL,
    estado ENUM('pendiente', 'en curso', 'finalizado','cancelado') DEFAULT 'pendiente',
    fecha_hora_inicio TIMESTAMP NOT NULL,
    fecha_hora_fin TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Users(id),
    FOREIGN KEY (id_conductor) REFERENCES Users(id),
    FOREIGN KEY (id_tarifa) REFERENCES Tarifas(id_tarifa),
    FOREIGN KEY (punto_partida) REFERENCES Direcciones(id_direccion),
    FOREIGN KEY (punto_llegada) REFERENCES Direcciones(id_direccion)
);

-- TABLA PARA REPORTES (Reportes de problemas relacionados a los viajes)
CREATE TABLE Reportes (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    id_reportante INT NOT NULL, -- Usuario que hace el reporte
    id_reporteado INT NOT NULL, -- Usuario sobre quien se reporta
    descripcion TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo ENUM('incidente', 'queja', 'otro') NOT NULL,
    FOREIGN KEY (id_reportante) REFERENCES Users(id),
    FOREIGN KEY (id_reporteado) REFERENCES Users(id)
);

-- TABLA PARA SOLICITUDES DE EMPLEO (Para que los conductores soliciten trabajar)
CREATE TABLE SolicitudesEmpleo (
    id_solicitud INT AUTO_INCREMENT PRIMARY KEY,
    id_conductor INT NOT NULL,
    estado ENUM('pendiente', 'aprobado', 'rechazado') DEFAULT 'pendiente',
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_conductor) REFERENCES Users(id)
);

-- TABLA PARA PAGOS (Gestión de pagos de los viajes)
CREATE TABLE Pagos (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    id_viaje INT NULL,
    id_conductor INT NOT NULL,
    monto_pago DECIMAL(10, 2) NOT NULL,
    estado_pago ENUM('pendiente', 'completado') DEFAULT 'pendiente',
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_viaje) REFERENCES Viajes(id_viaje) ON DELETE SET NULL,
    FOREIGN KEY (id_conductor) REFERENCES Users(id)
);


-- TABLA PARA CALIFICACIONES (Los usuarios califican a los conductores)
CREATE TABLE Calificaciones (
    id_calificacion INT AUTO_INCREMENT PRIMARY KEY,
    id_conductor INT NOT NULL,
    id_usuario INT NOT NULL,
    id_viaje INT NOT NULL,
    puntaje INT NOT NULL,
    comentario TEXT,
    FOREIGN KEY (id_conductor) REFERENCES Users(id),
    FOREIGN KEY (id_usuario) REFERENCES Users(id),
    FOREIGN KEY (id_viaje) REFERENCES Viajes(id_viaje)
);

-- INSERTAR ROLES BÁSICOS
INSERT INTO Roles (role_name) VALUES ('Administrador'), ('Asistente'), ('Conductor'), ('Usuario');

-- INSERTAR PERMISOS BÁSICOS
INSERT INTO Permissions (permission_name) VALUES
('crear_viaje'),
('cancelar_viaje'),
('ver_reporte'),
('gestionar_conductor'),
('gestionar_usuario'),
('realizar_pago'),
('ver_calificacion'),
('ver_solicitudes_empleo');

-- ASIGNAR PERMISOS A ROLES (EJEMPLO)
INSERT INTO RolePermissions (role_id, permission_id) VALUES
(1, 3), -- Administrador puede ver reportes
(1, 4), -- Administrador puede gestionar conductores
(1, 5), -- Administrador puede gestionar usuarios
(2, 4), -- Asistente puede gestionar conductores
(3, 6), -- Conductor puede realizar pagos
(3, 7), -- Conductor puede ver calificaciones
(4, 1), -- Usuario puede crear viaje
(4, 2); -- Usuario puede cancelar viaje

-- Crear usuarios (EJEMPLO)
INSERT INTO Users (correo, nombre_completo, numero_telefono, fecha_nacimiento, genero, fotografia_dpi, password)
VALUES
('admin@viajes.com', 'Carlos Pérez', '555-1234', '1980-01-01', 'M', NULL, 'admin123'), -- Admin
('asistente@viajes.com', 'Lucía Gómez', '555-5678', '1990-05-12', 'F', NULL, 'asistente123'), -- Asistente
('conductor1@viajes.com', 'Juan Hernández', '555-9876', '1985-07-23', 'M', NULL, 'conductor123'), -- Conductor
('usuario1@viajes.com', 'María Rodríguez', '555-5432', '1995-09-30', 'F', NULL, 'usuario123'); -- Usuario

-- Asignar roles a usuarios de ejemplo
INSERT INTO UserRoles (user_id, role_id) 
VALUES 
(1, 1), -- Carlos Pérez (Admin)
(2, 2), -- Lucía Gómez (Asistente)
(3, 3), -- Juan Hernández (Conductor)
(4, 4); -- María Rodríguez (Usuario)

-- Creación de Direcciones
INSERT INTO Direcciones (descripcion, zona) 
VALUES 
('Av. Reforma, Zona 9', '9'),
('Plaza Central, Zona 1', '1'),
('Centro Comercial Miraflores, Zona 11', '11'),
('Universidad, Zona 12', '12');

-- Creación de Vehiculos de prueba

INSERT INTO Vehiculos (id_conductor, marca, ano, numero_placa, fotografia_vehiculo)
VALUES
(3, 'Toyota', 2015, 'P123ABC', NULL),
(3, 'Nissan', 2018, 'P456DEF', NULL);

-- Creación de Vehiculos de Tarifas por punto de partida y destino

INSERT INTO Tarifas (punto_partida, punto_llegada, monto) 
VALUES 
(1, 2, 50.00), -- Av. Reforma a Plaza Central
(2, 3, 35.00), -- Plaza Central a Centro Comercial Miraflores
(1, 4, 60.00), -- Av. Reforma a Universidad
(3, 4, 45.00); -- Centro Comercial Miraflores a Universidad

-- Viajes realizados
INSERT INTO Viajes (id_usuario, id_conductor, id_tarifa, punto_partida, punto_llegada, estado, fecha_hora_inicio, fecha_hora_fin)
VALUES
(4, 3, 1, 1, 2, 'finalizado', '2024-09-10 10:00:00', '2024-09-10 10:30:00'), -- María tomó un viaje con Juan
(4, 3, 2, 2, 3, 'finalizado', '2024-09-11 14:00:00', '2024-09-11 14:45:00'); -- María tomó otro viaje

-- Ejemplo de reporte de problemas con usuario conductor o usuario
INSERT INTO Reportes (id_reportante, id_reporteado, descripcion, tipo)
VALUES
(4, 3, 'El conductor llegó tarde.', 'queja'),
(4, 3, 'El auto estaba limpio y en buen estado.', 'otro');

-- Datos para solicitud de empleos

INSERT INTO SolicitudesEmpleo (id_conductor, estado, fecha_solicitud)
VALUES
(3, 'aprobado', '2024-08-01 12:00:00');

-- Data ejemplo para pagos realizados
INSERT INTO Pagos (id_viaje, id_conductor, monto_pago, estado_pago, fecha_pago)
VALUES
(1, 3, 50.00, 'completado', '2024-09-10 11:00:00'), -- Pago por el primer viaje
(2, 3, 35.00, 'completado', '2024-09-11 15:00:00'); -- Pago por el segundo viaje

-- dato de prueba para calificación de usuario y conductores
INSERT INTO Calificaciones (id_conductor, id_usuario, id_viaje, puntaje, comentario)
VALUES
(3, 4, 1, 4, 'Conductor amable y educado, pero llegó un poco tarde.'),
(3, 4, 2, 5, 'Excelente servicio, el viaje fue muy cómodo.');

