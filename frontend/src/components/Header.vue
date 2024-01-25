<script setup lang="ts">
	import "@fontsource-variable/dancing-script";
	import { useRouter } from "vue-router";
	import { useAdminStore } from "../stores";

	const router = useRouter();

	const adminStore = useAdminStore();

	function handleDisconnect(): void {
		sessionStorage.removeItem("accessToken");
		adminStore.isAdmin = false;
		router.push({ path: "/" });
	}
</script>

<template>
	<header>
		<router-link to="/"><h1>Ambroisie</h1></router-link>
		<div>
			<router-link to="/repas">Liste de repas</router-link>
			<router-link v-if="!adminStore.isAdmin" to="/connexion">Connexion</router-link>
			<template v-else>
				<router-link to="/admin">Admin</router-link>
				<button type="button" class="btn-text" @click="handleDisconnect">Déconnexion</button>
			</template>
		</div>
	</header>
</template>

<style scoped>
	header {
		align-items: center;
		border-bottom: 1px solid var(--stroke);
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 2rem 0.5rem 8rem;
	}

	h1 {
		color: var(--highlight);
		font-family: "Dancing Script Variable", Arial;
		font-size: 3.75rem;
		line-height: 1;
	}
</style>
