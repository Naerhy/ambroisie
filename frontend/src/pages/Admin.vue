<script setup lang="ts">
	import ManageMeals from "../components/ManageMeals.vue";
</script>

<template>
	<main>
		<ManageMeals />
	</main>
</template>

<style scoped>
	main {
		align-items: flex-start;
		display: flex;
		justify-content: center;
	}

	section {
		border: 1px solid var(--stroke);
		border-radius: 0.25rem;
		padding: 1.5rem;
		width: 500px;
	}

	h2 {
		font-size: 1.25rem;
		line-height: 1.75rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}
</style>
