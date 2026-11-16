<script lang="ts">
	import Fa from 'svelte-fa'
	import HelpMessage from './HelpMessage.svelte'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import PropertyList from './PropertyList.svelte'
	import type {
		PropertyAssignmentDisplay,
		PropertyShort,
		StructureType
	} from '#lib/commons/types.ts'
	import { pluralize, remove_underscores } from '#shared/utils.ts'

	type Props = {
		type: StructureType
		parent_id: string | null
		satisfied_properties: PropertyAssignmentDisplay[]
		unsatisfied_properties: PropertyAssignmentDisplay[]
		undecidable_properties: PropertyAssignmentDisplay[]
		unknown_properties: PropertyShort[]
	}

	let {
		type,
		parent_id,
		satisfied_properties,
		unsatisfied_properties,
		undecidable_properties,
		unknown_properties
	}: Props = $props()

	let satisfied_assigned = $derived(satisfied_properties.filter((p) => !p.is_deduced))
	let satisfied_inherited = $derived(satisfied_properties.filter((p) => p.is_inherited))
	let satisfied_deduced = $derived(
		satisfied_properties.filter((p) => p.is_deduced && !p.is_inherited)
	)

	let unsatisfied_assigned = $derived(
		unsatisfied_properties.filter((p) => !p.is_deduced)
	)
	let unsatisfied_inherited = $derived(
		unsatisfied_properties.filter((p) => p.is_inherited)
	)
	let unsatisfied_deduced = $derived(
		unsatisfied_properties.filter((p) => p.is_deduced && !p.is_inherited)
	)

	let decided_properties = $derived([
		...satisfied_properties,
		...unsatisfied_properties
	])

	let total_count = $derived(
		decided_properties.length +
			unknown_properties.length +
			undecidable_properties.length
	)

	let deduced_count = $derived(decided_properties.filter((p) => p.is_deduced).length)
</script>

<HelpMessage id="proof-bubble">
	New here? Click any <Fa icon={faInfoCircle} />
	icon to view the proof for that property.
</HelpMessage>

<div class="two-columns">
	<section>
		<h2 class="sticky-heading">Satisfied properties</h2>

		<p class="hint">Assigned properties ({satisfied_assigned.length})</p>
		<PropertyList
			properties={satisfied_assigned}
			{type}
			label="Assigned properties"
			no_bullets={true}
		/>

		{#if parent_id}
			<p class="hint">
				Properties from <a href="/{type}/{parent_id}">parent</a>
				({satisfied_inherited.length})
			</p>
			<PropertyList
				properties={satisfied_inherited}
				{type}
				label="Properties from parent"
				no_bullets={true}
			/>
		{/if}

		<p class="hint">Deduced properties ({satisfied_deduced.length})</p>
		<PropertyList
			properties={satisfied_deduced}
			{type}
			label="Deduced properties"
			no_bullets={true}
		/>
	</section>

	<section>
		<h2 class="sticky-heading">Unsatisfied properties</h2>

		<p class="hint">Assigned properties ({unsatisfied_assigned.length})</p>
		<PropertyList
			properties={unsatisfied_assigned}
			{type}
			label="Assigned properties"
			no_bullets={true}
		/>

		{#if parent_id}
			<p class="hint">
				Properties from <a href="/{type}/{parent_id}">parent</a>
				({unsatisfied_inherited.length})
			</p>
			<PropertyList
				properties={unsatisfied_inherited}
				{type}
				label="Properties from parent"
				no_bullets={true}
			/>
		{/if}

		<p class="hint">Deduced properties ({unsatisfied_deduced.length})*</p>
		<PropertyList
			properties={unsatisfied_deduced}
			{type}
			label="Deduced properties"
			no_bullets={true}
		/>

		<p class="hint">*This also uses the deduced satisfied properties.</p>
	</section>
</div>

<section>
	<h2 class="sticky-heading">Unknown properties</h2>

	<p class="hint">
		{#if decided_properties.length === total_count}
			All {total_count}
		{:else}
			{decided_properties.length} of the {total_count}
		{/if}
		{remove_underscores(type)} properties are decided,
		{deduced_count} of them by deduction.

		{#if unknown_properties.length > 0}
			{pluralize(unknown_properties.length, {
				one: 'For {count} property, the database has no information on whether it is satisfied.',
				other: 'For {count} properties, the database has no information on whether they are satisfied.'
			})}

			Please help us fill in the gaps by
			<a href="/content/contribute">contributing</a> to this project.
		{/if}
	</p>

	<PropertyList properties={unknown_properties} {type} label="Unknown properties" />
</section>

{#if undecidable_properties.length > 0}
	<section>
		<h2>Undecidable properties</h2>

		{#if undecidable_properties.length > 0}
			<p class="hint">
				{pluralize(undecidable_properties.length, {
					one: 'There is {count} property for which it cannot be decided whether it is satisfied.',
					other: 'There are {count} properties for which it cannot be decided whether they are satisfied.'
				})}
			</p>
		{/if}

		<PropertyList
			properties={undecidable_properties}
			{type}
			label="Undecidable properties"
			no_bullets={true}
		/>
	</section>
{/if}

<style>
	@media (min-width: 720px) {
		.two-columns {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.5rem;
		}
	}
</style>
