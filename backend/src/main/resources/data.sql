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
SELECT 'Alimento Premium', 'Alimento balanceado de alta calidad para perros adultos.', 18990, 50, 'https://chile.vitalcan.com/wp-content/uploads/2024/02/Envases-premium-perro-adulto-@2x-600x800-1.png', 1
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Alimento Premium'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Arena Sanitaria', 'Arena aglomerante para gatos con control de olores.', 7990, 30, 'https://arenaeasyclean.cl/wp-content/uploads/2025/08/Arena-Sanitaria-Easy-Clean-Aroma-Lavanda-16kg-1.jpg', 2
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Arena Sanitaria'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Correa Retractil', 'Correa retractil de 5 metros con agarre ergonomico.', 12990, 40, 'https://images.unsplash.com/photo-1644416225353-adc117940526?w=400&q=80', 3
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Correa Retractil'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Juguete Interactivo', 'Juguete con plumas y campana para estimular a tu gato.', 5990, 60, 'https://http2.mlstatic.com/D_NQ_NP_872208-MLC84261829275_052025-O.webp', 2
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Juguete Interactivo'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Collar LED', 'Collar luminoso recargable para paseos nocturnos.', 8990, 35, 'https://http2.mlstatic.com/D_NQ_NP_848950-CBT95949804007_102025-O.webp', 3
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Collar LED'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Cama Ortopedica', 'Cama con memoria viscoelastica para perros mayores.', 24990, 20, 'https://cdn.shopify.com/s/files/1/0964/1807/0854/files/Pethijos_Espana_Camas_para_perros_ortopedicas_viscoelasticas_Cama_pethijos.jpg?v=1762117612', 1
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Cama Ortopedica'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Rascador Torre', 'Torre rascador de 3 niveles con juguetes integrados.', 19990, 15, 'https://i5.walmartimages.com/asr/a445ad1c-a3b5-4b51-807c-03c9cb916bb3.d41b396ac39a2fe8ce690e1acb3403d0.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', 2
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Rascador Torre'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Transportadora', 'Transportadora plegable con certificación de viaje.', 16990, 25, 'https://www.clubdeperrosygatos.cl/wp-content/uploads/2023/12/CLUB-PG-BOLSO-TRANSPORTADOR-PARA-MASCOTAS-ACORDEON-2-copia.webp', 3
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Transportadora'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Snacks Dentales', 'Snacks que ayudan a limpiar los dientes de tu perro.', 6990, 45, 'https://www.lavanguardia.com/files/og_thumbnail/uploads/2022/04/17/625be05f761ce.jpeg', 1
WHERE NOT EXISTS (
	SELECT 1 FROM productos WHERE nombre = 'Snacks Dentales'
);