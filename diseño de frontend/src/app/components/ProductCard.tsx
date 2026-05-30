import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="product-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">Categoría: {product.category}</p>
        <p className="mb-4">
          ${product.price.toLocaleString('es-CL')}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          aria-label={`Agregar ${product.name} al carrito`}
        >
          Agregar al carrito
        </button>
      </div>
    </article>
  );
}
