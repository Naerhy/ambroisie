<template>
	<main>
		<section>
			<img src="/404.svg" width="500px" alt="Illustration erreur 404" />
			<h1>Page introuvable !</h1>
			<p>Assurez-vous d'avoir entré la bonne adresse web.</p>
			<router-link to="/">Retourner à l'accueil</router-link>
		</section>
	</main>
</template>

<style scoped>
	main {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	section {
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	h1 {
		font-size: 2.25rem;
		line-height: 2.5rem;
	}

	a {
		color: var(--highlight);
		margin-top: 1rem;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
