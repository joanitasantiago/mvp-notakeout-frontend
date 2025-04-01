document.addEventListener("DOMContentLoaded", () => {
  // Navegação principal: mostra a seção clicada e esconde as outras
  const mainButtons = document.querySelectorAll("nav button");

  mainButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sectionName = button.getAttribute("data-section");

      document.querySelectorAll("main .section").forEach((section) => {
        section.classList.add("d-none");
      });

      const selectedSection = document.querySelector(`.${sectionName}-section`);
      if (selectedSection) {
        selectedSection.classList.remove("d-none");
      }
    });
  });

  // Navegação de subseções: mostra apenas a aba interna clicada
  const subButtons = document.querySelectorAll("[data-subsection]");

  subButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const sub = button.getAttribute("data-subsection");
      const currentSection = button.closest(".section");

      currentSection.querySelectorAll(".subsection").forEach((subsec) => {
        subsec.classList.add("d-none");
      });

      const target = currentSection.querySelector(`.${sub}`);
      if (target) {
        target.classList.remove("d-none");
      }
    });
  });
});