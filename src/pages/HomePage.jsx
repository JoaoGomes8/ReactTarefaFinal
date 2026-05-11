export default function HomePage() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-6 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-8 shadow-[var(--shadow-soft)] backdrop-blur-xl lg:grid-cols-[1.6fr_0.9fr]">
        <div className="grid gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">Plataforma de restauracao</span>
          <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[0.97] text-[var(--heading)] md:text-7xl">
            Operacao completa de sala, menu e cozinha num unico painel.
          </h1>
          <p className="max-w-3xl text-base text-[var(--text-soft)] md:text-lg">
            Uma experiencia visual mais cuidada para o gestor publicar pratos, o consumidor montar a encomenda e a cozinha acompanhar o servico em tempo real.
          </p>
        </div>

        <div className="grid content-center gap-3 rounded-[1.5rem] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] p-6 text-white shadow-[var(--shadow-soft)]">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/90">Destaque</span>
          <strong className="text-2xl leading-tight">Modo Escuro global ativo em toda a aplicacao.</strong>
          <span className="text-sm text-white/90">Ideal para atendimento noturno e ambientes de cozinha com pouca luz.</span>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          ["01", "Gestor", "Cria itens do menu e organiza a oferta entre entradas, pratos principais e sobremesas."],
          ["02", "Consumidor", "Consulta o menu da API, escolhe os pratos e envia a encomenda com resumo visual do pedido."],
          ["03", "Cozinha", "Recebe a lista de pedidos, vê o cliente associado e atualiza o estado para confeccao ou entregue."],
        ].map(([kicker, title, text]) => (
          <article key={title} className="grid gap-3 rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-soft)]">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--primary)]">{kicker}</span>
            <h2 className="font-serif text-[1.75rem] text-[var(--heading)]">{title}</h2>
            <p className="text-[var(--text-soft)]">{text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
