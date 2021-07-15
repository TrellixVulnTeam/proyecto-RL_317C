const formu = document.getElementById('login-form');
const inputs = document.querySelectorAll('#login-form input');
const select = document.querySelector('#login-form select');
var arrayControl = [false,false,false,false,false,false,false,false,false];
const nomcampo = ['NomAp','Cuit','NomEmp','Postal','Dire','Email','Loca','Tfono','listaprov'];

const expresiones = {
	NomAp: /^[a-zA-ZÀ-ÿ0-9\s\_\-]{5,40}$/, // Letras, numeros, acentos, espacio, guión bajo y guión
	Cuit: /^\d{2}-\d{8}-\d{1}$/, // 99-12345678-9
	NomEmp: /^[a-zA-ZÀ-ÿ0-9\s\_\-]{5,40}$/, // Letras, numeros, acentos, espacio, guión bajo y guión
	Postal: /^\d{4}$/, // 4 números.
	Dire: /^[a-zA-ZÀ-ÿ0-9\s\_\-]{5,40}$/, // Letras, numeros, acentos, espacio, guión bajo y guión
	// Email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	Email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
	Loca: /^[a-zA-ZÀ-ÿ0-9\s\_\-]{5,40}$/, // Letras, numeros, acentos, espacio, guión bajo y guión
	Tfono: /^\d{8,14}$/, // 8 a 14 numeros.
	listaprov: /^[a-zA-ZÀ-ÿ]{5,40}$/, // Letras, acentos
}


const campos = {
	NomAp: false,
	Cuit: false,
	NomEmp: false,
	Postal: false,
	Dire: false,
	Email: false,
	Loca: false,
	Tfono: false,
	listaprov: false,
}


const evalcuit = (datocuit) => {
// esto es lo mismo que lo anterior: function evalcuit (datocuit) {
	// se utiliza el algoritmo módulo 11 para verificar el dígito verificador
	let tipo = [20,23,24,27,30,33,34];// valores permitidos para el array tipo de control
	let soyNro2 = !(isNaN(Number(datocuit.substr(0,2))));// si el dato es un nro. es true
	let soyNro8 = !(isNaN(Number(datocuit.substr(3,8))));// si el dato es un nro. es true
	let soyNro0 = !(isNaN(Number(datocuit.substr(12,1))));// si el dato es un nro. es true
	let cuit2 = Number(datocuit.substr(0,2));// tipo ingresado
	let cuit0 = Number(datocuit.substr(12,1));// dígito verificador ingresado
	let estoyEnTipo = false;
	let digitoVerif = 0;
	let digito = 0;
	let suma = 0;
	let n27 = 2;
	let iCount = 0;

	if (datocuit.length != 13) {// verifico que la longitud total sea 13
		return false;		
	}else{
		if (datocuit.substr(2,1) != "-" || datocuit.substr(11,1) != "-") {// verifico que haya 2 guiones en la posición que corresponde
			return false;
		}else{
			if (soyNro2 && soyNro8 && soyNro0) {// verifico que sean números
				while (iCount <= 6) {// verifico que el tipo sea igual a alguno del array tipo de control
					if (cuit2 == tipo[iCount]) {
						estoyEnTipo = true;
						iCount = 7;
					}else{
						iCount++;
					}
				}
				if (estoyEnTipo) {
					for (let iDF = 10; iDF >= 0; iDF--) {// aqui comienza la verificación del dígito verificador 
						if (iDF != 2) {// la posición 2 es un guión y no hay que tenerlo en cuenta
							digito = Number(datocuit.substr(iDF,1));
							suma += digito * n27;
							n27++; 
							if (n27 == 8) {n27 = 2;}
						}	
					}
					digitoVerif = 11 - (suma % 11);			
					if (digitoVerif == 11) {
						digitoVerif = 0;
					}else{
						if (digitoVerif == 10) {
							digitoVerif = 1;
						}
					}
					if (digitoVerif != cuit0) {// comparo el digito verificador obtenido con el ingresado
						return false;
					}else{
						return true;// devuelvo verdadero si es igual
					}
				}else{
					return false;
				}	
			}else{
				return false;
			}
		}
	}		
}


