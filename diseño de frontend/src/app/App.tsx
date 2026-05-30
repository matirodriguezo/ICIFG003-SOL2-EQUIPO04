import { useState } from 'react';
import { ProductCard } from './components/ProductCard';
import { ShoppingCart } from './components/ShoppingCart';
import { ContactForm } from './components/ContactForm';
import { products, Product, Category } from './types/product';
import { Tag, Phone, Mail, MapPin } from 'lucide-react';

interface CartItem extends Product {
  quantity: number;
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  return (
    <div className="app-container min-h-screen bg-gray-50">
      <header className="header bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl">🐾</span>
              </div>
              <h1 className="text-white">PetShop Online</h1>
            </div>
            <p className="text-blue-100 hidden md:block">Tu tienda de confianza para mascotas</p>
          </div>
        </div>
      </header>

      <nav className="nav-menu bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <ul className="nav-list flex flex-wrap gap-2 py-4">
            <li>
              <a href="#inicio" className="nav-link px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                Inicio
              </a>
            </li>
            <li>
              <a href="#productos" className="nav-link px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                Productos
              </a>
            </li>
            <li>
              <a href="#promociones" className="nav-link px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                Promociones
              </a>
            </li>
            <li>
              <a href="#contacto" className="nav-link px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main className="main-content container mx-auto px-4 py-8">
        <div className="main-grid">
          <div className="content-area">
            <section id="inicio" className="hero-section bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-8 mb-8">
              <h2 className="text-white mb-4">Bienvenido a PetShop Online</h2>
              <p className="text-lg mb-4">
                Los mejores productos para tu mascota al mejor precio
              </p>
              <ul className="space-y-2">
                <li>✓ Envío gratis en compras sobre $30.000</li>
                <li>✓ Productos de primera calidad</li>
                <li>✓ Atención personalizada</li>
              </ul>
            </section>

            <section id="productos" className="products-section">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h2>Nuestros Productos</h2>

                <div className="filter-controls">
                  <label htmlFor="category-filter" className="block mb-2">
                    Filtrar por categoría:
                  </label>
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as Category | 'Todos')}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Filtrar productos por categoría"
                  >
                    <option value="Todos">Todos</option>
                    <option value="Perros">Perros</option>
                    <option value="Gatos">Gatos</option>
                    <option value="Accesorios">Accesorios</option>
                  </select>
                </div>
              </div>

              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No hay productos en esta categoría
                </p>
              )}
            </section>

            <section id="contacto-section" className="mt-8">
              <ContactForm />
            </section>
          </div>

          <aside id="promociones" className="sidebar-area">
            <div className="promotions-sidebar bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-6 h-6 text-yellow-600" />
                <h2>Promociones</h2>
              </div>
              <ul className="space-y-4">
                <li className="bg-white p-4 rounded-md shadow-sm">
                  <p className="text-sm mb-1">🎉 20% OFF</p>
                  <p className="text-xs text-gray-600">En alimentos premium</p>
                </li>
                <li className="bg-white p-4 rounded-md shadow-sm">
                  <p className="text-sm mb-1">🚚 Envío Gratis</p>
                  <p className="text-xs text-gray-600">Compras sobre $30.000</p>
                </li>
                <li className="bg-white p-4 rounded-md shadow-sm">
                  <p className="text-sm mb-1">🎁 Regalo</p>
                  <p className="text-xs text-gray-600">Juguete en tu primera compra</p>
                </li>
              </ul>
            </div>

            <ShoppingCart items={cartItems} onRemove={handleRemoveFromCart} />
          </aside>
        </div>
      </main>

      <footer className="footer bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="footer-grid grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white mb-4">PetShop Online</h3>
              <p className="text-gray-300 text-sm">
                Tu tienda de confianza para el cuidado de tus mascotas desde 2020
              </p>
            </div>

            <div>
              <h3 className="text-white mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+56 9 1234 5678</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contacto@petshop.cl</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Av. Principal 123, Santiago</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white mb-4">Horario</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Lunes a Viernes: 9:00 - 19:00</li>
                <li>Sábados: 10:00 - 14:00</li>
                <li>Domingos: Cerrado</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2026 PetShop Online. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}