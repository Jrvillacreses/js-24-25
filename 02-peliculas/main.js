 // Función para cargar todas las películas
 function cargarPeliculas() {
    fetch('http://localhost:3000/peliculas')
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(pelicula => {
                html += `
                    <tr>
                        <td>${pelicula.titulo}</td>
                        <td>${pelicula.director}</td>
                        <td>${pelicula.anio}</td>
                        <td>${pelicula.genero}</td>
                    </tr>
                `;
            });
            document.getElementById('peliculasTabla').innerHTML = html;
        });
}
 // Función para cargar las películas de un género específico
 function cargarPeliculasPorGenero(genero) {
    fetch(`http://localhost:3000/peliculas/genero/${genero}`)
        .then(response => response.json())
        .then(data => {
            let html = '';
            data.forEach(pelicula => {
                html += `
                    <tr>
                        <td>${pelicula.titulo}</td>
                        <td>${pelicula.director}</td>
                        <td>${pelicula.anio}</td>
                        <td>${pelicula.genero}</td>
                    </tr>
                `;
            });
            document.getElementById('peliculasTabla').innerHTML = html;
        });
}