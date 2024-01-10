<script setup lang="ts">
	import Loader from "./Loader.vue";
</script>

<template>
	<main>
		<Loader />
		<div>Chargement du site web, veuillez patienter.</div>
	</main>
</template>

<style scoped>
	main {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		row-gap: 6rem;
	}

	div {
		font-size: 1.125rem;
		line-height: 1.75rem;
	}
</style>
