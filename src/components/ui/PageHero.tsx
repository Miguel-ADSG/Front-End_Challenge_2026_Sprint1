import type { ReactNode } from "react";

interface PageHeroProps {
    titulo: string;
    children?: ReactNode;
}

/** Faixa de destaque reutilizada no topo de todas as páginas. */
export default function PageHero({ titulo, children }: PageHeroProps) {
    return (
        <section className="bg-brand-900 px-4 py-14 text-center text-white sm:px-6 sm:py-20">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-extrabold sm:text-4xl">{titulo}</h1>
                {children && <div className="mt-4 space-y-2 text-brand-100 sm:text-lg">{children}</div>}
            </div>
        </section>
    );
}