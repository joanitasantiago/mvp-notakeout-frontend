function deleteItem(id, itemType, loadFunction) {
  const modal = new bootstrap.Modal(
    document.getElementById("deleteConfirmationModal")
  );
  const confirmDeleteButton = document.getElementById("confirmDeleteButton");
  const modalMessage = document.getElementById("modalMessage");

  // Modifica a mensagem do modal dependendo do tipo do item
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

  // Mostra o modal
  modal.show();

  // Quando o botão de excluir for clicado
  confirmDeleteButton.onclick = () => {
    const url = `http://127.0.0.1:5000/${itemType}s/${id}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao deletar");
        showAlert(
          `${
            itemType.charAt(0).toUpperCase() + itemType.slice(1)
          } excluído com sucesso!`,
          "success"
        );
        loadFunction(); // Recarrega a lista de alimentos, receitas ou menus após exclusão
      })
      .catch((error) => {
        console.error("Erro ao excluir:", error);
        showAlert("Erro ao excluir item.", "danger");
      });

    // Fecha o modal
    modal.hide();
  };
}
