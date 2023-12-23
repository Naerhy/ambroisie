<script setup lang="ts">
	import { FormMessage } from '../types';

	// @ts-ignore
	const props = defineProps<{ btnText: string; formMessage: FormMessage }>();
</script>

<template>
	<form>
		<slot />
		<div v-if="formMessage !== null" :class="formMessage.level">{{ formMessage.message }}</div>
		<button class="btn-contained">{{ btnText }}</button>
	</form>
</template>

<style scoped>
	form {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}

	.success, .error {
		padding: 0.5rem;
	}

	.success {
		background-color: #dcfff1;
		border: 1px solid #22a06b;
	}	

	.error {
		background-color: #ffeceb;
		border: 1px solid #e2483d;
	}
</style>
