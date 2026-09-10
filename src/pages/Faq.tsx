import { useState } from "react";
import FaqAccordionItem from "../components/ui/FaqAccordionItem";
import PageHero from "../components/ui/PageHero";
import { faqEntries } from "../data/faq";

export default function Faq() {
    // useState nº2 do projeto: guarda qual pergunta está aberta no acordeão.
    const [abertaId, setAbertaId] = useState<string | null>(faqEntries[0]?.id ?? null);

    function alternar(id: string) {
        setAbertaId((atual) => (atual === id ? null : id));
    }

    return (
        <div>
            <PageHero titulo="Perguntas frequentes">
                <p>Respostas rápidas sobre a conversão de pontos em transporte.</p>
            </PageHero>

            <section className="mx-auto max-w-3xl space-y-3 px-4 py-14 sm:px-6">
                {faqEntries.map((entrada) => (
                    <FaqAccordionItem
                        key={entrada.id}
                        entrada={entrada}
                        aberta={abertaId === entrada.id}
                        onToggle={() => alternar(entrada.id)}
                    />
                ))}
            </section>
        </div>
    );
}