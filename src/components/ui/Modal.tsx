import type { ReactNode } from "react";
import { FiX } from "react-icons/fi";

interface ModalProps {
    aberto: boolean;
    variante?: "neutro" | "sucesso" | "erro";
    onFechar: () => void;
    children: ReactNode;
}

const variantes: Record<NonNullable<ModalProps["variante"]>, string> = {
    neutro: "border-brand-900",
    sucesso: "border-brand-500",
    erro: "border-red-600",
};

/**
 * Modal simples controlado por estado (useState no componente pai),
 * substituindo o antigo <dialog> nativo da versão HTML/CSS/JS.
 */
export default function Modal({ aberto, variante = "neutro", onFechar, children }: ModalProps) {
    if (!aberto) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
            onClick={onFechar}
        >
            <div
                className={`relative w-full max-w-md rounded-2xl border-t-4 bg-white p-6 shadow-xl ${variantes[variante]}`}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onFechar}
                    aria-label="Fechar"
                    className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                    <FiX size={20} />
                </button>
                <div className="pr-6 text-gray-700">{children}</div>
            </div>
        </div>
    );
}