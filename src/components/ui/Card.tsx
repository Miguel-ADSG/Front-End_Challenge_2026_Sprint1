import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

/** Cartão de conteúdo reutilizado em quase todas as páginas do site. */
export default function Card({ children, className = "" }: CardProps) {
    return (
        <article
            className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md sm:p-8 ${className}`}
        >
            {children}
        </article>
    );
}