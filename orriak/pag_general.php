<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title><?= izenburua ?></title>
    <meta name="author" content="R. Córdoba García">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icono" type="image/png" href="/imgs/icono.svg"/>
    <link rel="stylesheet" type="text/css" href="/css/general.css">
	<?php foreach($estilos as $est): ?>
	<link rel="stylesheet" type="text/css" href="/css/<?= $est ?>.css">
	<?php endforeach ?>
	<script defer src="/js/principal.js"></script>
	<?php foreach($js as $js): ?>
	<script defer src="/js/<?= $js ?>.js"></script>
	<?php endforeach ?>
  </head>
  <body>
    <header id="cabecera">
	  <div class="anchura">
		<div id="logop">
		  <img src="/imgs/icono.svg" alt="icono">
		  <img src="/imgs/letras.svg" alt="letras">
		</div>
	  </div>
    </header>
	<div id="navegadorp">
	  <div id="nav-resp" class="anchura">
		<div id="men-hamburguesa">
		  <span>Menú</span>
		  <div id="hamburguesa"><div></div></div>
		</div>
		<nav id="navprinc">
		  <ul>
			<li><h1><a href="/es/inicio">Inicio</a></h1></li>
			<li>
			  <h1><a href="/es/cmm/lenguaje">C--</a></h1>
			  <ul>
				<li><a href="/es/cmm/lenguaje">lenguaje</a></li>
				<li id="macros_nums" class="con_triang"><a href="/es/cmm/macros/1">macros</a><span class="triang">►</span><span id="ext_macros"></span>
				  <ul>
					<?php
					define("NUMMACROS", 19);
					define("NUMOPCM", 5);
					$long_pasos = intdiv(NUMMACROS, NUMOPCM);
					for($i = 1;$i < NUMMACROS;$i += $long_pasos) echo "<li><a href='/es/cmm/macros/{$i}'>macros {$i}</a></li>";
					echo "<li><a href='/es/cmm/macros/" . NUMMACROS . "'>macros " . NUMMACROS . "</a></li>";
					?>
				  </ul>
				</li>
				<li><a href="/es/cmm/tmachine">ejemplo Turing</a></li>
				<li><a href="/es/cmm/recursive">ejemplo recursión</a></li>
			  </ul>
			</li>
			<li>
			  <h1><a href="/index.html">AMT</a></h1>
			  <ul>
		  		<li><a href="/es/amt/lenguaje">lenguaje</a></li>
		  		<li><a href="/es/amt/tmachine-cmm">ejemplo C--</a></li>
		  		<li class="por_hacer">simulador</li>
			  </ul>
			</li>
		  </ul>
		</nav>
	  </div>
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
	<div id="scroll_gen">
	  <a href="#cabecera" title="Scroll arriba">⬆</a>
	  <a href="#pie" title="Scroll abajo">⬇</a>
	</div>
    <footer id="pie">
	  <div class="anchura">
		<div id="autor">
		  <p>R. Córdoba García</p>
		  <address>rcordoba77@gmail.com</address>
		</div>
	  </div>
    </footer>
  </body>
</html>
