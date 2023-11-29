const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
const fecha = document.getElementById("fecha");

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

let nombreValidado = false;
let correoValidado = false;
let fechaValidado = false;

const gestionarBoton = () =>
 {
	let valid = nombreValidado === true && correoValidado === true && fechaValidado === true
	if (valid === true) document.getElementById("submitButton").disabled = false
	else document.getElementById("submitButton").disabled = true
}
const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			nombreValidado = validarCampo(expresiones.nombre, e.target, "nombre")
		break;
		case "correo":
			correoValidado = validarCampo(expresiones.correo, e.target, "correo");
		break;
		case "fecha":
			fechaValidado = validarFecha();
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

const validarFecha = () => {
	if(esFechaPosterior(fecha.value)){
		fecha.classList.add("form-control-correct");
		fecha.classList.remove("form-control-wrong");
		return true
	} else {
		fecha.classList.remove("form-control-correct");
		fecha.classList.add("form-control-wrong");
		return false
	}
}
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
