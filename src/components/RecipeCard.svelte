<script lang="ts">
	import type { RecipeFN } from "../types";

	export let recipe: RecipeFN;
	export let isVisible: boolean;

	let imgUrl = new URL(`../assets/images/${recipe.filename}.png`, import.meta.url).href;

	function handleError(): void {
		imgUrl = new URL("../assets/images/no-image.jpg", import.meta.url).href;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li class:hidden={!isVisible} on:click>
	{#if !recipe.homemade}
	<div class="icon-homemade">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
	</div>
	{/if}
	<img src={imgUrl} alt="Thumbnail of the recipe" on:error={handleError} />
	<h6>{recipe.title}</h6>
</li>

<style>
	li {
		border: 1px solid var(--stroke);
		cursor: pointer;
		position: relative;
		width: 300px;
	}

	li.hidden {
		display: none;
	}

	.icon-homemade {
		color: var(--error);
		right: 10px;
		position: absolute;
		top: 10px;
	}

	img {
		height: 150px;
		object-fit: cover;
		width: 100%;
	}

	h6 {
		font-weight: 700;
		padding: 0.25rem;
		overflow: hidden;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
