const formulario = document.getElementById('contact_form');
const inputs = document.querySelectorAll('#contact_form input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	tel: /^[0-9_.+-]{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	nombre: false,
	email: false,
	tel: false
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`${campo}_input`).classList.remove('contact_form-incorrecto');
		document.getElementById(`${campo}_input`).classList.add('contact_form-correcto');
		document.querySelector(`.${campo} .formulario_input-error`).classList.remove('erractivo');
		campos[campo] = true;
	} else {
		document.getElementById(`${campo}_input`).classList.add('contact_form-incorrecto');
		document.getElementById(`${campo}_input`).classList.remove('contact_form-correcto');
		document.querySelector(`.${campo} .formulario_input-error`).classList.add('erractivo');
		campos[campo] = false;
	}
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
		case "tel":
			validarCampo(expresiones.tel, e.target, 'tel');
		break;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terminos');
	if(campos.nombre && campos.email && campos.tel){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
});