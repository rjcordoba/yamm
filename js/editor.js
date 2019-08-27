var nave = document.querySelector("textarea");

const pizarra = document.getElementById("pizarra");
const cont_números = document.querySelector("#pantalla > div:first-child");
const cont_pizarra = document.querySelector("#pantalla > div:last-child");
const números = document.getElementById("nums");
const minib = document.getElementById("minib");
var unum = 1;
var línea_actual;

/*============================
 *  Inicializar la pizarra
 *============================*/

const primera_línea = document.createElement("p");
números.innerHTML = "<li>1</li>";
pizarra.contentEditable = true;
pizarra.spellcheck = false;
pizarra.appendChild(primera_línea);
document.execCommand("defaultParagraphSeparator", false, "p");
línea_actual = pizarra.firstChild;

/*====================
 *  Observador
 *====================*/

const num_lista = document.createElement("li");
new MutationObserver(lerroak => {console.log(lerroak);//<-----------------------------------------
	 lerroak.forEach(e => {
		 if(e.addedNodes.length > 0){
			 var el = num_lista.cloneNode();
			 el.textContent = ++unum;
			 números.appendChild(el);
		 }
		 else{
			 unum--;
			 números.lastChild.remove();
			 if(unum == 0){
				 pizarra.appendChild(primera_línea);
				 document.getSelection().collapse(primera_línea);
			 }
		 }
		 poner_actual();
	 });
}).observe(pizarra, {childList: true});

function buscar_p(e){
	 var e = document.getSelection().anchorNode;
	 while(e.nodeName != "P") e = e.parentNode;
	 return e;	    
}

function poner_actual(){
	 línea_actual = buscar_p(document.getSelection().anchorNode);
}

/*====================
 *  Manejadores
 *====================*/

function poner_texto(t){
	 pizarra.removeEventListener("input", interp_línea, false);
	 const texto = t.getData("text").replace(/[\t\v\f]/g, " ").split(/\r\n|\r|\n/);
	 const cantidad =texto.length;
	 document.execCommand("insertText", false, texto[0]);
	 for(let i=1; i<cantidad; i++){
		  document.execCommand("insertParagraph", false);
		  document.execCommand("insertText", false, texto[i]);
	 }
	 pizarra.addEventListener("input", interp_línea, false);
}

//	Para que los números de línea hagan scroll con la pizarra.
cont_pizarra.addEventListener("scroll", () => {
	 cont_números.scrollTop = cont_pizarra.scrollTop;}, false);

{let pul = false;
 pizarra.addEventListener("focus", () => {
	  if(!pul) línea_actual = primera_línea;}, false);

 pizarra.addEventListener("mousedown", () => {
	  pul = true;}, false);

 pizarra.addEventListener("mouseup", e => {
	  if(e.target == pizarra) línea_actual = pizarra.lastChild;
	  else línea_actual = buscar_p(e.target);e.stopPropagation();}, false);

 pizarra.addEventListener("blur", () => {
	  pul = false;}, false);
}

pizarra.addEventListener("paste", e => {
	 e.preventDefault();
	 poner_texto(e.clipboardData || window.clipboardData);}, false);

pizarra.addEventListener("dragover", e => {
	 e.preventDefault();}, false);

cont_pizarra.addEventListener("drop", e => {
	 e.preventDefault();
	 pizarra.focus();
	 poner_texto(e.dataTransfer);}, false);

function quitar_mensaje(){
	minib.innerHTML = "";
	pizarra.removeEventListener("input", quitar_mensaje, false);
}

{let pintro = false, pret = false;

 function pos_caret(){
	 const sel = document.getSelection();
	 const el = sel.anchorNode;
	 // const offs = sel.anchorOffset;
	 var cont = 0;
	 chars_antes(línea_actual.firstChild);
	 return cont + sel.anchorOffset;

	 function chars_antes(nod){
		 if(nod == el){
			 encontrado = true;
			 return;
		 }
		 if(nod.nodeType == 3) cont += nod.textContent.length;
		 else chars_antes(nod.firstChild);
		 if(!encontrado && nod.nextSibling) chars_antes(nod.nextSibling);
	 }
 }

 function poner_caret(pos){
	 var rec = línea_actual.firstChild;
	 var pos_act = rec.textContent.length;
	 var pos_ant = 0;
	 while(pos_act < pos){
		 rec = rec.nextSibling;
		 pos_ant = pos_act;
		 pos_act += rec.textContent.length;
	 }
	 document.getSelection().collapse(rec.firstChild? rec.firstChild : rec, pos - pos_ant);
 }

 function interp_línea(e){

	 console.time("Int. línea");	
	 
	 
	 var ll = convertir_línea(línea_actual.textContent);
	 línea_actual.innerHTML = "";
	 línea_actual.appendChild(ll);
	 if(tok_esperado && pintro){
		 minib.textContent = `Error\nEsperado: ${tok_esperado}.\nEncontrado: ${tok_error}`;
		 pizarra.addEventListener("input", quitar_mensaje, false);
	 }	 
	 
	 console.timeEnd("Int. línea");

 }

 pizarra.addEventListener("keydown", e => {
 	switch (e.key){
 	case "Enter":
 		if(e.shiftKey) e.preventDefault();
 		else pintro = true;
 		break;
	case "Backspace":
		pret = true;
		break;
 	case "U+000A": e.preventDefault();
 	case "Tab":
 		e.preventDefault();
 		interp_línea();
 	}
 }, false);

 function introducido(){
	 if(pret) return;
	 if(pintro){
		 sust_símbolos = true;
		 interp_línea();
		 sust_símbolos = false;
	 }
	 else{
		 const caret = pos_caret();
		 interp_línea();
		 poner_caret(caret);
	 }
 }

 pizarra.addEventListener("input", introducido, false);

 pizarra.addEventListener("keyup", e => {
	 if(e.key.indexOf("Arrow") != -1) poner_actual();
	 else
		 switch (e.key){
		 case "PageDown":
			 línea_actual = pizarra.lastChild;
			 break;
		 case "PageUp":
			 línea_actual = primera_línea;
			 break;
		 case "Enter":
			 pintro = false;
			 línea_actual.textContent = línea_actual.textContent;
			 break;
		 case "Backspace":
			 pret = false;
			 poner_actual();
			 break;					 
		 }
 });
}
