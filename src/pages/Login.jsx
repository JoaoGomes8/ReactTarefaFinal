import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  async function handleLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const success = await login(data);

    if (success) {
      navigate("/");
    } else {
      alert("Email ou password inválidos.");
    }
  }

  return (
    <section className="grid min-h-[calc(100vh-220px)] place-items-center">
      <div className="w-full max-w-xl rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-8 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <div className="grid gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Acesso reservado</span>
          <h2 className="font-serif text-4xl font-bold text-[var(--heading)]">Entrar na operacao</h2>
          <p className="text-[var(--text-soft)]">Use a sua conta para abrir a area de gestor, consumidor ou cozinha.</p>
        </div>

        <form onSubmit={handleLogin} className="mt-6 grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="font-semibold text-[var(--heading)]">Email</label>
            <input id="email" name="email" type="email" placeholder="nome@restaurante.pt" required className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[rgba(159,79,47,0.55)] focus:ring-4 focus:ring-[rgba(159,79,47,0.12)]" />
          </div>

          <div className="grid gap-2">
            <label htmlFor="password" className="font-semibold text-[var(--heading)]">Password</label>
            <input id="password" name="password" type="password" placeholder="Introduza a password" required className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[rgba(159,79,47,0.55)] focus:ring-4 focus:ring-[rgba(159,79,47,0.12)]" />
          </div>

          <button className="rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5" type="submit">Entrar</button>
        </form>
      </div>
    </section>
  );
}
