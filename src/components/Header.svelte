<script lang="ts">
	import "@fontsource-variable/dancing-script";
	import Button from "./Button.svelte";

	export let currentPage: "home" | "form";
</script>

<header>
	<button type="button" on:click={() => currentPage = "home"}>
		<h1>Ambroisie</h1>
	</button>
	<Button type="button" on:click={() => currentPage = "form"}>Add recipe</Button>
</header>

<style>
	header {
		align-items: center;
		border: 1px solid var(--stroke);
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 2rem 0.5rem 8rem;
	}

	header h1 {
		color: var(--highlight);
		font-family: "Dancing Script Variable", Arial;
		font-size: 3.75rem;
		line-height: 1;
	}
</style>
