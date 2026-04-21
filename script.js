const tabButtons = document.querySelectorAll(".tab-btn");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = button.dataset.tab;
    const group = button.dataset.tabGroup;
    if (!group || !id) return;

    const groupButtons = document.querySelectorAll(`.tab-btn[data-tab-group="${group}"]`);
    const groupPanels = document.querySelectorAll(`.tab-panels[data-tab-group="${group}"] .tab-panel`);

    groupButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-selected", "true");

    groupPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === id);
    });
  });
});

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((element) => revealObserver.observe(element));
