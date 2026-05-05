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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
