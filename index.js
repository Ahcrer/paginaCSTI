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

    let registro = "insert into "

    conexion.query(registro, function (err, result) {
        if (err) {
            throw err;
        }else{
            console.log("Datos almacenados correctamente");
        }
    })
})

// :::::: Obtener datos de la DB :::::
app.get('/data', (req, res) => {

    const sql = "select descripcion_problema, aula, estatus, fecha_hora_envio from gestion_solicitudes.solicitud";
    conexion.query(sql, function (err, result) {

        if(err){
            return res.status(500).send({err});
        }else{
            res.json(result);
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

    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');

    return `${horas}:${minutos}:${segundos}`;

}

const horaActual = obtenerHoraActual();
