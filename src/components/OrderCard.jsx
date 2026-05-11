export default function OrderCard({ order, updatingId, onUpdateStatus, getStatusClass }) {
  return (
    <li className="grid gap-4 rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-serif text-2xl font-bold text-[var(--heading)]">{order.customerName || "Cliente sem nome"}</h2>
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${getStatusClass(order.status)}`}>
          {order.status || "pendente"}
        </span>
      </div>

      <h3 className="font-semibold text-[var(--heading)]">Itens pedidos:</h3>
      <ul className="grid gap-2 pl-4 text-[var(--text-soft)]">
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

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onUpdateStatus(order.id, "em confecção")}
          disabled={updatingId === order.id}
          className="rounded-full bg-gradient-to-r from-[#5675c8] to-[#3f5cb3] px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Em confecção
        </button>
        <button
          type="button"
          onClick={() => onUpdateStatus(order.id, "entregue")}
          disabled={updatingId === order.id}
          className="rounded-full bg-gradient-to-r from-[var(--success)] to-[#205742] px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Entregue
        </button>
      </div>
    </li>
  );
}
