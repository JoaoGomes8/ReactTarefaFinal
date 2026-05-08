import { Outlet, Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "./LayoutMaster.css";

export default function LayoutMaster() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="layout-wrapper">
      <header className="layout-header">
        <div className="header-brand">
          <Link to="/">🍽️ Restaurante</Link>
        </div>

        <nav className="header-nav">
          <NavLink to="/" end>
            Home
          </NavLink>

          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </>
          )}

          {user?.type === "gestor" && (
            <NavLink to="/gestor">Gestor do Menu</NavLink>
          )}

          {user?.type === "consumidor" && (
            <NavLink to="/consumidor">Fazer Encomenda</NavLink>
          )}

          {user?.type === "cozinha" && (
            <NavLink to="/cozinha">Cozinha</NavLink>
          )}

          {user && (
            <div className="header-user">
              <span>Olá, {user.name || user.email}!</span>
              <button onClick={logout} type="button">
                Logout
              </button>
            </div>
          )}
        </nav>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="layout-footer">
        <p>© {new Date().getFullYear()} Restaurante. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
