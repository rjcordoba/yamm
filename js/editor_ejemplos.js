const cont_pizarra = document.querySelector("#pantalla > div:last-child");
const cont_números = document.querySelector("#pantalla > div:first-child");
const sel_clara = document.getElementById("sel_clara");
const sel_oscura = document.getElementById("sel_oscura");
const editor = document.getElementById("editor");
const nums = document.getElementById("nums");

editor.className = "oscuro";
sel_oscura.className = "seleccionado";

function cambiar_color(){
	if(editor.className == "oscuro"){
		editor.className = "claro";
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

sel_clara.addEventListener("click", cambiar_color, false);

cont_pizarra.addEventListener("scroll", () => {
	cont_números.scrollTop = cont_pizarra.scrollTop;}, false);

const lins = cont_pizarra.textContent.split(/\r\n|\r|\n/).length;
const item = document.createElement("li");
for(let i = 1; i < lins; i++){
	var número = item.cloneNode(false);
	número.textContent = i;
	nums.appendChild(número);
}

if(lins > 225){
	document.getElementById("pantalla").style.maxHeight = "85vh";
}

// nums.getElementsByTagName("li")[29].style.pageBreakAfter="always";
