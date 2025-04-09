// Contador global para garantir IDs únicos para os ingredientes
let ingredientCount = 1;

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // Configurar o formulário de criação de receitas
  const formCreate = document.getElementById("recipe-form");
  if (formCreate) {
    formCreate.addEventListener("submit", (event) => {
      event.preventDefault();
      createRecipe();
    });
  }

  // Configurar os botões de adicionar/remover ingrediente
  const recipesTabButton = document.querySelector(
    '[data-subsection="recipes-form"]'
  );
  if (recipesTabButton) {
    recipesTabButton.addEventListener("click", bindIngredientButtons);
  }

  // Configurar os botões de adicionar/remover ingrediente
  const recipesEditTabButton = document.querySelector(
    '[data-subsection="edit-recipes-form"]'
  );
  if (recipesEditTabButton) {
    recipesEditTabButton.addEventListener("click", bindEditIngredientButtons);
  }

  // Configurar o botão "Ver receitas"
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

// =====================
// CRUD: UPDATE
// =====================
function loadRecipeForEdit(id) {
  fetch(`http://127.0.0.1:5000/recipes/${id}`)
    .then((response) => response.json())
    .then((recipe) => {
      showEditRecipeForm(recipe);
      hideRecipeList();

      // Configurar o formulário de edição
      const editRecipeForm = document.getElementById("edit-recipe-form");
      // Remover qualquer evento anterior
      const newForm = editRecipeForm.cloneNode(true);
      editRecipeForm.parentNode.replaceChild(newForm, editRecipeForm);

      // Adicionar o novo evento
      newForm.addEventListener("submit", (event) => {
        event.preventDefault();
        saveEditRecipe(id);
      });

      // Configurar o botão Cancelar
      const cancelBtn = document.getElementById("recipe-cancel-edit-btn");
      if (cancelBtn) {
        // Remover qualquer evento anterior
        const newCancelBtn = cancelBtn.cloneNode(true);
        cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

        // Adicionar o novo evento
        newCancelBtn.addEventListener("click", cancelEdit);
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar receita:", error);
      showAlert("Erro ao carregar dados da receita.", "danger");
    });
}

function saveEditRecipe(id) {
  const updatedRecipe = collectEditRecipeData();

  fetch(`http://127.0.0.1:5000/recipes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedRecipe),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Erro ao atualizar");
      showAlert("Receita atualizada com sucesso!", "success");
      loadRecipes();
      showRecipeList();
      document
        .querySelector(".edit-recipes-form")
        .classList.add("hide-element");
    })
    .catch((error) => {
      console.error("Erro ao atualizar:", error);
      showAlert("Erro ao atualizar receita.", "danger");
    });
}

// =====================
// CRUD: DELETE
// =====================
function deleteRecipe(id) {
  if (confirm(`Tem certeza que deseja excluir esta receita?`)) {
    fetch(`http://127.0.0.1:5000/recipes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Erro ao excluir receita`);
        showAlert(`Receita excluída com sucesso!`, "success");
        loadRecipes();
      })
      .catch((error) => {
        console.error(`Erro ao excluir receita:`, error);
        showAlert(`Erro ao excluir receita.`, "danger");
      });
  }
}

// =====================
// AUXILIARY FUNCTIONS
// =====================
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

function collectEditRecipeData() {
  const name = document.getElementById("edit-recipe-name").value.trim();
  const category = document.getElementById("edit-recipe-category").value.trim();
  const instructions = document
    .getElementById("edit-recipe-instructions")
    .value.trim();

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

function displayRecipes(recipes) {
  const listContainer = document.getElementById("recipes-list-container");

  if (recipes.length === 0) {
    listContainer.innerHTML = "<li>Nenhuma receita cadastrada.</li>";
    return;
  }

  listContainer.innerHTML = "";
  createRecipeListItems(recipes, listContainer);
  activateEditAndDeleteRecipeButtons();
}

function createRecipeListItems(recipes, listContainer) {
  recipes.forEach((recipe) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    const title = `<strong>${recipe.name}</strong> <span>(${recipe.category})</span>`;
    const ingredientsHTML = recipe.ingredients
      .map(
        (ing) =>
          `<span class="custom-badge badge-secondary">${ing.food_name} (${
            ing.quantity || "Qtd. não definida"
          })</span>`
      )
      .join(" ");

    li.innerHTML = `
      <div class="recipe-list-item-container">
        <div class="recipe-list-item-info">
          <div>${title}</div>
          <div class="recipe-list-item-badges">${ingredientsHTML}</div>
          <div><em>Instruções:</em> ${recipe.instructions}</div>
        </div>
        <div class="recipe-list-item-buttons">
          <button class="edit-recipe-btn" data-id="${recipe.id}">Editar</button>
          <button class="delete-recipe-btn" data-id="${recipe.id}">Excluir</button>
        </div>
      </div>
    `;
    listContainer.appendChild(li);
  });
}

