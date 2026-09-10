import { useEffect, useState } from "react";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import PageHero from "../components/ui/PageHero";
import { missions } from "../data/missions";
import { carregarMissoesConcluidas, salvarMissoesConcluidas } from "../utils/storage";

export default function MissaoDetalhe() {
    // useParams lê o parâmetro dinâmico definido na rota "/missoes/:id".
    const { id } = useParams<{ id: string }>();
    // useNavigate permite navegação programática (sem depender de um <Link>).
    const navigate = useNavigate();

    const missao = missions.find((item) => item.id === id);

    const [concluida, setConcluida] = useState(() => carregarMissoesConcluidas().includes(id ?? ""));

    // useEffect com array de dependências [id]: dispara sempre que o parâmetro
    // da rota mudar (por exemplo, ao navegar de uma missão para outra sem sair
    // desta página) e também na montagem/desmontagem do componente — o mesmo
    // padrão do exercício do avião visto em aula.
    useEffect(() => {
        console.info(`[MissaoDetalhe] aberta a missão "${id}".`);
        return () => {
            console.info(`[MissaoDetalhe] fechando a missão "${id}".`);
        };
    }, [id]);

    function handleConcluir() {
        if (!id) return;
        const atual = carregarMissoesConcluidas();
        if (!atual.includes(id)) {
            const atualizado = [...atual, id];
            salvarMissoesConcluidas(atualizado);
        }
        setConcluida(true);
        // Navegação programática: volta para a listagem após concluir.
        navigate("/missoes");
    }

    if (!missao) {
        return (
            <div>
                <PageHero titulo="Missão não encontrada" />
                <section className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
                    <p className="text-gray-600">
                        Não encontramos nenhuma missão com o identificador <code>{id}</code>.
                    </p>
                    <Button to="/missoes" variant="secondary" className="mt-6">
                        <FiArrowLeft /> Voltar para missões
                    </Button>
                </section>
            </div>
        );
    }

    return (
        <div>
            <PageHero titulo={missao.titulo}>
                <p>{missao.resumo}</p>
            </PageHero>

            <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
                <Card>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                            {missao.categoria}
                        </span>
                        <span className="text-sm font-semibold text-gold-600">+{missao.pontos} pontos</span>
                    </div>

                    <p className="mt-5 leading-relaxed text-gray-700">{missao.descricao}</p>

                    <h3 className="mt-6 font-bold text-brand-900">Dicas para concluir</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                        {missao.dicas.map((dica) => (
                            <li key={dica}>{dica}</li>
                        ))}
                    </ul>

                    <p className="mt-4 text-sm text-gray-500">Impacto estimado: {missao.impactoCO2}</p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {concluida ? (
                            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-5 py-3 text-sm font-semibold text-brand-700">
                                <FiCheckCircle /> Missão já concluída
                            </span>
                        ) : (
                            <Button onClick={handleConcluir}>
                                <FiCheckCircle /> Marcar como concluída
                            </Button>
                        )}
                        <Button variant="secondary" onClick={() => navigate(-1)}>
                            <FiArrowLeft /> Voltar
                        </Button>
                    </div>
                </Card>
            </section>
        </div>
    );
}