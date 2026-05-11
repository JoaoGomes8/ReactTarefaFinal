import { Outlet, Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function LayoutMaster() {
  const { user, logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return (
    <div className="min-h-screen text-[var(--text)]">
      <header className="sticky top-0 z-20 mx-auto mt-4 w-[min(1180px,calc(100%-1rem))] rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-4 shadow-[var(--shadow-soft)] backdrop-blur-xl md:w-[min(1180px,calc(100%-2rem))]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link to="/" className="flex flex-col gap-1 no-underline">
              <span className="font-serif text-2xl font-bold tracking-tight text-[var(--heading)]">Atelier do Sabor</span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-soft)]">Cozinha contemporanea, servico rapido</span>
            </Link>
          </div>

          <nav className="flex flex-wrap items-center gap-2 lg:gap-3">
            <NavLink className={({ isActive }) => navLinkClass(isActive)} to="/" end>Home</NavLink>

            {!user && (
              <>
                <NavLink className={({ isActive }) => navLinkClass(isActive)} to="/login">Login</NavLink>
                <NavLink className={({ isActive }) => navLinkClass(isActive)} to="/signup">Signup</NavLink>
              </>
            )}

            {user?.type === "gestor" && <NavLink className={({ isActive }) => navLinkClass(isActive)} to="/gestor">Gestor do Menu</NavLink>}
            {user?.type === "consumidor" && <NavLink className={({ isActive }) => navLinkClass(isActive)} to="/consumidor">Fazer Encomenda</NavLink>}
            {user?.type === "cozinha" && <NavLink className={({ isActive }) => navLinkClass(isActive)} to="/cozinha">Cozinha</NavLink>}

            <button className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-semibold text-[var(--heading)] transition hover:-translate-y-0.5 hover:border-[rgba(159,79,47,0.3)]" onClick={toggleTheme} type="button">
              {theme === "light" ? "Modo Escuro" : "Modo Claro"}
            </button>

            {user && (
              <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2">
                <span className="text-sm font-medium text-[var(--text-soft)]">Olá, {user.name || user.email}!</span>
                <button onClick={logout} type="button" className="rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-strong)] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5">
                  Logout
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] px-3 py-8 md:px-4">
        <Outlet />
      </main>

      <footer className="mx-auto mb-4 w-[min(1180px,calc(100%-1rem))] rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-4 text-center text-sm text-[var(--text-soft)] shadow-[var(--shadow-soft)] backdrop-blur-xl md:w-[min(1180px,calc(100%-2rem))]">
        <p>© {new Date().getFullYear()} Restaurante. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

function navLinkClass(isActive) {
  return [
    "rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5",
    isActive
      ? "bg-[rgba(159,79,47,0.12)] text-[var(--heading)]"
      : "text-[var(--text-soft)] hover:bg-[rgba(159,79,47,0.08)] hover:text-[var(--heading)]",
  ].join(" ");
}
