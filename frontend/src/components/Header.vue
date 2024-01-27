<script setup lang="ts">
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
		<nav>
			<router-link to="/repas">Liste de repas</router-link>
			<router-link v-if="!adminStore.isAdmin" to="/connexion">Connexion</router-link>
			<template v-else>
				<router-link to="/admin">Admin</router-link>
				<button type="button" @click="handleDisconnect">Déconnexion</button>
			</template>
		</nav>
	</header>
</template>

<style scoped>
	header {
		align-items: center;
		border-bottom: 1px solid var(--stroke);
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 2rem;
	}

	h1 {
		color: var(--highlight);
		font-size: 3.75rem;
		line-height: 1;
	}

	nav {
		column-gap: 1rem;
		display: flex;
	}
</style>
