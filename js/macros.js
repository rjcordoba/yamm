window.addEventListener('load', (e) => {
	var ejemplos = document.getElementsByClassName("ejemplos");
	var l = ejemplos.length;
	var max;
	for(var i=0;i<l;i++){
		max=0;
		let pantallas = ejemplos[i].getElementsByTagName("pre");
		let ll = pantallas.length;
		for(var j=0;j<ll;j++){
			if(pantallas[j].offsetWidth > max) max = pantallas[j].offsetWidth;
		}
		for(j=0;j<ll;j++){
			pantallas[j].style.width = max + "px";
		}
	}
});
