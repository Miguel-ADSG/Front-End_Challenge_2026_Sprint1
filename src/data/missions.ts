import type { Mission } from "../types";

// Missões sustentáveis ligadas ao Desafio 2 (transporte público).
// Cada missão concluída soma pontos que alimentam o simulador de conversão.
export const missions: Mission[] = [
  {
    id: "onibus-5-dias",
    titulo: "Semana no coletivo",
    categoria: "Rotina",
    pontos: 150,
    impactoCO2: "≈ 4,5 kg de CO₂ evitados",
    resumo: "Use o ônibus para ir ao trabalho ou à faculdade por 5 dias seguidos.",
    descricao:
      "Registre o uso do transporte coletivo em 5 dias consecutivos. A missão é validada pelo aplicativo por geolocalização e comprovante de bilhetagem, incentivando a troca do carro/moto individual pelo transporte público na rotina da semana.",
    dicas: [
      "Ative o registro automático de viagens no app antes de embarcar.",
      "Guarde o comprovante de bilhetagem como evidência extra.",
      "Combine com colegas de rota para multiplicar o impacto.",
    ],
  },
  {
    id: "bike-compartilhada",
    titulo: "Pedal compartilhado",
    categoria: "Mobilidade ativa",
    pontos: 80,
    impactoCO2: "≈ 1,2 kg de CO₂ evitados",
    resumo: "Registre uma viagem em bicicleta compartilhada até um ponto de ônibus ou metrô.",
    descricao:
      "Combine mobilidade ativa com transporte público: pegue uma bicicleta compartilhada até a estação mais próxima. Essa integração reduz o chamado 'último quilômetro', um dos trechos que mais gera uso de carro por conveniência.",
    dicas: [
      "Prefira estações de bicicleta integradas a terminais de ônibus.",
      "Use capacete e sinalize suas manobras no trânsito.",
      "Tire uma foto da bicicleta na estação para validar a missão.",
    ],
  },
  {
    id: "convide-amigo",
    titulo: "Chame um amigo",
    categoria: "Comunidade",
    pontos: 60,
    impactoCO2: "Impacto indireto — depende da adesão do convidado",
    resumo: "Convide uma pessoa da sua rede para experimentar a conversão de pontos em transporte.",
    descricao:
      "O crescimento da comunidade SoulUp aumenta o poder de negociação com operadoras de transporte para novos convênios. Ao convidar um amigo e ele completar a primeira conversão, os dois ganham pontos de bônus.",
    dicas: [
      "Compartilhe seu código de convite pela página de Contato.",
      "Explique o fluxo: simular, escolher benefício, confirmar.",
      "Ambos ganham bônus apenas na primeira conversão do convidado.",
    ],
  },
  {
    id: "selfie-transporte",
    titulo: "Flagra sustentável",
    categoria: "Engajamento",
    pontos: 40,
    impactoCO2: "Ação de comprovação, sem cálculo direto",
    resumo: "Envie uma selfie usando o transporte público e compartilhe na comunidade SoulUp.",
    descricao:
      "Ações simples do dia a dia reforçam hábitos positivos. Tire uma selfie dentro do ônibus, trem ou metrô e publique na comunidade para inspirar outros usuários — a curadoria é feita pela própria plataforma.",
    dicas: [
      "Evite mostrar documentos ou dados de outras pessoas na foto.",
      "Use a hashtag da campanha vigente para aparecer no destaque.",
      "Fotos repetidas no mesmo dia não contam pontos adicionais.",
    ],
  },
  {
    id: "dez-viagens-mes",
    titulo: "Rotina de 10 viagens",
    categoria: "Integração",
    pontos: 220,
    impactoCO2: "≈ 6 kg de CO₂ evitados",
    resumo: "Complete 10 viagens no mês usando a integração direta com a bilhetagem eletrônica.",
    descricao:
      "Para usuários que já ativaram a integração direta com o sistema de bilhetagem, esta missão recompensa a consistência: cada bloco de 10 viagens registradas automaticamente no mês gera um bônus adicional de pontos, sem necessidade de comprovação manual.",
    dicas: [
      "Ative a integração com bilhetagem na página de conversão.",
      "Acompanhe o contador de viagens no seu painel pessoal.",
      "O contador reinicia todo dia 1º do mês.",
    ],
  },
];