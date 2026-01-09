#  AgilStore - Gerenciamento de Estoque

Sistema de gerenciamento de inventário via linha de comando (CLI) desenvolvido para a loja de eletrônicos **AgilStore**. O objetivo é substituir o controle manual em planilhas por uma solução automatizada, rápida e com persistência de dados.

##  Funcionalidades

O sistema permite realizar o CRUD (Create, Read, Update, Delete) completo de produtos:

- **Adicionar Produto:** Cadastro com ID único gerado automaticamente, nome, categoria, quantidade e preço.
- **Listar Produtos:** Visualização tabular de todo o estoque com formatação de moeda.
  - *Filtros e Ordenação:* Opções para ordenar por nome, preço ou quantidade e filtrar por categoria.
- **Atualizar Produto:** Edição de campos específicos de um produto existente.
- **Excluir Produto:** Remoção segura de itens do inventário.
- **Buscar Produto:** Localização rápida por ID ou parte do nome.
- **Persistência de Dados:** Todos os dados são salvos automaticamente em um arquivo `database.json`, garantindo que nada se perca ao fechar o programa.

##  Tecnologias Utilizadas

- **JavaScript**
- **Node.js** (Ambiente de execução)
- **File System (fs)** (Módulo nativo para persistência em JSON)
- **Readline** (Módulo nativo para interação no terminal)

##  Estrutura do Projeto

O código foi organizado seguindo o princípio de separação de responsabilidades:

- `index.js`: Ponto de entrada da aplicação e gerenciamento do Menu Principal.
- `produtoService.js`: Contém toda a lógica de negócios (regras para adicionar, editar, validar e buscar).
- `utils.js`: Funções utilitárias (leitura/escrita de arquivos, formatação e inputs).
- `database.json`: Arquivo gerado automaticamente para armazenar o estoque.

##  Como Rodar o Projeto

### Pré-requisitos

Você precisa ter o **Node.js** instalado em sua máquina.
[Baixar Node.js](https://nodejs.org/)

### Passo a Passo

1. **Clone este repositório** (ou baixe os arquivos):
   ```bash
   git clone https://github.com/johnatanduarte/AgilStore.git

2. **Acesse a pasta do projeto:** Abra o terminal e navegue até a pasta onde os arquivos estão localizados:
   ```bash
   cd agilstore

4. **Execute a aplicação:** Com o terminal aberto dentro da pasta do projeto, execute o comando abaixo para iniciar:
   ```bash
   node index.js
5. **Interaja com o menu:** Use o teclado para selecionar as opções numéricas apresentadas no terminal.

 === AgilStore Modulada: Gerenciamento de Estoque ===
1. Adicionar Produto
2. Listar Produtos
3. Atualizar Produto
4. Excluir Produto
5. Buscar Produto
6. Sair  
Escolha uma opção:
