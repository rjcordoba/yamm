const cont_pizarra = document.querySelector("#pantalla > div:last-child");
const cont_números = document.querySelector("#pantalla > div:first-child");
const sel_clara = document.getElementById("sel_clara");
const sel_oscura = document.getElementById("sel_oscura");
const editor = document.getElementById("editor");

function cambiar_color(){
	if(editor.className == "oscuro"){
		editor.className = "";
		sel_oscura.className = "";
		sel_clara.className = "seleccionado";
		sel_oscura.addEventListener("click", cambiar_color, false);
		sel_clara.removeEventListener("click", cambiar_color, false);
	}
	else{
		editor.className = "oscuro";
		sel_oscura.className = "seleccionado";
		sel_clara.className = "";
		sel_clara.addEventListener("click", cambiar_color, false);
		sel_oscura.removeEventListener("click", cambiar_color, false);
	}		
}

sel_oscura.addEventListener("click", cambiar_color, false);

cont_pizarra.addEventListener("scroll", () => {
	cont_números.scrollTop = cont_pizarra.scrollTop;}, false);
