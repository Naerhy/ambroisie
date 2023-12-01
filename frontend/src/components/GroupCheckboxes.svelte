<script lang="ts">
	export let title: string;
	export let name: string;
	export let values: string[];
	export let groupValues: any[];
</script>

<div class="title">{title}</div>
{#each values as value}
	{@const id = `gc-${name}-${value}`}
	<div>
		<input type="checkbox" {id} {value} bind:group={groupValues}/>
		<label for={id}>{value.charAt(0).toUpperCase() + value.slice(1)}</label>
	</div>
{/each}

<style>
	.title {
		font-weight: 700;
	}
</style>
