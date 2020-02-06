<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><?= $tituloa ?></title>
    <meta name="author" content="R. Córdoba García">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/css/general.css">
	<?php foreach($estilos as $est): ?>
	<link rel="stylesheet" type="text/css" href="/css/<?= $est ?>.css">
	<?php endforeach ?>
	<?php foreach($js as $js): ?>
	<script defer src="/js/<?= $js ?>.js"></script>
	<?php endforeach ?>
  </head>
  <body>
    <header>
	  <div class="anchura">
		<div id="logop">
		  <img src="/imgs/icono.svg" alt="icono">
		  <img src="/imgs/letras.svg" alt="letras">
		</div>
	  </div>
    </header>
	<div id="navegadorp">
	  <div id="hamburguesa">☰</div>
      <nav class="anchura">
		<ul>
	      <li>
			<h1><a href="./es/cmm/clenguaje">C--</a></h1>
			<ul>
			  <li><a href="./es/cmm/clenguaje">lenguaje</a></li>
			  <li class="con_triang"><a href="./es/cmm/macros/1">macros</a><span class="triang">►</span>
				<ul>
				  <li><a href="./es/cmm/macros/1">macros 1</a></li>
				  <li><a href="./es/cmm/macros/1">macros 5</a></li>
				  <li><a href="./es/cmm/macros/1">macros 9</a></li>
				  <li><a href="./es/cmm/macros/1">macros 13</a></li>
				  <li><a href="./es/cmm/macros/1">macros 19</a></li>
				</ul>
			  </li>
			  <li><a href="./es/cmm/tmachine">ejemplo Turing</a></li>
			  <li><a href="./es/cmm/recursive">ejemplo recursión</a></li>
			</ul>
		  </li>
		  <li>
			<h1><a href="./index.html">Máquinas</a></h1>
			<ul>
		  	  <li><a href="./es/amt/lenguaje">lenguaje</a></li>
		  	  <li><a href="./es/amt/tmachine-cmm">ejemplo C--</a></li>
		  	  <li class="por_hacer">simulador</li>
			</ul>
		  </li>
		</ul>
      </nav>
	</div>
	<div id="flex_central">
	  <div id="cont-principal" class="anchura">
		<div id="encabezado">
		  <h1><?= $encabezado[0] ?></h1>
		  <h2><?= $encabezado[1] ?></h2>
		</div>
		<?php include "$orria"; ?>
	  </div>
	</div>
    <footer>
	  <div class="anchura">
		<div id="autor">
		  <p>R. Córdoba García</p>
		  <address>rcordoba77@gmail.com</address>
		</div>
	  </div>
    </footer>
  </body>
</html>
