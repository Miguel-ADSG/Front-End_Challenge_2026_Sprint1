import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiTrash2 } from "react-icons/fi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Modal from "../components/ui/Modal";
import PageHero from "../components/ui/PageHero";
import type {
    BeneficioTipo,
    ConversaoFormValues,
    ConversaoHistoricoItem,
    ConversaoResultado,
} from "../types";
import {
    CONVERSAO_MINIMA_PONTOS,
    calcularConversao,
    formatarMoeda,
    gerarCodigoVoucher,
    simularIntegracaoBilhetagem,
} from "../utils/conversao";
import { carregarHistoricoConversoes, salvarHistoricoConversoes } from "../utils/storage";

interface ModalState {
    aberto: boolean;
    variante: "neutro" | "sucesso" | "erro";
    titulo: string;
    corpo: string;
}

const modalFechado: ModalState = { aberto: false, variante: "neutro", titulo: "", corpo: "" };

export default function Transporte() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ConversaoFormValues>({
        defaultValues: { pontos: undefined, tipo: "", valorUnitario: 1 },
    });

    // useState nº3: resultado da simulação atual (antes da confirmação).
    const [resultado, setResultado] = useState<ConversaoResultado | null>(null);
    // useState nº4: estado do modal de feedback (processando / sucesso / erro).
    const [modal, setModal] = useState<ModalState>(modalFechado);
    const [confirmando, setConfirmando] = useState(false);

    // Inicialização "preguiçosa": lê o histórico do localStorage apenas na
    // primeira renderização, evitando sobrescrevê-lo com um array vazio.
    const [historico, setHistorico] = useState<ConversaoHistoricoItem[]>(() =>
        carregarHistoricoConversoes<ConversaoHistoricoItem>(),
    );

    // useEffect: sempre que o histórico mudar, persiste no localStorage.
    useEffect(() => {
        salvarHistoricoConversoes(historico);
    }, [historico]);

    function onSimular(dados: ConversaoFormValues) {
        const calculo = calcularConversao({
            pontos: dados.pontos,
            tipo: dados.tipo as BeneficioTipo,
            valorUnitario: dados.valorUnitario,
        });
        setResultado(calculo);
    }

    async function handleConfirmar() {
        if (!resultado) return;
        setConfirmando(true);
        setModal({ aberto: true, variante: "neutro", titulo: "Processando...", corpo: "Validando sua solicitação." });

        await new Promise((resolve) => setTimeout(resolve, 800));

        if (resultado.tipo === "integracao") {
            const integracao = simularIntegracaoBilhetagem(resultado.pontos);
            if (!integracao.success) {
                setModal({
                    aberto: true,
                    variante: "erro",
                    titulo: "Não foi possível concluir",
                    corpo: integracao.reason ?? "Tente novamente mais tarde.",
                });
                setConfirmando(false);
                return;
            }
            registrarHistorico(integracao.idPedido ?? "INT-000");
            setModal({
                aberto: true,
                variante: "sucesso",
                titulo: "Crédito solicitado com sucesso!",
                corpo: `ID do pedido: ${integracao.idPedido}`,
            });
        } else {
            const codigo = gerarCodigoVoucher();
            registrarHistorico(codigo);
            setModal({
                aberto: true,
                variante: "sucesso",
                titulo: "Voucher gerado!",
                corpo: `Código: ${codigo} — Valor: ${formatarMoeda(resultado.valorLiquido)}`,
            });
        }

        setConfirmando(false);
    }

    function registrarHistorico(codigo: string) {
        if (!resultado) return;
        const item: ConversaoHistoricoItem = {
            ...resultado,
            id: crypto.randomUUID(),
            data: new Date().toISOString(),
            codigo,
        };
        setHistorico((atual) => [item, ...atual].slice(0, 5));
        setResultado(null);
        reset({ pontos: undefined, tipo: "", valorUnitario: 1 });
    }

    function limparHistorico() {
        setHistorico([]);
    }

    const inputClasses = (temErro: boolean) =>
        `w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100 ${temErro ? "border-red-500" : "border-gray-300"
        }`;

    return (
        <div>
            <PageHero titulo="Converter pontos em crédito de transporte">
                <p>Veja a conversão dos seus pontos, escolha o tipo de benefício e o impacto de CO₂ evitado.</p>
            </PageHero>

            <section className="mx-auto grid max-w-5xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[2fr_1fr]">
                <Card>
                    <h2 className="text-xl font-bold text-brand-900">Simulador de conversão</h2>

                    <form onSubmit={handleSubmit(onSimular)} noValidate className="mt-5 space-y-5">
                        <div>
                            <label htmlFor="pontos" className="mb-1 block text-sm font-semibold text-brand-900">
                                Pontos disponíveis
                            </label>
                            <input
                                id="pontos"
                                type="number"
                                placeholder="Ex: 1200"
                                className={inputClasses(Boolean(errors.pontos))}
                                {...register("pontos", {
                                    required: "Informe a quantidade de pontos.",
                                    valueAsNumber: true,
                                    validate: (valor) =>
                                        (Number.isFinite(valor) && valor >= CONVERSAO_MINIMA_PONTOS) ||
                                        `Conversão mínima: ${CONVERSAO_MINIMA_PONTOS} pontos.`,
                                })}
                            />
                            {errors.pontos && <p className="mt-1 text-xs text-red-600">{errors.pontos.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="tipo" className="mb-1 block text-sm font-semibold text-brand-900">
                                Tipo de benefício
                            </label>
                            <select
                                id="tipo"
                                className={inputClasses(Boolean(errors.tipo))}
                                {...register("tipo", { required: "Selecione o tipo de benefício." })}
                            >
                                <option value="">Selecione</option>
                                <option value="voucher">Voucher (boleto/QR)</option>
                                <option value="integracao">Crédito direto (integração bilhetagem)</option>
                            </select>
                            {errors.tipo && <p className="mt-1 text-xs text-red-600">{errors.tipo.message}</p>}
                        </div>

                        <div>
                            <label htmlFor="valorUnitario" className="mb-1 block text-sm font-semibold text-brand-900">
                                Valor por 100 pontos (R$)
                            </label>
                            <input
                                id="valorUnitario"
                                type="number"
                                step="0.01"
                                className={inputClasses(Boolean(errors.valorUnitario))}
                                {...register("valorUnitario", {
                                    required: "Informe o valor por 100 pontos.",
                                    valueAsNumber: true,
                                    validate: (valor) => (valor > 0 ? true : "Informe um valor válido."),
                                })}
                            />
                            {errors.valorUnitario && (
                                <p className="mt-1 text-xs text-red-600">{errors.valorUnitario.message}</p>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button type="submit">Simular</Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    reset({ pontos: undefined, tipo: "", valorUnitario: 1 });
                                    setResultado(null);
                                }}
                            >
                                Limpar
                            </Button>
                        </div>
                    </form>

                    {resultado && (
                        <div className="mt-6 rounded-xl bg-brand-50 p-5" aria-live="polite">
                            <p>
                                <strong>Pontos:</strong> {resultado.pontos}
                            </p>
                            <p>
                                <strong>Valor bruto:</strong> {formatarMoeda(resultado.valorBruto)}
                            </p>
                            <p>
                                <strong>Taxa:</strong> {formatarMoeda(resultado.taxa)}
                            </p>
                            <p>
                                <strong>Valor líquido:</strong> {formatarMoeda(resultado.valorLiquido)}
                            </p>
                            <p>
                                <strong>Impacto estimado:</strong> {resultado.impactoCO2kg.toFixed(2)} kg de CO₂ evitado
                            </p>
                            <Button className="mt-4" onClick={handleConfirmar} disabled={confirmando}>
                                {confirmando ? "Processando..." : "Confirmar conversão"}
                            </Button>
                        </div>
                    )}
                </Card>

                <aside className="space-y-6">
                    <Card>
                        <h3 className="font-bold text-brand-900">Como funciona a conversão</h3>
                        <ol className="mt-3 list-decimal space-y-1 pl-4 text-sm text-gray-600">
                            <li>Você informa a quantidade de pontos.</li>
                            <li>O simulador calcula o valor e sugere voucher ou integração.</li>
                            <li>Na confirmação, há verificação antifraude e geração do voucher ou pedido.</li>
                        </ol>
                        <h4 className="mt-4 font-semibold text-brand-900">Regras de negócio</h4>
                        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-gray-600">
                            <li>Conversão mínima: {CONVERSAO_MINIMA_PONTOS} pontos.</li>
                            <li>Taxa de processamento: 2% (simulada).</li>
                            <li>Valor por 100 pontos: configurável no formulário.</li>
                        </ul>
                    </Card>

                    {historico.length > 0 && (
                        <Card>
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-brand-900">Últimas conversões</h3>
                                <button
                                    type="button"
                                    onClick={limparHistorico}
                                    aria-label="Limpar histórico"
                                    className="text-gray-400 hover:text-red-600"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                            <ul className="mt-3 space-y-3 text-sm">
                                {historico.map((item) => (
                                    <li key={item.id} className="border-b border-gray-100 pb-2 last:border-none">
                                        <p className="font-semibold text-brand-900">{formatarMoeda(item.valorLiquido)}</p>
                                        <p className="text-xs text-gray-500">
                                            {item.tipo === "voucher" ? "Voucher" : "Integração"} · {item.codigo}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    )}
                </aside>
            </section>

            <Modal aberto={modal.aberto} variante={modal.variante} onFechar={() => setModal(modalFechado)}>
                <p className="font-semibold text-brand-900">{modal.titulo}</p>
                <p className="mt-1 text-sm">{modal.corpo}</p>
            </Modal>
        </div>
    );
}