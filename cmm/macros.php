<?php
define("NUMMACROS", 19);
define("NUMOP", 2);
$antes = $macro - NUMOP;
$desp = $macro + NUMOP;
$ant_max = NUMMACROS - 1;

function poner_num($i){
	global $macro;
	if($i == $macro) echo "<li class='actual'>{$i}</li>";
	else echo "<li><a href='./{$i}'>{$i}</a></li>";
}

if($antes < 2) $desp += 2 - $antes;

if($desp >= NUMMACROS){
	$sobra = $desp - NUMMACROS + 1;
	$desp = $ant_max;
	$antes -= $sobra;
}

if($antes < 2) $antes = 2;

ob_start();
?>
<nav class="hojas">
	<ul>
		<?php
		if($macro > 1){
			$mov = $macro - 1;
			echo "<li class='ant_sig'><a href='./{$mov}'><span>←</span> ant</a></li>";
		}
		poner_num(1);
		if($antes > 2) echo "<li class='elipsis'></li>";
		for($i = $antes; $i <= $desp; $i++) poner_num($i);
		if($desp < $ant_max) echo "<li class='elipsis'></li>";
		if(NUMMACROS > 1) poner_num(NUMMACROS);
		if($macro < NUMMACROS){
			$mov = $macro + 1;
			echo "<li class='ant_sig'><a href='./{$mov}'>sig <span>→</span></a></li>";
		}
		?>
	</ul>
</nav>
<?php
$resultado = ob_get_contents();
?>
<main><?php include "$orria2"; ?></main>
<?= $resultado; ?>
