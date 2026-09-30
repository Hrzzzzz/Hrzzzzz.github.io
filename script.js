const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");
const currentYear = document.querySelector("#current-year");

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  root.dataset.theme = "dark";
}

function updateThemeLabel() {
  const isDark = root.dataset.theme === "dark";
  themeToggle?.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode",
  );
}

updateThemeLabel();

themeToggle?.addEventListener("click", () => {
  const isDark = root.dataset.theme === "dark";

  if (isDark) {
    delete root.dataset.theme;
    localStorage.setItem("theme", "light");
  } else {
    root.dataset.theme = "dark";
    localStorage.setItem("theme", "dark");
  }

  updateThemeLabel();
});

function closeMenu() {
  navMenu?.classList.remove("open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open navigation menu");
  document.body.classList.remove("menu-open");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";

  navMenu?.classList.toggle("open", !isOpen);
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Open navigation menu" : "Close navigation menu",
  );
  document.body.classList.toggle("menu-open", !isOpen);
});

function setActiveSection(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

let clickedSectionId = "";

function updateActiveSection() {
  if (!sections.length) return;

  if (clickedSectionId) {
    const target = document.getElementById(clickedSectionId);
    const targetTop = target?.getBoundingClientRect().top ?? 0;
    const arrived = targetTop >= 0 && targetTop < 120;

    if (!arrived) {
      setActiveSection(clickedSectionId);
      return;
    }

    clickedSectionId = "";
  }

  const marker = window.scrollY + 96;
  let currentId = sections[0].id;

  sections.forEach((section) => {
    const top = section.getBoundingClientRect().top + window.scrollY;
    if (top <= marker) currentId = section.id;
  });

  setActiveSection(currentId);
}

function releaseClickedSection() {
  if (!clickedSectionId) return;
  clickedSectionId = "";
  updateActiveSection();
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
    const id = link.getAttribute("href")?.slice(1);
    if (!id) return;
    clickedSectionId = id;
    setActiveSection(id);
  });
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }

  if (
    ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(
      event.key,
    )
  ) {
    releaseClickedSection();
  }
});

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("wheel", releaseClickedSection, { passive: true });
window.addEventListener("touchmove", releaseClickedSection, { passive: true });
window.addEventListener("resize", updateActiveSection);

const initialSectionId = location.hash.slice(1);
if (initialSectionId && document.getElementById(initialSectionId)) {
  clickedSectionId = initialSectionId;
}

updateActiveSection();

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}
