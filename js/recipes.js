// Contador global para garantir IDs únicos para os ingredientes
let ingredientCount = 1;

document.addEventListener("DOMContentLoaded", () => {
  const formCreate = document.getElementById("recipe-form");
  if (formCreate) {
    formCreate.addEventListener("submit", handleRecipeFormSubmit);
  }

  const recipesTabButton = document.querySelector(
    '[data-subsection="recipes-form"]'
  );
  if (recipesTabButton) {
    recipesTabButton.addEventListener("click", bindIngredientButtons);
  }

  const viewRecipesButton = document.querySelector(
    '[data-subsection="recipes-list"]'
  );
  if (viewRecipesButton) {
    viewRecipesButton.addEventListener("click", loadRecipes);
  }
});

// =====================
// CRUD: CREATE
// =====================
function createRecipe() {
  const recipe = collectRecipeData();

  if (!recipe) {
    showAlert("Preencha todos os campos obrigatórios.", "warning");
    return;
  }

  // Envia a receita para o back-end via POST
  fetch("http://127.0.0.1:5000/recipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao cadastrar receita");
      return res.json();
    })
    .then(() => {
      showAlert("Receita cadastrada com sucesso!", "success");
      resetForm();
      loadRecipes?.(); // Atualiza a lista de receitas, se a função existir
    })
    .catch((error) => {
      console.error("Erro ao cadastrar receita:", error);
      showAlert("Erro ao cadastrar receita.", "danger");
    });
}


function handleRecipeFormSubmit(event) {
  event.preventDefault();
  createRecipe();
}

// Coleta os dados do formulário e valida os campos
function collectRecipeData() {
  const name = document.getElementById("recipe-name").value.trim();
  const category = document.getElementById("recipe-category").value.trim();
  const instructions = document
    .getElementById("recipe-instructions")
    .value.trim();

  if (!name || !category || !instructions) return null;

  const ingredients = [];
  for (let i = 0; i < ingredientCount; i++) {
    const ingredientInput = document.getElementById(`recipe-ingredient-${i}`);
    const quantityInput = document.getElementById(`recipe-quantity-${i}`);

    if (ingredientInput && quantityInput) {
      const ingredientName = ingredientInput.value.trim();
      const quantity = quantityInput.value.trim();
      if (ingredientName) ingredients.push({ name: ingredientName, quantity });
    }
  }

  return { name, category, instructions, ingredients };
}

// Reseta o formulário e limpa os campos
function resetForm() {
  document.getElementById("recipe-form").reset();
  ingredientCount = 1;

  // Remove todos os grupos extras de ingredientes (mantém só o primeiro)
  document.querySelectorAll(".ingredient-group").forEach((group, index) => {
    if (index > 0) group.remove();
  });
}

// =====================
// CRUD: READ
// =====================

// Carrega as receitas do back-end e as exibe
function loadRecipes() {
  fetch("http://127.0.0.1:5000/recipes")
    .then((response) => {
      if (!response.ok) throw new Error("Erro na requisição");
      return response.json();
    })
    .then(displayRecipes)
    .catch((error) => {
      console.error("Erro ao carregar receitas:", error);
      showAlert("Erro ao carregar receitas", "danger");
    });
}

// Exibe as receitas na interface
function displayRecipes(recipes) {
  console.log(recipes);
  const listContainer = document.getElementById("recipes-list-container");
  listContainer.innerHTML = "";

  recipes.forEach((recipe) => {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-start",
      "flex-column"
    );

    const title = `<strong>${recipe.name}</strong> <span class="text-muted">(${recipe.category})</span>`;
    const ingredientsHTML = recipe.ingredients
      .map(
        (ing) =>
          `${ing.food_name} (${ing.quantity || "Quantidade não definida"})`
      )
      .join(", ");

    li.innerHTML = `
      <div class="w-100 d-flex justify-content-between align-items-center">
        <div>
          <div>${title}</div>
          <div><em>Ingredientes:</em> ${ingredientsHTML}</div>
          <div><em>Instruções:</em> ${recipe.instructions}</div>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-info edit-recipe" data-id="${recipe.id}">Editar</button>
          <button class="btn btn-sm btn-outline-danger delete-recipe" data-id="${recipe.id}">Excluir</button>
        </div>
      </div>
    `;
    listContainer.appendChild(li);
  });
}

// =====================
// UI HELPERS
// =====================

// Conecta os botões de adicionar/remover ingrediente
function bindIngredientButtons() {
  const addBtn = document.getElementById("add-ingredient");
  const removeBtn = document.getElementById("remove-ingredient");

  if (addBtn && !addBtn.dataset.bound) {
    addBtn.addEventListener("click", addIngredient);
    addBtn.dataset.bound = "true";
  }

  if (removeBtn && !removeBtn.dataset.bound) {
    removeBtn.addEventListener("click", removeIngredient);
    removeBtn.dataset.bound = "true";
  }
}

// Adiciona um novo grupo de inputs de ingrediente
function addIngredient() {
  const container = document.querySelector(".ingredients-container");
  const group = document.createElement("div");
  group.className = "ingredient-group";

  const ingredientId = `recipe-ingredient-${ingredientCount}`;
  const quantityId = `recipe-quantity-${ingredientCount}`;

  group.innerHTML = `
    <label for="${ingredientId}">Ingredientes</label>
    <input type="text" id="${ingredientId}" required />
    <label for="${quantityId}">Quantidade</label>
    <input type="text" id="${quantityId}" placeholder="ex: kg, unidade" />
  `;
  container.appendChild(group);
  ingredientCount++;
}

// Remove o último grupo de inputs de ingrediente
function removeIngredient() {
  const container = document.querySelector(".ingredients-container");
  const groups = container.querySelectorAll(".ingredient-group");

  if (groups.length > 1) {
    container.removeChild(groups[groups.length - 1]);
    ingredientCount--;
  }
}

// Exibe alertas na interface
function showAlert(message, type) {
  // Implementação de exibição de alertas (exemplo: Bootstrap ou customizado)
  console.log(`[${type.toUpperCase()}] ${message}`);
}
