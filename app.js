var express = require("express");
var app = express();

const pug = require('pug');


app.use(express.static(__dirname+"/public"));

var perros_array = [    
    {raza: "Doberman",texto: "perro de caceria", imagen:"doberman.jpg"},
    {raza: "Dachshund",texto: "perro de caza", imagen:"dachshund.jpg"},
    {raza: "Pastor Aleman",texto: "perro de pastoreo", imagen:"pastorAleman.jpg"},
    {raza: "Pug",texto: "perro de compañia", imagen:"pug.jpg"},
    {raza: "San Bernardo",texto: "perro de compañia", imagen:"sanbernardo.jpg"}
]

app.get("/",(req, res)=>{
    // res.send("index.html");
    res.render("index.pug",{
        titulo: "Perros poderosos",
        texto: "Seleccina un perro",
        imagen: "perros.jpg",
        perros: perros_array
    });  
});

app.get("/perro/:raza",(req, res)=>{
    var datosPerro = perros_array.filter((perro)=>{
        if(req.params.raza===perro.raza){
            return perro;
        }
    })[0];
    
    res.render("perro.pug",{
        raza: req.params.raza,
        data: datosPerro
    });  
});

// funcion cuando se ingresa una ruta que no existe
app.use((req, res)=>{
    res.status(400);
    let error = req.originalUrl;
    res.render('404.pug',{texto:error});
})





app.listen(3000, ()=>{
    console.log("servidor en el puerto 3000");
});