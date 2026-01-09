// Importa as funções utilitárias
const Utils = require("./utils");

// Importa os serviços relacionados aos produtos
const Service = require("./produtoService");

// Função principal assíncrona que controla o menu
async function menuPrincipal() {
  // Variável de controle do loop do menu
  let executando = true;

  // Loop principal da aplicação
  while (executando) {
    console.log("\n=== AgilStore: Gerenciamento de Estoque ===");
    console.log("1. Adicionar Produto");
    console.log("2. Listar Produtos");
    console.log("3. Atualizar Produto");
    console.log("4. Excluir Produto");
    console.log("5. Buscar Produto");
    console.log("6. Sair");

    // Aguarda a escolha do usuário
    const opcao = await Utils.perguntar("Escolha uma opção: ");

    // Direciona a opção escolhida
    switch (opcao) {
      case "1":
        await Service.adicionarProduto();
        break;
      case "2":
        await Service.listarProdutos();
        break;
      case "3":
        await Service.atualizarProduto();
        break;
      case "4":
        await Service.excluirProduto();
        break;
      case "5":
        await Service.buscarProduto();
        break;
      case "6":
        console.log("Saindo... Até logo!");
        executando = false;
        Utils.rl.close(); // Fecha a interface do readline
        break;
      default:
        console.log("Opção inválida! Tente novamente.");
    }
  }
}

// Inicializa a aplicação chamando o menu principal
menuPrincipal();
