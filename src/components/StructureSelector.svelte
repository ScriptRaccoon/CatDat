<script lang="ts">
	import { goto } from '$app/navigation'
	import { STRUCTURES } from '$lib/client/config'
	import type { Structure } from '$lib/commons/types'

	type Props = {
		structure: Structure
	}

	let { structure }: Props = $props()

	function handle_change() {
		goto(`/${structure}`)
	}
</script>

<label for="structure_selector">Structure</label>

<select
	id="structure_selector"
	bind:value={structure}
	onchange={handle_change}
	aria-label="Structure"
>
	{#each STRUCTURES as structure}
		<option value={structure}>{structure}</option>
	{/each}
</select>

<style>
	label {
		color: var(--secondary-text-color);
		font-size: 1rem;
	}

	select {
		font-size: 1rem;
	}

	@media (width <= 600px) {
		label {
			/* visually hidden */
			position: absolute;
			clip: rect(1px, 1px, 1px, 1px);
			padding: 0;
			border: 0;
			height: 1px;
			width: 1px;
			overflow: hidden;
			white-space: nowrap;
		}
	}
</style>
