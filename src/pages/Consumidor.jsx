import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getMenuItems, createOrder } from "../http";
import "../styles/Consumidor.css";

export default function Consumidor() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    entrada: null,
    prato_principal: null,
    sobremesa: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const items = await getMenuItems();
        setMenuItems(items);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar menu: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  const handleItemSelect = (category, item) => {
    setSelectedItems((prev) => ({
      ...prev,
      [category]: item,
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!selectedItems.entrada || !selectedItems.prato_principal || !selectedItems.sobremesa) {
      setError("Por favor, selecione um item de cada categoria!");
      return;
    }

    setSubmitting(true);
    try {
      const orderData = {
        customerName: user.name,
        items: [
          selectedItems.entrada,
          selectedItems.prato_principal,
          selectedItems.sobremesa,
        ],
        status: "pendente",
      };

      await createOrder(orderData);
      setError(null);
      setSelectedItems({
        entrada: null,
        prato_principal: null,
        sobremesa: null,
      });
      alert("Encomenda criada com sucesso!");
    } catch (err) {
      setError("Erro ao criar encomenda: " + err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getItemsByCategory = (category) => {
    return menuItems.filter((item) => item.category === category);
  };

  if (loading) {
    return <div className="consumidor-container"><p>Carregando menu...</p></div>;
  }

  return (
    <div className="consumidor-container">
      <h1>Menu do Restaurante</h1>
      <p className="welcome-text">Bem-vindo, {user.name}! Selecione seus itens para fazer uma encomenda.</p>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmitOrder} className="order-form">
        {/* Entradas */}
        <section className="menu-category">
          <h2>Entradas</h2>
          <div className="items-grid">
            {getItemsByCategory("entrada").length > 0 ? (
              getItemsByCategory("entrada").map((item) => (
                <div key={item.id} className="menu-item">
                  <input
                    type="radio"
                    name="entrada"
                    id={`entrada-${item.id}`}
                    value={item.id}
                    checked={selectedItems.entrada?.id === item.id}
                    onChange={() => handleItemSelect("entrada", item)}
                  />
                  <label htmlFor={`entrada-${item.id}`}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="price">€{item.price}</span>
                  </label>
                </div>
              ))
            ) : (
              <p>Sem entradas disponíveis</p>
            )}
          </div>
        </section>

        {/* Prato Principal */}
        <section className="menu-category">
          <h2>Prato Principal</h2>
          <div className="items-grid">
            {getItemsByCategory("prato_principal").length > 0 ? (
              getItemsByCategory("prato_principal").map((item) => (
                <div key={item.id} className="menu-item">
                  <input
                    type="radio"
                    name="prato_principal"
                    id={`prato-${item.id}`}
                    value={item.id}
                    checked={selectedItems.prato_principal?.id === item.id}
                    onChange={() => handleItemSelect("prato_principal", item)}
                  />
                  <label htmlFor={`prato-${item.id}`}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="price">€{item.price}</span>
                  </label>
                </div>
              ))
            ) : (
              <p>Sem pratos principais disponíveis</p>
            )}
          </div>
        </section>

        {/* Sobremesas */}
        <section className="menu-category">
          <h2>Sobremesas</h2>
          <div className="items-grid">
            {getItemsByCategory("sobremesa").length > 0 ? (
              getItemsByCategory("sobremesa").map((item) => (
                <div key={item.id} className="menu-item">
                  <input
                    type="radio"
                    name="sobremesa"
                    id={`sobremesa-${item.id}`}
                    value={item.id}
                    checked={selectedItems.sobremesa?.id === item.id}
                    onChange={() => handleItemSelect("sobremesa", item)}
                  />
                  <label htmlFor={`sobremesa-${item.id}`}>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="price">€{item.price}</span>
                  </label>
                </div>
              ))
            ) : (
              <p>Sem sobremesas disponíveis</p>
            )}
          </div>
        </section>

        {/* Resumo da Encomenda */}
        <section className="order-summary">
          <h2>Resumo da Encomenda</h2>
          <div className="summary-items">
            {selectedItems.entrada && (
              <div className="summary-item">
                <span>Entrada: {selectedItems.entrada.name}</span>
                <span>€{selectedItems.entrada.price}</span>
              </div>
            )}
            {selectedItems.prato_principal && (
              <div className="summary-item">
                <span>Prato: {selectedItems.prato_principal.name}</span>
                <span>€{selectedItems.prato_principal.price}</span>
              </div>
            )}
            {selectedItems.sobremesa && (
              <div className="summary-item">
                <span>Sobremesa: {selectedItems.sobremesa.name}</span>
                <span>€{selectedItems.sobremesa.price}</span>
              </div>
            )}
          </div>
          {selectedItems.entrada && selectedItems.prato_principal && selectedItems.sobremesa && (
            <div className="total-price">
              <strong>
                Total: €
                {(
                  selectedItems.entrada.price +
                  selectedItems.prato_principal.price +
                  selectedItems.sobremesa.price
                ).toFixed(2)}
              </strong>
            </div>
          )}
        </section>

        <button type="submit" disabled={submitting} className="submit-btn">
          {submitting ? "Enviando..." : "Confirmar Encomenda"}
        </button>
      </form>
    </div>
  );
}
