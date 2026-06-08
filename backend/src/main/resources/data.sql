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

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Shampoo Hipoalergenico', 'Shampoo suave para perros con piel sensible, aroma a avena y miel.', 8500, 25, 'https://media.falabella.com/sodimacCL/2797267_01/w=1200,h=1200,fit=pad', 1
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Shampoo Hipoalergenico'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Mordedor de Caucho', 'Juguete de caucho ultra resistente para perros de mordida fuerte.', 9990, 40, 'https://http2.mlstatic.com/D_NQ_NP_2X_898586-CBT103855423252_012026-F-juguete-mordedor-de-caucho-natural-y-duradero-para-perros.webp', 1
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Mordedor de Caucho'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Pouch Salmon Premium', 'Alimento humedo sabor salmon para gatos adultos. Alto en proteina.', 1200, 100, 'https://petcity.cl/wp-content/uploads/2024/10/whiskas-pouch-salmon.jpg', 2
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Pouch Salmon Premium'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Catnip Natural', 'Hierba gatera 100% natural para estimular y relajar a tu gato.', 3500, 50, 'https://www.kenaz.cl/cdn/shop/files/hierba-de-gato-verdecora.jpg?v=1770902540', 2
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Catnip Natural'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Plato Antireflujo', 'Plato de alimentacion lenta para evitar problemas digestivos en tu mascota.', 5500, 30, 'https://exitocol.vtexassets.com/arquivos/ids/28946527/plato-comedero-antiansiedad-y-antireflujo-para-perro-color-lila-accesorios-comida-mascotas.jpg?v=638863346938670000', 3
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Plato Antireflujo'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Cepillo Deslanador', 'Cepillo profesional para remover el pelo muerto y mantener el pelaje sano.', 11990, 20, 'https://http2.mlstatic.com/D_NQ_NP_2X_648835-CBT112415023807_052026-F.webp', 3
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Cepillo Deslanador'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Arnes Antitirones', 'Arnés ergonómico y reflectante para paseos cómodos y seguros sin lastimar el cuello.', 14990, 30, 'https://http2.mlstatic.com/D_NQ_NP_2X_669014-CBT89908198851_082025-F-arnes-antitirones-acolchado-para-perro.webp', 1
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Arnes Antitirones'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Pate Premium Perros', 'Alimento húmedo de alta digestibilidad sabor carne asada para todas las razas.', 1500, 80, 'https://razaspet.cl/wp-content/uploads/2025/04/F1B230031W00363.png', 1
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Pate Premium Perros'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Fuente de Agua', 'Bebedero automático con filtro de carbón activado para mantener el agua fresca.', 22990, 15, 'https://www.doctormascota.cl/wp-content/uploads/2025/07/1000069884.jpg', 2
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Fuente de Agua'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Arenero Cubierto', 'Bandeja sanitaria cerrada con puerta abatible para controlar los malos olores.', 29990, 10, 'https://www.superzoo.cl/on/demandware.static/-/Sites-SuperZoo-master-catalog/es_CL/v1779593527218/images/16812_1.jpg;', 2
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Arenero Cubierto'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Cortauñas Profesional', 'Alicate de acero inoxidable con tope de seguridad para un corte preciso.', 4990, 50, 'https://http2.mlstatic.com/D_NQ_NP_2X_983352-MLA99686682858_122025-F.webp', 3
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Cortauñas Profesional'
);

INSERT INTO productos (nombre, descripcion, precio, stock, imagen, id_categoria)
SELECT 'Collar GPS Tracker', 'Rastreador GPS resistente al agua con aplicación móvil en tiempo real.', 45990, 12, 'https://http2.mlstatic.com/D_NQ_NP_2X_921436-CBT102712472168_122025-F-collar-rastreador-gps-para-mascotas-localizador-perro-gato.webp', 3
WHERE NOT EXISTS (
    SELECT 1 FROM productos WHERE nombre = 'Collar GPS Tracker'
);