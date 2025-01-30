const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Configuración de la base de datos
const pool = new Pool({
    user: "postgres",
    host: "db-skills-2.c52qk8eekmdz.us-east-1.rds.amazonaws.com",
    database: "postgres",
    password: "Aprobado123",
    ssl: {
        rejectUnauthorized: false, // Considera mejor configuraciones seguras
    },
});

// Endpoint de prueba
app.get("/", (req, res) => {
    res.send("¡API REST con Node.js, Express y PostgreSQL en AWS!");
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Obtener todas las películas
app.get("/peliculas", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM peliculas;");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener películas:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Crear una nueva película
app.post("/peliculas", async (req, res) => {
    const { titulo, director, anio, genero } = req.body;

    if (!titulo || !director || !anio || !genero) {
        return res.status(400).send("Todos los campos (titulo, director, anio, genero) son obligatorios");
    }

    try {
        await pool.query(
            "INSERT INTO peliculas (titulo, director, anio, genero) VALUES ($1, $2, $3, $4)",
            [titulo, director, anio, genero]
        );
        res.status(201).send("Película creada correctamente");
    } catch (error) {
        console.error("Error al crear película:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Actualizar una película existente
app.put("/peliculas/:id", async (req, res) => {
    const peliculaId = req.params.id;
    const { titulo, director, anio, genero } = req.body;

    if (!titulo || !director || !anio || !genero) {
        return res.status(400).send("Todos los campos (titulo, director, anio, genero) son obligatorios");
    }

    try {
        const result = await pool.query(
            "UPDATE peliculas SET titulo = $1, director = $2, anio = $3, genero = $4 WHERE id = $5",
            [titulo, director, anio, genero, peliculaId]
        );

        if (result.rowCount === 0) {
            return res.status(404).send(`Película con ID ${peliculaId} no encontrada`);
        }

        res.send("Película actualizada correctamente");
    } catch (error) {
        console.error("Error al actualizar película:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Eliminar una película
app.delete("/peliculas/:id", async (req, res) => {
    const peliculaId = req.params.id;

    try {
        const result = await pool.query("DELETE FROM peliculas WHERE id = $1", [peliculaId]);

        if (result.rowCount === 0) {
            return res.status(404).send(`Película con ID ${peliculaId} no encontrada`);
        }

        res.send("Película eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar película:", error);
        res.status(500).send("Error en el servidor");
    }
});

//Filtrar peliculas por genero Drama

app.get("/peliculas/genero/:genero", async (req, res) => {
    const genero = req.params.genero;
    try {
        const result = await pool.query("SELECT * FROM peliculas WHERE genero = $1", [genero]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener peliculas por genero:", error);
        res.status(500).send("Error en el servidor");
    }
});

//Filtrar peliculas por genero Crimen

app.get("/peliculas/genero/:genero", async (req, res) => {
    const genero = req.params.genero;
    try {
        const result = await pool.query("SELECT * FROM peliculas WHERE genero = $1", [genero]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener peliculas por genero:", error);
        res.status(500).send("Error en el servidor");
    }
});

//Filtrar peliculas por genero Accion

app.get("/peliculas/genero/:genero", async (req, res) => {
    const genero = req.params.genero;
    try {
        const result = await pool.query("SELECT * FROM peliculas WHERE genero = $1", [genero]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener peliculas por genero:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Filtrar peliculas por genero Ciencia ficción

app.get("/peliculas/genero/:genero", async (req, res) => {
    const genero = req.params.genero;
    try {
        const result = await pool.query("SELECT * FROM peliculas WHERE genero = $1", [genero]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener peliculas por genero:", error);
        res.status(500).send("Error en el servidor");
    }
});

// Filtrar peliculas por genero Romance

app.get("/peliculas/genero/:genero", async (req, res) => {
    const genero = req.params.genero;
    try {
        const result = await pool.query("SELECT * FROM peliculas WHERE genero = $1", [genero]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener peliculas por genero:", error);
        res.status(500).send("Error en el servidor");
    }
});
