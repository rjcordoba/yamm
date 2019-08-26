/*=======================
*  Tipos
* Acciones: 1
* Mcfinal: 2
* Llave de apertura: 3
* Llave de cierre: 4
* Símbolo not: 5
* Mconfig: 6
**=======================*/

function crear_span(texto, clase){
	var nodo = document.createElement("span");
	nodo.textContent = texto;
	nodo.className = clase;
	return nodo;
}

class Mconfig{
	constructor(nombre, número, variables, paréntesis){
		this.tipo = 6;
		this.nombre = nombre;
		this.número = número;
	 	this.mconfs = variables[0];
		this.simbs = variables[1];
	 	this.paréntesis = paréntesis;
		this.textopar = ")";
	 }

	obt_nodos(){
		const trozos = document.createDocumentFragment();
		var nodo = crear_span(this.nombre, "mcnombre");
		if(this.número){
			let num = document.createElement("sub");
			num.appendChild(document.createTextNode(this.número));
			nodo.appendChild(num);
		}
		if(this.paréntesis) nodo.appendChild(document.createTextNode("("));
		trozos.appendChild(nodo);
		const n = this.mconfs.length;
		if(n){
			trozos.appendChild(this.mconfs[0].obt_nodos());
			for(let i=1; i<n; i++){
				trozos.appendChild(document.createTextNode(","));
				trozos.appendChild(this.mconfs[i].obt_nodos());
			}
		}
		const n2 = this.simbs.length;
		if(n2){
			if(n) trozos.appendChild(document.createTextNode(","));
			trozos.appendChild(this.simbs[0].obt_nodos());
			for(let i=1; i<n2; i++){
				trozos.appendChild(document.createTextNode(","));
				trozos.appendChild(this.simbs[i].obt_nodos());
			}		
		}
		if(this.paréntesis == 2){
			trozos.appendChild(crear_span(this.textopar, "mcnombre"));
		}
		return trozos;
	}
}

class Mcfinal extends Mconfig{
	constructor(nombre, número, variables, paréntesis, textopar){
		super(nombre, número, variables, paréntesis);
		this.textopar = textopar;
		this.tipo = 2;
		this.claseest = "mcfinal"
	}

	obt_nodos(){
		const trozos = document.createDocumentFragment();
		var nodo = crear_span(this.nombre, "mcfinal");
		if(this.número){
			let num = document.createElement("sub");
			num.appendChild(document.createTextNode(this.número));
			nodo.appendChild(num);
		}
		if(this.paréntesis) nodo.appendChild(document.createTextNode("("));
		trozos.appendChild(nodo);
		const n = this.mconfs.length;
		if(n){
			trozos.appendChild(this.mconfs[0].obt_nodos());
			for(let i=1; i<n; i++){
				trozos.appendChild(document.createTextNode(","));
				trozos.appendChild(this.mconfs[i].obt_nodos());
			}
		}
		const n2 = this.simbs.length;
		if(n2){
			trozos.appendChild(document.createTextNode(";"));
			trozos.appendChild(this.simbs[0].obt_nodos());
			for(let i=1; i<n2; i++){
				trozos.appendChild(document.createTextNode(","));
				trozos.appendChild(this.simbs[i].obt_nodos());
			}		
		}
		if(this.paréntesis == 2){
			trozos.appendChild(crear_span(this.textopar, "mcfinal"));
		}
		return trozos;
	}
}

class VarConfig{
	constructor(texto, letra){
		this.texto = texto;
		this.letra = letra;
	}

	obt_nodos(){
		return crear_span(this.texto, "var_mc");
	}
}

class Símbolo{
	constructor(texto, símbolo){
		this.texto = texto;
		this.símbolo = símbolo;
	}

	obt_nodos(){
		return crear_span(this.texto, "simbol");
	}

	static a_varsimb(s){
		return new VarSimb(s.texto, s.símbolo);
	}
}

class VarSimb extends Símbolo{
	constructor(texto, símbolo){
		super(texto, símbolo);
	}

	obt_nodos(){
		return crear_span(this.texto, "var_simb");
	}
}

class SímboloNot{
	constructor(not, simbnot, nor, simbnor){
		this.tipo = 5;
		this.not = not;
		this.simbnot = simbnot;
		this.nor = nor;
		this.simbnor = simbnor;
	}

	obt_nodos(){
		const trozos = document.createDocumentFragment();
		trozos.appendChild(document.createTextNode(this.not));
		if(this.simbnot) trozos.appendChild(this.simbnot.obt_nodos());
		if(this.nor) trozos.appendChild(document.createTextNode(this.nor));
		if(this.simbnor) trozos.appendChild(this.simbnor.obt_nodos());
		return trozos;
	}
}

class Acción{
	constructor(texto, acción){
		this.texto = texto;
		this.acción = acción;
	}

	obt_nodos(){
		return crear_span(this.texto, "akzioa");
	}
}

class Print extends Acción{
	constructor(texto, símbolo){
		super(texto, "P");
		this.símbolo = símbolo;
	}
	obt_nodos(){
		const trozos = document.createDocumentFragment();
		trozos.appendChild(super.obt_nodos());
		if(this.símbolo) trozos.appendChild(this.símbolo.obt_nodos());
		return trozos;
	}
}

class Acciones{
	constructor(acciones){
		this.acciones = acciones;
	}
	obt_nodos(){
		const trozos = document.createDocumentFragment();
		const n = this.acciones.length;
		trozos.appendChild(this.acciones[0].obt_nodos());
		for(let i=1;i<n;i++){
			trozos.appendChild(document.createTextNode(","));
			trozos.appendChild(this.acciones[i].obt_nodos());
		}
		return trozos;
	}
}

class Llave{
	constructor(texto, tipo){
		this.tipo = tipo;
		this.texto = texto;
	}

	obt_nodos(){
		return crear_span(this.texto, "llave");
	}	
}
