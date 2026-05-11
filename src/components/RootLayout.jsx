import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function RootLayout() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen text-[var(--text)]">
      <header className="mx-auto mt-4 w-[min(1180px,calc(100%-1rem))] rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-4 shadow-[var(--shadow-soft)] backdrop-blur-xl md:w-[min(1180px,calc(100%-2rem))]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="font-serif text-2xl font-bold text-[var(--heading)]">🍽️ Restaurante</h1>
          <nav className="flex flex-wrap items-center gap-2">
            <Link className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[rgba(159,79,47,0.08)] hover:text-[var(--heading)]" to="/">Home</Link>
            {!user && (
              <>
                <Link className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[rgba(159,79,47,0.08)] hover:text-[var(--heading)]" to="/login">Login</Link>
                <Link className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[rgba(159,79,47,0.08)] hover:text-[var(--heading)]" to="/signup">Signup</Link>
              </>
            )}
            {user && user.type === "gestor" && <Link className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[rgba(159,79,47,0.08)] hover:text-[var(--heading)]" to="/gestor">Gestor do Menu</Link>}
            {user && user.type === "consumidor" && <Link className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[rgba(159,79,47,0.08)] hover:text-[var(--heading)]" to="/consumidor">Fazer Encomenda</Link>}
            {user && user.type === "cozinha" && <Link className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-soft)] transition hover:bg-[rgba(159,79,47,0.08)] hover:text-[var(--heading)]" to="/cozinha">Cozinha</Link>}
            {user && (
              <>
                <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text-soft)]">Olá, {user.name}!</span>
                <button onClick={logout} className="rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5" type="button">Logout</button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[1180px] px-3 py-8 md:px-4">
        <Outlet />
      </main>
    </div>
  );
}
