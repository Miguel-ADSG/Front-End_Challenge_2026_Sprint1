import { useEffect, useState } from "react";
import MissionCard from "../components/ui/MissionCard";
import PageHero from "../components/ui/PageHero";
import { missions } from "../data/missions";
import { carregarMissoesConcluidas, salvarMissoesConcluidas } from "../utils/storage";

export default function Missoes() {
    // useState nº5: ids das missões concluídas. Inicialização "preguiçosa"
    // lendo direto do localStorage (só roda na 1ª renderização).
    const [concluidas, setConcluidas] = useState<string[]>(() => carregarMissoesConcluidas());

    // useEffect: persiste a lista sempre que ela mudar (ex: ao voltar da
    // página de detalhe depois de concluir uma missão, ou ao clicar
    // diretamente no ícone de status de um card nesta página).
    useEffect(() => {
        salvarMissoesConcluidas(concluidas);
    }, [concluidas]);

    function alternarConcluida(id: string) {
        setConcluidas((atual) => (atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id]));
    }

    const pontosGanhos = missions
        .filter((missao) => concluidas.includes(missao.id))
        .reduce((total, missao) => total + missao.pontos, 0);

    return (
        <div>
            <PageHero titulo="Missões sustentáveis">
                <p>Complete ações do dia a dia ligadas ao transporte público e conquiste pontos extras.</p>
                <p className="text-sm text-brand-200">
                    {concluidas.length} de {missions.length} missões concluídas · +{pontosGanhos} pontos ganhos
                </p>
            </PageHero>

            <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
                {missions.map((missao) => (
                    <MissionCard
                        key={missao.id}
                        missao={missao}
                        concluida={concluidas.includes(missao.id)}
                        onToggle={() => alternarConcluida(missao.id)}
                    />
                ))}
            </section>
        </div>
    );
}