DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS categorias_productos;

CREATE TABLE categorias_productos (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio INTEGER NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    imagen TEXT,
    id_categoria INTEGER,
    CONSTRAINT fk_categoria
        FOREIGN KEY (id_categoria) 
        REFERENCES categorias_productos(id_categoria)
        ON DELETE SET NULL
);

INSERT INTO categorias_productos (nombre_categoria, descripcion) VALUES
('Perros', 'Productos y accesorios para perros'),
('Gatos', 'Productos y accesorios para gatos'),
('Accesorios', 'Accesorios generales para mascotas');

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria) VALUES
('Alimento Premium', 'Alimento balanceado de alta calidad para perros adultos.', 18990, 50, 'https://images.unsplash.com/photo-1615394968637-de55ca4b2e64?w=400&q=80', 1),
('Arena Sanitaria', 'Arena aglomerante para gatos con control de olores.', 7990, 30, 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&q=80', 2),
('Correa Retráctil', 'Correa retráctil de 5 metros con agarre ergonómico.', 12990, 40, 'https://images.unsplash.com/photo-1644416225353-adc117940526?w=400&q=80', 3),
('Juguete Interactivo', 'Juguete con plumas y campana para estimular a tu gato.', 5990, 60, 'https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?w=400&q=80', 2),
('Collar LED', 'Collar luminoso recargable para paseos nocturnos.', 8990, 35, 'https://images.unsplash.com/photo-1596822316110-288c7b8f24f8?w=400&q=80', 3),
('Cama Ortopédica', 'Cama con memoria viscoelástica para perros mayores.', 24990, 20, 'https://images.unsplash.com/photo-1548863738-3890c2d0f6ee?w=400&q=80', 1),
('Rascador Torre', 'Torre rascador de 3 niveles con juguetes integrados.', 19990, 15, 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&q=80', 2),
('Transportadora', 'Transportadora plegable con certificación de viaje.', 16990, 25, 'https://images.unsplash.com/photo-1596822316110-288c7b8f24f8?w=400&q=80', 3),
('Snacks Dentales', 'Snacks que ayudan a limpiar los dientes de tu perro.', 6990, 45, 'https://images.unsplash.com/photo-1615394968637-de55ca4b2e64?w=400&q=80', 1);