<script lang="ts">
	import type { Recipe } from "../interfaces";

	export let recipe: Recipe;
	export let isVisible: boolean;

	let imgUrl = new URL(`../assets/images/${recipe.filename}.png`, import.meta.url).href;

	function handleError(): void {
		imgUrl = new URL("../assets/images/no-image.jpg", import.meta.url).href;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li class:hidden={!isVisible} on:click>
	<img src={imgUrl} alt="Thumbnail of the recipe" on:error={handleError} />
	<h6>{recipe.title}</h6>
</li>

<style>
	li {
		cursor: pointer;
		position: relative;
		width: 300px;
	}

	li.hidden {
		display: none;
	}

	li:hover {
		outline: 2px solid var(--highlight);
	}

	img {
		height: 150px;
		object-fit: cover;
		width: 100%;
	}

	h6 {
		backdrop-filter: blur(2px);
		background-color: rgba(0, 0, 0, 0.5);
		bottom: 0;
		color: var(--on-surface);
		font-weight: 700;
		overflow: hidden;
		padding: 0.25rem;
		position: absolute;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
	}
</style>
