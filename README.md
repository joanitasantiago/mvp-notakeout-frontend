# notakeout-frontend

Interface front-end do sistema **NoTakeout**, desenvolvida como parte do MVP da disciplina de Desenvolvimento Full-Stack Básico da pós-graduação em Desenvolvimento Full Stack da PUC-Rio.

O projeto permite a visualização, cadastro, edição e exclusão de alimentos, receitas e menus, além da geração de listas de compras baseadas nos menus criados, com possibilidade de exportação em PDF.

--- 

## Requisitos Acadêmicos Atendidos

- Projeto 100% em **HTML, CSS e JS puro**
- Arquitetura **SPA (Single Page Application)** sem frameworks JS
- Funciona diretamente ao abrir o `index.html` no navegador

---

## Estrutura do Projeto

```
mvp-notakeout-frontend/
│
├── index.html               # Arquivo HTML principal (SPA)
│
├── css/                     # Estilos organizados por tema
│   ├── styles.css           # Estilos gerais e variáveis
│   ├── foods.css            # Estilos da seção de alimentos
│   ├── recipes.css          # Estilos da seção de receitas
│   ├── menus.css            # Estilos da seção de receitas (em desenvolvimento)
│   └── shoppinglist.css     # Estilos da seção de shopping-list (em breve)
│
├── js/                      # Scripts organizados por responsabilidade
│   ├── script.js            # Navegação entre seções e subseções
│   ├── alert.js             # Alertas personalizados
│   ├── foods.js             # CRUD de alimentos
│   ├── recipes.js           # CRUD de receitas
│   ├── menus.js             # CRUD de menus (em desenvolvimento)
│   └── shoppinglist.js      # (em breve)
```

---

## Como usar

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/notakeout-frontend.git
cd notakeout-frontend
```

2. Abra o projeto diretamente no navegador:

```bash
start index.html
# ou clique duas vezes no arquivo
```

⚠️ A API precisa estar rodando em `http://127.0.0.1:5000/` para que o front-end funcione corretamente.

---

## Funcionalidades já implementadas

- [x] Navegação SPA com seções dinâmicas
- [x] Alertas de feedback (sucesso/erro)

### Alimentos
- [x] Listagem de alimentos com badges de estoque
- [x] Cadastro de novo alimento
- [x] Edição de alimento existente
- [x] Exclusão de alimento com confirmação

### Receitas
- [x] Listagem de receitas com ingredientes associados
- [x] Cadastro com múltiplos ingredientes dinâmicos
- [x] Edição com atualização completa de dados
- [x] Exclusão de receita com confirmação

---

## Status do Projeto

- Funcionalidades principais de alimentos e receitas implementadas
- Funcionalidades de menus e lista de compras em desenvolvimento
- Totalmente compatível com a [API Flask do Notakeout](https://github.com/seu-usuario/notakeout-api)

---

## Autoria

Desenvolvido por **Joanita Santiago** como parte do desafio final da disciplina de Desenvolvimento Full Stack Básico – Pós-graduação PUC-Rio Digital.