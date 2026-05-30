import { Product } from '../types/product';
import { ShoppingCart as CartIcon, Trash2 } from 'lucide-react';

interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onRemove: (productId: number) => void;
}

export function ShoppingCart({ items, onRemove }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <aside className="cart-sidebar bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center gap-2 mb-4">
        <CartIcon className="w-6 h-6 text-blue-600" />
        <h2>Carrito ({itemCount})</h2>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="space-y-3 mb-4">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div className="flex-1">
                  <p className="text-sm">{item.name}</p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                  )}
                  <p className="text-sm">${(item.price * item.quantity).toLocaleString('es-CL')}</p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="text-red-500 hover:text-red-700 p-1"
                  aria-label={`Eliminar ${item.name} del carrito`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg">Total:</p>
              <p className="text-xl">${total.toLocaleString('es-CL')}</p>
            </div>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
