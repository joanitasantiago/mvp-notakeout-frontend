/**
 * Exibe um alerta estilizado personalizado.
 *
 * @param {string} message - A mensagem a ser exibida.
 * @param {string} type - O tipo do alerta: "success", "danger", "warning", "info".
 * @param {number} duration - Tempo em milissegundos até o alerta desaparecer.
 */
function showAlert(message, type = "success", duration = 4000) {
  const container = document.getElementById("alert-container");

  if (!container) {
    console.warn(
      "⚠️ Alerta não exibido: elemento #alert-container não encontrado."
    );
    return;
  }

  // Cria o elemento HTML do alerta com estilos personalizados
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
      <div class="custom-alert custom-alert-${type}" role="alert">
        ${message}
        <button type="button" class="custom-alert-close">&times;</button>
      </div>
    `;

  // Adiciona os estilos necessários
  const styles = document.createElement("style");
  styles.id = "custom-alert-styles";
  styles.textContent = `
            .custom-alert {
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 4px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                animation: slideIn 0.3s ease-in-out;
            }

            @keyframes slideIn {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            .custom-alert-success {
                background-color: #d4edda;
                border: 1px solid #c3e6cb;
                color: #155724;
            }

            .custom-alert-danger {
                background-color: #f8d7da;
                border: 1px solid #f5c6cb;
                color: #721c24;
            }

            .custom-alert-warning {
                background-color: #fff3cd;
                border: 1px solid #ffeeba;
                color: #856404;
            }

            .custom-alert-info {
                background-color: #cce5ff;
                border: 1px solid #b8daff;
                color: #004085;
            }

            .custom-alert-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                line-height: 1;
                padding: 0 0.5rem;
                cursor: pointer;
                opacity: 0.5;
                transition: opacity 0.2s;
            }

            .custom-alert-close:hover {
                opacity: 1;
            }
        `;
  document.head.appendChild(styles);

  // Adiciona evento de clique no botão de fechar
  const closeButton = wrapper.querySelector(".custom-alert-close");
  closeButton.addEventListener("click", () => wrapper.remove());

  container.appendChild(wrapper);

  // Remove automaticamente após a duração definida
  setTimeout(() => {
    wrapper.remove();
  }, duration);
}
