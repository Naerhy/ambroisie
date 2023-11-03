<script lang="ts">
	import type { Recipe } from "../interfaces";

	export let recipe: Recipe;

	let imgUrl = new URL(`../assets/images/${recipe.filename}.png`, import.meta.url).href;
</script>

<li>
	<img src={imgUrl} alt="Thumbnail of the recipe" />
	<h3>{recipe.title}</h3>
</li>

<style>
	li {
		border: 1px solid var(--highlight);
		border-radius: 0.25rem;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		width: 300px;
	}

	li:hover {
		background-color: var(--surface-l15);
	}

	img {
		height: 150px;
		object-fit: cover;
		width: 100%;
	}
</style>
