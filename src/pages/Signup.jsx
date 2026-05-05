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
    <div>
      <h2>Registo de users</h2>

      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="name">Nome</label>
          <input id="name" name="name" type="text" required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>

        <div>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            required
          />
        </div>

        <div>
          <label htmlFor="role">Role</label>
          <select id="role" name="role" defaultValue="consumidor">
            <option value="gestor">Gestor</option>
            <option value="consumidor">Consumidor</option>
            <option value="cozinha">Cozinha</option>
          </select>
        </div>

        {!passwordMatch && <p>Atencao: as passwords nao coincidem.</p>}
        {errorMessage && <p>{errorMessage}</p>}

        <button type="submit">Criar conta</button>
      </form>
    </div>
  );
}
