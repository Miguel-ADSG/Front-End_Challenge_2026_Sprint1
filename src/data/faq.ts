import type { FaqEntry } from "../types";

export const faqEntries: FaqEntry[] = [
    {
        id: "como-converter",
        pergunta: "Como converto pontos?",
        resposta:
            "Use a página de conversão, informe a quantidade de pontos e confirme a solicitação. Você verá taxas e o valor líquido antes de confirmar.",
    },
    {
        id: "quanto-vale",
        pergunta: "Quanto vale 100 pontos?",
        resposta:
            "Valor configurável, dependendo do momento, normalmente sendo R$ 1,00 por 100 pontos. O valor real pode variar conforme campanhas, parceiros entre outros.",
    },
    {
        id: "tempo-credito",
        pergunta: "Quanto tempo leva para receber o crédito?",
        resposta:
            "Vouchers: imediato. Integração com bilhetagem: até 24 horas úteis, dependendo do parceiro.",
    },
    {
        id: "taxa-processamento",
        pergunta: "Há taxa de processamento?",
        resposta:
            "Sim, existe uma taxa que é exibida no resumo antes da confirmação, mostrando transparência total: valor bruto, taxa e valor líquido.",
    },
    {
        id: "cancelar-solicitacao",
        pergunta: "Posso cancelar uma solicitação?",
        resposta:
            "Solicitações em processamento podem ser canceladas conforme o status; pedidos já integrados ao sistema de bilhetagem podem exigir contato pela página de Contato.",
    },
];