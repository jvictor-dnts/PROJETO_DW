// --- CONFIGURAÇÃO INICIAL E TEMA ---
const botaoTema = document.getElementById("tema");
const body = document.body;

// Função para carregar o tema salvo
function carregarTema() {
  const temaSalvo = localStorage.getItem("runner_tema");
  if (temaSalvo === "dark") {
    body.classList.add("dark-mode");
  }
}

// Evento de clique no botão de tema
botaoTema.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  // Salva a preferência do usuário
  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("runner_tema", "dark");
  } else {
    localStorage.setItem("runner_tema", "light");
  }
});

// --- LÓGICA DO ORÇAMENTO ---

// Carrega itens salvos ou cria lista vazia
let itens = JSON.parse(localStorage.getItem("runner_itens")) || [];

const formAdicionar = document.getElementById("forms");
const tabelaBody = document.querySelector("table tbody");

// Formatador de Moeda (Padrão BRL)
const formatarMoeda = (valor) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
};

// Adicionar Item Manualmente (Formulário)
formAdicionar.addEventListener("submit", (e) => {
  e.preventDefault();

  const desc = document.getElementById("descricao").value.trim();
  // Converte string "1.200,50" para float JS corretamente
  const valorInput = document
    .getElementById("valor-unitario")
    .value.replace(",", ".");
  const valor = parseFloat(valorInput);
  const qtd = parseInt(document.getElementById("quantidade").value);

  if (!desc || isNaN(valor) || valor <= 0 || isNaN(qtd) || qtd <= 0) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  adicionarItem(desc, document.getElementById("categoria").value, qtd, valor);
  formAdicionar.reset();
  rolarParaTabela();
});

// Adicionar Item pelos Cards (Botões)
document.querySelectorAll(".button-card").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest("#card");
    const ps = card.querySelectorAll("p");

    // Pega a descrição (primeiro <p>) e o valor (último <p>)
    const desc = ps[0].textContent;
    // Limpa "R$" e espaços para pegar só o número
    const valorTexto = ps[ps.length - 1].textContent
      .replace("R$", "")
      .trim()
      .replace(",", ".");
    const valor = parseFloat(valorTexto);

    // Define categoria baseada no ID da seção pai
    const sectionId = card.closest("section").id;
    let categoria = "Outros";
    if (sectionId === "corridas") categoria = "Corridas";
    else if (sectionId === "equipamentos") categoria = "Equipamentos";
    else if (sectionId === "planilhas") categoria = "Planilhas";

    adicionarItem(desc, categoria, 1, valor);
    rolarParaTabela();
  });
});

// Função genérica para adicionar ao array
function adicionarItem(descricao, categoria, quantidade, valor) {
  itens.push({
    id: Date.now(),
    descricao,
    categoria,
    quantidade,
    valor,
  });
  atualizarInterface();
}

// Função Principal: Atualiza Tabela, Totais e LocalStorage
function atualizarInterface() {
  // 1. Salva no LocalStorage
  localStorage.setItem("runner_itens", JSON.stringify(itens));

  // 2. Renderiza a Tabela
  tabelaBody.innerHTML = itens
    .map((item) => {
      const subtotal = item.quantidade * item.valor;
      return `
            <tr>
                <td>${item.descricao}</td>
                <td>${item.categoria}</td>
                <td>${item.quantidade}</td>
                <td>${formatarMoeda(subtotal)}</td>
                <td>
                    <button class="botao-remover" aria-label="Remover item" data-id="${item.id}"></button>
                </td>
            </tr>
        `;
    })
    .join("");

  // 3. Atualiza os Cards de Resumo
  const total = itens.reduce((sum, i) => sum + i.quantidade * i.valor, 0);
  const qtdTotal = itens.reduce((sum, i) => sum + i.quantidade, 0);
  const maisCaro = itens.length ? Math.max(...itens.map((i) => i.valor)) : 0;

  document.querySelector(".card-resumo:nth-child(1) strong").textContent =
    formatarMoeda(total);
  document.querySelector(".card-resumo:nth-child(2) strong").textContent =
    qtdTotal;
  document.querySelector(".card-resumo:nth-child(3) strong").textContent =
    maisCaro ? formatarMoeda(maisCaro) : "---";
}

// Evento de Remover (Delegação de Eventos - Mais performático)
tabelaBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("botao-remover")) {
    const id = parseInt(e.target.dataset.id);
    itens = itens.filter((item) => item.id !== id);
    atualizarInterface();
  }
});

function rolarParaTabela() {
  document
    .querySelector(".tabela-orcamento")
    .scrollIntoView({ behavior: "smooth" });
}

// Inicializa tudo ao carregar a página
window.addEventListener("load", () => {
  carregarTema();
  atualizarInterface();
});
