import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import "../App.css";

export default function RootLayout() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <header>
        <h1>🍽️ Restaurante</h1>
        <nav>
          <Link to="/">Home</Link>
          
          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
          
          {user && user.type === "gestor" && (
            <Link to="/gestor">Gestor do Menu</Link>
          )}

          {user && user.type === "consumidor" && (
            <Link to="/consumidor">Fazer Encomenda</Link>
          )}

          {user && user.type === "cozinha" && (
            <Link to="/cozinha">Cozinha</Link>
          )}

          {user && (
            <>
              <span className="user-info">Olá, {user.name}!</span>
              <button onClick={logout} className="logout-btn">Logout</button>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
