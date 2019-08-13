var nave = document.querySelector("textarea");
var $qS = document.querySelector;
var $bId = document.getElementById;
class Editor{
    constructor() {

	const pizarra = document.getElementById("pizarra");
	const cnúmeros = document.querySelector("#pantalla > div:first-child");
	const cpizarra = document.querySelector("#pantalla > div:last-child");
	const números = document.getElementById("nums");
	var unum = 1;

	// Inicializar la pizarra
	pizarra.contentEditable = true;
	pizarra.spellcheck = false;
	números.innerHTML = "<li>1</li>";
	pizarra.innerHTML = "<p></p>";
	document.execCommand("defaultParagraphSeparator", false, "p");
	
	const observador = new MutationObserver(e => {
	    if(e.length == 1)
		if(e[0].addedNodes.length > 0) añadir_num();
		else quitar_num();
	console.log(e)});	

	observador.observe(pizarra, {childList: true});

	cpizarra.addEventListener("scroll", () => {
	    cnúmeros.scrollTop = cpizarra.scrollTop;}, false);

	const num_lista = document.createElement("li");
	function añadir_num(){
	    var el = num_lista.cloneNode();
	    el.textContent = ++unum;
	    números.appendChild(el);
	}

	const pclick = new MouseEvent('click');
	const primera_línea = document.createElement("p");
	primera_línea.addEventListener("click", (e) => {
	    console.log(e);}, false);
	function quitar_num(){
	    unum--;
	    números.lastChild.remove();
	    if(unum == 0){
		pizarra.appendChild(primera_línea);
		document.getSelection().collapse(primera_línea);
	    }
	}



pizarra.addEventListener('insert', function (e) {console.log("lalala") }, false);



    }
}

var editor = new Editor;
