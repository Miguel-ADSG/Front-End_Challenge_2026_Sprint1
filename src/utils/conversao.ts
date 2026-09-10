import type { BeneficioTipo, ConversaoResultado } from "../types";

// Mesmas regras de negócio da Sprint 1/2, agora tipadas em TypeScript.
export const TAXA_PROCESSAMENTO = 0.02; // 2% taxa simulada
export const CONVERSAO_MINIMA_PONTOS = 100; // regra de negócio: mínimo 100 pontos

/** Formata um número como moeda BRL. */
export function formatarMoeda(valor: number): string {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

interface CalcularConversaoInput {
    pontos: number;
    tipo: BeneficioTipo;
    valorUnitario: number;
}

/** Calcula valor bruto, taxa, valor líquido e impacto estimado de CO2. */
export function calcularConversao({
    pontos,
    tipo,
    valorUnitario,
}: CalcularConversaoInput): ConversaoResultado {
    const unidades = pontos / 100;
    const valorBruto = unidades * valorUnitario;
    const taxa = valorBruto * TAXA_PROCESSAMENTO;
    const valorLiquido = valorBruto - taxa;

    // Estimativa fictícia: cada R$1 revertido em transporte evita 0,25kg de CO2.
    const impactoCO2kg = valorLiquido * 0.25;

    return { pontos, tipo, valorBruto, taxa, valorLiquido, impactoCO2kg };
}

interface IntegracaoResultado {
    success: boolean;
    idPedido?: string;
    reason?: string;
    message?: string;
}

/** Simula a integração com o sistema de bilhetagem (substituiria um fetch real). */
export function simularIntegracaoBilhetagem(pontos: number): IntegracaoResultado {
    const suspeita = pontos > 100000; // regra antifraude fictícia
    if (suspeita) {
        return { success: false, reason: "Transação suspeita. Revisão manual necessária." };
    }
    return {
        success: true,
        idPedido: `INT-${Date.now()}`,
        message: "Crédito solicitado com sucesso.",
    };
}

/** Gera um código de voucher fictício. */
export function gerarCodigoVoucher(): string {
    return `VCH-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
}