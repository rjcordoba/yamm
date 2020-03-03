const
lista_macros = document.querySelector("macros_nums ul"),
ext_macros = document.getElementById("ext_macros"),
macros_nums = document.getElementById("macros_nums"),
panel = document.getElementById("nav_resp"),
hamb = document.getElementById("men-hamburguesa"),
texto_hamb = hamb.getElementsByTagName("span")[0],
b = document.body.classList,
flechas = document.getElementById("scroll_gen");

hamb.addEventListener("click", () => {
	b.toggle("panel-menu");
	if(b.contains == "panel-menu") texto_hamb.textContent = "Menú";
	else texto_hamb.textContent = "Cerrar";
}, false);

ext_macros.addEventListener("click", () => {macros_nums.classList.toggle("extendido");}, false);

flechas.style.display = "none";

// const flechasa = flechas.getElementsByTagName("a");
// flechasa[0].addEventListener("click", () => {window.scrollTo(0, 0);}, false);
// flechasa[1].addEventListener("click", () => {window.scrollTo(0,document.body.scrollHeight);}, false);


function paraScroll(){
	var quitarf = null;
	function qflechas(){
		flechas.className = "quitaf";
		setTimeout(() => {flechas.className = "ponerf"; flechas.style.display = "none";}, 300);
	}
	return function(){
		if(window.scrollY > 500){
			flechas.style.display = "block";
			clearTimeout(quitarf);
			quitarf = setTimeout(qflechas, 1600);
		}
	}
}

window.addEventListener("scroll", paraScroll(), false);
