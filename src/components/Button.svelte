<script lang="ts">
	export let type: "submit" | "button" = "submit";
</script>

<button {type} on:click>
	<slot />
</button>

<style>
	button {
		background-color: var(--highlight);
		border-radius: 0.375rem;
		font-weight: 700;
		padding: 0.5rem 0.75rem;
	}

	button:hover {
		background-color: var(--highlight-d15);
	}
</style>
