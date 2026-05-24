const inputClave = document.getElementById('contraseña');
const modal = document.getElementById("modal");
const formularioLogin = document.querySelector('form');

formularioLogin.addEventListener("submit", (e) => {
    e.preventDefault(); 
    const claveIngresada = inputClave.value;

    if (claveIngresada === "Tristan2105") {
        modal.classList.add("show");
        setTimeout(() => {
            window.location.replace("index.html"); 
        }, 5000);
    } else {
        alert("Contraseña incorrecta.");
    }
});