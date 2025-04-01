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
    const viewFoodsButton = document.querySelector('[data-subsection="foods-list"]');
    if (viewFoodsButton) {
      viewFoodsButton.addEventListener("click", () => {
        loadFoods(); // Só carrega alimentos quando o usuário quiser
      });
    }
  });
  
  // =====================
  // CRUD: CREATE
  // =====================
  function createFood() {
    const name = document.getElementById("name").value.trim();
    const category = document.getElementById("category").value.trim();
    const unit = document.getElementById("unit").value.trim();
    const in_stock = document.getElementById("in_stock").checked;
  
    const newFood = { name, category, unit, in_stock };
  
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
  
  function displayFoods(foods) {
    const listContainer = document.getElementById("foods-list-container");
    listContainer.innerHTML = "";
  
    foods.forEach((food) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start", "flex-column");
  
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
            <button class="btn btn-sm btn-outline-info edit-food" data-id="${food.id}">Editar</button>
            <button class="btn btn-sm btn-outline-danger delete-food" data-id="${food.id}">Excluir</button>
          </div>
        </div>
      `;
  
      listContainer.appendChild(li);
    });
  
    // Atribui eventos de edição e exclusão
    document.querySelectorAll(".edit-food").forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-id");
        loadFoodForEdit(id);
      });
    });
  
    document.querySelectorAll(".delete-food").forEach((button) => {
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
  
        const cancelBtn = document.getElementById("cancel-edit");
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
    const name = document.getElementById("edit-name").value.trim();
    const category = document.getElementById("edit-category").value.trim();
    const unit = document.getElementById("edit-unit").value.trim();
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
        document.querySelector(".foods-edit-form").classList.add("d-none");
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
    document.querySelector(".foods-edit-form").classList.add("d-none");
    showFoodList();
  }
  
  // =====================
  // UI HELPERS
  // =====================
  function showEditForm(food) {
    const editForm = document.querySelector(".foods-edit-form");
    editForm.classList.remove("d-none");
  
    document.getElementById("edit-name").value = food.name;
    document.getElementById("edit-category").value = food.category;
    document.getElementById("edit-unit").value = food.unit;
    document.getElementById("edit-in-stock").checked = food.in_stock;
  }
  
  function hideFoodList() {
    const foodList = document.querySelector(".foods-section .subsection.foods-list");
    if (foodList) foodList.classList.add("d-none");
  }
  
  function showFoodList() {
    const foodList = document.querySelector(".foods-section .subsection.foods-list");
    if (foodList) foodList.classList.remove("d-none");
  }
  