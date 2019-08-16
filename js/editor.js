var nave = document.querySelector("textarea");
var $qS = document.querySelector;
var $bId = document.getElementById;
class Editor{
    constructor() {

	const pizarra = document.getElementById("pizarra");
	const cont_números = document.querySelector("#pantalla > div:first-child");
	const cont_pizarra = document.querySelector("#pantalla > div:last-child");
	const números = document.getElementById("nums");
	var unum = 1;
	var línea_actual;

	/*============================
	 *  Inicializar la pizarra
	 *============================*/
	pizarra.contentEditable = true;
	pizarra.spellcheck = false;
	números.innerHTML = "<li>1</li>";
	pizarra.innerHTML = "<p></p>";
	document.execCommand("defaultParagraphSeparator", false, "p");
	línea_actual = pizarra.firstChild;
	
	/*====================
	 *  Observador
	 *====================*/
	// var pend_pegar = null;
	const primera_línea = document.createElement("p");
	const num_lista = document.createElement("li");
	new MutationObserver(lerroak => {
		 console.log(lerroak);
		 // const tam = e.length;
		 lerroak.forEach(e => {
			  if(e.addedNodes.length > 0){
					var el = num_lista.cloneNode();
					el.textContent = ++unum;
					números.appendChild(el);
			  }
			  else{
					unum--;
					números.lastChild.remove();
					// }
					if(unum == 0){
						 pizarra.appendChild(primera_línea);
						 document.getSelection().collapse(primera_línea);
					}
			  }
			  poner_actual();
			  // 		for(let i = 0; i < tam; i++){
			  // if(e[i].addedNodes.length > 0) añadir_num();
			  // else{
			  // 	  quitar_nums(e.length);
			  // 	  poner_actual();
			  // 	  if(pend_pegar){
			  // 			pend_pegar();
			  // 			pend_pegar = null;
			  // 	  }
			  //		 }
		 });
	}).observe(pizarra, {childList: true});

	// const num_lista = document.createElement("li");
	// function añadir_num(){
	//     // for(let i = 0; i < tam; i++){
	// 	var el = num_lista.cloneNode();
	// 	el.textContent = ++unum;
	// 	números.appendChild(el);
	//   //  }
	// }


	// function quitar_num(){
	// 	 // for(let i = 0; i < tam; i++){
	// 		  unum--;
	// 		  números.lastChild.remove();
	//     // }
	//     if(unum == 0){
	// 		  pizarra.appendChild(primera_línea);
	// 		  document.getSelection().collapse(primera_línea);
	//     }
	// }

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
	
	// Para que los números de línea hagan scroll con la pizarra.
	cont_pizarra.addEventListener("scroll", () => {
	    cont_números.scrollTop = cont_pizarra.scrollTop;}, false);

	{let pul = false;
	pizarra.addEventListener("focus", () => {
		 if(!pul) línea_actual = primera_línea;console.log(línea_actual,"focus");}, false);

	pizarra.addEventListener("mousedown", () => {
		 pul = true;console.log(línea_actual,"down");}, false);
		  
	pizarra.addEventListener("mouseup", e => {
		 if(e.target == pizarra) línea_actual = pizarra.lastChild;
		 else línea_actual = buscar_p(e.target);e.stopPropagation();console.log(línea_actual,"up");}, false);

	 pizarra.addEventListener("blur", () => {
	     pul = false;console.log(línea_actual,"blur");}, false);

	 document.querySelector("main section:last-child").addEventListener("mouseup", e => {
		  pul = true; línea_actual = pizarra.lastChild; console.log(línea_actual,"section");}, false);
   }

	// pizarra.addEventListener("cut", () => {
	//     console.log("cuuuut");}, false);

	// nave.onpaste = () => console.log("en textarea..........");

	pizarra.addEventListener("paste", e => {
	    e.preventDefault();
	    var texto = (e.clipboardData || window.clipboardData).getData("text").replace(/[\t\v\f]/g, " ").split(/\r\n|\r|\n/);
	    var selección = document.getSelection();
	    // if(selección.type == "Range"){
	    // 	  document.execCommand("delete", false);
		 // }
		// if(selección.getRangeAt(0).commonAncestorContainer == pizarra)
		//     pend_pegar = pegar;

		// else pegar();
	   //  }
	   //  else pegar();
//	    function pegar(){
		document.execCommand("insertText", false, texto[0]);
		var cantidad =texto.length;

			  console.log(cantidad);//<----------------------------

		for(let i=1; i<cantidad; i++){
		    document.execCommand("insertParagraph", false);
			 // poner_actual();
		    // let rango = document.createRange();
		    // rango.selectNode(línea_actual);
		    // rango.collapse(true);
		    // selección.removeAllRanges();
		    // selección.addRange(rango);
		    document.execCommand("insertText", false, texto[i]);
		}
//		línea_actual = la;
//	    }
	});

//pizarra.addEventListener('insert', function (e) {console.log("lalala") }, false);



   }
}

var editor = new Editor;
