const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Caminho do arquivo JSON
const DB_FILE = path.join(__dirname, "database.json");

// Interface de leitura do terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função que retorna uma Promise para leitura assíncrona
function perguntar(pergunta) {
  return new Promise((resolve) => {
    rl.question(pergunta, (resposta) => resolve(resposta.trim()));
  });
}

// Carrega os dados do arquivo JSON
function carregarDados() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (erro) {
    console.error("Erro ao carregar:", erro.message);
  }
  return [];
}

// Salva os dados no arquivo JSON
function salvarDados(dados) {
  fs.writeFileSync(DB_FILE, JSON.stringify(dados, null, 2));
}

// Gera um ID único baseado em tempo + aleatoriedade
function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Exporta as funções utilitárias
module.exports = { rl, perguntar, carregarDados, salvarDados, gerarId };
