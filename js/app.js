// Datos base de las rutas predefinidas y "Clientes que llaman"
const baseRoutes = {
  "Ruta 1": [
    "EL PEDREGAL", "MARIMBA", "MANDUCA NUEVO", "BAR BUC", "TOC HOSTAL GRAN VIA",
    "BAR RESTAURANTE POMA NOVA", "TIENDA RONDA SANT ANTONI", "BAR CAFETERIA MARIANA",
    "OMBU,RTE", "O CANTO RESTAURANTE", "ROCHA", "MOLI PAN Y CAFE ZONA FRANCA",
    "PESSEBRE", "RTE L'ESTONETA", "CUATRECASAS", "PLEASE PLATS", "BUFFS DE FARINA",
    "CAFE ILUSIONA BY MUXIA", "RIAS DE GALICIA RTE", "CASA DE TAPAS LA CAÑOTA"
  ],
  "Ruta 2": [
    "LA LLAR DEL MERCAT 2 SANT BOI", "TIENDA EL TALLER SANT BOI", "HOTEL FRONTAIR CONGRESS",
    "NON SOLO CREPS", "TIENDA SANT VICENÇ DELS HORTS", "ARTESANO", "EL CARQUINYOLI",
    "A DUES RODES", "LOS 3 ARCOS", "HOTEL SB WIN SANT FELIU", "SETEMBRE", "BAR DE BO",
    "GARBI", "RESTAURANTE SUKAPA", "CAFETERIA RONDA SANT BOI",
    "CAFETERIA LEROY MERLIN SANT BOI", "K10 SUSHI SANT BOI"
  ],
  "Ruta 3": [
    "TIENDA LES CORTS", "MANDONI PEDRALBES", "EL MOLI PAN Y CAFE SANTS",
    "FORN VELL INDUSTRIA", "FORN VELL CLARET", "O RINCON GALLEGO MERIDIANA",
    "BOEDO", "FLANDERS", "BAR CIURIS", "SANT FELIU", "QUILMEÑA", "ORDAL",
    "BAR EUROPA", "EL MIRALL DELS ENCANTS"
  ],
  "Ruta 4": [
    "EL PEDREGAL TIENDA TORRES I BAGES", "CAFETERÍA PIPA'S", "TIENDA CLOT VALLDAURA",
    "LA RUTA GALLEGA", "BAR CAÑAS", "BAR LOS PINOS 2", "TIENDA MERIDIANA II",
    "RINCON GALEGO", "TIENDA JOAQUIM VALLS", "FRANKFURT TOLIK"
  ],
  "Ruta 5": [
    "TIENDA VIA JULIA", "TIENDA TALLER VALLDAURA", "AMPARITO",
    "SET POINT", "LA CASSOLETA", "LES CATIVAS"
  ],
  "Clientes que llaman": [
    "RTE PIPA", "O BURATO BAR", "TEATRO NACIONAL DE CATALUNYA", "RESTAURANT CENT FOCS",
    "HOTEL MESON CASTILLA", "BAR RTE LEPANTO", "EXE RAMBLAS BOQUERIA", "RESTAURANTE HONKAKU II",
    "SARA TAPES", "HOTEL SB GLOW", "HOTEL SB ICARIA BARCELONA", "CAFETERIA DOMI",
    "LA FILOMENA BAR", "EUROSTARS ANGLI", "ATICCO PASSEIG DE GRÀCIA CANTINA",
    "EXE LAIETANA PALACE", "EUROSTARS CRISTAL PALACE", "MIRADOR SANT JUST",
    "IKONIK RAMBLAS", "ALTIMA HOSPITALET GRAN VIA", "EXE PLAZA CATALUNYA 4", "EUROSTARS MONUMENTAL",
    "EUROSTARS MITRE", "RESTAURANTE LA GORMANDA", "TOSTA BAR", "ADELITA RESTAURANTE",
    "LOKAL", "BATEA", "TSUKIMI", "LA PALMERA", "LOMO ALTO", "HOTEL ORIENTE", "HOTEL ARENAS",
    "HOTEL TRES TORRES", "ESCAIRON", "LA BRASA RESTAURANTE", "RTE ANCARES", "HOTEL SB WIN SANT FELIU",
    "RTE MAMETORA", "R.U. COSMOPOLITAN", "ESCUELA JUDICIAL BCN", "O MEU LAR", "GREENVITA NUMANCIA",
    "EL RACONET D'URGELL", "CHALITO BCN.", "CLUB TIRO MONTJUIT", "FRANKFURT SANTS",
    "R.U. EMILIE DE VILLENUEVE", "SOLUCIONS SOCIALS INSERCIO", "ALTIMA SANT BOI",
    "FUNDACIO ASPACE CATALUNYA", "GREEN VITA GLORIES", "ATICCO PASSEIG DE GRÀCIA OFICINA"
  ]
};