const validarprov = (e) => {
	//la función e (podemos darle cualquier nombre) es un objeto que tiene las siguientes propiedades:
    // target: es la referencia del objeto que generó el evento
    // type: el nombre del evento (en este caso es click)
    // button: el botón del mouse presionado (0=izq, 1=medio, 2=der)
    // keyCode: el caracter del teclado presionado (en caso que corresponda)
    // shiftKey: true o false, en caso de estar presionada esta tecla
	let lista1 = document.getElementById("listaprov");
    let indice = lista1.selectedIndex;
    let opcion = lista1.options[indice];
    let valor = opcion.value;
    let provincia = opcion.text;//Provincia
	if (provincia != "Provincia") {
		document.getElementById("grupo__listaprov").classList.remove('formu__grupo-incorrecto');
		document.getElementById("grupo__listaprov").classList.add('formu__grupo-correcto');
		document.querySelector(`#grupo__listaprov i`).classList.add('fa-check-circle');//muestro ícono verde correcto
		document.querySelector(`#grupo__listaprov i`).classList.remove('fa-times-circle');//borro ícono rojo incorrecto
		document.querySelector(`#grupo__listaprov .formu__input-error`).classList.remove('formu__input-error-activo');// borro el párrafo del error
		campos.listaprov = true;
		arrayControl[8] = true;
	}else{
		document.getElementById("grupo__listaprov").classList.add('formu__grupo-incorrecto');
		document.getElementById("grupo__listaprov").classList.remove('formu__grupo-correcto');
		document.querySelector(`#grupo__listaprov i`).classList.remove('fa-check-circle');//borro ícono verde correcto
		document.querySelector(`#grupo__listaprov i`).classList.add('fa-times-circle');//muestro ícono rojo incorrecto
		document.querySelector(`#grupo__listaprov .formu__input-error`).classList.add('formu__input-error-activo');// muestro el párrafo del error
		campos.listaprov = false;
		arrayControl[8] = false;
	}
}


const hacertrim = (e) => {
	let hagotrim = document.getElementById(e.target.name).value.trim();
	document.getElementById(e.target.name).value = hagotrim;
}


const validarFormu = (e) => {
	switch (e.target.name) {
		case "NomAp":
			validarCampo(expresiones.NomAp, e.target, 'NomAp');
		break;
		case "Cuit":
			validarCampo(expresiones.Cuit, e.target, 'Cuit');
		break;
		case "NomEmp":
			validarCampo(expresiones.NomEmp, e.target, 'NomEmp');
		break;
		case "Postal":
			validarCampo(expresiones.Postal, e.target, 'Postal');
			break;
		case "Dire":
			validarCampo(expresiones.Dire, e.target, 'Dire');
			break;
		case "Email":
			validarCampo(expresiones.Email, e.target, 'Email');
			break;
		case "Loca":
			validarCampo(expresiones.Loca, e.target, 'Loca');
			break;
		case "Tfono":
			validarCampo(expresiones.Tfono, e.target, 'Tfono');
			break;
		case "listaprov":
			validarCampo(expresiones.listaprov, e.target, 'listaprov');
			break;
	}
}
										

const validarCampo = (expresion, input, campo) => {
	// Evalúa cada campo y coloca en objeto campos true si ok, o false si está mal
	// Evalúa cada campo también con expresiones regulares
	// Muestra ícono de verificación en el campo
	let ok = 1; //1 es ok, 0 esta mal
	let transi = document.getElementById(campo).value.trim();
	let long = transi.length;
	let soyNro = !(isNaN(transi));// true significa que SI es nro, false significa que NO es nro.
	let iterar = 0;

	switch (campo) {
		case "NomAp":// --------------------- evalúa Nombre y Apellido ----------------------------
			if (transi==null || long < 5) {ok = 0;}
			break;
		case "Cuit":// --------------------- evalúa Cuit ------------------------------------------
			if (evalcuit(transi)) {
				ok = 1;
				document.getElementById(campo).value = transi;
			}else{
				ok = 0;
			}		
		break;
		case "NomEmp":// --------------------- evalúa Nombre de Empresa ---------------------------
			if (transi==null || long < 5) {ok = 0;}
			break;
		case "Postal":// --------------------- evalúa Código Postal -------------------------------
			if (soyNro) {
				if (long != 4 || Number(transi)<=0) {
					ok = 0;
				}else{
					document.getElementById(campo).value = transi;
				}
			}else{
				ok = 0;
			}
			break;
		case "Dire":// --------------------- evalúa Dirección -------------------------------------
			if (transi==null || transi.length<5) {ok = 0;}
			break;
		case "Email":// --------------------- evalúa Correo Electrónico ---------------------------
			// solo se evalua con expresiones regulares
			break;
		case "Loca":// --------------------- evalúa Localidad -------------------------------------
			if (transi==null || transi.length<5) {ok = 0;}
			break;
		case "Tfono":// --------------------- evalúa Teléfono -------------------------------------
			if (soyNro) {
				if ((long > 13 || long < 8) || Number(transi)<=0) {
					ok = 0;
				}else{
					document.getElementById(campo).value = transi;
				}
			}else{
				ok = 0;
			}					
			break;
		// la provincia se evalúa distinto porque no tiene input, sino select
		}	
	// Para que pueda cambiar el contenido de una variable dentro de una plantilla de cadena de caracteres,
	// encerramos entre llaves la variable y le antecedemos el caracter $.
	// ejemplo:
	// v1=5; v2=8;
	// lo que sigue es lo mismo:
	// document.write(`La suma de ${v1} y ${v2} es ${v1+v2}`);
	// document.write("La suma de "+v1+" y "+v2+" es "+(v1+v2));
	if (expresion.test(transi) && ok == 1){// evalúa con expr.regulares y ok, para los datos son correctos
	// if (expresion.test(input.value) && ok==1){// si los datos son correctos
		document.getElementById(`grupo__${campo}`).classList.remove('formu__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formu__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');//muestro ícono verde correcto
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');//borro ícono rojo incorrecto
		document.querySelector(`#grupo__${campo} .formu__input-error`).classList.remove('formu__input-error-activo');// borro el párrafo del error
		campos[campo] = true;
		for (iterar = 0; iterar < arrayControl.length; iterar++) {
			if (nomcampo[iterar] == campo) {
				arrayControl[iterar] = true;
				iterar = arrayControl.length;
			}
		}
	} else {// si los datos son incorrectos
		document.getElementById(`grupo__${campo}`).classList.add('formu__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formu__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');//borro ícono verde correcto
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');//muestro ícono rojo incorrecto
		document.querySelector(`#grupo__${campo} .formu__input-error`).classList.add('formu__input-error-activo');// muestro el párrafo del error
		campos[campo] = false;
		for (iterar = 0; iterar < arrayControl.length; iterar++) {
			if (nomcampo[iterar] == campo) {
				arrayControl[iterar] = false;
				iterar = arrayControl.length;
			}
		}
	}
}


