# notakeout-frontend

Interface front-end do sistema **NoTakeout**, desenvolvida como parte do MVP da disciplina de Desenvolvimento Full-Stack Básico da pós-graduação em Desenvolvimento Full Stack da PUC-Rio.

O sistema permite gerenciar alimentos, receitas e menus pessoais, além de gerar listas de compras baseadas nos menus criados, com possibilidade futura de exportação em PDF.

---

## Requisitos Acadêmicos Atendidos

- Projeto 100% em **HTML, CSS e JS puro**
- Arquitetura **SPA (Single Page Application)** sem frameworks JS
- Funciona diretamente ao abrir o `index.html` no navegador
- Uso de **Bootstrap** combinado com CSS personalizado
- Navegação entre seções e subseções via JavaScript
- Interface organizada por seções temáticas: Início, Alimentos, Receitas, Menus e Lista de Compras

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
│   └── menus.css            # Estilos da seção de menus
│
├── js/                      # Scripts organizados por responsabilidade
│   ├── script.js            # Navegação entre seções e subseções
│   ├── alert.js             # Alertas personalizados
│   ├── foods.js             # CRUD de alimentos
│   ├── recipes.js           # CRUD de receitas
│   ├── menus.js             # CRUD de menus (em desenvolvimento)
│   └── utils.js             # Funções utilitárias (em breve)
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

⚠️ Certifique-se de que a API está rodando em `http://127.0.0.1:5000/`.

---

## Funcionalidades já implementadas

### 🌿 Alimentos
- [x] Listagem de alimentos com badges de estoque
- [x] Cadastro de novo alimento
- [x] Edição de alimento existente
- [x] Exclusão de alimento com confirmação
- [x] Alertas de feedback (sucesso/erro)

### 📖 Receitas
- [x] Listagem de receitas com ingredientes associados
- [x] Cadastro com múltiplos ingredientes dinâmicos
- [x] Edição com atualização completa de dados
- [x] Exclusão com confirmação
- [x] Feedback com alertas estilizados

### 🍽️ Menus
- [ ] Listagem e criação de menus (em desenvolvimento)
- [ ] Associação dinâmica de receitas por período do dia
- [ ] Geração de lista de compras a partir dos menus

---

## Status do Projeto

- 🧪 Em desenvolvimento ativo
- ✅ Funcionalidades principais de alimentos e receitas implementadas
- 🔧 Funcionalidades de menus e lista de compras em andamento
- 🔗 Totalmente integrado com a [API Flask do Notakeout](https://github.com/seu-usuario/notakeout-api)

---

## Autoria

Desenvolvido por **Joanita Santiago** como parte do desafio final da disciplina de Desenvolvimento Full Stack Básico – Pós-graduação PUC-Rio Digital.