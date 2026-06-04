INSERT INTO categorias_productos (nombre_categoria, descripcion)
SELECT 'Perros', 'Productos y accesorios para perros'
WHERE NOT EXISTS (
	SELECT 1 FROM categorias_productos WHERE nombre_categoria = 'Perros'
);

INSERT INTO categorias_productos (nombre_categoria, descripcion)
SELECT 'Gatos', 'Productos y accesorios para gatos'
WHERE NOT EXISTS (
	SELECT 1 FROM categorias_productos WHERE nombre_categoria = 'Gatos'
);

INSERT INTO categorias_productos (nombre_categoria, descripcion)
SELECT 'Accesorios', 'Accesorios generales para mascotas'
WHERE NOT EXISTS (
	SELECT 1 FROM categorias_productos WHERE nombre_categoria = 'Accesorios'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Alimento Premium', 'Alimento balanceado de alta calidad para perros adultos.', 18990, 50, 'https://images.unsplash.com/photo-1615394968637-de55ca4b2e64?w=400&q=80', 1
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Alimento Premium'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Arena Sanitaria', 'Arena aglomerante para gatos con control de olores.', 7990, 30, 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&q=80', 2
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Arena Sanitaria'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Correa Retráctil', 'Correa retráctil de 5 metros con agarre ergonómico.', 12990, 40, 'https://images.unsplash.com/photo-1644416225353-adc117940526?w=400&q=80', 3
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Correa Retráctil'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Juguete Interactivo', 'Juguete con plumas y campana para estimular a tu gato.', 5990, 60, 'https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?w=400&q=80', 2
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Juguete Interactivo'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Collar LED', 'Collar luminoso recargable para paseos nocturnos.', 8990, 35, 'https://images.unsplash.com/photo-1596822316110-288c7b8f24f8?w=400&q=80', 3
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Collar LED'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Cama Ortopédica', 'Cama con memoria viscoelástica para perros mayores.', 24990, 20, 'https://images.unsplash.com/photo-1548863738-3890c2d0f6ee?w=400&q=80', 1
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Cama Ortopédica'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Rascador Torre', 'Torre rascador de 3 niveles con juguetes integrados.', 19990, 15, 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=400&q=80', 2
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Rascador Torre'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Transportadora', 'Transportadora plegable con certificación de viaje.', 16990, 25, 'https://images.unsplash.com/photo-1596822316110-288c7b8f24f8?w=400&q=80', 3
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Transportadora'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Snacks Dentales', 'Snacks que ayudan a limpiar los dientes de tu perro.', 6990, 45, 'https://images.unsplash.com/photo-1615394968637-de55ca4b2e64?w=400&q=80', 1
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Snacks Dentales'
);