import { FiCheckCircle, FiCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import type { Mission } from "../../types";
import Card from "./Card";

interface MissionCardProps {
    missao: Mission;
    concluida: boolean;
    onToggle: () => void;
}

/** Card resumido de uma missão sustentável, usado na listagem /missoes. */
export default function MissionCard({ missao, concluida, onToggle }: MissionCardProps) {
    return (
        <Card className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
                    {missao.categoria}
                </span>
                <button
                    type="button"
                    onClick={onToggle}
                    aria-pressed={concluida}
                    aria-label={concluida ? "Desmarcar missão concluída" : "Marcar missão como concluída"}
                    className="shrink-0 rounded-full p-1 text-gray-300 transition-colors hover:text-brand-500"
                >
                    {concluida ? <FiCheckCircle className="text-brand-500" size={22} /> : <FiCircle size={22} />}
                </button>
            </div>

            <h2 className="text-lg font-bold text-brand-900">{missao.titulo}</h2>
            <p className="text-sm text-gray-600">{missao.resumo}</p>

            <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-semibold text-gold-600">+{missao.pontos} pontos</span>
                <Link
                    to={`/missoes/${missao.id}`}
                    className="text-sm font-semibold text-brand-700 underline-offset-2 hover:text-brand-900 hover:underline"
                >
                    Ver detalhes →
                </Link>
            </div>
        </Card>
    );
}