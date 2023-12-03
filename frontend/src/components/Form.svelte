<script lang="ts">
	import Button from "./Button.svelte";

	export let title: string;
	export let btnText: string;
	export let successMsg: string;
	export let errorMsg: string;
</script>

<h2>{title}</h2>
<form on:submit|preventDefault>
	<slot />
	{#if successMsg}
		<p class="success-msg">{successMsg}</p>
	{/if}
	{#if errorMsg}
		<p class="error-msg">{errorMsg}</p>
	{/if}
	<Button>{btnText}</Button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}

	h2 {
		font-size: 2.25rem;
		line-height: 2.5rem;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.success-msg, .error-msg {
		padding: 0.75rem;
	}

	.success-msg {
		background-color: #dcfff1;
		border: 1px solid #22a06b;
	}

	.error-msg {
		background-color: #ffeceb;
		border: 1px solid #e2483d;
	}
</style>
