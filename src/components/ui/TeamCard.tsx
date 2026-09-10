import { FiGithub, FiLinkedin } from "react-icons/fi";
import type { TeamMember } from "../../types";
import Card from "./Card";

interface TeamCardProps {
    membro: TeamMember;
}

/** Card de um integrante da equipe, usado na página Integrantes. */
export default function TeamCard({ membro }: TeamCardProps) {
    return (
        <Card className="flex flex-col items-center text-center">
            <img
                src={membro.foto}
                alt={`Foto de ${membro.nome}`}
                className="mb-4 h-24 w-24 rounded-full object-cover ring-4 ring-brand-100"
            />
            <h2 className="text-lg font-bold text-brand-900">{membro.nome}</h2>
            <p className="mt-1 text-sm text-gray-500">
                RM: {membro.rm} · Turma {membro.turma}
            </p>
            <div className="mt-4 flex gap-4">
                <a
                    href={membro.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900"
                >
                    <FiGithub /> GitHub
                </a>
                <a
                    href={membro.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-900"
                >
                    <FiLinkedin /> LinkedIn
                </a>
            </div>
        </Card>
    );
}