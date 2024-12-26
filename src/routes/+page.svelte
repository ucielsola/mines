<script lang="ts">
	import { onMount } from 'svelte';

	import { Skull, PartyPopper } from 'lucide-svelte';

	import { Game, GameBoard, GameStatus, GameStatusInfo } from '$lib';
	import { fade } from 'svelte/transition';

	let game: Game = $state(null!);

	let isGameLost = $derived(game?.status === GameStatus.LOST);
	let isGameWon = $derived(game?.status === GameStatus.LOST);
	let isGameEnded = $derived(isGameLost || isGameWon);

	const tryAgain = () => window.location.reload();

	onMount(() => {
		game = new Game();
	});
</script>

{#if game}
	<div class="relative flex h-full w-full flex-col items-center justify-center gap-6">
		<GameStatusInfo {game} />
		<GameBoard {game} />

		{#if isGameEnded}
			{@render gameEnd()}
		{/if}
	</div>
{/if}

{#snippet gameEnd()}
	<div class="absolute flex h-full w-full items-center justify-center" in:fade={{ delay: 1300 }}>
		<div class="-z-1 absolute h-full w-full backdrop-blur-sm"></div>
		{#if isGameLost}
			{@render gameLost()}
		{:else}
			{@render gameWon()}
		{/if}
	</div>
{/snippet}

{#snippet gameLost()}
	<div class="z-10 flex flex-col items-center justify-center gap-4">
		<Skull size="lg" class="text-xl text-adjacent-8" />

		<div
			class="z-10 flex w-full flex-col items-center justify-center gap-4 rounded border border-foreground-300 bg-cell p-6"
		>
			<h3 class="text-lg font-medium">You Lost!</h3>
			<button onclick={tryAgain} class="rounded border bg-adjacent-2 p-3 text-lg">
				Try Again
			</button>
		</div>
	</div>
{/snippet}

{#snippet gameWon()}
	<div class="z-10 flex flex-col items-center justify-center gap-4">
		<PartyPopper size="lg" class="text-xl text-adjacent-1" />

		<div
			class="z-10 flex w-full flex-col items-center justify-center gap-4 rounded border border-foreground-300 bg-cell p-6"
		>
			<h3 class="text-lg font-medium">You Won!</h3>
			<button onclick={tryAgain} class="rounded border bg-adjacent-2 p-3 text-lg">
				New Game
			</button>
		</div>
	</div>
{/snippet}
