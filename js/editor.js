var nave = document.querySelector("textarea");
var $qS = document.querySelector;
var $bId = document.getElementById;
class Editor{
    constructor() {

	const pizarra = document.getElementById("pizarra");
	const cnúmeros = document.querySelector("#pantalla > div:first-child");
	const cont_pizarra = document.querySelector("#pantalla > div:last-child");
	const números = document.getElementById("nums");
	var unum = 1;
	var actual;

	// Inicializar la pizarra
	pizarra.contentEditable = true;
	pizarra.spellcheck = false;
	números.innerHTML = "<li>1</li>";
	pizarra.innerHTML = "<p></p>";
	document.execCommand("defaultParagraphSeparator", false, "p");
	actual = pizarra.firstChild;
	
	// Para actuar cuando se añaden y eliminan líneas.
	const observador = new MutationObserver(e => {
	    // if(e.length == 1)
		if(e[0].addedNodes.length > 0) añadir_num();
		else quitar_nums(e.length);
	console.log(e)});	

	observador.observe(pizarra, {childList: true});

	const num_lista = document.createElement("li");
	function añadir_num(){
	    var el = num_lista.cloneNode();
	    el.textContent = ++unum;
	    números.appendChild(el);
	}

	const primera_línea = document.createElement("p");
	function quitar_nums(tam){
	    for(let i = 0; i < tam; i++){
		unum--;
		números.lastChild.remove();
	    }
	    if(unum == 0){
		pizarra.appendChild(primera_línea);
		document.getSelection().collapse(primera_línea);
	    }
	    actual = buscar_p(document.getSelection().anchorNode);
	    console.log(document.getSelection());
	}

	function buscar_p(elem){
	    var e = elem;
	    while(e.nodeName != "P") e = e.parentNode;
	    return e;
	}
	
	// Para que los números de línea hagan scroll con la pizarra.
	cont_pizarra.addEventListener("scroll", () => {
	    cnúmeros.scrollTop = cont_pizarra.scrollTop;}, false);

	pizarra.addEventListener("cut", () => {
	    console.log("cuuuut");}, false);
	    
	pizarra.addEventListener("paste", e => {
	    e.preventDefault();
	    // if()
	    console.log("paaaaaaaaaaste");}, false);
	    



pizarra.addEventListener('insert', function (e) {console.log("lalala") }, false);



    }
}

var editor = new Editor;
