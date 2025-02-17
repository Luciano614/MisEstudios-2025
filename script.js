const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let selectedDay = null;

// Función para mostrar el calendario de un mes específico
function showMonth(monthIndex) {
    const calendarContainer = document.getElementById("calendar-container");
    calendarContainer.innerHTML = "";  // Limpiar el calendario actual

    const year = 2025;
    const month = monthIndex;
    const firstDay = new Date(year, month, 1).getDay();  // Día de la semana del primer día
    const daysInMonth = new Date(year, month + 1, 0).getDate();  // Total de días en el mes

    // Agregar los nombres de los días de la semana
    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;
        dayElement.classList.add("day");
        calendarContainer.appendChild(dayElement);
    });

    // Rellenar los días del mes
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendarContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.textContent = day;
        dayElement.classList.add("day");
        dayElement.onclick = () => openPopup(day);
        calendarContainer.appendChild(dayElement);
    }

    loadNotes(monthIndex);  // Cargar notas de este mes
}

// Mostrar el calendario de enero por defecto
showMonth(0);

// Abrir la ventana emergente para agregar una nota
function openPopup(day) {
    selectedDay = day;  // Guardamos el día seleccionado
    const note = localStorage.getItem(`${selectedDay}-note`);

    document.getElementById("event-note").value = note || "";  // Cargar la nota si existe
    document.getElementById("popup").style.display = "flex";
}

// Cerrar la ventana emergente
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Guardar la nota en el localStorage
function saveNote() {
    const note = document.getElementById("event-note").value;
    if (selectedDay !== null) {
        localStorage.setItem(`${selectedDay}-note`, note);
    }
    closePopup();  // Cerrar el popup después de guardar
}

// Cargar notas almacenadas en localStorage al cargar el mes
function loadNotes(monthIndex) {
    const daysInMonth = new Date(2025, monthIndex + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const note = localStorage.getItem(`${day}-note`);
        if (note) {
            const dayElements = document.querySelectorAll(".day");
            const dayElement = dayElements[day + (new Date(2025, monthIndex, 1).getDay()) - 1];
            if (dayElement) {
                dayElement.title = note;  // Mostrar la nota al pasar el mouse sobre el día
            }
        }
    }
}