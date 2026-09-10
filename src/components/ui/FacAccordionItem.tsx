import { FiChevronDown } from "react-icons/fi";
import type { FaqEntry } from "../../types";

interface FaqAccordionItemProps {
    entrada: FaqEntry;
    aberta: boolean;
    onToggle: () => void;
}

/** Item individual do acordeão de perguntas frequentes. */
export default function FaqAccordionItem({ entrada, aberta, onToggle }: FaqAccordionItemProps) {
    return (
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={aberta}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
                <span className="font-semibold text-brand-900">{entrada.pergunta}</span>
                <FiChevronDown
                    className={`shrink-0 text-brand-700 transition-transform duration-200 ${aberta ? "rotate-180" : ""}`}
                />
            </button>
            {aberta && <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600">{entrada.resposta}</p>}
        </div>
    );
}