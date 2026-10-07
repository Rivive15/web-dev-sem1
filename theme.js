const themeToggle = document.querySelector(".theme-toggle");
const fontToggle = document.querySelector(".font-toggle");
let savedTheme;
let savedFont;

try {
    savedTheme = localStorage.getItem("color-theme");
    savedFont = localStorage.getItem("readable-font");
} catch (error) {
    console.error("Unable to read saved display preferences.", error);
}

if (savedTheme === "night") {
    document.documentElement.dataset.theme = "night";
}

if (savedFont === "on") {
    document.documentElement.dataset.font = "readable";
}

function updateThemeToggle() {
    const isNightMode = document.documentElement.dataset.theme === "night";
    const label = isNightMode ? "Switch to day mode" : "Switch to night mode";
    themeToggle.querySelector(".theme-icon").textContent = isNightMode ? "☀" : "☾";
    themeToggle.setAttribute("aria-label", label);
    themeToggle.title = label;
    themeToggle.setAttribute("aria-pressed", String(isNightMode));
}

function saveTheme(theme) {
    try {
        localStorage.setItem("color-theme", theme);
    } catch (error) {
        console.error("Unable to save the colour theme.", error);
    }
}

function updateFontToggle() {
    const isReadableFont = document.documentElement.dataset.font === "readable";
    const label = `Turn readable font ${isReadableFont ? "off" : "on"}`;
    fontToggle.setAttribute("aria-label", label);
    fontToggle.title = label;
    fontToggle.setAttribute("aria-pressed", String(isReadableFont));
}

function saveFontPreference(isReadableFont) {
    try {
        localStorage.setItem("readable-font", isReadableFont ? "on" : "off");
    } catch (error) {
        console.error("Unable to save the readable font preference.", error);
    }
}

updateThemeToggle();
updateFontToggle();

themeToggle.addEventListener("click", () => {
    const isNightMode = document.documentElement.dataset.theme !== "night";

    if (isNightMode) {
        document.documentElement.dataset.theme = "night";
    } else {
        delete document.documentElement.dataset.theme;
    }

    updateThemeToggle();
    saveTheme(isNightMode ? "night" : "day");
});

fontToggle.addEventListener("click", () => {
    const isReadableFont = document.documentElement.dataset.font !== "readable";

    if (isReadableFont) {
        document.documentElement.dataset.font = "readable";
    } else {
        delete document.documentElement.dataset.font;
    }

    updateFontToggle();
    saveFontPreference(isReadableFont);
});
