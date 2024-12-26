<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Game, type Cell } from '$lib/classes';

	let { game }: { game: Game } = $props();
</script>

{#snippet GameCell(cell: Cell)}
	{@const { revealed, flagged, position, adjacentMines } = cell}

	<button
		class="flex h-20 w-20 items-center justify-center overflow-hidden border border-foreground-300"
		class:rounded-tl-xl={!position.row && !position.col}
		class:rounded-tr-xl={!position.row && position.col === game.size - 1}
		class:rounded-bl-xl={position.row === game.size - 1 && !position.col}
		class:rounded-br-xl={position.row === game.size - 1 && position.col === game.size - 1}
		class:border-b={position.row < game.size}
		class:pointer-events-none={revealed && adjacentMines === 0}
		class:cursor-default={revealed && adjacentMines === 0}
		onclick={() =>
			revealed ? game.revealAdjacentCells(position, false) : game.revealCell(cell, true)}
		oncontextmenu={(e) => (e.preventDefault(), game.toggleFlagCell(cell))}
	>
		{#key [revealed, flagged]}
			<div
				class="flex h-full w-full flex-col items-center justify-center"
				in:fade={{
					duration: revealed ? 150 : 0,
					delay: 25 * cell.position.col
				}}
			>
				{@html cell.getHTMLContent()}
			</div>
		{/key}
	</button>
{/snippet}

<div class="flex flex-col rounded-xl border border-foreground-300 text-2xl">
	{#each game.board as row, i (`${i + 1}-row`)}
		<div class="flex items-center">
			{#each row as cell, i (`${i + 1}-cell`)}
				{@render GameCell(cell)}
			{/each}
		</div>
	{/each}
</div>
