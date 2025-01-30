// Referencias a elementos del DOM
const listadoPeliculas = document.getElementById('peliculas');
const generoSelect = document.getElementById('genero');
const accesosRapidos = document.getElementById('accesos-rapidos');

// Inicializar la página
fetch('peliculas.json')
  .then(response => response.json())
  .then(data => {
    // Guardar las películas globalmente
    window.peliculas = data;

    // Inicializar la funcionalidad
    cargarGeneros(data);
    mostrarPeliculas(data);
    generarBotonesAcceso(data);
  });

// Función para mostrar películas como filas de una tabla
function mostrarPeliculas(data) {
  listadoPeliculas.innerHTML = '';
  data.forEach(pelicula => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pelicula.titulo}</td>
      <td>${pelicula.genero}</td>
    `;
    listadoPeliculas.appendChild(row);
  });
}

// Función para cargar géneros únicos en el desplegable
function cargarGeneros(data) {
  const generos = [...new Set(data.map(p => p.genero))];
  generos.forEach(genero => {
    const option = document.createElement('option');
    option.value = genero;
    option.textContent = genero;
    generoSelect.appendChild(option);
  });

  // Agregar evento de cambio al desplegable
  generoSelect.addEventListener('change', () => filtrarPorGenero(data));
}

// Función para generar botones de acceso rápido
function generarBotonesAcceso(data) {
  const generos = [...new Set(data.map(p => p.genero))];

  // Botón "Todos" para mostrar todas las películas
  const todosButton = document.createElement('button');
  todosButton.textContent = 'Todos';
  todosButton.addEventListener('click', () => mostrarPeliculas(data));
  accesosRapidos.appendChild(todosButton);

  // Botones para cada género
  generos.forEach(genero => {
    const button = document.createElement('button');
    button.textContent = genero;
    button.addEventListener('click', () => filtrarPorGeneroDirecto(data, genero));
    accesosRapidos.appendChild(button);
  });
}

// Función para filtrar películas desde el desplegable
function filtrarPorGenero(data) {
  const generoSeleccionado = generoSelect.value;
  if (generoSeleccionado === 'todos') {
    mostrarPeliculas(data);
  } else {
    const filtradas = data.filter(p => p.genero === generoSeleccionado);
    mostrarPeliculas(filtradas);
  }
}

// Función para filtrar películas desde botones
function filtrarPorGeneroDirecto(data, genero) {
  const filtradas = data.filter(p => p.genero === genero);
  mostrarPeliculas(filtradas);
}