const salgoFormu = (e) => {
	//al hacer click en cualquier elemento fuera del formulario,
	//no se ejecuta validarformu y, o se sale a otra página, o
	//clickeando sobre clientes, se resetea.
	document.getElementById('NomAp').blur();
}




////////////////////////////// E V E N T O S ///////////////////////////////////////////////////////////

// (1) Evento automático que pone el foco en el primer elemento, sin que se haya----------------------------
//     presionado alguna tecla------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", (e) => {
	document.getElementById('NomAp').focus();
});

// (2) Eventos para los INPUTS -----------------------------------------------------------------------------
inputs.forEach((input) => {// compruebo cada input del formulario, y de acuerdo a que sea se hace una función
	input.addEventListener('keyup', validarFormu);//cuando yo levanto la tecla presionada, se ejecutará validarFormu
	input.addEventListener('blur', salgoFormu);// cuando hago clic fuera del formulario, no se ejecutará validarFormu
	input.addEventListener('focusout', hacertrim);// cuando salgo del campo, pongo ese dato al comienzo y sin espacios
});

// (3) Evento CLICK en campo Provincia ---------------------------------------------------------------------
select.addEventListener('click', validarprov);// cuando hago clic, entrego ok true o false

// (4) Evento SUBMIT O ENVIAR ------------------------------------------------------------------------------
formu.addEventListener('submit', (e) => {
	// cuando presiono enviar, quiero validar los campos y luego reiniciarlos
	e.preventDefault(); //cuando clic, NO envía los datos
	let totCampos = 0;
	let huboError = 0;
	let cualError = 0;
	let posi = 0;
	const terminos = document.getElementById('terminos');

	// verifico q todos los campos del objeto campos estén en true y chequeados los términos
	if(campos.NomAp && campos.Cuit && campos.NomEmp && campos.Postal && campos.Dire && campos.Email && campos.Loca && campos.Tfono && campos.listaprov && terminos.checked ){
		// muestro mensaje de éxito
		document.getElementById('formu__mensaje-exito').classList.add('formu__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formu__mensaje-exito').classList.remove('formu__mensaje-exito-activo');
		}, 2000);
		// borro cada uno de los íconos de éxito
		document.querySelectorAll('.formu__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formu__grupo-correcto');
		});
		// pongo false a todos los registros del objeto campos
		for (totCampos in campos) {
			campos[totCampos] = false;
		}
		// pongo false a todos los registros del vector arrayControl
		for (totCampos = 0; totCampos < arrayControl.length; totCampos++) {
			arrayControl[totCampos] = false;
		}
		// pongo false al chequeo de términos y condiciones
		terminos.checked = false;
		// reseteo cada campo de los input y el select del formulario
		formu.reset();
		// voy al comienzo de la página luego de 2 segundos
		setTimeout(() => {
			window.scrollTo(0,0);
		}, 2000);	
	} else {
		// pongo el foco en el primer elemento que tiene un error 
		huboError = 0;
		cualError = 0;
		while (posi < arrayControl.length) {
			if (arrayControl[posi] == false) {
				cualError = posi;
				// document.getElementById(nomcampo[posi]).focus();
				posi = 8;
				huboError = 1;
			}
			posi++;
		}
		if (huboError == 0) {
			//muestro mensaje de error que falta tildar terminos y condiciones
			document.getElementById('formu__mensaje1').classList.add('formu__mensaje-term-activo');	
			setTimeout(() => {
				document.getElementById('formu__mensaje1').classList.remove('formu__mensaje-term-activo');
			}, 2000);
			// pongo el foco en el botón de submit, esperando que tilde el checkbox de terminos
			document.getElementsByTagName('button').focus();
		}else{
			// muestro mensaje de error que hay algún elemento vacío o mal cargado
			document.getElementById('formu__mensaje').classList.add('formu__mensaje-activo');	
			setTimeout(() => {
				document.getElementById('formu__mensaje').classList.remove('formu__mensaje-activo');
			}, 2000);
			// voy al campo del error luego de 1,5 segundos
			setTimeout(() => {
				document.getElementById(nomcampo[cualError]).focus();
			}, 1500);
		}
	}
});

