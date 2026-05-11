import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../http";
import OrderCard from "../components/OrderCard";

export default function Cozinha() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (err) {
        setError(err.message || "Erro ao carregar encomendas.");
      } finally {
        setIsLoading(false);
      }
    }

    loadOrders();
  }, []);

  async function handleUpdateStatus(orderId, status) {
    try {
      setUpdatingId(orderId);
      await updateOrderStatus(orderId, status);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      setError(err.message || "Erro ao atualizar estado.");
    } finally {
      setUpdatingId(null);
    }
  }

  function getStatusClass(status) {
    const statusClasses = {
      "em confecção": "bg-[rgba(77,139,201,0.18)] text-[#3f73b1]",
      entregue: "bg-[rgba(47,125,88,0.18)] text-[var(--success)]",
    };

    return statusClasses[status] || "bg-[rgba(217,164,65,0.18)] text-[#8e6400]";
  }

  let content;

  if (isLoading) {
    content = <p>A carregar encomendas...</p>;
  } else if (error) {
    content = <p className="error-message">{error}</p>;
  } else if (orders.length === 0) {
    content = <p>Não existem encomendas neste momento.</p>;
  } else {
    content = (
      <ul className="orders-list">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            updatingId={updatingId}
            onUpdateStatus={handleUpdateStatus}
            getStatusClass={getStatusClass}
          />
        ))}
      </ul>
    );
  }

  return (
    <section className="grid gap-6">
      <div className="grid gap-3 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-soft)]">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Painel da cozinha</span>
        <h1 className="font-serif text-4xl font-bold text-[var(--heading)]">Cozinha</h1>
        <p className="text-[var(--text-soft)]">Consulte os pedidos em fila e marque cada encomenda em confeccao ou entregue.</p>
      </div>
      {content}
    </section>
  );
}