// Mapeo de nombres de ruta a claves de almacenamiento (sin espacios)
const routeKeyMap = {
  "Ruta 1": "route1",
  "Ruta 2": "route2",
  "Ruta 3": "route3",
  "Ruta 4": "route4",
  "Ruta 5": "route5",
  "Clientes que llaman": "routeCall"
};

// Estado actual en memoria de las rutas modificadas (si existen en localStorage)
let routeStates = {};

// Elementos del DOM
const routeSelect = document.getElementById('route-select');
const clientListEl = document.getElementById('client-list');
const newClientInput = document.getElementById('new-client');
const addBtn = document.getElementById('add-btn');
const resetBtn = document.getElementById('reset-btn');

// Inicializar sugerencias (datalist) para añadir clientes desde otras rutas
(function populateDatalist() {
  const dataList = document.getElementById('all-clients');
  if (!dataList) return;
  const allNames = new Set();
  // Tomar todos los nombres de todas las rutas predefinidas
  for (const route in baseRoutes) {
    baseRoutes[route].forEach(name => allNames.add(name));
  }
  // Crear opcion por cada nombre único
  allNames.forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    dataList.appendChild(option);
  });
})();

// Cargar estados guardados en localStorage (si existen)
for (const routeName in routeKeyMap) {
  const key = routeKeyMap[routeName];
  const savedData = localStorage.getItem(key);
  if (savedData) {
    try {
      routeStates[routeName] = JSON.parse(savedData);
    } catch (e) {
      // Si hubiera error de parseo, ignorar y no cargar
    }
  }
}

// Estado de la ruta activa actual
let currentRouteName = routeSelect.value;  // valor inicial tomado del select
let currentList = [];

