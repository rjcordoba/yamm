var nave = document.querySelector("textarea");
var $qS = document.querySelector;
var $bId = document.getElementById;
class Editor{
    constructor() {
	document.execCommand("defaultParagraphSeparator", false, "p");

	const pizarra = document.getElementById("pizarra");
	const cnúmeros = document.querySelector("#pantalla > div:first-child");
	const cpizarra = document.querySelector("#pantalla > div:last-child");
	const números = document.getElementById("nums");
	var unum = 1;
	
	pizarra.contentEditable = true;
	pizarra.spellcheck = false;
	números.innerHTML = "<li>1</li>";
	pizarra.innerHTML = "<p></p>";

	const observador = new MutationObserver(e => {
	    if(e.length == 1)
		if(e[0].addedNodes.length > 0) añadir_num();
		else quitar_num();
	console.log(e)});	

	observador.observe(pizarra, {childList: true});

	cpizarra.addEventListener("scroll", () => {
	    cnúmeros.scrollTop = cpizarra.scrollTop; console.log(cpizarra.scrollTop, cnúmeros.scrollTop);}, false);

	const num_lista = document.createElement("li");
	function añadir_num(){
	    var el = num_lista.cloneNode();
	    el.textContent = ++unum;
	    números.appendChild(el);
	}
	function quitar_num(){
	    if(unum == 1) pizarra.innerHTML = "<p></p>";
	    else{
		unum--;
		números.lastChild.remove();
	    }
	}

    }

	//this.iniciar_pantalla();

	/*piz.addEventListener("click", e => {
	    this.probar()}, false);

	piz.addEventListener("cut", e => {
	    console.log("cut")}, false);

	piz.addEventListener("focus", e => {
	    console.log("focus")}, false);
	
	piz.addEventListener("select", e => {
	    console.log(e)}, false);*/

	/*piz.addEventListener("mousedown", e => {
	     console.log(e)}, false);*/

/*    iniciar_pantalla(){
	this.pizarra.innerHTML = "<p></p>";
	this.números.innerHTML = "<li>1</li>"
    }*/
    //probar(){console.log("lalala");}

}

var editor = new Editor;
