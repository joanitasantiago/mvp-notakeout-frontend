# notakeout-api

Interface front-end do sistema **NoTakeout**, desenvolvida como parte do MVP da disciplina de Desenvolvimento Full-Stack Básico da pós-graduação em Desenvolvimento Full Stack da PUC-Rio.

O projeto permite a visualização, cadastro, edição e exclusão de alimentos, receitas e menus, além da geração de listas de compras baseadas nos menus criados, com possibilidade de exportação em PDF.

--- 

## Requisitos Acadêmicos Atendidos

- Projeto 100% em **HTML, CSS e JS puro**
- Arquitetura **SPA (Single Page Application)** sem frameworks JS
- Funciona diretamente ao abrir o `index.html` no navegador
- Uso de **Bootstrap** combinado com CSS personalizado
- Separação clara de seções e subseções na interface

---

## Estrutura do Projeto

```
mvp-notakeout-frontend/
│
├── index.html               # Arquivo HTML principal (SPA)
│
├── css/                     # Estilos organizados
│   ├── styles.css
│   ├── foods.css
│   ├── recipes.css
│   └── menus.css
│
├── js/                      # Scripts organizados
│   ├── script.js            # Controle de navegação SPA
│   ├── alert.js             # Mensagens e feedback ao usuário
│   ├── utils.js             # Funções auxiliares reutilizáveis
│   ├── foods.js             # Lógica da seção de alimentos
│   ├── recipes.js           # (em breve)
│   └── menus.js             # (em breve)
```

---

## Funcionalidades já implementadas

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
- [x] Listagem de alimentos
- [x] Cadastro de novo alimento
- [x] Edição de alimento
- [x] Exclusão com modal de confirmação
- [x] Alertas de sucesso e erro

---

## Status do Projeto

- Versão front-end estável e em desenvolvimento ativo
- Totalmente compatível com a [API Flask do Notakeout](https://github.com/seu-usuario/notakeout-api)
- Próximo passo: integração com receitas, menus e geração de PDF

---

## Autoria

Desenvolvido por **Joanita Santiago** como parte do desafio final da disciplina de Desenvolvimento Full Stack Básico – Pós-graduação PUC-Rio Digital.