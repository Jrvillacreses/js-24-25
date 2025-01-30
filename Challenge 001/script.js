// Referencias a elementos del DOM
const contenedorPeliculas = document.getElementById('contenedor-peliculas');
const contenedorTitulos = document.getElementById('contenedor-titulos');
const botonMostrarTitulos = document.getElementById('mostrar-titulos');

// Cargar el JSON y mostrar las películas
fetch('peliculas.json')
  .then((response) => response.json())
  .then((data) => {
    // Guardar el JSON en una variable global para reutilizar
    window.peliculas = data;

    // Mostrar todas las películas
    let htmlContent = '';
    for (let i = 0; i < data.length; i++) {
      htmlContent += `<p><strong>${data[i].titulo}</strong> - Año: ${data[i].año}, Género: ${data[i].genero}</p>`;
    }
    contenedorPeliculas.innerHTML = htmlContent;
  });

// Mostrar solo los títulos de las películas
botonMostrarTitulos.addEventListener('click', () => {
  if (!window.peliculas) return;

  let htmlContent = '';
  for (let i = 0; i < window.peliculas.length; i++) {
    htmlContent += `<p>${window.peliculas[i].titulo}</p>`;
  }
  contenedorTitulos.innerHTML = htmlContent;
});

// Referencia al botón para filtrar por género
const botonFiltrarGenero = document.getElementById('filtrar-genero');

// Función para filtrar películas por género
botonFiltrarGenero.addEventListener('click', () => {
    if (!window.peliculas) return;

    // Pedir al usuario que ingrese el género
    const generoBuscado = prompt('Ingrese el género que desea filtrar (por ejemplo, "Acción", "Animación", etc.):');
    if (!generoBuscado) return;

    // Filtrar las películas que coincidan con el género
    const peliculasFiltradas = window.peliculas.filter(pelicula => 
        pelicula.genero.toLowerCase() === generoBuscado.toLowerCase()
    );

    // Mostrar las películas filtradas en el contenedor de películas
    let htmlContent = '';
    if (peliculasFiltradas.length > 0) {
        peliculasFiltradas.forEach(pelicula => {
            htmlContent += `<p><strong>${pelicula.titulo}</strong> - Año: ${pelicula.año}, Género: ${pelicula.genero}</p>`;
        });
    } else {
        htmlContent = `<p>No se encontraron películas para el género "${generoBuscado}".</p>`;
    }
    contenedorPeliculas.innerHTML = htmlContent;
});
