export type Category = 'Perros' | 'Gatos' | 'Accesorios';

export interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Alimento Premium',
    category: 'Perros',
    price: 18990,
    image: 'https://images.unsplash.com/photo-1615394968637-de55ca4b2e64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBsZWFzaCUyMHJldHJhY3RhYmxlfGVufDF8fHx8MTc3OTg4NDY1MHww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 2,
    name: 'Arena Sanitaria',
    category: 'Gatos',
    price: 7990,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjB0b3lzfGVufDF8fHx8MTc3OTg4NDY1MXww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 3,
    name: 'Correa Retractil',
    category: 'Accesorios',
    price: 12990,
    image: 'https://images.unsplash.com/photo-1644416225353-adc117940526?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkb2clMjBsZWFzaCUyMHJldHJhY3RhYmxlfGVufDF8fHx8MTc3OTg4NDY1MHww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 4,
    name: 'Juguete Interactivo',
    category: 'Gatos',
    price: 5990,
    image: 'https://images.unsplash.com/photo-1516750105099-4b8a83e217ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjYXQlMjB0b3lzfGVufDF8fHx8MTc3OTg4NDY1MXww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 5,
    name: 'Collar LED Luminoso',
    category: 'Accesorios',
    price: 8990,
    image: 'https://images.unsplash.com/photo-1776470409915-1639cd22fe40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBhY2Nlc3NvcmllcyUyMGNvbGxhcnxlbnwxfHx8fDE3Nzk4ODQ2NTF8MA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 6,
    name: 'Cama Ortopedica',
    category: 'Perros',
    price: 24990,
    image: 'https://images.unsplash.com/photo-1615394968637-de55ca4b2e64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBsZWFzaCUyMHJldHJhY3RhYmxlfGVufDF8fHx8MTc3OTg4NDY1MHww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 7,
    name: 'Rascador Torre',
    category: 'Gatos',
    price: 19990,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjB0b3lzfGVufDF8fHx8MTc3OTg4NDY1MXww&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 8,
    name: 'Transportadora',
    category: 'Accesorios',
    price: 16990,
    image: 'https://images.unsplash.com/photo-1596822316110-288c7b8f24f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwZXQlMjBhY2Nlc3NvcmllcyUyMGNvbGxhcnxlbnwxfHx8fDE3Nzk4ODQ2NTF8MA&ixlib=rb-4.1.0&q=80&w=400'
  },
  {
    id: 9,
    name: 'Snacks Dentales',
    category: 'Perros',
    price: 6990,
    image: 'https://images.unsplash.com/photo-1615394968637-de55ca4b2e64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBsZWFzaCUyMHJldHJhY3RhYmxlfGVufDF8fHx8MTc3OTg4NDY1MHww&ixlib=rb-4.1.0&q=80&w=400'
  }
];