// Función para actualizar el DOM de la lista de clientes según currentList
function renderList() {
  // Vaciar lista HTML actual
  clientListEl.innerHTML = '';
  // Generar cada elemento de la lista
  currentList.forEach((item, index) => {
    const li = document.createElement('li');
    // Marcar clase 'visited' si corresponde
    if (item.visited) {
      li.classList.add('visited');
    }
    li.dataset.index = index;  // guardar índice en el dataset

    // Checkbox para marcar visitado
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!item.visited;
    // Evento: marcar/desmarcar visitado
    checkbox.addEventListener('change', () => {
      item.visited = checkbox.checked;
      if (item.visited) {
        li.classList.add('visited');
      } else {
        li.classList.remove('visited');
      }
      saveCurrentRouteState();
    });

    // Span del nombre del cliente
    const nameSpan = document.createElement('span');
    nameSpan.className = 'client-name';
    nameSpan.textContent = item.name;

    // Botón subir
    const upBtn = document.createElement('button');
    upBtn.textContent = '▲';
    upBtn.type = 'button';
    upBtn.title = 'Subir';
    upBtn.addEventListener('click', () => {
      if (index > 0) {
        // Intercambiar con el elemento anterior
        const temp = currentList[index];
        currentList[index] = currentList[index - 1];
        currentList[index - 1] = temp;
        renderList();
        saveCurrentRouteState();
      }
    });

    // Botón bajar
    const downBtn = document.createElement('button');
    downBtn.textContent = '▼';
    downBtn.type = 'button';
    downBtn.title = 'Bajar';
    downBtn.addEventListener('click', () => {
      if (index < currentList.length - 1) {
        // Intercambiar con el siguiente elemento
        const temp = currentList[index];
        currentList[index] = currentList[index + 1];
        currentList[index + 1] = temp;
        renderList();
        saveCurrentRouteState();
      }
    });

    // Botón eliminar
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✕';
    removeBtn.type = 'button';
    removeBtn.title = 'Eliminar';
    removeBtn.addEventListener('click', () => {
      currentList.splice(index, 1);
      renderList();
      saveCurrentRouteState();
    });

    // Hacer elementos de lista arrastrables para reordenar (drag & drop)
    li.draggable = true;
    li.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', index.toString());
    });
    li.addEventListener('dragover', (e) => {
      e.preventDefault(); // necesario para permitir drop
    });
    li.addEventListener('drop', (e) => {
      e.preventDefault();
      const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
      const toIndex = parseInt(li.dataset.index);
      if (!isNaN(fromIndex) && !isNaN(toIndex) && fromIndex !== toIndex) {
        // Remover elemento arrastrado
        const [movedItem] = currentList.splice(fromIndex, 1);
        // Insertar en la nueva posición
        currentList.splice(toIndex, 0, movedItem);
        renderList();
        saveCurrentRouteState();
      }
    });

    // Armar la estructura del <li>
    li.appendChild(checkbox);
    li.appendChild(nameSpan);
    li.appendChild(upBtn);
    li.appendChild(downBtn);
    li.appendChild(removeBtn);

    clientListEl.appendChild(li);
  });
}

// Guardar el estado actual de la ruta activa en localStorage
function saveCurrentRouteState() {
  // Guardar en el objeto en memoria
  routeStates[currentRouteName] = currentList;
  // Guardar en localStorage
  const key = routeKeyMap[currentRouteName];
  if (key) {
    localStorage.setItem(key, JSON.stringify(currentList));
  }
}

// Cambiar ruta activa
function loadRoute(routeName) {
  currentRouteName = routeName;
  // Obtener la lista correspondiente (estado guardado o base si no hay cambios previos)
  if (routeStates[routeName]) {
    currentList = routeStates[routeName].slice(); // copia del estado guardado
  } else {
    // Inicializar a partir de la lista base (clonando los elementos base)
    currentList = baseRoutes[routeName].map(name => ({ name: name, visited: false }));
    routeStates[routeName] = currentList;
  }
  renderList();
}

// Evento: cambio de selección de ruta en el desplegable
routeSelect.addEventListener('change', () => {
  // Antes de cambiar, guardar estado de la ruta actual
  saveCurrentRouteState();
  // Cargar nueva ruta seleccionada
  loadRoute(routeSelect.value);
});

// Evento: añadir nuevo cliente
addBtn.addEventListener('click', () => {
  const newName = newClientInput.value.trim();
  if (newName) {
    // Añadir al final de la lista actual
    currentList.push({ name: newName, visited: false });
    renderList();
    saveCurrentRouteState();
    // Limpiar campo de entrada
    newClientInput.value = '';
  }
});

// (Opcional) Permitir añadir con Enter en el campo de texto
newClientInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

// Evento: resetear día (ruta activa)
resetBtn.addEventListener('click', () => {
  // Restaurar la lista actual a su base original
  currentList = baseRoutes[currentRouteName].map(name => ({ name: name, visited: false }));
  // Actualizar estado guardado: eliminar del objeto y localStorage
  routeStates[currentRouteName] = currentList;
  const key = routeKeyMap[currentRouteName];
  if (key) {
    localStorage.removeItem(key);
  }
  // Re-renderizar lista
  renderList();
});

// Inicialización: cargar ruta por defecto al inicio
loadRoute(currentRouteName);
