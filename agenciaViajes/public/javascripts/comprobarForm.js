const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
const fecha = document.getElementById("fecha");
const fechaV = document.getElementById("fechaV");

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	apellidos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
}

let nombreValidado = false;
let correoValidado = false;
let fechaValidado = false;
let fechaVValidado = false;
let apellidosValidado = false;

const gestionarBoton = () =>
 {
	let valid = nombreValidado === true && correoValidado === true && fechaValidado === true
	if (valid === true) document.getElementById("submitButton").disabled = false
	else document.getElementById("submitButton").disabled = true
}
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			nombreValidado = validarCampo(expresiones.nombre, e.target, "nombre");
		break;
		case "correo":
			correoValidado = validarCampo(expresiones.correo, e.target, "correo");
		break;
		case "fecha":
			fechaValidado = validarFecha(fecha)&& validarVuelta();
		break;
		case "fechaV":
			fechaVValidado = validarFecha(fechaV) && validarVuelta();
			
		break;
		case "apellidos":
			apellidosValidado = validarCampo(expresiones.apellidos, e.target, "apellidos");
		break;
	}
	gestionarBoton() 
}
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`${campo}`).classList.remove("form-control-wrong");
		document.getElementById(`${campo}`).classList.add("form-control-correct");
		return true
	} else {
		document.getElementById(`${campo}`).classList.remove("form-control-correct");
		document.getElementById(`${campo}`).classList.add("form-control-wrong");
		return false
	}
}

const validarFecha = (f) => {
	if(esFechaPosterior(f.value)){
		f.classList.add("form-control-correct");
		f.classList.remove("form-control-wrong");
		return true
	} else {
		f.classList.remove("form-control-correct");
		f.classList.add("form-control-wrong");
		return false
	}
}
const validarVuelta = () => {
    const fechaIda = new Date(fecha.value);
    const fechaVuelta = new Date(fechaV.value);

    if (fechaVuelta > fechaIda) {
        fechaV.classList.add("form-control-correct");
        fechaV.classList.remove("form-control-wrong");
        return true;
    } else {
        fechaV.classList.remove("form-control-correct");
        fechaV.classList.add("form-control-wrong");
        return false;
    }
};


function esFechaPosterior(fechaParametro) {
	var fechaHoy = new Date();

	var partesFecha = fechaParametro.split("-");
	var año = parseInt(partesFecha[0], 10);
	var mes = parseInt(partesFecha[1], 10) - 1;
	var dia = parseInt(partesFecha[2], 10);

	return new Date(año, mes, dia) > fechaHoy;
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
