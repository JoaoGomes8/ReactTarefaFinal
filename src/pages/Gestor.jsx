import { useState } from "react";
import { createMenuItem } from "../http";

export default function Gestor() {
  const [nomePrato, setNomePrato] = useState("");
  const [categoria, setCategoria] = useState("entradas");
  const [preco, setPreco] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      await createMenuItem({
        nomePrato,
        categoria,
        preco: Number(preco),
      });

      setMessage("Item de menu criado com sucesso.");
      setNomePrato("");
      setCategoria("entradas");
      setPreco("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div>
      <h2>Area do Gestor</h2>
      <p>Adicionar itens ao menu do restaurante.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nomePrato">Nome do prato</label>
          <input
            id="nomePrato"
            type="text"
            value={nomePrato}
            onChange={(event) => setNomePrato(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
          >
            <option value="entradas">Entradas</option>
            <option value="prato principal">Prato Principal</option>
            <option value="sobremesas">Sobremesas</option>
          </select>
        </div>

        <div>
          <label htmlFor="preco">Preco</label>
          <input
            id="preco"
            type="number"
            min="0"
            step="0.01"
            value={preco}
            onChange={(event) => setPreco(event.target.value)}
            required
          />
        </div>

        <button type="submit">Guardar item</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
