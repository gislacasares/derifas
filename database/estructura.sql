use `heroku_c901615016c2f69`;

/*** CREACIÓN DE TABLAS ***/
CREATE TABLE Usuarios(
id INT NOT NULL AUTO_INCREMENT,
nombre VARCHAR(100) NOT NULL, 
apellido VARCHAR(100) NOT NULL, 
password VARCHAR(50) NOT NULL,
fecha_nacimiento DATE NOT NULL,
email VARCHAR(100) NOT NULL,
telefono  VARCHAR(50)  NULL, 
activo TINYINT,
ultimo_acceso TINYINT NULL,
fecha_creacion TIMESTAMP NOT NULL,
PRIMARY KEY(id)
);
CREATE TABLE Categoria(
	id_categoria INT NOT NULL AUTO_INCREMENT,
    categoria_nombre VARCHAR(50) NOT NULL,
    estado TINYINT NOT NULL,
    fecha_creacion DATE NOT NULL,
    fecha_modificacion DATE NOT NULL,
    PRIMARY KEY (id_categoria)
);
CREATE TABLE Productos(
	id INT NOT NULL AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    id_categoria INT NOT NULL,
    estado_producto VARCHAR(10) NOT NULL,
    nombre VARCHAR(250) NOT NULL,
    precio FLOAT NOT NULL,
    tipo_publicacion INT NOT NULL,
    fecha_hora_limite DATE NOT NULL,
    total_cupones SMALLINT NOT NULL,
    cupones_disponibles SMALLINT NOT NULL,
    descripcion TEXT NULL,
    imagen VARCHAR(250) NULL,
    novedad TINYINT NOT NULL,
    ultima_oportunidad TINYINT NOT NULL,
    activo TINYINT NOT NULL,
    fecha_creacion TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria) 
);

CREATE TABLE cuponera(
	id INT NOT NULL AUTO_INCREMENT,
    producto_id INT NOT NULL,
    numero_cupon INT NOT NULL,
    estado TINYINT,
    vendido TINYINT,
    usuario_comprador_id INT NULL,
    precio_cupon FLOAT NOT NULL,
    fecha_compra DATE NULL,
    fecha_creacion DATE NOT NULL,
    fecha_modificacion DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

ALTER TABLE cuponera AUTO_INCREMENT=1;

CREATE TABLE tipo_publicacion(
    id INT NOT NULL AUTO_INCREMENT,
    tipo VARCHAR(25) NOT NULL,
    estado TINYINT NOT NULL,
    PRIMARY KEY(id)
);


CREATE TABLE Pregunta (
    id_pregunta INT NOT NULL AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_publicacion INT NOT NULL,
    estado TINYINT NOT NULL,
    pregunta_descripcion TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
    usuario_creacion INT NOT NULL,
    usuario_modificacion INT NOT NULL,
    fecha_creacion DATE NOT NULL,
    fecha_modificacion DATE NOT NULL,
    PRIMARY KEY (id_pregunta),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
    FOREIGN KEY (id_publicacion) REFERENCES Productos(id)
);

CREATE TABLE Respuesta(
	id_respuesta INT NOT NULL AUTO_INCREMENT,
    id_pregunta INT NOT NULL,
    id_usuario INT NOT NULL,
    respuesta_descripcion TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
    tiempo_demora BIGINT NOT NULL,
    usuario_creacion INT NOT NULL,
    usuario_modificacion INT NOT NULL,
    fecha_creacion DATE NOT NULL,
    fecha_modificacion DATE NOT NULL,
    PRIMARY KEY (id_respuesta),
	FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
    FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id_pregunta)   
);