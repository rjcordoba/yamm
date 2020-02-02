<?php
define("NUMMACROS", 19);
define("OPCPAG", 2);
$antes = $macro - OPCPAG;
$sig = $macro + OPCPAG;
ob_start();
?>
<nav class="hojas">
	<ul>
		<?php if($macro > 1): ?>
			<li><a href="<?= $macros_ruta . '1.html'?>">&lt; ant</a></li>
		<?php endif; ?>
		<?php if($antes > 2): ?>
			<li class="puntos">...</li>
		<?php endif; ?>
		<?php if($antes < 1) $antes = 1; ?>
		<?php if($sig < (NUMMACROS - 1)): ?>
			<li class="puntos">...</li>
		<?php endif; ?>
		<?php if($macro < NUMMACROS): ?>
			<li><a href="<?= $macros_ruta . NUMMACROS . '.html'?>">sig &gt;</a></li>
		<?php endif; ?>
	</ul>
</nav>
<?php ob_get_contents(); ?>
//<main><?php include "$orria2"; ?></main>
