<script setup lang="ts">
	function handleClick(): void {
		location.reload();
	}
</script>

<template>
	<main>
		<div>
			<h2>Oups !</h2>
			<p>
				Le site a rencontré une erreur lors du chargement de la liste des repas.<br>
				Essayez de recharger la page, ou attendez que nous résolvions le problème.
			</p>
			<button type="button" class="btn-contained" @click="handleClick()">Recharger</button>
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
