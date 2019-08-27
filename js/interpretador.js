const re_blancos = /\s/yug
     ,re_noblancos = /\S\S/yug
     ,re_coma = /,/yg
     ,re_puntocoma = /;/yug
     ,re_nor = /\s*nor\s/yug
     ,re_símbolo = /\s*(Any|None|not|::|sw|(?:\u0305|-)(?:0|1)|\.\.\.|\S)\s*/yug
     ,re_nosimb = /Any|None|\.\.\./
     ,re_griega = /\s*(?:[\u0381-\u03c9]|(alpha|alfa|beta|gamma|delta|(?:e|é)psilon|(?:ds|z|th)?eta|iota|kappa|lambda|m(?:i|u)|n(?:u|i)|(?:ó|o)micron|rho|sigma|tau|(?:ú|i)psilon|(?:ph|f|ch|j|ps|x|p)i|omega))\s*/yug
     ,re_acción = /\s*(?:(R|L|E)\s*|(P))/yug
     ,re_mconfig = /([a-zñáéíóú](?:[a-zA-ZñÑáéíóúÁÉÍÓÚ])*(?:'|’)*)(\d*)(\()?/yug
     ,re_mcfinal = /(\s*[a-zñáéíóú](?:[a-zA-ZñÑáéíóúÁÉÍÓÚ])*(?:'|’)*)(\d*)(\()?/yug
     ,re_paréntesis = /\)\s*/yug
     ,re_cualquiera = /\s*(\S+)/yug
     ,re_varconfig = /\s*([A-ZÄÖÜ\uẞ])\s*/yg
;

const letras_griegas = {alfa:'\u03b1', alpha:'\u03b1', beta:'\u03b2', gamma:'\u03b3', delta:'\u03b4', epsilon:'\u03b5', épsilon:'\u03b5',
						zeta:'\u03b6', dseta:'\u03b6', eta:'\u03b7', theta:'\u03b8', iota:'\u03b9', kappa:'\u03ba', lambda:'\u03bb', mu:'\u03bc',
						mi:'\u03bc', nu:'\u03bd', ni:'\u03bd', xi:'\u03be',  ómicron:'\u03bf', omicron:'\u03bf', pi:'\u03c0', rho:'\u03c1',
						sigma:'\u03c3', tau:'\u03c4', úpsilon:'\u03c5', ipsilon:'\u03c5', fi:'\u03c6', phi:'\u03c6', ji:'\u03c7',
						chi: '\u03c7', psi: '\u03c8', omega: '\u03c9'};


const errores = [/*0*/"fin de lista de variables", /*1*/"variables en m-function", /*2*/"final de línea", /*3*/"m-function o espacio y símbolo"
	,/*4*/"símbolo o llave de apertura", /*5*/"acciones o m-configuration final",/*6*/"símbolo",/*7*/"símbolo para imprimir"
	,/*8*/"variable después de coma o fin de lista",/*9*/"acción después de coma o fin de lista",/*10*/"algún símbolo después de ;"
    ,/*11*/"mconfiguration o principio de lista de símbolos"];

//Opción para convertir los símbolos en las letras griegas.
var sust_símbolos = false;

//Variable global que se pone cuando se detecta un error en la línea.
var tok_esperado;
var tok_error;

//Si hay espacios es una línea que empieza con símbolo y se llama a la función correspondiente; si no, empieza por mconfiguración.
function int_línea(texto){
	const partes = [];
	var índice = 0;
	tok_esperado = null;
	tok_error = null;
	
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

	var ult_token;

	tok_error = tok_error? tok_error : ((ult_token = aplicar_re(re_cualquiera))? ult_token[1] : "");
	// tok_error = ult_token? () ult_token[1] : "";
	if(tok_error && !tok_esperado) tok_esperado = errores[2];
	const resto = tok_error + texto.slice(índice);
	if(resto) partes.push(resto);
	return partes;

	function emp_mconfig(){
		const mconf = int_mconfig();
		if(!mconf) return;
		partes.push(mconf);
		if(tok_esperado) return;
		const sig = int_símbolo();
		if(!sig){
			tok_esperado = errores[4];
			return;
		}
		partes.push(sig);
		const acc_mconf = int_am();
		if(acc_mconf) return; //Se puede seguir parseando.
		if(sig.símbolo == "{"){ //No se puede seguir parseando pero si lo que se coge como símbolo es llave también es correcto.
			partes.pop(); // Se quita el simbolo que se había metido y se interpreta como llave,
			partes.push(new Llave(sig.texto, 5));
			return;
		}
		tok_esperado = errores[5];
	}

	function emp_símbolo(){
		const simb = int_símbolo();
		if(!simb){
			tok_esperado = errores[6];
			return;
		}
		re_noblancos.lastIndex = índice - 1;
		if(re_noblancos.test(texto)){
			tok_error = simb.texto;
			tok_esperado = errores[6];
			return;
		}
		partes.push(simb);
		int_am();
	}
	
	/*Devuelve un objeto. Primer parámetro el nombre del mconfig; segundo si acaba en número, para poder ponerlo como subíndice; tercero las variables; cuarto indica si
	se ha termido de leer o lee parte.*/
	function int_mconfig(){
		var nombre = aplicar_re(re_mconfig);
		if(!nombre){
			tok_esperado = errores[3];
			return null;
		}
		if(!nombre[3]){
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
l
	function int_griega(){
		const griega = aplicar_re(re_griega);
		if(!griega) return null;
		var texto = griega[0];
		var simb = griega[1];
		if(simb && sust_símbolos){
				simb = letras_griegas[simb];
				texto = texto.replace(/\S+/, simb);
		}
		return new Símbolo(texto, simb);
	}

	function int_variables(){
		const vars = [[],[]];
		var s;
		var coma = false; // Para saber si ha salido del primer bucle por que no hay coma o por que no hay varconfig.
		while(s = aplicar_re(re_varconfig)){
			coma = false;
			vars[0].push(new VarConfig(s[0], s[1]));
			if(!aplicar_re(re_coma)){
				coma = false;
				break;
			}
			else coma = true;
		}
		if(coma)
			while(s = int_griega()){
				coma = false;
				vars[1].push(Símbolo.a_varsimb(s));
				if(!aplicar_re(re_coma)){
					coma = false;
					break;
				}
				else coma = true;
			}
		if(coma){
			tok_error = ",";
			tok_esperado = errores[8];
		}

		if(!vars[0].length && !vars[1].length) tok_esperado = errores[1];
		return vars;
	}

	{let re_compn = /\s*not/gy;
	 function sig_not(){
		 re_compn.lastIndex = índice;
		 return re_compn.test(texto);
	 }
	}

	function int_not(n){
		if(sig_not){
			tok_esperado = errores[6];
			return new SímboloNot(n, null, null, null);
		}
		var s = int_símbolo();
		if(!s){
			tok_esperado = errores[6];
			return new SímboloNot(n, null, null, null);
		}
		const nor = aplicar_re(re_nor);
		if(!nor) return new SímboloNot(n, s, null, null);
		if(sig_not){
			tok_esperado = errores[6];
			return new SímboloNot(n, s, nor, null);
		}
		const s2 = int_símbolo();
		if(s2) return new SímboloNot(n, s, nor, s2);
		tok_esperado = errores[6];
		return new SímboloNot(n, s, nor, null);
	}

	function int_símbolo(){
		var s = int_griega();
		if(s) return s;
		s = aplicar_re(re_símbolo);
		if(!s) return null;
		if(s[1] == "not") return int_not(s[0]); //Meto el not para guardar los espacios que hubiera antes.
		var texto = s[0];
		var simb = s[1];
		if(sust_símbolos){
			if(simb == "sw"){
				texto = texto.replace(/sw/, "\u0259");
				simb = "\u0259";
			}
			else if(simb[0] == "-"){
				let rp = "\u0305" + simb[1];
				texto = texto.replace(/-\d/, rp);
				simb = rp;
			}
		}
		return new Símbolo(texto, simb);
	}

	function int_am(){
		const acciones = int_acciones();
		if(acciones) partes.push(new Acciones(acciones));
		if(tok_esperado) return true; //Sería porque la lista de acciones acaba en coma. Si sólo hay una coma el error se detecta más adelante. Si ocurre al menos hay una acción; por eso se devuelve true;
		const mcfinal = int_mcfinal();
		if(mcfinal){
			partes.push(mcfinal);
			return true;
		}
		if(!acciones){
			tok_esperado = errores[5];
			return false; //No hay ni acciones ni mcfinal, con lo que se devuelve false para indicar que no se puede parsear
		}
	}

	function int_acciones(){
		const acciones = [];
		var a;
		var coma;
		while(a = aplicar_re(re_acción)){
			coma = false;
			if(a[2]){ //Si es P(si no el tercer paréntesis será undefined).
				let s = int_símbolo();
				if(s && s.tipo == 5) s = null;
				acciones.push(new Print(a[0], s));
				if(!s){
					tok_esperado = errores[7];
					return acciones;
				}
			}
			else acciones.push(new Acción(a[0], a[1]));
			if(!aplicar_re(re_coma)) break;
			else coma = true;
		}

		if(coma){
			tok_error = ",";
			tok_esperado = errores[9];
		}

		if(!acciones.length) return null;
		return acciones;
	}

	function int_mcfinal(){
		var punto_coma = false;
		const args = [[],[]];
		const nombre = aplicar_re(re_mcfinal);
		if(!nombre) return null;
		if(!nombre[3]) return new Mcfinal(nombre[1], nombre[2], args, 0);
		var v, s, par_cierre;
		var coma;
		while(v = int_mcfinal()){
			coma = false;
			args[0].push(v);
			if(tok_esperado) return new Mcfinal(nombre[1], nombre[2], args, 1);
			if(!aplicar_re(re_coma))break;
			else coma = true;
		}
		
		if(coma){
			tok_error = ",";
			tok_esperado = errores[11];
			return new Mcfinal(nombre[1], nombre[2], args, 1);
		}
		
		if(aplicar_re(re_puntocoma)){
			punto_coma = true;
			
			while(s = int_símbolo()){
				coma = false;
				if(s.not || re_nosimb.test(s.símbolo)){
					tok_esperado = errores[6];
					return new Mcfinal(nombre[1], nombre[2], args, 1);
				}
				args[1].push(s);
				if(!aplicar_re(re_coma)) break;
				else coma = true;
			}
		}

		if(coma){
			tok_error = ",";
			tok_esperado = errores[8];
			return new Mcfinal(nombre[1], nombre[2], args, 1);
		}

		if(punto_coma && !args[1].length){
			tok_esperado = errores[10];
			tok_error = ";"
			return new Mcfinal(nombre[1], nombre[2], args, 1);
		}
		if(par_cierre = aplicar_re(re_paréntesis)){
			if(!args[0].length && !args[1].length){
				tok_error = par_cierre[0];
				return new Mcfinal(nombre[1], nombre[2], args, 1);
			}
			return new Mcfinal(nombre[1], nombre[2], args, 2, par_cierre);
		}
		tok_esperado = errores[0];
		return new Mcfinal(nombre[1], nombre[2], args, 1);
	}

	function aplicar_re(re){
		re.lastIndex = índice;
		var res = re.exec(texto);
		if(índice < re.lastIndex) índice = re.lastIndex;
		return res;
	}
}

/*=============================================================  
 * Devuelve la linea interpretada para ser metida en el editor
 *=============================================================*/

function convertir_línea(texto){
	const df = document.createDocumentFragment();
	const partes = int_línea(texto);
	if(!partes) return document.createTextNode("");
	const n = partes.length;
	for(let i=0;i<n;i++){
		let nodos;
		if(typeof partes[i] == "string") nodos = document.createTextNode(partes[i]);
        else nodos = partes[i].obt_nodos();
		df.appendChild(nodos);
	}
	return df;
}
