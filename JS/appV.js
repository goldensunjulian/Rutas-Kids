//la web component q no se me olvide 
const templateRuta = document.createElement("template");
templateRuta.innerHTML = `
    <style>
        .encabezado-ruta {
            background-color: #f8f9fa;
            padding: 5%;
            box-shadow: 0 0 5px 1px black;
        }
        h3 { margin: 0 0 10px 0; color: #333; }
        p { margin: 5px 0; font-weight: bold; }
    </style>
    <div class="encabezado-ruta">
        <h3 id="rc-nombre"></h3>
        <p id="rc-hora"></p>
        <p id="rc-conductor"></p>
    </div>
    <slot name="interactividad"></slot> 
`;
class RouteCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(templateRuta.content.cloneNode(true));
    }

    connectedCallback() {
        const nombre = this.getAttribute("nombre");
        const hora = this.getAttribute("hora");
        const conductor = this.getAttribute("conductor");

        this.shadowRoot.getElementById("rc-nombre").textContent = nombre;
        this.shadowRoot.getElementById("rc-hora").textContent = `Hora: ${hora}`;
        this.shadowRoot.getElementById("rc-conductor").textContent = `Conductor: ${conductor}`;
    }
}

customElements.define("route-card", RouteCard);

let rutasGuardadas = JSON.parse(localStorage.getItem('rutasGuardadas')) || [];
let estudiantesGuardados = JSON.parse(localStorage.getItem('estudiantesGuardados')) || [];
let editId = null;
let editRutaId = null; 

const AgregarRuta = document.getElementById('AgregarRuta');
const AgregarEstudiantes = document.getElementById('AgregarEstudiantes');
const listaEstudiantes = document.getElementById('listaEstudiantes');
const modalRuta = document.getElementById('modalRuta');
const modalEstudiante = document.getElementById('modalEstudiante');
const formRuta = document.getElementById('formRuta');
const formEstudiante = document.getElementById('formEstudiante');
const nRuta = document.getElementById('nombreRuta');
const hora = document.getElementById('hora');
const conductor = document.getElementById('conductor');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const grado = document.getElementById('grado');
const direccion = document.getElementById('direccion');
const acudiente = document.getElementById('acudiente');
const telefono = document.getElementById('telefono');
const cerrarButtons = document.querySelectorAll('.cerrar');
const verEstudiantes = document.getElementById('VerEstudiantes');
const contenedorEstudiantes = document.getElementById('contenedorEstudiantes');
const contenedorRutas = document.getElementById("rutas");


cerrarButtons.forEach(btn => {
    btn.addEventListener('click', function () {
        modalRuta.classList.remove('show');
        modalEstudiante.classList.remove('show');
        listaEstudiantes.classList.remove('show');
    });
});

AgregarRuta.addEventListener('click', function () {
    formRuta.reset();
    editRutaId = null;
    modalRuta.classList.add('show');
});

AgregarEstudiantes.addEventListener('click', function () {
    formEstudiante.reset();
    editId = null;
    modalEstudiante.classList.add('show');
});


function renderEstudiantes(infoEstudiante) {
    contenedorEstudiantes.innerHTML = '';
    infoEstudiante.forEach(element => {
        let nombreRuta = 'Sin ruta';
        if (element.rutaId) {
            const ruta = rutasGuardadas.find(r => r.id === element.rutaId);
            if (ruta) {
                nombreRuta = ruta.nombreRuta;
            }
        }
        contenedorEstudiantes.innerHTML += `
        <div class="estudiante">
            <h1> Error 401 <br> No access</h1>
        </div>
        `;
    });
}

verEstudiantes.addEventListener('click', function () {
    renderEstudiantes(estudiantesGuardados);
    listaEstudiantes.classList.add('show');
});

function renderRutas(infoRuta) {
    contenedorRutas.innerHTML = `<h1 id="titulo">Rutas Activas</h1>`;
    infoRuta.forEach(element => {
        contenedorRutas.innerHTML += `
        <div class="ruta">
            <route-card nombre="${element.nombreRuta}" hora="${element.hora}" conductor="${element.conductor}"> 
                <div class="Pfondo" slot="interactividad">
                    <div id="CRutas">
                        <button class="ERuta" onclick="quitarRuta(${element.id})" >Eliminar Ruta</button>
                        <button onclick="editarRuta(${element.id})" >Editar Ruta</button>
                    </div>
                    <h2>Agregar estudiante</h2>
                    <select class="acortar" onchange="asignarRuta(${element.id}, this.value)">
                        <option value="">Seleccionar estudiante</option>
                        ${estudiantesGuardados
                .filter(e => e.rutaId === null)
                .map(e => `<option value="${e.id}">${e.nombre}</option>`).join('')}</select>
                <h2>Estudiantes</h2>    
                <div class="estudianteEnRuta">
                        ${element.estudiantes.map(e => `   
                            <div class="asiento">
                                <p>${e.nombre}</p>
                                <button class="Adelete" onclick="quitarDeRuta(${element.id}, ${e.id})">Quitar</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </route-card>
        </div>
        `;
    });
}

function asignarRuta(rutaId, estudianteId) {
    if (!estudianteId) return;
    const estudiante = estudiantesGuardados.find(e => e.id == estudianteId);
    const ruta = rutasGuardadas.find(r => r.id == rutaId);
    if (!estudiante || !ruta) return;
    alert ("Error 401. No cuentas con los permisos requeridos para hacer eso")
    renderRutas(rutasGuardadas);
    renderEstudiantes(estudiantesGuardados);
}

function quitarDeRuta(rutaId, estudianteId) {
    const ruta = rutasGuardadas.find(r => r.id == rutaId);
    const estudiante = estudiantesGuardados.find(e => e.id == estudianteId);
    if (!ruta || !estudiante) return;
   alert ("Error 401. No cuentas con los permisos requeridos para hacer eso")
    renderRutas(rutasGuardadas);
    renderEstudiantes(estudiantesGuardados);
}

function quitarRuta(id) {
    const ruta = rutasGuardadas.find(r => r.id === id);
    alert ("Error 401. No cuentas con los permisos requeridos para hacer eso")  
    renderRutas(rutasGuardadas);
    renderEstudiantes(estudiantesGuardados);
}

function guardarDatos() {
    localStorage.setItem('rutasGuardadas', JSON.stringify(rutasGuardadas));
    localStorage.setItem('estudiantesGuardados', JSON.stringify(estudiantesGuardados));
}

// Aca tenemos el API pa que no se me olvide dionadsfnaosidfnaodifn
async function cargarClima() {
    try {
        const apiKey = 'e562394be6882aaa09416ee2df23b832'; 
        const respuesta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Giron,CO&appid=${apiKey}&units=metric&lang=es`);
        const data = await respuesta.json();
        
        document.getElementById('clima').innerHTML = `
            <div style="background: #e3f2fd; padding: 10px; border-radius: 5px; margin-bottom: 20px; display: inline-block;">
                🌤️ <strong>Clima en Girón:</strong> ${Math.round(data.main.temp)}°C, ${data.weather[0].description}
            </div>
        `;
    } catch (error) {
        document.getElementById('clima').innerHTML = `<p>Error cargando el clima</p>`;
    }
}
cargarClima();
renderRutas(rutasGuardadas);
renderEstudiantes(estudiantesGuardados);