<script lang="ts">
	import Fa from 'svelte-fa'
	import HelpMessage from './HelpMessage.svelte'
	import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
	import PropertyList from './PropertyList.svelte'
	import type {
		PropertyAssignmentDisplay,
		PropertyShort,
		StructureType,
	} from '$lib/commons/types'
	import { category_detail_level } from '$lib/states/detail_level.svelte'
	import { pluralize } from '$lib/client/utils'

	type Props = {
		type: StructureType
		satisfied_properties: PropertyAssignmentDisplay[]
		unsatisfied_properties: PropertyAssignmentDisplay[]
		undecidable_properties: PropertyAssignmentDisplay[]
		unknown_properties: PropertyShort[]
	}

	let {
		type,
		satisfied_properties,
		unsatisfied_properties,
		undecidable_properties,
		unknown_properties,
	}: Props = $props()
</script>

<HelpMessage id="proof-bubble">
	New here? Click any <Fa icon={faCommentDots} scale={0.825} />
	icon to view the proof for that property.
</HelpMessage>

<div class="two-columns">
	<section>
		<h3 class="sticky-heading">Satisfied Properties</h3>

		{#if category_detail_level.value === 'all'}
			<p class="hint">Assigned properties</p>
			<PropertyList
				properties={satisfied_properties.filter((p) => !p.is_deduced)}
				{type}
			/>

			<p class="hint">Deduced properties</p>
			<PropertyList
				properties={satisfied_properties.filter((p) => p.is_deduced)}
				{type}
			/>
		{:else if category_detail_level.value === 'merged'}
			<PropertyList properties={satisfied_properties} {type} />
		{:else if category_detail_level.value === 'basic'}
			<p class="hint">Assigned properties; further properties can be deduced.</p>
			<PropertyList
				properties={satisfied_properties.filter((p) => !p.is_deduced)}
				{type}
			/>
		{/if}
	</section>

	<section>
		<h3 class="sticky-heading">Unsatisfied Properties</h3>

		{#if category_detail_level.value === 'all'}
			<p class="hint">Assigned properties</p>
			<PropertyList
				properties={unsatisfied_properties.filter((p) => !p.is_deduced)}
				{type}
			/>

			<p class="hint">Deduced properties*</p>
			<PropertyList
				properties={unsatisfied_properties.filter((p) => p.is_deduced)}
				{type}
			/>

			<p class="hint">*This also uses the deduced satisfied properties.</p>
		{:else if category_detail_level.value === 'merged'}
			<PropertyList properties={unsatisfied_properties} {type} />
		{:else if category_detail_level.value === 'basic'}
			<p class="hint">Assigned properties; further properties can be deduced.</p>
			<PropertyList
				properties={unsatisfied_properties.filter((p) => !p.is_deduced)}
				{type}
			/>
		{/if}
	</section>
</div>

<section>
	<h3 class="sticky-heading">Unknown properties</h3>

	{#if unknown_properties.length > 0}
		<p class="hint">
			{pluralize(unknown_properties.length, {
				one: "There is {count} property for which the database doesn't have an answer if it is satisfied or not.",
				other: "There are {count} properties for which the database doesn't have an answer if they are satisfied or not.",
			})}

			Please help to <a href="/content/contribute">contribute</a> the data!
		</p>
	{/if}

	<PropertyList properties={unknown_properties} {type} />
</section>

{#if undecidable_properties.length > 0}
	<section>
		<h3>Undecidable properties</h3>

		{#if undecidable_properties.length > 0}
			<p class="hint">
				{pluralize(undecidable_properties.length, {
					one: 'There is {count} property for which it cannot be decided if it is satisfied or not.',
					other: 'There are {count} properties for which it cannot be decided if they are satisfied or not.',
				})}
			</p>
		{/if}

		<PropertyList properties={undecidable_properties} {type} />
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
