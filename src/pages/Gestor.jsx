import { useState } from "react";
import { createMenuItem } from "../http";

export default function Gestor() {
  const [nomePrato, setNomePrato] = useState("");
  const [categoria, setCategoria] = useState("entradas");
  const [preco, setPreco] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      await createMenuItem({
        name: nomePrato,
        category: categoria,
        price: Number(preco),
      });

      setMessage("Item de menu criado com sucesso.");
      setNomePrato("");
      setCategoria("entradas");
      setPreco("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <section className="grid gap-6">
      <div className="grid gap-3 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-soft)]">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Backoffice</span>
        <h2 className="font-serif text-4xl font-bold text-[var(--heading)]">Area do Gestor</h2>
        <p className="text-[var(--text-soft)]">Adicione novos pratos ao menu com um visual consistente para a equipa de sala e cozinha.</p>
      </div>

      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-soft)]">
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2 md:col-span-2">
            <label htmlFor="nomePrato" className="font-semibold text-[var(--heading)]">Nome do prato</label>
            <input id="nomePrato" type="text" value={nomePrato} placeholder="Ex.: Bacalhau com broa" onChange={(event) => setNomePrato(event.target.value)} required className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[rgba(159,79,47,0.55)] focus:ring-4 focus:ring-[rgba(159,79,47,0.12)]" />
          </div>

          <div className="grid gap-2">
            <label htmlFor="categoria" className="font-semibold text-[var(--heading)]">Categoria</label>
            <select id="categoria" value={categoria} onChange={(event) => setCategoria(event.target.value)} className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[rgba(159,79,47,0.55)] focus:ring-4 focus:ring-[rgba(159,79,47,0.12)]">
              <option value="entradas">Entradas</option>
              <option value="prato principal">Prato Principal</option>
              <option value="sobremesas">Sobremesas</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label htmlFor="preco" className="font-semibold text-[var(--heading)]">Preco</label>
            <input id="preco" type="number" min="0" step="0.01" value={preco} placeholder="0.00" onChange={(event) => setPreco(event.target.value)} required className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[rgba(159,79,47,0.55)] focus:ring-4 focus:ring-[rgba(159,79,47,0.12)]" />
          </div>

          <button className="rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 md:col-span-2" type="submit">Guardar item</button>
        </form>

        {message && <p className="mt-4 rounded-2xl border border-[rgba(47,125,88,0.2)] bg-[rgba(47,125,88,0.12)] px-4 py-3 text-[var(--success)]">{message}</p>}
      </div>
    </section>
  );
}
