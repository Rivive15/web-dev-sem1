const themeToggle = document.querySelector(".theme-toggle");
const fontToggle = document.querySelector(".font-toggle");
const labToggle = document.querySelector(".lab-toggle");
let savedTheme;
let savedFont;
let savedLabBackground;

try {
    savedTheme = localStorage.getItem("color-theme");
    savedFont = localStorage.getItem("readable-font");
    savedLabBackground = localStorage.getItem("lab-background");
} catch (error) {
    console.error("Unable to read saved display preferences.", error);
}

if (savedTheme === "night") {
    document.documentElement.dataset.theme = "night";
}

if (savedFont === "on") {
    document.documentElement.dataset.font = "readable";
}

if (savedLabBackground === "lab6") {
    document.documentElement.dataset.background = "lab6";
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

function updateLabToggle() {
    const isLabBackground = document.documentElement.dataset.background === "lab6";
    const label = isLabBackground ? "Switch to default background" : "Switch to Lab 6 background";
    labToggle.setAttribute("aria-label", label);
    labToggle.title = label;
    labToggle.setAttribute("aria-pressed", String(isLabBackground));
}

updateThemeToggle();
updateFontToggle();
updateLabToggle();

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

labToggle.addEventListener("click", () => {
    const isLabBackground = document.documentElement.dataset.background !== "lab6";

    if (isLabBackground) {
        document.documentElement.dataset.background = "lab6";
    } else {
        delete document.documentElement.dataset.background;
    }

    updateLabToggle();

    try {
        localStorage.setItem("lab-background", isLabBackground ? "lab6" : "default");
    } catch (error) {
        console.error("Unable to save the background preference.", error);
    }
});
