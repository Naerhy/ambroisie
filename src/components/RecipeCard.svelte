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
		cursor: pointer;
		display: flex;
		flex-direction: column;
		position: relative;
		width: 300px;
	}

	li:hover {
		outline: 2px solid var(--highlight);
	}

	img {
		height: 150px;
		object-fit: cover;
		width: 100%;
	}

	h3 {
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
