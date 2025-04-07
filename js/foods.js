// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {
  // Ativa o formulário de cadastro de alimento
  const formCreate = document.getElementById("food-form");
  if (formCreate) {
    formCreate.addEventListener("submit", (event) => {
      event.preventDefault();
      createFood();
    });
  }

  // Ativa o botão "Ver alimentos"
  const viewFoodsButton = document.querySelector(
    '[data-subsection="foods-list"]'
  );
  if (viewFoodsButton) {
    viewFoodsButton.addEventListener("click", () => {
      loadFoods();
    });
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
      showAlert("Alimento cadastrado com sucesso!", "success", 5000);
      document.getElementById("food-form").reset();
      loadFoods();
    })
    .catch((error) => {
      console.error("Erro ao cadastrar alimento:", error);
      showAlert("Erro ao cadastrar alimento.", "danger");
    });
}

function collectFoodData() {
  const name = document.getElementById("food-name").value.trim();
  const category = document.getElementById("food-category").value.trim();
  const in_stock = document.getElementById("in-stock").checked;
  const unit = document.getElementById("food-unit").value.trim();

  return { name, category, in_stock, unit };
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

function displayFoods(foods) {
  const listContainer = document.getElementById("foods-list-container");

  if (foods.length === 0) {
    listContainer.innerHTML =
      "<li class='text-muted'>Nenhum alimento cadastrado.</li>";
    return;
  }

  listContainer.innerHTML = "";

  foods.forEach((food) => {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-start",
      "flex-column"
    );

    const title = `<strong>${food.name}</strong> <span class="text-muted">(${food.category})</span>`;
    const stockBadge = food.in_stock
      ? `<span class="badge bg-success">✔ Em estoque</span>`
      : `<span class="badge bg-danger">❌ Sem estoque</span>`;

    const quantityBadge = !food.in_stock
      ? ""
      : `<span class="badge bg-secondary">Qtd: ${food.unit}</span>`;

    li.innerHTML = `
        <div class="w-100 d-flex justify-content-between align-items-center">
          <div>
            <div>${title}</div>
            <div class="mt-1 d-flex gap-2">${stockBadge} ${quantityBadge}</div>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-info edit-food-btn" data-id="${food.id}">Editar</button>
            <button class="btn btn-sm btn-outline-danger delete-food-btn" data-id="${food.id}">Excluir</button>
          </div>
        </div>
      `;

    listContainer.appendChild(li);
  });

  // Atribui eventos de edição e exclusão
  document.querySelectorAll(".edit-food-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      loadFoodForEdit(id);
    });
  });

  document.querySelectorAll(".delete-food-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      deleteItem(id, "food", loadFoods);
    });
  });
}

// =====================
// CRUD: UPDATE
// =====================
function loadFoodForEdit(id) {
  fetch(`http://127.0.0.1:5000/foods/${id}`)
    .then((response) => response.json())
    .then((food) => {
      showEditForm(food);
      hideFoodList();
      handleFormSubmit(id);

      const cancelBtn = document.getElementById("cancel-edit-btn");
      if (cancelBtn) {
        cancelBtn.addEventListener("click", cancelEdit);
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar alimento:", error);
      showAlert("Erro ao carregar dados do alimento.", "danger");
    });
}

function handleFormSubmit(id) {
  const form = document.getElementById("food-edit-form");
  form.onsubmit = (event) => {
    event.preventDefault();
    saveFood(id);
  };
}

function saveFood(id) {
  const name = document.getElementById("edit-food-name").value.trim();
  const category = document.getElementById("edit-food-category").value.trim();
  const unit = document.getElementById("edit-food-unit").value.trim();
  const in_stock = document.getElementById("edit-in-stock").checked;

  const updatedFood = { name, category, unit, in_stock };

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
      document.querySelector(".foods-edit-form").classList.add("hide-element");
    })
    .catch((error) => {
      console.error("Erro ao atualizar:", error);
      showAlert("Erro ao atualizar alimento.", "danger");
    });
}

// =====================
// CANCELAR EDIÇÃO
// =====================
function cancelEdit() {
  document.querySelector(".foods-edit-form").classList.add("hide-element");
  showFoodList();
}

// =====================
// UI HELPERS
// =====================
function showEditForm(food) {
  const editForm = document.querySelector(".foods-edit-form");
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
