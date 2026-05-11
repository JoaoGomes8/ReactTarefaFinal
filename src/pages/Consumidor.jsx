import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getMenuItems, createOrder } from "../http";

export default function Consumidor() {
  const { user } = useContext(AuthContext);

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
    return <div className="grid gap-6"><p className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 shadow-[var(--shadow-soft)]">Carregando menu...</p></div>;
  }

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-soft)] lg:grid-cols-[1.4fr_0.8fr]">
        <div className="grid gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Menu digital</span>
          <h1 className="font-serif text-4xl font-bold text-[var(--heading)] md:text-5xl">Monte a sua experiencia de refeicao.</h1>
          <p className="text-[var(--text-soft)]">Bem-vindo, {user.name}! Escolha uma entrada, um prato principal e uma sobremesa.</p>
        </div>

        <div className="grid content-center gap-3 rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(217,164,65,0.22),rgba(159,79,47,0.16))] p-5">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Servico do dia</span>
          <strong className="text-2xl text-[var(--heading)]">Selecao orientada com resumo e total automatico.</strong>
        </div>
      </section>

      {error && <div className="rounded-2xl border border-[rgba(185,75,66,0.2)] bg-[rgba(185,75,66,0.12)] px-4 py-3 text-[var(--danger)]">{error}</div>}

      <form onSubmit={handleSubmitOrder} className="grid gap-6 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-soft)]">
        {[
          ["entradas", "Entradas", "entrada"],
          ["prato principal", "Prato Principal", "prato_principal"],
          ["sobremesas", "Sobremesas", "sobremesa"],
        ].map(([apiCategory, title, stateKey]) => (
          <section key={apiCategory} className="grid gap-4">
            <h2 className="border-b border-[var(--border)] pb-2 font-serif text-2xl font-bold text-[var(--heading)]">{title}</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {getItemsByCategory(apiCategory).length > 0 ? (
                getItemsByCategory(apiCategory).map((item) => (
                  <div key={item.id} className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--surface-strong)] p-4 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                    <input
                      type="radio"
                      name={stateKey}
                      id={`${stateKey}-${item.id}`}
                      value={item.id}
                      checked={selectedItems[stateKey]?.id === item.id}
                      onChange={() => handleItemSelect(stateKey, item)}
                      className="peer sr-only"
                    />
                    <label htmlFor={`${stateKey}-${item.id}`} className="grid cursor-pointer gap-2 rounded-[1.1rem] p-2 peer-checked:bg-[linear-gradient(180deg,rgba(217,164,65,0.12),rgba(159,79,47,0.08))]">
                      <h3 className="font-serif text-xl font-bold text-[var(--heading)]">{item.name}</h3>
                      <p className="text-sm text-[var(--text-soft)]">{item.description}</p>
                      <span className="text-lg font-bold text-[var(--primary)]">€{item.price}</span>
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-[var(--text-soft)]">Sem opções disponíveis</p>
              )}
            </div>
          </section>
        ))}

        <section className="grid gap-3 rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-serif text-2xl font-bold text-[var(--heading)]">Resumo da Encomenda</h2>
          <div className="grid gap-2">
            {selectedItems.entrada && <div className="flex items-center justify-between rounded-2xl bg-[var(--surface-strong)] px-4 py-3"><span>Entrada: {selectedItems.entrada.name}</span><span className="font-semibold text-[var(--primary)]">€{selectedItems.entrada.price}</span></div>}
            {selectedItems.prato_principal && <div className="flex items-center justify-between rounded-2xl bg-[var(--surface-strong)] px-4 py-3"><span>Prato: {selectedItems.prato_principal.name}</span><span className="font-semibold text-[var(--primary)]">€{selectedItems.prato_principal.price}</span></div>}
            {selectedItems.sobremesa && <div className="flex items-center justify-between rounded-2xl bg-[var(--surface-strong)] px-4 py-3"><span>Sobremesa: {selectedItems.sobremesa.name}</span><span className="font-semibold text-[var(--primary)]">€{selectedItems.sobremesa.price}</span></div>}
          </div>
          {selectedItems.entrada && selectedItems.prato_principal && selectedItems.sobremesa && (
            <div className="flex items-center justify-end border-t border-[var(--border)] pt-4 text-lg font-bold text-[var(--success)]">
              Total: €{(selectedItems.entrada.price + selectedItems.prato_principal.price + selectedItems.sobremesa.price).toFixed(2)}
            </div>
          )}
        </section>

        <button type="submit" disabled={submitting} className="rounded-full bg-gradient-to-r from-[var(--success)] to-[#205742] px-5 py-4 font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-[#7d807f]">
          {submitting ? "Enviando..." : "Confirmar Encomenda"}
        </button>
      </form>
    </div>
  );
}
