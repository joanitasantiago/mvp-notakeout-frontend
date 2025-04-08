// Contador global para garantir IDs únicos para os ingredientes
let ingredientCount = 1;

document.addEventListener("DOMContentLoaded", () => {
  const formCreate = document.getElementById("recipe-form");
  if (formCreate) {
    formCreate.addEventListener("submit", (event) => {
      event.preventDefault();
      createRecipe();
    });
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
      loadRecipes();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar receita:", error);
      showAlert("Erro ao cadastrar receita.", "danger");
    });
}

function collectRecipeData() {
  const name = document.getElementById("recipe-name").value.trim();
  const category = document.getElementById("recipe-category").value.trim();
  const instructions = document
    .getElementById("recipe-instructions")
    .value.trim();

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

// =====================
// CRUD: READ
// =====================

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
          <button class="btn btn-sm btn-outline-info edit-recipe-btn" data-id="${recipe.id}">Editar</button>
          <button class="btn btn-sm btn-outline-danger delete-recipe-btn" data-id="${recipe.id}">Excluir</button>
        </div>
      </div>
    `;
    listContainer.appendChild(li);

      // Ativa os botoões de edição e exclusão
  document.querySelectorAll(".edit-recipe-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      loadRecipeForEdit(id);
    });
  });

  document.querySelectorAll(".delete-recipe-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      deleteItem(id, "recipe", loadRecipes);
    });
  });
  });
}

// =====================
// CRUD: UPDATE
// =====================

function loadRecipeForEdit(id) {
  fetch(`http://127.0.0.1:5000/recipes/${id}`)
  .then((response) => response.json())
  .then((recipe) => {
    showEditRecipeForm(recipe);
    hideRecipeList();
    const editRecipeForm = document.getElementById("edit-recipe-form");
    editRecipeForm.addEventListener("submit", (event) =>{
      event.preventDefault();
      saveEditRecipe(id);
    });

    const cancelBtn = document.getElementById("cancel-edit-recipe-btn");
      if (cancelBtn) {
        cancelBtn.addEventListener("click", cancelEdit);
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar receita:", error);
      showAlert("Erro ao carregar dados da receita.", "danger");
    });
}

function collectEditRecipeData() {
  const name = document.getElementById("edit-recipe-name").value.trim();
  const category = document.getElementById("edit-recipe-category").value.trim();
  const instructions = document
    .getElementById("edit-recipe-instructions")
    .value.trim();

  if (!name || !category || !instructions) return null;

  const ingredients = [];
  for (let i = 0; i < ingredientCount; i++) {
    const ingredientInput = document.getElementById(
      `edit-recipe-ingredient-${i}`
    );
    const quantityInput = document.getElementById(`edit-recipe-quantity-${i}`);

    if (ingredientInput && quantityInput) {
      const ingredientName = ingredientInput.value.trim();
      const quantity = quantityInput.value.trim();
      if (ingredientName) ingredients.push({ name: ingredientName, quantity });
    }
  }

  return { name, category, instructions, ingredients };
}

function saveEditRecipe(id) {
  const updatedRecipe = collectEditRecipeData();

  fetch(`http://127.0.0.1:5000/recipes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedRecipe),
  })
    .then((response) => {
      if (!response.ok) throw new Erro("Erro ao atualizar");
      showAlert("Alimento atualizado com sucesso!", "success");
      resetForm();
      loadRecipes();
      showRecipeList();
      document.querySelector(".edit-recipes-form").classList.add("hide-element");
    })
    .catch((error) => {
      console.error("Erro ao atualizar:", error);
      showAlert("Erro ao atualizar receita.", "danger");
    });
}

// =====================
// UI HELPERS
// =====================

// Conecta os botões de adicionar/remover ingrediente
function bindIngredientButtons() {
  const addBtn = document.getElementById("add-ingredient-btn");
  const removeBtn = document.getElementById("remove-ingredient-btn");

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
    <label for="${ingredientId}">Ingrediente</label>
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

// Reseta o formulário e limpa os campos
function resetForm() {
  document.getElementById("recipe-form").reset();
  ingredientCount = 1;

  // Remove todos os grupos extras de ingredientes (mantém só o primeiro)
  document.querySelectorAll(".ingredient-group").forEach((group, index) => {
    if (index > 0) group.remove();
  });
}

function showEditRecipeForm(recipe) {
  const editRecipeForm = document.querySelector(".edit-recipes-form");
  editRecipeForm.classList.remove("hide-element");

  // Preenche os campos principais
  document.getElementById("edit-recipe-name").value = recipe.name;
  document.getElementById("edit-recipe-category").value = recipe.category;
  document.getElementById("edit-recipe-instructions").value = recipe.instructions;

  const container = document.querySelector(".edit-ingredients-container");
  container.innerHTML = ""; // Limpa os ingredientes anteriores

  // Renderiza os ingredientes da receita
  recipe.ingredients.forEach((ingredient, index) => {
    const group = document.createElement("div");
    group.className = "edit-ingredient-group";

    const ingredientId = `edit-recipe-ingredient-${index}`;
    const quantityId = `edit-recipe-quantity-${index}`;

    group.innerHTML = `
      <label for="${ingredientId}">Ingrediente</label>
      <input type="text" id="${ingredientId}" value="${ingredient.food_name}" required />
      <label for="${quantityId}">Quantidade</label>
      <input type="text" id="${quantityId}" value="${ingredient.quantity || ""}" placeholder="ex: kg, unidade" />
    `;

    container.appendChild(group);
  });

  // Atualiza contador global
  ingredientCount = recipe.ingredients.length;

  // Conecta os botões de adicionar/remover ingrediente (somente uma vez)
  const addBtn = document.getElementById("add-edit-ingredient-btn");
  const removeBtn = document.getElementById("remove-edit-ingredient-btn");

  if (addBtn && !addBtn.dataset.bound) {
    addBtn.addEventListener("click", () => {
      const group = document.createElement("div");
      group.className = "edit-ingredient-group";

      const ingredientId = `edit-recipe-ingredient-${ingredientCount}`;
      const quantityId = `edit-recipe-quantity-${ingredientCount}`;

      group.innerHTML = `
        <label for="${ingredientId}">Ingrediente</label>
        <input type="text" id="${ingredientId}" required />
        <label for="${quantityId}">Quantidade</label>
        <input type="text" id="${quantityId}" placeholder="ex: kg, unidade" />
      `;
      container.appendChild(group);
      ingredientCount++;
    });
    addBtn.dataset.bound = "true";
  }

  if (removeBtn && !removeBtn.dataset.bound) {
    removeBtn.addEventListener("click", () => {
      const groups = container.querySelectorAll(".edit-ingredient-group");
      if (groups.length > 1) {
        container.removeChild(groups[groups.length - 1]);
        ingredientCount--;
      }
    });
    removeBtn.dataset.bound = "true";
  }
}

function showRecipeList() {
  const recipeList = document.querySelector(
    ".recipes-section .content-subsection.recipes-list"
  );
  if (recipeList) recipeList.classList.remove("hide-element");
}

function hideRecipeList() {
  const recipeList = document.querySelector(
    ".recipes-section .content-subsection.recipes-list"
  );
  if (recipeList) recipeList.classList.add("hide-element");
}

function cancelEdit() {
  document.querySelector(".edit-recipes-form").classList.add("hide-element");
  showRecipeList();
}