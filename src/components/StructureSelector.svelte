<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import type { StructureType } from '$lib/commons/types'
	import { STRUCTURE_TYPES, PLURALS } from '$shared/config'

	type Props = {
		selected_type: StructureType
		variant: 'header' | 'nav_mobile'
	}

	let { selected_type, variant }: Props = $props()

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
		} else if (path.includes('-comparison')) {
			goto(`/${selected_type}-comparison`)
		} else {
			goto(`/${selected_type}-list`)
		}
	}

	const id = $props.id()
</script>

<div class="selector {variant}">
	<label for={id}>Structure</label>

	<select {id} bind:value={selected_type} onchange={handle_change}>
		{#each STRUCTURE_TYPES as type}
			<option value={type}>{PLURALS[type]}</option>
		{/each}
	</select>
</div>

<style>
	.selector {
		font-size: 1rem;

		&.header {
			display: inline-flex;
			gap: 0.5rem;
			align-items: center;
		}

		&.nav_mobile {
			margin-top: 1rem;
		}
	}

	label {
		color: var(--secondary-text-color);
	}

	select {
		field-sizing: content;
	}
</style>
