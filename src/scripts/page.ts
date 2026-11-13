// Small page behaviours: mobile menu closes on anchor / Escape; phone call bar shows after the hero.

const menu = document.querySelector<HTMLDetailsElement>("[data-menu]");
if (menu) {
  menu.addEventListener("click", (e) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest("a")) menu.open = false;
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary")?.focus();
    }
  });
  menu.addEventListener("toggle", () => {
    document.documentElement.classList.toggle("menu-open", menu.open);
  });
  window.matchMedia("(min-width: 64rem)").addEventListener("change", (m) => {
    if (m.matches) menu.open = false;
  });
}

const bar = document.querySelector<HTMLElement>("[data-callbar]");
const hero = document.getElementById("hero");
const contacts = document.getElementById("contacts");
const start = document.getElementById("price-start");
if (bar && hero && contacts && "IntersectionObserver" in window) {
  // Hidden while the hero, the «З чого почати» card or the contacts are on screen: each has its own call button.
  const visible = new Map<Element, boolean>([[hero, true]]);
  const update = () => bar.classList.toggle("is-shown", ![...visible.values()].some(Boolean));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) visible.set(e.target, e.isIntersecting);
    update();
  }, { threshold: 0 });
  [hero, contacts, start].forEach((el) => el && io.observe(el));
} else if (bar) {
  bar.classList.add("is-shown");
}
