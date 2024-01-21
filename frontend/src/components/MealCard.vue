<script setup lang="ts">
	import { ref } from "vue";
	import type { Meal } from "../types";

	const props = defineProps<{ meal: Meal }>();

	const imgSrc = ref<string>(props.meal.imageBase64);

	function handleError(): void {
		imgSrc.value = new URL("../../assets/no-image.png", import.meta.url).href;
	}
</script>

<template>
	<li>
		<router-link :to="`/repas/${meal.id}`">
			<img :src="imgSrc" alt="Miniature du repas" @error="handleError()" />
			<h6>{{ meal.name }}</h6>
		</router-link>
	</li>
</template>

<style scoped>
	li {
		border: 1px solid var(--stroke);
		cursor: pointer;
	}

	img {
		height: 180px;
		object-fit: cover;
		width: 100%;
	}

	h6 {
		padding: 0.25rem;
		overflow: hidden;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
