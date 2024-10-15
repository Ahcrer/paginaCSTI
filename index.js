// ::::: importe de librería :::::
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// ::::: objeto para llamar los metodos :::::
const app = express();
app.use(cors());

const conexion = mysql.createConnection({

    host: "187.244.131.32",
    port: 3306,
    database: "gestion_solicitudes",
    user: "adminuser",
    password: "AdminUser2024!"

})

// ::::: middleware :::::
app.use(express.static("public"));

//datos de paginas
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("index");
});

app.post("/validar", function (req, res) {
    const datos = req.body;

    let nombre = datos.expedienteProfesor;
    let desc = datos.descripcion;
    let aula = datos.aula;
    let image = datos.imagen;

    let validacionProfesor = "SELECT * FROM gestion_solicitudes.profesor WHERE num_institucional = '" + nombre + "';";

    conexion.query(validacionProfesor, function (err, result) {
        if (err) {
            throw err;
        } else if (result.length > 0) { // Verificamos si hay resultados
            let id_prof = result[0].id_profesor; // Asumiendo que el campo se llama id_profesor
            let registro = "INSERT INTO gestion_solicitudes.solicitud (id_profesor, fecha_hora_envio, aula, estatus, descripcion_problema) " +
                "VALUES (" + id_prof + ", NOW(), '" + aula + "', 'PENDIENTE', '" + desc + "');";

            conexion.query(registro, function (err, result) {
                if (err) {
                    throw err;
                } else {
                    res.send({ message: "Solicitud registrada correctamente" });
                }
            });
        } else {
            res.status(404).send({ message: "Profesor no encontrado" });
        }
    });
});


// :::::: Obtener datos de la DB :::::
app.get('/data', (req, res) => {

    const sql = "select descripcion_problema, aula, estatus, fecha_hora_envio from gestion_solicitudes.solicitud";
    conexion.query(sql, function (err, result) {

        if(err){
            return res.status(500).send({err});
        }else{
            res.json(result);
            let num_inst = res["num_institucional"];
            console.log(num_inst);
            console.log(result);
        }

    })
})

// ::::: puerto para el servidor local :::::
app.listen(3000, function () {
    console.log('El servidor es: http://localhost:3000');
});

// ::::: función para obtener la hora actual :::::
function obtenerHoraActual() {

    const fecha = new Date();

    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses en JS son de 0 a 11, por eso sumamos 1
    const dia = String(fecha.getDate()).padStart(2, '0');
    const horas = String(fecha.getHours()).padStart(2, '0');
    const minutos = String(fecha.getMinutes()).padStart(2, '0');
    const segundos = String(fecha.getSeconds()).padStart(2, '0');

    return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

}

const horaActual = obtenerHoraActual();


// ::::: PRUEBAS VALIDACIÓN PROFESOR ::::::

