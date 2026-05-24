# SoulUp | Ecoloop 🌿

Plataforma que transforma pontos acumulados pelos usuários em benefícios reais de mobilidade urbana — com foco em segurança, transparência e impacto ambiental positivo.

---

## 📋 Descrição do Projeto

A **SoulUp | Ecoloop** permite que usuários convertam pontos em créditos de transporte público, escolhendo entre **vouchers (QR/boleto)** ou **crédito direto via integração com sistemas de bilhetagem**. O simulador exibe valor bruto, taxa de processamento e valor líquido antes de qualquer confirmação, além de estimar o impacto de CO₂ evitado com cada conversão.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização e responsividade |
| JavaScript (ES6+) | Interatividade, validações e simulador de conversão |
| CSS Grid & Flexbox | Layout responsivo |
| Dialog API (nativa) | Modais de feedback |

---

## 📁 Estrutura de Pastas

```
FRONT-END_CHALLENGE_2026_SPRINT1/
├── css/
│   ├── base.css          # Reset e variáveis globais
│   ├── cabecalho.css     # Estilos do cabeçalho/navegação
│   ├── conteudo.css      # Grid de cards de conteúdo
│   ├── footer.css        # Rodapé
│   ├── hero.css          # Seção hero/banner
│   ├── main.css          # Importa todos os módulos CSS
│   ├── mobile.css        # Menu dropdown mobile
│   ├── modal.css         # Modais de feedback
│   └── transporte.css    # Layout da página de conversão
├── img/
│   ├── Carlos.jpeg
│   ├── Gustavo.jpeg
│   ├── Miguel.jpeg
│   ├── Murilo.jpeg
│   └── Thiago.jpeg
├── js/
│   ├── contato.js        # Validação e envio do formulário de contato
│   ├── conversao.js      # Simulador de conversão de pontos
│   └── mobile.js         # Menu hamburguer para mobile
├── pages/
│   ├── contato.html      # Página de contato
│   ├── faq.html          # Perguntas frequentes
│   ├── integrantes.html  # Equipe desenvolvedora
│   ├── sobre.html        # Sobre o projeto
│   └── transporte.html   # Simulador de conversão de pontos
├── .gitignore
├── index.html            # Página inicial
└── README.md
```

---

## 👨‍💻 Autores e Créditos

Projeto desenvolvido pela turma **1-TDSPG | Paulista — FIAP**

| Nome | RM | GitHub | LinkedIn |
|---|---|---|---|
| Miguel Vieira Martins | 571978 | [Miguel-ADSG](https://github.com/Miguel-ADSG) | [linkedin](https://www.linkedin.com/in/miguel-vieira-martins-598964406) |
| Gustavo Neri Andrade | 572722 | [GustavoNeriAndrade](https://github.com/GustavoNeriAndrade) | [linkedin](https://www.linkedin.com/in/gustavo-neri-andrade-163795337) |
| Thiago Vendrami Luca | 572942 | [Thiagovluca](https://github.com/Thiagovluca) | [linkedin](https://br.linkedin.com/in/thiago-vendrami-luca-4892a6409) |
| Carlos Americo Machado Brambilla | 571250 | [CarlosAmericoMachado](https://github.com/CarlosAmericoMachado) | [linkedin](https://www.linkedin.com/in/carlos-brambilla-b5b971407) |
| Murilo da Silva Lourenço | 573959 | [murilojosh](https://github.com/murilojosh) | [linkedin](https://www.linkedin.com/in/murilo-lourenço-35250b411) |

---

## 🖼️ Representação do Projeto

### Páginas disponíveis

- **Home** — apresentação da plataforma e chamada para conversão
- **Sobre** — contexto, solução proposta, tecnologias e roadmap
- **Integrantes** — equipe desenvolvedora com foto e links
- **FAQ** — dúvidas frequentes sobre conversão de pontos
- **Contato** — formulário de contato com validação e feedback via modal
- **Converter Pontos** — simulador completo com cálculo de taxa, valor líquido e impacto de CO₂

### Fluxo de conversão

```
Informe os pontos → Selecione o benefício → Simule → Confirme → Receba voucher ou crédito
```

---

## 🔗 Repositório

> Link do repositório no GitHub:
> https://github.com/Miguel-ADSG/Front-End_Challenge_2026_Sprint1.git

---

## 📬 Contato

Para dúvidas ou suporte, utilize o [formulário de contato](./pages/contato.html) disponível no próprio site ou entre em contato com qualquer membro da equipe pelos links acima.

---

<p align="center">© SoulUp — Ecoloop 2026 | FIAP — Front-End Design Engineering</p>