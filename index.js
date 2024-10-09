// ::::: importe de librería :::::
const express = require('express');
const mysql = require("mysql");

// ::::: objeto para llamar los metodos :::::
const app = express();
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

    let registro = "insert into gestion_solicitudes.solicitud (id_usuario_asignado, fecha_hora_envio, id_profesor, aula, estatus, descripcion_problema)\n" +
        "values (null,'2024-10-07 08:07:00' , 1, '"+ aula +"', 'PENDIENTE', '"+ desc +"')";

    conexion.query(registro, function (err, result) {
        if (err) {
            throw err;
        }else{
            console.log("Datos almacenados correctamente");
        }
    })
})

// ::::: puerto para el servidor local :::::
app.listen(3000, function () {
    console.log('El servidor es: http://localhost:3000');
});