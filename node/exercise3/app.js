// Se pide implementar una función leerArticulos(callback) que obtenga todos los artículos de la base de datos.
// Esta función debe construir un array de objetos, cada uno de ellos representando la información de un
// artículo mediante cuatro atributos: id (númerico), titulo (cadena de texto), fecha (objeto Date) y
// palabrasClave (array de cadenas). Por ejemplo:



const dao = require("./DAO.js")

const midao = new dao("localhost","root","","ej3")


function cb_leerArticulos(err, articulos) {
    if(err) console.log("Error: ", err)
    else {
        let claves = Object.keys(articulos); 
        for(let i=0; i< claves.length; i++){
          console.log(articulos[claves[i]]);
        }
    }
}
midao.leerArticulos(cb_leerArticulos)

