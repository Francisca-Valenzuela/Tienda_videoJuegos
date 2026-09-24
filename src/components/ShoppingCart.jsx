import CartItem from './CartItem';
import CartTotal from './CartTotal';

/** 
 * Resumen del carrito: Renderizado condicional que muestra un mensaje si está vacío 
 * o renderiza la lista de productos, el contador de unidades y el cálculo del total. 
 */
export default function ShoppingCart({ carrito, cantidadTotal, total, onSumar, onRestar, onQuitar, onVaciar }) {
  return (
    <section id="carrito" className="mb-5">
      <h2 className="text-center mb-4 fw-bold" style={{ color: 'var(--color-primario)' }}>
        🛒 Tu Carrito
      </h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="p-4 rounded-4 shadow-sm bg-white border" style={{ borderColor: '#eee' }}>
            
            {/* Renderizado condicional dependiendo del contenido del carrito */}
            {carrito.length === 0 ? (
              <p className="text-secondary text-center mb-0" aria-live="polite">
                Tu carrito está vacío. ¡Agrega algún juego!
              </p>
            ) : (
              <>
                <p className="small text-secondary mb-2" aria-live="polite">
                  Productos en el carrito: <strong>{cantidadTotal}</strong>
                </p>
                
                <ul id="lista-carrito" className="list-group list-group-flush mb-3">
                  {carrito.map((item) => (
                    <CartItem 
                      key={item.id} 
                      item={item} 
                      // Se mapea la función para entregar el objeto producto completo y evitar el .find() en App.jsx
                      onSumar={() => onSumar(item)} 
                      onRestar={onRestar} 
                      onQuitar={onQuitar} 
                    />
                  ))}
                </ul>
                
                <CartTotal total={total} />
                
                <div className="text-center mt-3">
                  <button 
                    type="button" 
                    className="btn btn-outline-secondary btn-sm" 
                    onClick={onVaciar}
                  >
                    Vaciar carrito
                  </button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}