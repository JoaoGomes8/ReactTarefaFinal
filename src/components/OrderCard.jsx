export default function OrderCard({ order, updatingId, onUpdateStatus, getStatusClass }) {
  return (
    <li className="order-card">
      <div className="order-header">
        <h2>{order.customerName || "Cliente sem nome"}</h2>
        <span className={`order-status ${getStatusClass(order.status)}`}>
          {order.status || "pendente"}
        </span>
      </div>

      <h3>Itens pedidos:</h3>
      <ul className="order-items">
        {Array.isArray(order.items) && order.items.length > 0 ? (
          order.items.map((item) => (
            <li key={`${order.id}-${item.id || item.name}`}>
              {item.name} {item.price ? `- EUR ${Number(item.price).toFixed(2)}` : ""}
            </li>
          ))
        ) : (
          <li>Sem itens registados.</li>
        )}
      </ul>

      <div className="order-actions">
        <button
          type="button"
          onClick={() => onUpdateStatus(order.id, "em confecção")}
          disabled={updatingId === order.id}
        >
          Em confecção
        </button>
        <button
          type="button"
          onClick={() => onUpdateStatus(order.id, "entregue")}
          disabled={updatingId === order.id}
        >
          Entregue
        </button>
      </div>
    </li>
  );
}
