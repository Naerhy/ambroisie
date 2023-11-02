<script lang="ts">
    import type { Recipe } from "../interfaces";

	export let recipe: Recipe;
</script>

<li>
	<div class="image"></div>
	<h3>{recipe.title}</h3>
</li>

<style>
	li {
		border: 1px solid var(--highlight);
		border-radius: 0.375rem;
		padding: 1rem;
	}

	.image {
		background-color: red;
		height: 150px;
		width: 260px;
	}
</style>
