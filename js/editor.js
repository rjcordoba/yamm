var nave = document.querySelector("textarea");

const pizarra = document.getElementById("pizarra");
const cont_números = document.querySelector("#pantalla > div:first-child");
const cont_pizarra = document.querySelector("#pantalla > div:last-child");
const números = document.getElementById("nums");
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
new MutationObserver(lerroak => {console.log(lerroak);
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
	 pizarra.removeEventListener("input", metido_char, false);
	 const texto = t.getData("text").replace(/[\t\v\f]/g, " ").split(/\r\n|\r|\n/);
	 const cantidad =texto.length;
	 document.execCommand("insertText", false, texto[0]);
	 for(let i=1; i<cantidad; i++){
		  document.execCommand("insertParagraph", false);
		  document.execCommand("insertText", false, texto[i]);
	 }
	 pizarra.addEventListener("input", metido_char, false);
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

 //  document.querySelector("main section:last-child").addEventListener("mouseup", e => {
 //  	  pul = true; línea_actual = pizarra.lastChild; console.log(línea_actual,"section");}, false);
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



{let pintro = false, pback = false;

 function metido_char(e){
	 if(pintro){
		 
		 var ll = convertir_línea(línea_actual.textContent);
		 línea_actual.replaceChild(ll, línea_actual.firstChild);console.log(ll);}
	 //Comprobar si hay error y si lo hay poner marca roja en la línea.
	  //const texto_línea = línea_actual.textContent;
	  if(pback) poner_actual();//return;
 } 

 pizarra.addEventListener("keydown", e => {
	  switch (e.key){
	  case "Enter":
			if(e.shiftKey) e.preventDefault();
			else pintro = true;
			break;
	  case "Backspace":
			pback = true;break;
	  case "U+000A": e.preventDefault();
	  }
 }, false);

 pizarra.addEventListener("input", metido_char, false);

 pizarra.addEventListener("keyup", e => {
	  if(e.key.indexOf("Arrow") != -1) {poner_actual();}
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
				 //Comprobar si hay que indentar la línea. La línea anterior la analiza en input.
				 break;
			case "Backspace":
				 pback = false;
				 break;					 
			}

 });
}
