export default function HomePage() {
  return (
    <div>
      <h1>Bem-vindo ao Restaurante</h1>
      <p>Sistema de gestão de restaurante com três áreas principais:</p>
      
      <section>
        <h2>Gestor</h2>
        <p>Area para o gestor do restaurante inserir os itens do menu: entradas, pratos principais e sobremesas.</p>
      </section>

      <section>
        <h2>Consumidor</h2>
        <p>Area para o cliente visualizar o menu e criar encomendas selecionando os itens desejados.</p>
      </section>

      <section>
        <h2>Cozinha</h2>
        <p>Area para a equipa da cozinha visualizar as encomendas e atualizar o estado dos pedidos.</p>
      </section>
    </div>
  );
}
