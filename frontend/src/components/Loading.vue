<script setup lang="ts">
	import Loader from "./Loader.vue";
</script>

<template>
	<main>
		<Loader />
		<div>Website is loading, please wait.</div>
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
