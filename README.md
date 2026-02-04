# 🏃‍♂️ Runner Rito - Orçamento de Performance

> **Projeto da disciplina de Design Web - IFRN Caicó**

O **Runner Rito** é um sistema web focado em corredores que precisam organizar seus investimentos no esporte. O sistema permite orçar provas, equipamentos e treinos, calculando totais automaticamente e validando os dados inseridos.

---

## 👥 Integrantes e Divisão de Tarefas

| Aluno | Funções Principais |
| :--- | :--- |
| **Guilherme Saul** | Figma, HTML, CSS, JavaScript e Documentação |
| **João Victor Dantas** | Figma, HTML, CSS, JavaScript e Documentação |
| **Lucas Eduardo** | HTML, CSS e JavaScript |
| **Raissa Raquel** | JavaScript|

---

## 🚀 Funcionalidades

O sistema atende aos requisitos do MVP e inclui funcionalidades extras:

* **Cadastro de Itens:** Adição de produtos/serviços com validação (impede valores negativos ou campos vazios).
* **Cálculos em Tempo Real:** Atualiza automaticamente o *Total Geral*, *Quantidade de Itens* e destaca o *Item Mais Caro*.
* **Persistência de Dados:** Uso de `localStorage` para não perder a lista ao fechar o navegador.
* **Remoção de Itens:** Botão para excluir gastos específicos da tabela.
* **🌗 Modo Escuro (Bônus):** Alternância de tema (Dark/Light) com salvamento da preferência do usuário.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5:** Estrutura semântica.
* **CSS3:** Flexbox, Grid e Variáveis (para o tema escuro).
* **JavaScript:** Manipulação do DOM, `localStorage` e métodos de array (`map`, `filter`, `reduce`).

---

## 📦 Como Rodar o Projeto

Não é necessário instalar nada. Siga os passos:

1.  **Baixe** ou clone este repositório.
2.  Certifique-se de que os arquivos `index.html`, `styles.css` e `app.js` estão na mesma pasta.
3.  Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox).
4.  *Dica:* Para testar a persistência, cadastre um item e recarregue a página (F5).
