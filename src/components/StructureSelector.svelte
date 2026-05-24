<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import { PLURALS, STRUCTURES } from '$lib/commons/structures'
	import type { StructureType } from '$lib/commons/types'

	type Props = {
		selected_type: StructureType
	}

	let { selected_type }: Props = $props()

	function handle_change() {
		const path = page.url.pathname

		if (path.endsWith('-implications')) {
			goto(`/${selected_type}-implications`)
		} else if (path.endsWith('-properties')) {
			goto(`/${selected_type}-properties`)
		} else if (path.endsWith('-search')) {
			goto(`/${selected_type}-search`)
		} else if (path.endsWith('-search/results')) {
			goto(`/${selected_type}-search`)
		} else {
			goto(`/${PLURALS[selected_type]}`)
		}
	}
</script>

<label for="structure_selector">Structure</label>

<select
	id="structure_selector"
	bind:value={selected_type}
	onchange={handle_change}
	aria-label="Structure"
>
	{#each STRUCTURES as structure}
		<option value={structure}>{PLURALS[structure]}</option>
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
