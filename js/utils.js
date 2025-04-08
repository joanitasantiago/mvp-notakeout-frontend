// =====================
// CRUD: DELETE
// =====================

function deleteItem(id, itemType, loadFunction) {
  const modalElement = document.getElementById("delete-confirmation-modal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
  const confirmDeleteButton = document.getElementById("confirm-delete-button");
  const modalMessage = document.getElementById("modal-message");

  // Atualiza a mensagem
  switch (itemType) {
    case "food":
      modalMessage.textContent =
        "Você tem certeza de que deseja excluir este alimento? Esta ação não pode ser desfeita.";
      break;
    case "recipe":
      modalMessage.textContent =
        "Você tem certeza de que deseja excluir esta receita? Esta ação não pode ser desfeita.";
      break;
    case "menu":
      modalMessage.textContent =
        "Você tem certeza de que deseja excluir este menu? Esta ação não pode ser desfeita.";
      break;
    default:
      modalMessage.textContent =
        "Você tem certeza de que deseja excluir este item? Esta ação não pode ser desfeita.";
  }

  // Remove handlers antigos antes de adicionar um novo
  const newButton = confirmDeleteButton.cloneNode(true);
  confirmDeleteButton.parentNode.replaceChild(newButton, confirmDeleteButton);

  // Evento de exclusão
  newButton.onclick = () => {
    fetch(`http://127.0.0.1:5000/${itemType}s/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao deletar");
        showAlert("Item excluído com sucesso!", "success");
        loadFunction();
      })
      .catch((error) => {
        console.error("Erro ao excluir:", error);
        showAlert("Erro ao excluir item.", "danger");
      });

    newButton.blur();
    modal.hide();
  };

  // Exibe o modal
  modal.show();
}

