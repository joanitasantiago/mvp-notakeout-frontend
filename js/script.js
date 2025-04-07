document.addEventListener("DOMContentLoaded", () => {
  // Navegação principal: mostra a seção clicada e esconde as outras
  const mainButtons = document.querySelectorAll("nav button");

  mainButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionName = button.getAttribute("data-section");

      document.querySelectorAll("main .page-section").forEach((section) => {
        section.classList.add("hide-element");
      });

      const selectedSection = document.querySelector(`.${sectionName}-section`);
      if (selectedSection) {
        selectedSection.classList.remove("hide-element");
      }
    });
  });

  // Navegação de subseções: mostra apenas a aba interna clicada
  const subButtons = document.querySelectorAll("[data-subsection]");

  subButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sub = button.getAttribute("data-subsection");
      const currentSection = button.closest(".page-section"); 
      // closest() serve para subir na hierarquia do DOM até encontrar a seção principal que contém esse botão.
      // Força a troca de abas ocorra somente dentro da seção ativa :)

      currentSection.querySelectorAll(".content-subsection").forEach((subsec) => {
        subsec.classList.add("hide-element");
      });

      const target = currentSection.querySelector(`.${sub}`);
      if (target) {
        target.classList.remove("hide-element");
      }
    });
  });
});