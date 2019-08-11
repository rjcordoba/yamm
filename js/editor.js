var nave = document.querySelector("textarea");
var $qS = document.querySelector;

class Editor{
    constructor() {
	document.execCommand("defaultParagraphSeparator", false, "p");

	var pizarra = document.querySelector("#editor [contenteditable]");
	var números = document.querySelector("#pantalla ul");
	var unum;
	this.pizarra = pizarra;
	this.números = números;
	//this.primera = piz.firstChild;
	//this.mdown = null;
	//this.mup = null;
	//this.actual = null;
	
	números.innerHTML = "<li>1</li>";
	(function iniciar_pantalla(){
	    pizarra.innerHTML = "<p></p>";
	    unum = números.firstChild;
	}())
	var observador = new MutationObserver(e => {
	    console.log(e);});	
	observador.observe(pizarra, {childList: true});
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
    }

/*    iniciar_pantalla(){
	this.pizarra.innerHTML = "<p></p>";
	this.números.innerHTML = "<li>1</li>"
    }*/
    //probar(){console.log("lalala");}

}

var editor = new Editor;
