<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import PropertyList from '$components/PropertyList.svelte'
	import ChipGroup from '$components/ChipGroup.svelte'
	import Chip from '$components/Chip.svelte'
	import { category_detail_level } from '$lib/states/detail_level.svelte'
	import TextWithReason from '$components/TextWithReason.svelte'
	import { filter_by_tag } from '$lib/client/utils'
	import CategoryList from '$components/CategoryList.svelte'
	import { faQuestion, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	let { data } = $props()

	let category = $derived(data.category)
</script>

<MetaData title={category.name} description="Discover the properties of this category" />

<h2>{category.name}</h2>

<ChipGroup>
	{#each data.tags as tag}
		<Chip size="small" handle_click={() => filter_by_tag(tag)}>{tag}</Chip>
	{/each}
</ChipGroup>

<section aria-label="main info" class="main">
	<ul class="with-margins">
		<li>
			<strong>notation:</strong>
			{@html category.notation}
		</li>

		<li>
			<strong>objects:</strong>
			{@html category.objects}
		</li>

		<li>
			<strong>morphisms:</strong>
			{@html category.morphisms}
		</li>

		{#if data.related_categories.length}
			<li>
				<strong>Related categories:</strong>
				{#each data.related_categories as { id, name, notation }, i}
					<a href={`/category/${id}`} aria-label={name}>
						{@html notation}
					</a>{#if i < data.related_categories.length - 1}
						,&nbsp;
					{/if}
				{/each}
			</li>
		{/if}

		{#if category.nlab_link}
			<li>
				<a href={category.nlab_link} target="_blank">nLab Link</a>
			</li>
		{/if}

		{#if category.dual_category_id}
			<li>
				<strong>Dual category:</strong>
				<a
					href="/category/{category.dual_category_id}"
					aria-label={category.dual_category_name}
				>
					{@html category.dual_category_notation}
				</a>
			</li>
		{/if}
	</ul>

	{#if category.description}
		<p>{@html category.description}</p>
	{/if}
</section>

<div class="two-columns">
	<section>
		<h3>Satisfied Properties</h3>

		{#if category_detail_level.value === 'all'}
			<p class="hint">Properties from the database</p>
			<PropertyList
				properties={data.satisfied_properties.filter((p) => !p.is_deduced)}
			/>

			<p class="hint">Deduced properties</p>
			<PropertyList
				properties={data.satisfied_properties.filter((p) => p.is_deduced)}
			/>
		{:else if category_detail_level.value === 'merged'}
			<PropertyList properties={data.satisfied_properties} />
		{:else if category_detail_level.value === 'basic'}
			<p class="hint">
				Properties from the database; further properties can be deduced.
			</p>
			<PropertyList
				properties={data.satisfied_properties.filter((p) => !p.is_deduced)}
			/>
		{/if}
	</section>

	<section>
		<h3>Unsatisfied Properties</h3>

		{#if category_detail_level.value === 'all'}
			<p class="hint">Properties from the database</p>
			<PropertyList
				properties={data.unsatisfied_properties.filter((p) => !p.is_deduced)}
			/>

			<p class="hint">Deduced properties*</p>
			<PropertyList
				properties={data.unsatisfied_properties.filter((p) => p.is_deduced)}
			/>

			<p class="hint">*This also uses the deduced satisfied properties.</p>
		{:else if category_detail_level.value === 'merged'}
			<PropertyList properties={data.unsatisfied_properties} />
		{:else if category_detail_level.value === 'basic'}
			<p class="hint">
				Properties from the database; further properties can be deduced.
			</p>
			<PropertyList
				properties={data.unsatisfied_properties.filter((p) => !p.is_deduced)}
			/>
		{/if}
	</section>
</div>

<section>
	<h3>Unknown properties</h3>

	{#if data.unknown_properties.length > 0}
		<p class="hint">
			For these properties the database currently doesn't have an answer if they are
			satisfied or not. Please help to <a href="/contribute">contribute</a> the data!
		</p>
	{/if}

	<PropertyList properties={data.unknown_properties} />
</section>

<section>
	<h3>Special objects</h3>

	{#if data.special_objects.length}
		<ul class="with-margins">
			{#each data.special_objects as obj}
				<li>{obj.type}: {@html obj.description}</li>
			{/each}
		</ul>
	{:else}
		<p>&mdash;</p>
	{/if}
</section>

<section>
	<h3>Special morphisms</h3>

	<ul class="with-margins">
		{#each data.special_morphisms as obj}
			<li>
				<TextWithReason reason={obj.reason}>
					{#if obj.description}
						{obj.type}: {@html obj.description}
					{:else}
						{obj.type}: <Fa icon={faQuestion} scale={0.825} />
					{/if}
				</TextWithReason>
			</li>
		{/each}
	</ul>
</section>

{#if data.undistinguishable_categories.length}
	<section>
		<h3>Undistinguishable categories</h3>

		<p class="hint">
			These categories in the database currently have exactly the same properties as
			the {data.category.name}. This indicates that the data may be incomplete or
			that a distinguishing property may be missing from the database.
		</p>

		<CategoryList categories={data.undistinguishable_categories} />
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
