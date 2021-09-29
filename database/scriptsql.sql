create table Usuarios(
id int NOT NULL AUTO_INCREMENT,
nombre varchar(100) not null, 
apellido varchar(100) not null, 
password varchar(50) not null,
fecha_nacimiento date not null,
email varchar(100) not null,
telefono  varchar(50)  null, 
primary key(id)
);

