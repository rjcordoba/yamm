<?php

function error(){
    global $orria, $estilos;
	$estilos = array("noencontrada");
    $orria = "./orriak/error.html";
	header("HTTP/1.0 404 Not Found");
}

$estilos = array();
$encabezado = array();
$js = NULL;

$ruta = explode("/", parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

if($ruta[1] == "") $ruta = array(NULL, "es", "inicio");
/*
   if(!include "./textos/{$ruta[1]}.txt"){
   error();
   }
 */

switch($ruta[2]){
	case "inicio":
		$encabezado[0] = "Inicio";
		$encabezado[1] = "Presentación";
		$orria = "./orriak/inicio.html";
		$estilos = array("inicio");
		break;
    case "cmm":
		$encabezado[0] = "Lenguaje C--";
        switch($ruta[3]){
			case "lenguaje":
				$encabezado[1] = "Definición";
				$orria = "./cmm/clenguaje.html";
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
				$orria = "./cmm/macros.php";
				$orria2 = "./cmm/macros/" . $ruta[4] . ".html";
				if(!file_exists($orria2)){
					error();
					$encabezado[0] = "";
					break;
				}
				$encabezado[1] = "Macros y utilidades";
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
				$orria = "/amt/tlenguaje.html";
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
				$orria = "/amt/simulador.html";
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
$izenburua = $encabezado[0] . " - " . $encabezado[1];
include "./orriak/pag_general.php";