function activateEditAndDeleteRecipeButtons() {
  document.querySelectorAll(".edit-recipe-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      loadRecipeForEdit(id);
    });
  });

  document.querySelectorAll(".delete-recipe-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      deleteRecipe(id);
    });
  });
}

function showEditRecipeForm(recipe) {
  const editRecipeForm = document.querySelector(".edit-recipes-form");
  editRecipeForm.classList.remove("hide-element");

  // Preenche os campos principais
  document.getElementById("edit-recipe-name").value = recipe.name;
  document.getElementById("edit-recipe-category").value = recipe.category;
  document.getElementById("edit-recipe-instructions").value =
    recipe.instructions;

  const container = document.querySelector(".edit-ingredients-container");
  container.innerHTML = ""; // Limpa os ingredientes anteriores

  // Renderiza os ingredientes da receita
  recipe.ingredients.forEach((ingredient, index) => {
    const group = document.createElement("div");
    group.className = "edit-ingredient-group";

    const ingredientId = `edit-recipe-ingredient-${index}`;
    const quantityId = `edit-recipe-quantity-${index}`;

    group.innerHTML = `
      <label for="${ingredientId}">Ingrediente:</label>
      <input type="text" id="${ingredientId}" value="${
      ingredient.food_name
    }" required />
      <label for="${quantityId}">Quantidade:</label>
      <input type="text" id="${quantityId}" value="${
      ingredient.quantity || ""
    }" placeholder="ex: kg, unidade" />
    `;

    container.appendChild(group);
  });

  // Atualiza contador global
  ingredientCount = recipe.ingredients.length;

  // Conecta os botões de adicionar/remover ingrediente
  bindEditIngredientButtons();
}

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

function bindEditIngredientButtons() {
  const addBtn = document.getElementById("edit-add-ingredient-btn");
  const removeBtn = document.getElementById("edit-remove-ingredient-btn");
  if (addBtn && !addBtn.dataset.bound) {
    addBtn.addEventListener("click", addEditIngredient);
    addBtn.dataset.bound = "true";
  }

  if (removeBtn && !removeBtn.dataset.bound) {
    removeBtn.addEventListener("click", removeEditIngredient);
    removeBtn.dataset.bound = "true";
  }
}

function addIngredient() {
  const container = document.querySelector(".ingredients-container");
  const group = document.createElement("div");
  group.className = "ingredient-group";

  const ingredientId = `recipe-ingredient-${ingredientCount}`;
  const quantityId = `recipe-quantity-${ingredientCount}`;

  group.innerHTML = `
    <label for="${ingredientId}">Ingrediente:</label>
    <input type="text" id="${ingredientId}" required />
    <label for="${quantityId}">Quantidade:</label>
    <input type="text" id="${quantityId}" placeholder="ex: kg, unidade" />
  `;
  container.appendChild(group);
  ingredientCount++;
}

function addEditIngredient() {
  const container = document.querySelector(".edit-ingredients-container");
  const group = document.createElement("div");
  group.className = "edit-ingredient-group";

  const ingredientId = `edit-recipe-ingredient-${ingredientCount}`;
  const quantityId = `edit-recipe-quantity-${ingredientCount}`;

  group.innerHTML = `
    <label for="${ingredientId}">Ingrediente:</label>
    <input type="text" id="${ingredientId}" required /> 
    <label for="${quantityId}">Quantidade:</label>
    <input type="text" id="${quantityId}" placeholder="ex: kg, unidade" />
  `;
  container.appendChild(group);
  ingredientCount++;
}

function removeEditIngredient() {
  const container = document.querySelector(".edit-ingredients-container");
  const groups = container.querySelectorAll(".edit-ingredient-group");

  if (groups.length > 1) {
    container.removeChild(groups[groups.length - 1]);
    ingredientCount--;
  }
}

function removeIngredient() {
  const container = document.querySelector(".ingredients-container");
  const groups = container.querySelectorAll(".ingredient-group");

  if (groups.length > 1) {
    container.removeChild(groups[groups.length - 1]);
    ingredientCount--;
  }
}

function resetForm() {
  document.getElementById("recipe-form").reset();
  ingredientCount = 1;

  // Remove todos os grupos extras de ingredientes (mantém só o primeiro)
  document.querySelectorAll(".ingredient-group").forEach((group, index) => {
    if (index > 0) group.remove();
  });
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
