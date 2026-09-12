import TeamCard from "../components/ui/TeamCard";
import PageHero from "../components/ui/PageHero";
import { team } from "../data/team";

export default function Integrantes() {
    return (
        <div>
            <PageHero titulo="Equipe desenvolvedora">
                <p>Turma 1-TDSPI | Paulista — FIAP</p>
            </PageHero>

            <section className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
                {team.map((membro) => (
                    <TeamCard key={membro.id} membro={membro} />
                ))}
            </section>
        </div>
    );
}