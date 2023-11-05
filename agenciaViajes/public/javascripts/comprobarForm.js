const formulario = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");
const fecha = document.getElementById("fecha");
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    destino: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, "nombre");
		break;
		case "correo":
			validarCampo(expresiones.correo, e.target, "correo");
		break;
		case "destino":
			validarCampo(expresiones.destino, e.target, "destino");
		break;
	}
}
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`${campo}`).classList.remove("form-control-wrong");
		document.getElementById(`${campo}`).classList.add("form-control-correct");
		document.getElementById("submitButton").disabled = false
	} else {
        document.getElementById(`${campo}`).classList.remove("form-control-correct");
		document.getElementById(`${campo}`).classList.add("form-control-wrong");
		document.getElementById("submitButton").disabled = true
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

const validarFecha = (e) => {
	if(esFechaPosterior(fecha.value)){
		fecha.classList.add("form-control-correct");
		fecha.classList.remove("form-control-wrong");
		document.getElementById("submitButton").disabled = false
	} else {
		fecha.classList.remove("form-control-correct");
		fecha.classList.add("form-control-wrong");
		document.getElementById("submitButton").disabled = true
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
fecha.addEventListener('keyup', validarFecha);
fecha.addEventListener('blur', validarFecha);
