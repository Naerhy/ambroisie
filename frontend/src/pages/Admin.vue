<script setup lang="ts">
	import { inject, ref } from "vue";
	import axios from "axios";
	import Form from "../components/Form.vue";
	import { FormMessage, IsAdminProvider } from "../types";
	import { getErrorMessage, isAdminKey, requestsBaseUrl } from "../constants";
	import ManageMeals from "../components/ManageMeals.vue";

	const { isAdmin, updateIsAdmin } = inject(isAdminKey) as IsAdminProvider;

	const password = ref<string>("");
	const formMessage = ref<FormMessage>(null);

	async function handleSubmit(): Promise<void> {
		try {
			const { data } = await axios.post<{ accessToken: string }>(
				`${requestsBaseUrl}/auth`,
				{ password: password.value }
			);
			sessionStorage.setItem("accessToken", data.accessToken);
			updateIsAdmin(true);
		} catch (error: unknown) {
			formMessage.value = { level: "error", message: getErrorMessage(error) };
		}
	}
</script>

<template>
	<main>
		<section v-if="!isAdmin">
			<h2>Connexion à l'interface admin</h2>
			<Form @submit.prevent="handleSubmit" btn-text="Connexion" :form-message="formMessage">
				<div class="flex-col">
					<label for="password" class="bold">Mot de passe</label>
					<input type="password" id="password" class="input" v-model="password" autofocus />
				</div>
			</Form>
		</section>
		<ManageMeals v-else />
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
