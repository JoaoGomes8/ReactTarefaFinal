import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignup(event) {
    event.preventDefault();
    setErrorMessage("");

    const data = new FormData(event.target);

    if (data.get("password") !== data.get("passwordConfirmation")) {
      setPasswordMatch(false);
      return;
    }

    setPasswordMatch(true);

    const user = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      type: data.get("role"),
    };

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      setErrorMessage("Nao foi possivel registar o utilizador.");
      return;
    }

    navigate("/login");
  }

  return (
    <section className="grid min-h-[calc(100vh-220px)] place-items-center">
      <div className="w-full max-w-3xl rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-8 shadow-[var(--shadow-soft)] backdrop-blur-xl">
        <div className="grid gap-3">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Novo registo</span>
          <h2 className="font-serif text-4xl font-bold text-[var(--heading)]">Registo de utilizadores</h2>
          <p className="text-[var(--text-soft)]">Crie uma conta para aceder ao fluxo de encomendas do restaurante.</p>
        </div>

        <form onSubmit={handleSignup} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="name" className="font-semibold text-[var(--heading)]">Nome</label>
            <input id="name" name="name" type="text" placeholder="Nome completo" required className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[rgba(159,79,47,0.55)] focus:ring-4 focus:ring-[rgba(159,79,47,0.12)]" />
          </div>

          <div className="grid gap-2">
            <label htmlFor="email" className="font-semibold text-[var(--heading)]">Email</label>
            <input id="email" name="email" type="email" placeholder="cliente@restaurante.pt" required className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[rgba(159,79,47,0.55)] focus:ring-4 focus:ring-[rgba(159,79,47,0.12)]" />
          </div>

          <div className="grid gap-2">
            <label htmlFor="password" className="font-semibold text-[var(--heading)]">Password</label>
            <input id="password" name="password" type="password" placeholder="Minimo 6 caracteres" required className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[rgba(159,79,47,0.55)] focus:ring-4 focus:ring-[rgba(159,79,47,0.12)]" />
          </div>

          <div className="grid gap-2">
            <label htmlFor="passwordConfirmation" className="font-semibold text-[var(--heading)]">Confirm Password</label>
            <input id="passwordConfirmation" name="passwordConfirmation" type="password" placeholder="Repita a password" required className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[rgba(159,79,47,0.55)] focus:ring-4 focus:ring-[rgba(159,79,47,0.12)]" />
          </div>

          <div className="grid gap-2 md:col-span-2">
            <label htmlFor="role" className="font-semibold text-[var(--heading)]">Role</label>
            <select id="role" name="role" defaultValue="consumidor" className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 outline-none transition focus:border-[rgba(159,79,47,0.55)] focus:ring-4 focus:ring-[rgba(159,79,47,0.12)]">
              <option value="gestor">Gestor</option>
              <option value="consumidor">Consumidor</option>
              <option value="cozinha">Cozinha</option>
            </select>
          </div>

          {!passwordMatch && <p className="rounded-2xl border border-[rgba(185,75,66,0.2)] bg-[rgba(185,75,66,0.12)] px-4 py-3 text-[var(--danger)] md:col-span-2">Atencao: as passwords nao coincidem.</p>}
          {errorMessage && <p className="rounded-2xl border border-[rgba(185,75,66,0.2)] bg-[rgba(185,75,66,0.12)] px-4 py-3 text-[var(--danger)] md:col-span-2">{errorMessage}</p>}

          <button className="rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 md:col-span-2" type="submit">Criar conta</button>
        </form>
      </div>
    </section>
  );
}
