import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../http";
import OrderCard from "../components/OrderCard";
import "../styles/Cozinha.css";

export default function Cozinha() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    async function loadOrders() {
      try {
        const ordersData = await getOrders();
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
      "em confecção": "status-em-confeccao",
      entregue: "status-entregue",
    };

    return statusClasses[status] || "status-pendente";
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
    <section className="cozinha-page">
      <h1>Cozinha</h1>
      <p>Gestão de encomendas e atualização de estado.</p>
      {content}
    </section>
  );
}
