<script setup lang="ts">
	function handleClick(): void {
		location.reload();
	}
</script>

<template>
	<main>
		<div>
			<h2>Oops!</h2>
			<p>
				The website encountered an error while trying to load the list of meals.<br>
				Either try to reload the page, or wait for us to resolve this issue.
			</p>
			<button type="button" class="btn-contained" @click="handleClick()">Reload</button>
		</div>
	</main>
</template>

<style scoped>
	main {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	div {
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		row-gap: 1rem;
	}

	h2 {
		font-size: 2.25rem;
		line-height: 2.5rem;
		text-align: center;
	}
</style>
