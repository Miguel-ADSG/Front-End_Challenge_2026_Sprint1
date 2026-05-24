/* ---------- Dados de exemplo ---------- */
const TAXA_PROCESSAMENTO = 0.02; // 2% taxa simulada
const CONVERSAO_MINIMA_PONTOS = 100; // regra de negócio: mínimo 100 pontos

/* ---------- Utilitários ---------- */
/**
 * formataValor - formata número para moeda BRL
 * @param {number} v
 * @returns {string}
 */
function formataValor(v) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* ---------- Simulador de Conversão ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Captura elementos (existem em várias páginas; protegemos com checks)
  const formConversao = document.getElementById('formConversao');
  const inputPontos = document.getElementById('inputPontos');
  const selectTipo = document.getElementById('selectTipo');
  const inputValorUnit = document.getElementById('inputValorUnit');
  const resultado = document.getElementById('resultado');
  const btnLimpar = document.getElementById('btnLimpar');

  // Modal de confirmação (dialog nativo)
  const modalConfirm = document.getElementById('modalConfirm');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalConfirm.close();
    });
  }

  // Função que valida o formulário e retorna um objeto com dados prontos
  function validarEConstruirDados() {
    // validações básicas
    const pontos = Number(inputPontos.value);
    const tipo = selectTipo.value;
    const valorUnit = Number(inputValorUnit.value);

    if (!Number.isFinite(pontos) || pontos <= 0) {
      throw new Error('Informe uma quantidade de pontos válida.');
    }
    if (pontos < CONVERSAO_MINIMA_PONTOS) {
      throw new Error(`Conversão mínima: ${CONVERSAO_MINIMA_PONTOS} pontos.`);
    }
    if (!tipo) {
      throw new Error('Selecione o tipo de benefício.');
    }
    if (!Number.isFinite(valorUnit) || valorUnit <= 0) {
      throw new Error('Informe um valor por 100 pontos válido.');
    }

    return { pontos, tipo, valorUnit };
  }

  // Função que calcula o resultado da conversão
  function calcularConversao({ pontos, tipo, valorUnit }) {
    // valorUnit é o valor em R$ por 100 pontos
    const unidades = pontos / 100;
    const valorBruto = unidades * valorUnit;
    const taxa = valorBruto * TAXA_PROCESSAMENTO;
    const valorLiquido = valorBruto - taxa;

    // estimativa de impacto (exemplo): cada R$1 em transporte evita 0.25kg CO2 (valor fictício)
    const impactoCO2kg = valorLiquido * 0.25;

    // objeto de retorno com detalhes
    return {
      pontos,
      tipo,
      valorBruto,
      taxa,
      valorLiquido,
      impactoCO2kg
    };
  }

  // Função que simula "integração" com sistema de bilhetagem
  // Aqui apenas retorna um objeto com status; em produção seria uma chamada fetch() para API.
  function simularIntegracaoBilhetagem(dadosConversao) {
    // Simulação de verificação antifraude simples
    const suspeita = dadosConversao.pontos > 100000; // regra fictícia
    if (suspeita) {
      return { success: false, reason: 'Transação suspeita. Revisão manual necessária.' };
    }
    // Simula criação de pedido
    return { success: true, idPedido: `INT-${Date.now()}`, message: 'Crédito solicitado com sucesso.' };
  }

  // Renderiza resultado no DOM
  function renderResultado(calc) {
    resultado.innerHTML = `
      <p><strong>Pontos:</strong> ${calc.pontos}</p>
      <p><strong>Valor bruto:</strong> ${formataValor(calc.valorBruto)}</p>
      <p><strong>Taxa (${(TAXA_PROCESSAMENTO * 100).toFixed(2)}%):</strong> ${formataValor(calc.taxa)}</p>
      <p><strong>Valor líquido (a ser convertido):</strong> ${formataValor(calc.valorLiquido)}</p>
      <p><strong>Impacto estimado (kg CO₂ evitado):</strong> ${calc.impactoCO2kg.toFixed(2)} kg</p>
      <div style="margin-top:1rem;">
        <button id="btnConfirmar" class="hero__btn">Confirmar Conversão</button>
      </div>
    `;
    // atrelamos evento ao botão de confirmar
    const btnConfirmar = document.getElementById('btnConfirmar');
    if (btnConfirmar) {
      btnConfirmar.addEventListener('click', async () => {
        try {
          // Exibe modal com "processando"
          if (modalConfirm) {
            modalContent.innerHTML = '<p>Processando solicitação...</p>';
            modalConfirm.classList.remove('danger', 'success'); // limpa estilos anteriores
            modalConfirm.showModal();
          }

          // Simula tempo de processamento
          await new Promise(res => setTimeout(res, 800));

          if (selectTipo.value === 'integracao') {
            const integracao = simularIntegracaoBilhetagem(calc);
            if (!integracao.success) {
              modalContent.innerHTML = `<p>Erro: ${integracao.reason}</p>`;
              modalConfirm.classList.remove('success');
              modalConfirm.classList.add('danger');
              return;
            }
            modalContent.innerHTML = `<p>${integracao.message}</p><p>ID: ${integracao.idPedido}</p>`;
            modalConfirm.classList.remove('danger');
            modalConfirm.classList.add('success');
          } else {
            const voucherCode = `VCH-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;
            modalContent.innerHTML = `<p>Voucher gerado: <strong>${voucherCode}</strong></p><p>Valor: ${formataValor(calc.valorLiquido)}</p>`;
            modalConfirm.classList.remove('danger');
            modalConfirm.classList.add('success');
          }
        } catch (err) {
          modalContent.innerHTML = `<p>Erro: ${err.message}</p>`;
          modalConfirm.classList.remove('success');
          modalConfirm.classList.add('danger');
        }
      });

    }
  }

  // Evento submit do formulário
  if (formConversao) {
    formConversao.addEventListener('submit', (e) => {
      e.preventDefault();
      resultado.innerHTML = '';
      try {
        const dados = validarEConstruirDados();
        const calc = calcularConversao(dados);
        renderResultado(calc);
      } catch (err) {
        // feedback de erro
        resultado.innerHTML = `<p class="danger">${err.message}</p>`;
      }
    });
  }

  // Botão limpar
  if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
      if (inputPontos) inputPontos.value = '';
      if (selectTipo) selectTipo.value = '';
      if (inputValorUnit) inputValorUnit.value = '1.00';
      if (resultado) resultado.innerHTML = '';
    });
  }

  // Fechar modal com ESC
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && modalConfirm && modalConfirm.open) {
      modalConfirm.close();
    }
  });
});

/* ---------- Dropdown mobile ---------- */
const mobileToggle = document.getElementById('mobileToggle');
const mobileDropdown = document.getElementById('mobileDropdown');

if (mobileToggle && mobileDropdown) {
  function openMenu() {
    mobileDropdown.classList.add('open');
    mobileDropdown.setAttribute('aria-hidden', 'false');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.classList.add('open');
  }
  function closeMenu() {
    mobileDropdown.classList.remove('open');
    mobileDropdown.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.classList.remove('open');
  }
  function toggleMenu() {
    if (mobileDropdown.classList.contains('open')) closeMenu();
    else openMenu();
  }

  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  mobileToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // fecha ao clicar fora
  document.addEventListener('click', (ev) => {
    if (!mobileDropdown.classList.contains('open')) return;
    const target = ev.target;
    if (mobileToggle.contains(target) || mobileDropdown.contains(target)) return;
    closeMenu();
  });

  // fecha com ESC
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && mobileDropdown.classList.contains('open')) {
      closeMenu();
      mobileToggle.focus();
    }
  });

  // fecha ao clicar em um link do dropdown
  mobileDropdown.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });
}