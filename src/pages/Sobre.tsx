import Card from "../components/ui/Card";
import PageHero from "../components/ui/PageHero";

const secoes = [
    {
        titulo: "Contexto",
        texto:
            "Em muitas cidades, a mobilidade urbana responde por parcela significativa das emissões e dos custos diários das famílias. Usuários com menor poder aquisitivo frequentemente enfrentam dificuldades para acessar oportunidades por limitações no deslocamento. Programas de recompensa que convertem pontos em crédito de transporte atuam como um incentivo direto ao uso do transporte coletivo, promovendo inclusão social e reduzindo a dependência do transporte individual motorizado.",
    },
    {
        titulo: "Solução proposta",
        texto:
            "A solução começa com um MVP baseado em vouchers e códigos QR que o usuário recebe imediatamente após a conversão, garantindo rapidez de implementação e compatibilidade com parceiros que aceitam vouchers. Paralelamente, a evolução prevê integração direta com sistemas de bilhetagem por meio de APIs seguras. Entre essas etapas, implementamos uma camada de antifraude e compliance que aplica regras de negócio, limites e detecção de padrões suspeitos, com fluxo de revisão manual quando necessário.",
    },
    {
        titulo: "Tecnologias recomendadas",
        texto:
            "No front-end, React + Vite + TypeScript com Tailwind CSS para interatividade e responsividade. No back-end, uma API RESTful (Java com Spring Boot, prevista para a Sprint 4) para simulação, criação de pedidos e integração com parceiros, com autenticação segura para operações sensíveis. Persistência em banco relacional, além de boas práticas de observabilidade, containers e políticas de conformidade com a LGPD.",
    },
    {
        titulo: "Roadmap",
        texto:
            "O desenvolvimento segue fases claras: planejamento inicial de requisitos e parceiros; lançamento do MVP com simulador e geração de vouchers; implementação da camada antifraude; piloto de integração com operadoras de bilhetagem; e, por fim, escala contínua com onboarding de múltiplos parceiros e dashboards de impacto para prefeituras.",
    },
];

export default function Sobre() {
    return (
        <div>
            <PageHero titulo="Sobre a solução">
                <p>Entenda o contexto, a proposta e o caminho técnico do projeto.</p>
            </PageHero>

            <section className="mx-auto max-w-4xl space-y-6 px-4 py-14 sm:px-6">
                {secoes.map((secao) => (
                    <Card key={secao.titulo}>
                        <h2 className="text-xl font-bold text-brand-900">{secao.titulo}</h2>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">{secao.texto}</p>
                    </Card>
                ))}
            </section>
        </div>
    );
}