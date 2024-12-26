<script lang="ts">
	import type { Game } from '$lib/classes';
	import { formatSecondsToTime } from '$lib/utils';

	let { game }: { game: Game } = $props();

	let secconds = $state(0);

	setInterval(() => {
		secconds += 1;
	}, 1000);

	let flagged = $derived(game.flaggedCells);
	let remainingCells = $derived(Math.pow(game.size, 2) - (game.revealedCells + flagged));
	let remainigMines = $derived(game.mines - flagged);
</script>

<div
	class="border-foregroun-300 flex w-full items-center rounded border bg-adjacent-4 p-6 text-cell"
>
	<div class="flex w-4/12 flex-col items-center justify-center">
		<h3 class="text-3xl">Remaining Mines</h3>
		<h4 class="text-2xl">
			{remainigMines}
		</h4>
	</div>
	<div class="flex w-4/12 flex-col items-center justify-center">
		<h3 class="text-3xl">Remaining Cells</h3>
		<h4 class="text-2xl">
			{remainingCells}
		</h4>
	</div>
	<div class="flex w-4/12 items-center justify-center">
		<div class="text-4xl font-bold">{formatSecondsToTime(secconds)}</div>
	</div>
</div>
