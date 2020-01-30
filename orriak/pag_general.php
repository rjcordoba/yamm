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
        <img src="/imgs/icono.svg" alt="icono">
        <img src="/imgs/letras.svg" alt="letras">
	  </div>
    </header>
    <nav>
	  <ul class="anchura">
	    <li>
		  <a href="./clenguaje.html">C--</a>
		  <ul id="tab_c">
			<li>lenguaje</li>
			<li class="con_triang">macros<span class="triang">►</span></li>
			<li>ejemplo Turing</li>
			<li>ejemplo recursión</li>
		  </ul>
		</li>
		<li>
		  <a href="./index.html">Máquinas</a>
		  <ul id="tab_amt">
		  	<li>lenguaje</li>
		  	<li>ejemplo C--</li>
		  	<li>simulador</li>
		  </ul>
		</li>
      </ul>
    </nav>
	<div id="cont-principal" class="anchura">
	  <div id="encabezado">
		<h1><?= $encabezado[0] ?></h1>
		<h2><?= $encabezado[1] ?></h2>
	  </div>
		<?php include "$orria"; ?>
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
