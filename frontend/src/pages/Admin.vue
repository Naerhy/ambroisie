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
		<Form v-if="!isAdmin" @submit.prevent="handleSubmit" btn-text="Connexion" :form-message="formMessage">
			<div class="flex-col">
				<label for="password" class="bold">Password</label>
				<input type="password" id="password" class="input" v-model="password" autofocus />
			</div>
		</Form>
		<ManageMeals v-else />
	</main>
</template>
