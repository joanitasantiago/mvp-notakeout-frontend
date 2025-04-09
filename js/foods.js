// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // Configurar o botão "Ver alimentos"
  const foodsListBtn = document.querySelector('button[data-subsection="foods-list"]');
  if (foodsListBtn) {
    foodsListBtn.addEventListener("click", () => {
      loadFoods();
    });
  }

  // Configurar o formulário de criação de alimentos
  const formCreate = document.getElementById("food-form");
  if (formCreate) {
    formCreate.addEventListener("submit", (event) => {
      event.preventDefault();
      createFood();
    });
  }
  
  // Configurar o botão "Cancelar" na edição de alimentos
  const cancelEditBtn = document.getElementById("cancel-edit-btn");
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener("click", cancelFoodEdit);
  }
});

// =====================
// CRUD: CREATE
// =====================
function createFood() {
  const newFood = collectFoodData();

  fetch("http://127.0.0.1:5000/foods", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newFood),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Erro ao cadastrar alimento");
      return response.json();
    })
    .then(() => {
      showAlert("Alimento cadastrado com sucesso!", "success");
      document.getElementById("food-form").reset();
      loadFoods();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar alimento:", error);
      showAlert("Erro ao cadastrar alimento.", "danger");
    });
}

// =====================
// CRUD: READ
// =====================
function loadFoods() {
  fetch("http://127.0.0.1:5000/foods")
    .then((response) => {
      if (!response.ok) throw new Error("Erro na requisição");
      return response.json();
    })
    .then(displayFoods)
    .catch((error) => {
      console.error("Erro ao carregar alimentos:", error);
      showAlert("Erro ao carregar alimentos", "danger");
    });
}

// =====================
// CRUD: UPDATE
// =====================
function loadFoodForEdit(id) {
  fetch(`http://127.0.0.1:5000/foods/${id}`)
    .then((response) => response.json())
    .then((food) => {
      showEditFoodForm(food);
      hideFoodList();
      const editForm = document.getElementById("edit-food-form");
      editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        saveEditFood(id);
      });

      const cancelBtn = document.getElementById("cancel-edit-btn");
      if (cancelBtn) {
        cancelBtn.addEventListener("click", cancelFoodEdit);
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar alimento:", error);
      showAlert("Erro ao carregar dados do alimento.", "danger");
    });
}

function saveEditFood(id) {
  const updatedFood = collectEditFoodData();

  fetch(`http://127.0.0.1:5000/foods/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedFood),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Erro ao atualizar");
      showAlert("Alimento atualizado com sucesso!", "success");
      loadFoods();
      showFoodList();
      document.getElementById("edit-food-form").parentElement.classList.add("hide-element");
    })
    .catch((error) => {
      console.error("Erro ao atualizar:", error);
      showAlert("Erro ao atualizar alimento.", "danger");
    });
}

// =====================
// CRUD: DELETE
// =====================
function deleteItem(id) {
  if (confirm(`Tem certeza que deseja excluir este alimento?`)) {
    fetch(`http://127.0.0.1:5000/foods/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error(`Erro ao excluir alimento`);
        showAlert(`Alimento excluído com sucesso!`, "success");
        loadFoods();
      })
      .catch((error) => {
        console.error(`Erro ao excluir alimento:`, error);
        showAlert(`Erro ao excluir alimento.`, "danger");
      });
  }
}

// =====================
// AUXILIARY FUNCTIONS
// =====================

function collectFoodData() {
  const name = document.getElementById("food-name").value.trim();
  const category = document.getElementById("food-category").value.trim();
  const in_stock = document.getElementById("in-stock").checked;
  const unit = document.getElementById("food-unit").value.trim();

  return { name, category, in_stock, unit };
}

function collectEditFoodData() {
  const name = document.getElementById("edit-food-name").value.trim();
  const category = document.getElementById("edit-food-category").value.trim();
  const unit = document.getElementById("edit-food-unit").value.trim();
  const in_stock = document.getElementById("edit-in-stock").checked;

  return { name, category, unit, in_stock };
}

function displayFoods(foods) {
  const listContainer = document.getElementById("foods-list-container");

  if (foods.length === 0) {
    listContainer.innerHTML = "<li>Nenhum alimento cadastrado.</li>";
    return;
  }

  listContainer.innerHTML = "";
  createFoodListItens(foods, listContainer);
  activateEditAndDeleteFoodButton();
}

function createFoodListItens(foods, listContainer) {
  foods.forEach((food) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    const title = `<strong>${food.name}</strong> <span>(${food.category})</span>`;
    const stockBadge = food.in_stock
      ? `<span class="custom-badge badge-success">✔ Em estoque</span>`
      : `<span class="custom-badge badge-danger">❌ Sem estoque</span>`;

    const quantityBadge = !food.in_stock
      ? ""
      : `<span class="custom-badge badge-secondary">Qtd: ${food.unit}</span>`;

    li.innerHTML = `
      <div class="food-list-item-container">
        <div class="food-list-item-info">
          <div>${title}</div>
          <div class="food-list-item-badges">${stockBadge} ${quantityBadge}</div>
        </div>
        <div class="food-list-item-buttons">
          <button class="edit-food-btn" data-id="${food.id}">Editar</button>
          <button class="delete-food-btn" data-id="${food.id}">Excluir</button>
        </div>
      </div>
    `;

    listContainer.appendChild(li);
  });
}

function activateEditAndDeleteFoodButton() {
  document.querySelectorAll(".edit-food-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      loadFoodForEdit(id);
    });
  });

  document.querySelectorAll(".delete-food-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      deleteItem(id);
    });
  });
}

function showEditFoodForm(food) {
  const editForm = document.getElementById("edit-food-form").parentElement;
  editForm.classList.remove("hide-element");

  document.getElementById("edit-food-name").value = food.name;
  document.getElementById("edit-food-category").value = food.category;
  document.getElementById("edit-food-unit").value = food.unit;
  document.getElementById("edit-in-stock").checked = food.in_stock;
}

function hideFoodList() {
  const foodList = document.querySelector(
    ".foods-section .content-subsection.foods-list"
  );
  if (foodList) foodList.classList.add("hide-element");
}

function showFoodList() {
  const foodList = document.querySelector(
    ".foods-section .content-subsection.foods-list"
  );
  if (foodList) foodList.classList.remove("hide-element");
}

function cancelFoodEdit() {
  document.getElementById("edit-food-form").parentElement.classList.add("hide-element");
  showFoodList();
}
