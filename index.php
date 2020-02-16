<?php

function error(){
    global $orria;
    $orria = "./orriak/error.html";    
}

$orria = "./";
$estilos = array();
$encabezado = array();
$js = NULL;

$ruta = explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

if($ruta[1] == "") $ruta = array(NULL, "es", "cmm", "lenguaje");
/*
   if(!include "./textos/{$ruta[1]}.txt"){
   error();
   }
 */

$orria .= $ruta[2];

switch($ruta[2]){
    case "cmm":
		$encabezado[0] = "Lenguaje C--";
        switch($ruta[3]){
			case "lenguaje":
				$encabezado[1] = "Definición";
				$orria .= "/clenguaje.html";
				$estilos = array("clenguaje");
				break;
			case "tmachine":
				$encabezado[1] = "Máquina de Turing en C--";
				$orria = "./orriak/editor-ejemplos.php";
				$orria2 = "./cmm/cmm-tmachine.html";
				$estilos = array("maqc", "colores_cmm");
				$js = array("editor_ejemplos");
				break;
			case "recursive":
				$encabezado[1] = "Programa recursivo";
				$orria = "./orriak/editor-ejemplos.php";
				$orria2 = "./cmm/cmm-recursive.html";
				$estilos = array("maqc", "colores_cmm");
				$js = array("editor_ejemplos");
				break;
			case "macros":
				$encabezado[1] = "Macros y utilidades";
				$orria = "./cmm/macros.php";
				$orria2 = "./cmm/macros/" . $ruta[4] . ".html";
				if(!file_exists($orria2)) error();
				$macro = $ruta[4];
				$estilos = array("macros", "gramat");
				$js = array("macros");
				break;
			default:
				error();
		}
		break;
	case "amt":
		$encabezado[0] = "Máquinas de Turing";
        switch($ruta[3]){
			case "lenguaje":
				$encabezado[1] = "Lenguaje AMT";
				$orria .= "/tlenguaje.html";
				$estilos = array("tlenguaje", "gramat");
				break;
			case "tmachine-cmm":
				$encabezado[1] = "Máquina de Turing ejecutora de C--";
				$orria = "./orriak/editor-ejemplos.php";
				$orria2 = "./amt/tmachine-cmm.html";
				$estilos = array("maqc", "colores_amt");
				$js = array("editor_ejemplos");
				break;
			case "simulador":
				$encabezado[1] = "Simulador de máquinas de Turing";
				$orria .= "/simulador.html";
				$estilos = array("turings", "pantalla", "colores_amt");
				$js = array("tokens", "interpretador", "editor");
				break;
			default:
				error();
		}
		break;
	default:
		error();
}
include "./orriak/pag_general.php";
