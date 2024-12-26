<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Game, type Cell } from '$lib/classes';

	let { game }: { game: Game } = $props();

	let cellSize = $derived(document?.body?.clientWidth / game.size - 4);
</script>

{#snippet GameCell(cell: Cell)}
	{@const { revealed, flagged, position, adjacentMines } = cell}

	<button
		class="flex items-center justify-center overflow-hidden border border-foreground-300 transition-all {revealed &&
		adjacentMines === 0
			? ''
			: 'hover:border-foreground-500'}"
		style={`height: ${cellSize}px; width: ${cellSize}px; max-height: 5rem; max-width: 5rem;`}
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
