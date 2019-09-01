/*=======================
*  Tipos
* Símbolo: 1
* Símbolo not: 2
* Mcfinal: 3
* Acciones: 4
* Mconfig: 5
* Llave de apertura: 6
* Llave de cierre: 7
* Comentario: 8
* VarConfig: 9
**=======================*/

function crear_span(texto, clase){
	var nodo = document.createElement("span");
	nodo.textContent = texto;
	nodo.className = clase;
	return nodo;
}

var coma_sep = ",";
var pcoma_sep = ";";

class Mconfig{
	constructor(nombre, número, variables, paréntesis){
		this.tipo = 5;
		this.nombre = nombre;
		this.número = número;
	 	this.mconfs = variables[0];
		this.simbs = variables[1];
	 	this.paréntesis = paréntesis;
		this.textopar = ")";
	}

	obt_nodos(){
		const trozos = document.createDocumentFragment();
		trozos.appendChild(crear_span(this.nombre, "mcnombre"));
		if(this.número){
			let num = document.createElement("sub");
			num.appendChild(document.createTextNode(this.número));
			num.className = "mcnombre";
			trozos.appendChild(num);
		}
		if(this.paréntesis) trozos.appendChild(crear_span("(", "mcnombre"));
		const n = this.mconfs.length;
		if(n){
			trozos.appendChild(this.mconfs[0].obt_nodos());
			for(let i=1; i<n; i++){
				trozos.appendChild(document.createTextNode(coma_sep));
				trozos.appendChild(this.mconfs[i].obt_nodos());
			}
		}
		const n2 = this.simbs.length;
		if(n2){
			if(n) trozos.appendChild(document.createTextNode(coma_sep));
			trozos.appendChild(this.simbs[0].obt_nodos());
			for(let i=1; i<n2; i++){
				trozos.appendChild(document.createTextNode(coma_sep));
				trozos.appendChild(this.simbs[i].obt_nodos());
			}		
		}
		if(this.paréntesis == 2){
			trozos.appendChild(crear_span(this.textopar, "mcnombre"));
		}
		return trozos;
	}

	limpiar(){
		this.nombre = this.nombre.trim();
		var n = this.mconfs.length;
		for(let i=0; i<n; i++){
			this.mconfs[i] = this.mconfs[i].limpiar();
		}
		n = this.simbs.length;
		for(let i=0; i<n; i++){
			this.simbs[i] = this.simbs[i].limpiar();
		}
		if(this.textopar) this.textopar = this.textopar.trim();
		return this;
	}
}

class Mcfinal extends Mconfig{
	constructor(nombre, número, variables, paréntesis, textopar){
		super(nombre, número, variables, paréntesis);
		this.textopar = textopar;
		this.tipo = 3;
		this.claseest = "mcfinal"
	}

	obt_nodos(){
		const trozos = document.createDocumentFragment();
		trozos.appendChild(crear_span(this.nombre, "mcfinal"));
		if(this.número){
			let num = document.createElement("sub");
			num.appendChild(document.createTextNode(this.número));
			num.className = "mcfinal";
			trozos.appendChild(num);
		}
		if(!this.paréntesis && this.textopar){//Los espacios que hay detrás se guardan en textopar para no crear otro atributo en el objeto.
			trozos.appendChild(document.createTextNode(this.textopar));
			return trozos;
		}
		if(this.paréntesis) trozos.appendChild(crear_span("(", "mcfinal"));
		const n = this.mconfs.length;
		if(n){
			trozos.appendChild(this.mconfs[0].obt_nodos());
			for(let i=1; i<n; i++){
				trozos.appendChild(document.createTextNode(coma_sep));
				trozos.appendChild(this.mconfs[i].obt_nodos());
			}
		}
		const n2 = this.simbs.length;
		if(n2){
			trozos.appendChild(document.createTextNode(pcoma_sep));
			trozos.appendChild(this.simbs[0].obt_nodos());
			for(let i=1; i<n2; i++){
				trozos.appendChild(document.createTextNode(coma_sep));
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
		this.tipo = 9;
		this.texto = texto;
		this.letra = letra;
	}

	obt_nodos(){
		return crear_span(this.texto, "var_mc");
	}

	limpiar(){
		this.texto = this.letra;
		return this;
	}
}

class Símbolo{
	constructor(texto, símbolo){
		this.tipo = 1;
		this.texto = texto;
		this.símbolo = símbolo;
	}

	obt_nodos(){
		return crear_span(this.texto, "simbol");
	}

	limpiar(){
		this.texto = this.símbolo;
		return this;
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
		this.tipo = 2;
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

	limpiar(){
		this.not = `${this.not.trim()} `;
		if(this.nor) this.nor = ` ${this.nor.trim()} `;
		if(this.simbnot) this.simbnot = this.simbnot.limpiar();
		if(this.simbnor) this.simbnor = this.simbnor.limpiar();
		return this;
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

	limpiar(){
		this.texto = this.acción;
		return this;
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

	limpiar(){
		this.texto = this.acción;
		if(this.símbolo) this.símbolo = this.símbolo.limpiar();
		return this;
	}
}

class Acciones{
	constructor(acciones){
		this.tipo = 4;
		this.acciones = acciones;
	}
	obt_nodos(){
		const trozos = document.createDocumentFragment();
		const n = this.acciones.length;
		trozos.appendChild(this.acciones[0].obt_nodos());
		for(let i=1;i<n;i++){
			trozos.appendChild(document.createTextNode(coma_sep));
			trozos.appendChild(this.acciones[i].obt_nodos());
		}
		return trozos;
	}

	limpiar(){
		const n = this.acciones.length;
		for(let i=0; i<n; i++){
			this.acciones[i] = this.acciones[i].limpiar();
		}
		return this;
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

	limpiar(){
		this.texto = this.texto.trim();
		return this;
	}
}

class Comentario{
	constructor(texto){
		this.tipo = 8;
		this.texto = texto;
	}

	obt_nodos(){
		return crear_span(this.texto, "comentario");
	}
	limpiar(){
		return this;
	}
}
