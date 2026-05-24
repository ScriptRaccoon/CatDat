<script lang="ts">
	import { goto } from '$app/navigation'
	import Chip from '$components/Chip.svelte'
	import ChipGroup from '$components/ChipGroup.svelte'
	import HelpMessage from '$components/HelpMessage.svelte'
	import MetaData from '$components/MetaData.svelte'
	import PropertyList from '$components/PropertyList.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
	import { pluralize } from '$lib/client/utils.js'
	import { category_detail_level } from '$lib/states/detail_level.svelte'
	import { faCommentDots } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	function filter_by_tag(tag: string) {
		goto(`/functors/${tag}`)
	}
	let { data } = $props()

	let functor = $derived(data.functor)
</script>

<!-- TODO: remove code duplication with category detail page -->

<MetaData title={functor.name} description="Discover the properties of this functor" />

<h2>{functor.name}</h2>

<ChipGroup>
	{#each data.tags as tag}
		<Chip size="small" handle_click={() => filter_by_tag(tag)}>{tag}</Chip>
	{/each}
</ChipGroup>

<section aria-label="main info" class="main">
	<ul class="with-margins">
		<li>
			<strong>Source:</strong>
			<a href="/category/{functor.source}">{functor.source_name}</a>
		</li>

		<li>
			<strong>Target:</strong>
			<a href="/category/{functor.target}">{functor.target_name}</a>
		</li>

		{#if data.related_functors.length}
			<li>
				<strong>Related functors:</strong>
				{#each data.related_functors as { id, name }, i}
					<a href={`/functor/${id}`}>
						{name}
					</a>{#if i < data.related_functors.length - 1}
						,&nbsp;
					{/if}
				{/each}
			</li>
		{/if}

		{#if functor.nlab_link}
			<li>
				<a href={functor.nlab_link} target="_blank">nLab Link</a>
			</li>
		{/if}
	</ul>

	<p>{@html functor.description}</p>
</section>

<HelpMessage id="proof-bubble">
	New here? Click any <Fa icon={faCommentDots} scale={0.825} /> icon to view the proof for
	that property.
</HelpMessage>

<div class="two-columns">
	<section>
		<h3 class="sticky-heading">Satisfied Properties</h3>

		{#if category_detail_level.value === 'all'}
			<p class="hint">Assigned properties</p>
			<PropertyList
				properties={data.satisfied_properties.filter((p) => !p.is_deduced)}
				type="functor"
			/>

			<p class="hint">Deduced properties</p>
			<PropertyList
				properties={data.satisfied_properties.filter((p) => p.is_deduced)}
				type="functor"
			/>
		{:else if category_detail_level.value === 'merged'}
			<PropertyList properties={data.satisfied_properties} type="functor" />
		{:else if category_detail_level.value === 'basic'}
			<p class="hint">Assigned properties; further properties can be deduced.</p>
			<PropertyList
				properties={data.satisfied_properties.filter((p) => !p.is_deduced)}
				type="functor"
			/>
		{/if}
	</section>

	<section>
		<h3 class="sticky-heading">Unsatisfied Properties</h3>

		{#if category_detail_level.value === 'all'}
			<p class="hint">Assigned properties</p>
			<PropertyList
				properties={data.unsatisfied_properties.filter((p) => !p.is_deduced)}
				type="functor"
			/>

			<p class="hint">Deduced properties*</p>
			<PropertyList
				properties={data.unsatisfied_properties.filter((p) => p.is_deduced)}
				type="functor"
			/>

			<p class="hint">*This also uses the deduced satisfied properties.</p>
		{:else if category_detail_level.value === 'merged'}
			<PropertyList properties={data.unsatisfied_properties} type="functor" />
		{:else if category_detail_level.value === 'basic'}
			<p class="hint">Assigned properties; further properties can be deduced</p>
			<PropertyList
				properties={data.unsatisfied_properties.filter((p) => !p.is_deduced)}
				type="functor"
			/>
		{/if}
	</section>
</div>

<section>
	<h3 class="sticky-heading">Unknown properties</h3>

	{#if data.unknown_properties.length > 0}
		<p class="hint">
			{pluralize(data.unknown_properties.length, {
				one: "There is {count} property for which the database doesn't have an answer if it is satisfied or not.",
				other: "There are {count} properties for which the database doesn't have an answer if they are satisfied or not.",
			})}

			Please help to
			<a href="/content/contribute">contribute</a> the data!
		</p>
	{/if}

	<PropertyList properties={data.unknown_properties} type="functor" />
</section>

{#if data.undecidable_properties.length > 0}
	<section>
		<h3>Undecidable properties</h3>

		{#if data.undecidable_properties.length > 0}
			<p class="hint">
				{pluralize(data.undecidable_properties.length, {
					one: 'There is {count} property for which it cannot be decided if it is satisfied or not.',
					other: 'There are {count} properties for which it cannot be decided if they are satisfied or not.',
				})}
			</p>
		{/if}

		<PropertyList properties={data.undecidable_properties} type="functor" />
	</section>
{/if}

{#if data.comments.length}
	<section>
		<h3>Comments</h3>

		<ul>
			{#each data.comments as { id, comment } (id)}
				<li class="hint">{@html comment}</li>
			{/each}
		</ul>
	</section>
{/if}

<SuggestionForm />

<style>
	.main {
		margin-top: 1.5rem;
	}

	@media (min-width: 720px) {
		.two-columns {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 0.5rem;
		}
	}

	ul.with-margins li + li {
		margin-top: 0.25rem;
	}
</style>
