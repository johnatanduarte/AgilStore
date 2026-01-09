// Importa funções utilitárias (persistência, entrada de dados, id)
const Utils = require("./utils");

// Carrega os dados do inventário ao iniciar o programa
let inventario = Utils.carregarDados();

//Adicionar Produto
async function adicionarProduto() {
  console.log("\n--- Adicionar Novo Produto ---");

  // Solicita dados do produto
  const nome = await Utils.perguntar("Nome do Produto: ");
  const categoria = await Utils.perguntar("Categoria: ");

  // Validação da quantidade
  let qtd = parseInt(await Utils.perguntar("Quantidade em Estoque: "));
  while (isNaN(qtd)) {
    console.log("Por favor, insira um número válido.");
    qtd = parseInt(await Utils.perguntar("Quantidade em Estoque: "));
  }

  // Validação do preço (aceita vírgula ou ponto)
  let precoStr = await Utils.perguntar("Preço (R$): ");
  let preco = parseFloat(precoStr.replace(",", "."));
  while (isNaN(preco)) {
    console.log("Por favor, insira um valor válido.");
    precoStr = await Utils.perguntar("Preço (R$): ");
    preco = parseFloat(precoStr.replace(",", "."));
  }

  // Cria o objeto produto com ID único
  const produto = {
    id: Utils.gerarId(),
    nome,
    categoria,
    quantidade: qtd,
    preco,
  };

  // Adiciona ao inventário e salva no arquivo JSON
  inventario.push(produto);
  Utils.salvarDados(inventario);

  console.log(`\n Produto "${nome}" adicionado com sucesso! ID: ${produto.id}`);
}

//Listar Produtos (com filtro e ordenação)
async function listarProdutos() {
  console.log("\n--- Lista de Produtos ---");

  // Verifica se o inventário está vazio
  if (inventario.length === 0) {
    console.log("O inventário está vazio.");
    return;
  }

  // Pergunta se deseja aplicar filtro ou ordenação
  const filtro = await Utils.perguntar("Deseja filtrar/ordenar? (S/N): ");
  let listaExibicao = [...inventario];

  if (filtro.toLowerCase() === "s") {
    console.log("1. Ordenar por Nome");
    console.log("2. Ordenar por Quantidade");
    console.log("3. Ordenar por Preço");
    console.log("4. Filtrar por Categoria");

    const opcao = await Utils.perguntar("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        listaExibicao.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
      case "2":
        listaExibicao.sort((a, b) => a.quantidade - b.quantidade);
        break;
      case "3":
        listaExibicao.sort((a, b) => a.preco - b.preco);
        break;
      case "4":
        const cat = await Utils.perguntar("Digite a categoria: ");
        listaExibicao = listaExibicao.filter((p) =>
          p.categoria.toLowerCase().includes(cat.toLowerCase())
        );
        break;
      default:
        console.log(" Opção de filtro inválida! Exibindo lista padrão.");
        break;
    }
  } else if (filtro.toLowerCase() === "n") {
    // Não faz nada, apenas segue para exibir a lista completa
  } else {
    console.log(" Opção inválida! Exibindo a lista completa sem alterações.");
  }

  console.table(
    listaExibicao.map((p) => ({
      ID: p.id,
      Nome: p.nome,
      Categoria: p.categoria,
      Qtd: p.quantidade,
      Preço: `R$ ${p.preco.toFixed(2)}`,
    }))
  );
}

// Atualizar Produto
async function atualizarProduto() {
  console.log("\n--- Atualizar Produto ---");

  // Solicita o ID do produto
  const id = await Utils.perguntar("Informe o ID do produto: ");

  // Procura o produto pelo ID
  const index = inventario.findIndex((p) => p.id === id);
  if (index === -1) {
    console.log(" Produto não encontrado!");
    return;
  }

  const produto = inventario[index];
  console.log(`Editando: ${produto.nome}`);

  console.log(
    "O que deseja alterar? [1] Nome [2] Categoria [3] Qtd [4] Preço [0] Cancelar"
  );

  const opcao = await Utils.perguntar("Opção: ");

  // Atualiza apenas o campo escolhido
  switch (opcao) {
    case "1":
      produto.nome = await Utils.perguntar("Novo Nome: ");
      break;
    case "2":
      produto.categoria = await Utils.perguntar("Nova Categoria: ");
      break;
    case "3":
      const qtd = parseInt(await Utils.perguntar("Nova Quantidade: "));
      if (!isNaN(qtd)) produto.quantidade = qtd;
      break;
    case "4":
      const precoStr = await Utils.perguntar("Novo Preço: ");
      const preco = parseFloat(precoStr.replace(",", "."));
      if (!isNaN(preco)) produto.preco = preco;
      break;
    case "0":
      return;
    default:
      console.log("Opção inválida.");
      return;
  }

  // Salva as alterações
  inventario[index] = produto;
  Utils.salvarDados(inventario);
  console.log(" Produto atualizado com sucesso!");
}

// Excluir Produto
async function excluirProduto() {
  console.log("\n--- Excluir Produto ---");

  const id = await Utils.perguntar("Informe o ID do produto para excluir: ");

  const index = inventario.findIndex((p) => p.id === id);
  if (index === -1) {
    console.log(" Produto não encontrado!");
    return;
  }

  // Confirmação antes de excluir
  const confirmacao = await Utils.perguntar(
    `Tem certeza que deseja excluir "${inventario[index].nome}"? (S/N): `
  );

  if (confirmacao.toLowerCase() === "s") {
    inventario.splice(index, 1);
    Utils.salvarDados(inventario);
    console.log(" Produto removido com sucesso.");
  } else {
    console.log("Operação cancelada.");
  }
}

// Buscar Produto
async function buscarProduto() {
  console.log("\n--- Buscar Produto ---");

  const termo = await Utils.perguntar("Digite o ID ou parte do Nome: ");

  // Busca por ID exato ou parte do nome
  const resultados = inventario.filter(
    (p) => p.id === termo || p.nome.toLowerCase().includes(termo.toLowerCase())
  );

  if (resultados.length > 0) {
    console.table(
      resultados.map((p) => ({
        ID: p.id,
        Nome: p.nome,
        Categoria: p.categoria,
        Qtd: p.quantidade,
        Preço: `R$ ${p.preco.toFixed(2)}`,
      }))
    );
  } else {
    console.log("🔍 Nenhum produto encontrado.");
  }
}

// Exporta as funções para uso no index.js
module.exports = {
  adicionarProduto,
  listarProdutos,
  atualizarProduto,
  excluirProduto,
  buscarProduto,
};
