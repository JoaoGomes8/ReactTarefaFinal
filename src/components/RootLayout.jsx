import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <header>
        <h1>Restaurante</h1>
        <nav>
          <a href="/">Home</a>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
