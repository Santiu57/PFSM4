// Funciones para manejar cookies
function setCookie(nombre, valor, dias = 30) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);

    document.cookie =
        `${nombre}=${encodeURIComponent(valor)}; ` +
        `expires=${fecha.toUTCString()}; path=/`;

    console.log(`Cookie set: ${nombre}=${valor}`);
}

function getCookie(nombre) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");

        if (key === nombre) {
            console.log(`Cookie get: ${nombre}=${decodeURIComponent(value)}`);
            return decodeURIComponent(value);
        }
    }

    return null;
}

// Cambiar el toggle segun la cookie
const toggle = document.getElementById("darkModeToggle");

document.addEventListener("DOMContentLoaded", () => {
    const darkModeEnabled = getCookie("darkMode") === "true";

    toggle.checked = darkModeEnabled;
    toggleDarkMode(darkModeEnabled);
});

toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    setCookie("darkMode", enabled.toString());
    toggleDarkMode(enabled);
});

function toggleDarkMode(darkModeEnabled) {
    document.body.classList.toggle("dark-mode", darkModeEnabled);
}
