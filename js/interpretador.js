const re_blancos = /\s/yug
     ,re_coma = /,/yg
     ,re_símbolo = /\s*(Any|None|not|::|sw|-(?:0|1)|\u0259|\.\.\.|\S)\s+/yug
     ,re_griega = /\s*(?:[\u0381-\u03c9]|alpha|alfa|beta|gamma|delta|(?:e|é)psilon|(?:ds|z|th)?eta|iota|kappa|lambda|m(?:i|u)|n(?:u|i)|(?:ó|o)micron|rho|sigma|tau|(?:ú|i)psilon|(?:ph|f|ch|j|ps|x|p)i|omega)\s*/yg
     ,re_acción = /\s*(R|L|P(\S)|E)\s*/yug
     ,re_mconfig = /([a-zñáéíóú](?:[a-zA-ZñÑáéíóúÁÉÍÓÚ])*(?:'|’)*)([0-9])*(\(|\s)/yug
     ,re_cualquiera = /\s*(\S+)/yug
     ,re_varconfig = /\s*([A-ZÄÖÜ\uẞ])\s*/yg
;

const letras_griegas = {alfa:'\u03b1', alpha:'\u03b1', beta:'\u03b2', gamma:'\u03b3', delta:'\u03b4', epsilon:'\u03b5', épsilon:'\u03b5',
								zeta:'\u03b6', dseta:'\u03b6', eta:'\u03b7', theta:'\u03b8', iota:'\u03b9', kappa:'\u03ba', lambda:'\u03bb', mu:'\u03bc',
								mi:'\u03bc', nu:'\u03bd', ni:'\u03bd', xi:'\u03be',  ómicron:'\u03bf', omicron:'\u03bf', pi:'\u03c0', rho:'\u03c1',
							   sigma:'\u03c3', tau:'\u03c4', úpsilon:'\u03c5', ipsilon:'\u03c5', fi:'\u03c6', phi:'\u03c6', ji:'\u03c7',
								chi: '\u03c7', psi: '\u03c8', omega: '\u03c9'};


const errores = [/*0*/"fin de lista de variables", /*1*/"variables en m-function", /*2*/"final de línea", /*3*/"m-function o espacio y símbolo"
	,/*4*/"símbolo o llave de apertura", /*5*/"acciones o m-configuración final"];


var sust_símbolos = false;

//Variable global que se pone cuando se detecta un error en la línea.
var tok_esperado;
    // ,índice;

//Si hay espacios es una línea que empieza con símbolo y se llama a la función correspondiente; si no, empieza por mconfiguración.
function int_línea(texto){
	const partes = [];
	var índice = 0;
	tok_esperado = null;
		
	const espacios = aplicar_re(re_blancos); //re en vez de ver si hay un espacio para que funcione con cualquier espacio unicode.
	if(!texto[índice]) return null; //No hay nada o sólo espacios.
	if(texto[0] == "}"){
		partes.push(new Llave("}", 4));
		índice = 1;
	}
	else if(texto[0] == "{"){
		partes.push(new Llave("{", 3));
		índice = 1;
	}
	else{
		if(espacios){
			partes.push(espacios[0]);
			emp_símbolo();
		}
		else emp_mconfig();
	}

	const ult_tok = aplicar_re(re_cualquiera);
	const tok_error = ult_tok? ult_tok[1] : "";
	if(tok_error && !tok_esperado) tok_esperado = errores[2];
	const resto = tok_error + texto.slice(índice);
	if(resto) partes.push(resto);
	return partes;

	function emp_mconfig(){
		const mconf = int_mconfig();
		if(!mconf) return;
		partes.push(mconf);
		if(tok_esperado) return;
		const sig = buscar_símbolo();
		if(!sig){
			tok_esperado = errores[4];
			return;
		}
		partes.push(sig);
		const acc_mconf = int_acc_mconf();
		if(acc_mconf) return; //Se puede seguir parseando.
		if(sig.símbolo == "{"){ //No se puede seguir parseando pero si lo que se coge como símbolo es llave también es correcto.
			partes.pop(); // Se quita el simbolo que se había metido y se interpreta como llave,
			partes.push(new Llave(sig.texto, 5));
			return;
		}
		tok_esperado = errores[5];
	}

	/*Devuelve un objeto. Primer parámetro el nombre del mconfig; segundo si acaba en número, para poder ponerlo como subíndice; tercero las variables; cuarto indica si
	se ha termido de leer o lee parte.*/
	function int_mconfig(){
		var nombre = aplicar_re(re_mconfig);
		if(!nombre){
			tok_esperado = errores[3];
			return null;
		}
		if(nombre[3] != "("){
			return new Mconfig(nombre[1], nombre[2], [[],[]], 0);
		}
		const variables = int_variables();
		if(tok_esperado) return new Mconfig(nombre[1], nombre[2], variables, 1);
		if(texto[índice] == ")"){
			índice++;
			return new Mconfig(nombre[1], nombre[2], variables, 2);
		}
		tok_esperado = errores[0];
    	return new Mconfig(nombre[1], nombre[2], variables, 1);
	}

	function int_griega(){
		const griega = aplicar_re(re_griega);
		if(!griega) return null;
		var texto = griega[0];
		var simb = griega[1];
		if(sust_símbolos && simb.legth > 1){
				let s = letras_griegas[simb];
				texto.replace(/\S+/u, s);
				simb = s;
		}
		return new Símbolo(texto, simb);
	}

	function int_variables(){
		const vars = [[],[]];
		var s;
		var coma = true; // Para saber si ha salido del primer bucle por que no hay coma o porque no hay varconfig.
		while(s = aplicar_re(re_varconfig)){
			vars[0].push(new VarConfig(s[0], s[1]));
			if(!aplicar_re(re_coma)){
				coma = false;
				break;
			}
		}
		if(coma)
			while(s = int_griega()){
				vars[1].push(Símbolo.a_varsimb(s));
				if(!aplicar_re(re_coma)) break;
			}
		if(!vars[0].length && !vars[1].length) tok_esperado = errores[1];
		return vars;
	}

	function int_símbolo(){
		var s = int_griega();
		if(s) return s;
		s = 
}
	
	function aplicar_re(re){
		re.lastIndex = índice;
		var res = re.exec(texto);
		if(índice < re.lastIndex) índice = re.lastIndex;
		return res;
	}
}

function convertir_línea(texto){
	const df = document.createDocumentFragment();
	const partes = int_línea(texto);
	if(!partes) return null;
	const n = partes.length;
	for(let i=0;i<n;i++){
		let nodos;
		if(typeof partes[i] == "string") nodos = document.createTextNode(partes[i]);
        else nodos = partes[i].obt_nodos();
		df.appendChild(nodos);
	}
	return df;
}
