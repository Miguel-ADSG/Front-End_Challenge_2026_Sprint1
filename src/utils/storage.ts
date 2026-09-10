// Pequeno helper de persistência local. Como o projeto ainda não tem
// back-end (isso fica para a Sprint 4, com a API Java), usamos o
// localStorage do navegador para lembrar o progresso do usuário entre
// visitas — lido/gravado sempre a partir de useEffect nos componentes.

const CHAVE_MISSOES = "soulup:missoes-concluidas";

export function carregarMissoesConcluidas(): string[] {
    try {
        const bruto = localStorage.getItem(CHAVE_MISSOES);
        return bruto ? (JSON.parse(bruto) as string[]) : [];
    } catch {
        return [];
    }
}

export function salvarMissoesConcluidas(ids: string[]): void {
    try {
        localStorage.setItem(CHAVE_MISSOES, JSON.stringify(ids));
    } catch {
        // Se o navegador bloquear o localStorage (modo privado, por exemplo),
        // a aplicação continua funcionando, apenas sem persistência.
    }
}

const CHAVE_HISTORICO = "soulup:historico-conversoes";

export function carregarHistoricoConversoes<T>(): T[] {
    try {
        const bruto = localStorage.getItem(CHAVE_HISTORICO);
        return bruto ? (JSON.parse(bruto) as T[]) : [];
    } catch {
        return [];
    }
}

export function salvarHistoricoConversoes<T>(historico: T[]): void {
    try {
        localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
    } catch {
        // ver comentário acima
    }
}