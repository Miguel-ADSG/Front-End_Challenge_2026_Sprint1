export interface TeamMember {
  id: number;
  nome: string;
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
}

export interface FaqEntry {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface Mission {
  id: string;
  titulo: string;
  categoria: string;
  pontos: number;
  impactoCO2: string;
  resumo: string;
  descricao: string;
  dicas: string[];
}

// "voucher" = boleto/QR imediato | "integracao" = crédito direto na bilhetagem
export type BeneficioTipo = "voucher" | "integracao";

export interface ConversaoFormValues {
  pontos: number;
  tipo: BeneficioTipo | "";
  valorUnitario: number;
}

export interface ConversaoResultado {
  pontos: number;
  tipo: BeneficioTipo;
  valorBruto: number;
  taxa: number;
  valorLiquido: number;
  impactoCO2kg: number;
}

export interface ConversaoHistoricoItem extends ConversaoResultado {
  id: string;
  data: string; // ISO string
  codigo: string;
}

export interface ContatoFormValues {
  nome: string;
  email: string;
  mensagem: string;
}
