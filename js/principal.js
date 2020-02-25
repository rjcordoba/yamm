// const cont_pizarra = document.querySelector("#pantalla > div:last-child");
const lista_macros = document.querySelector("macros_nums ul");
const ext_macros = document.getElementById("ext_macros");
const macros_nums = document.getElementById("macros_nums");
const panel = document.getElementById("nav_resp");
const hamb = document.getElementById("men-hamburguesa");
const texto_hamb = hamb.getElementsByTagName("span")[0];
const b = document.body;
const flechas = document.getElementById("scroll_gen");

// editor.className = "oscuro";
// sel_oscura.className = "seleccionado";

// function cambiar_color(){
// 	if(editor.className == "oscuro"){
// 		editor.className = "claro";
// 		sel_oscura.className = "";
// 		sel_clara.className = "seleccionado";
// 		sel_oscura.addEventListener("click", cambiar_color, false);
// 		sel_clara.removeEventListener("click", cambiar_color, false);
// 	}
// 	else{
// 		editor.className = "oscuro";
// 		sel_oscura.className = "seleccionado";
// 		sel_clara.className = "";
// 		sel_clara.addEventListener("click", cambiar_color, false);
// 		sel_oscura.removeEventListener("click", cambiar_color, false);
// 	}		
// }

hamb.addEventListener("click", () => {
	b.classList.toggle("panel-menu");
	if(b.classList.contains == "panel-menu") texto_hamb.textContent = "Menú";
	else texto_hamb.textContent = "Cerrar";
}, false);

ext_macros.addEventListener("click", () => {macros_nums.classList.toggle("extendido");}, false);

flechas.style.display = "none";

window.addEventListener("scroll", () => {
	if(window.scrollY > 100){
		flechas.style.display = "block";
	}
}, false);

// const lins = cont_pizarra.textContent.split(/\r\n|\r|\n/).length;
// const item = document.createElement("li");
// for(let i = 1; i < lins; i++){
// 	var número = item.cloneNode(false);
// 	número.textContent = i;
// 	nums.appendChild(número);
// }
