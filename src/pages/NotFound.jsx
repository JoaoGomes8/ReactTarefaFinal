import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="grid gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-8 text-center shadow-[var(--shadow-soft)]">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Erro 404</span>
      <h1 className="font-serif text-4xl font-bold text-[var(--heading)]">Pagina nao encontrada</h1>
      <p className="text-[var(--text-soft)]">O caminho que tentou abrir nao existe.</p>
      <div>
        <Link
          to="/"
          className="inline-flex rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5"
        >
          Voltar ao inicio
        </Link>
      </div>
    </section>
  );
}
