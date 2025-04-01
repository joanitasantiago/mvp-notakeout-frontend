/**
 * Exibe um alerta estilizado com Bootstrap.
 *
 * @param {string} message - A mensagem a ser exibida.
 * @param {string} type - O tipo do alerta: "success", "danger", "warning", "info".
 * @param {number} duration - Tempo em milissegundos até o alerta desaparecer.
 */
function showAlert(message, type = "success", duration = 4000) {
    const container = document.getElementById("alert-container");
  
    if (!container) {
      console.warn("⚠️ Alerta não exibido: elemento #alert-container não encontrado.");
      return;
    }
  
    // Cria o elemento HTML do alerta com classes do Bootstrap
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
      </div>
    `;
  
    container.appendChild(wrapper);
  
    // Remove automaticamente após a duração definida
    setTimeout(() => {
      wrapper.remove();
    }, duration);
  }
  
  