<script setup lang="ts">
	function handleClick(): void {
		location.reload();
	}
</script>

<template>
	<div>
		<h3>Oups !</h3>
		<p>
			Une erreur s'est malheusement produite....<br>
			Essayez de recharger la page, ou attendez que le problème soit résolu.
		</p>
		<button type="button" class="btn-contained" @click="handleClick()">Recharger</button>
	</div>
</template>

<style scoped>
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
