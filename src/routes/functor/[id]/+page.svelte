<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import PropertyList from '$components/PropertyList.svelte'
	import { category_detail_level } from '$lib/states/detail_level.svelte'
	let { data } = $props()

	let functor = $derived(data.functor)
</script>

<MetaData title={functor.name} description="Discover the properties of this functor" />

<h2>{functor.name}</h2>

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

		{#if functor.nlab_link}
			<li>
				<a href={functor.nlab_link}>nLab Link</a>
			</li>
		{/if}
	</ul>

	<p>{@html functor.description}</p>
</section>

<!-- TODO: remove code duplication with category detail page -->
{#key functor.id}
	<div class="two-columns">
		<section>
			<h3>Satisfied Properties</h3>

			{#if category_detail_level.value === 'all'}
				<p class="hint">Properties from the database</p>
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
				<p class="hint">
					Properties from the database; further properties can be deduced.
				</p>
				<PropertyList
					properties={data.satisfied_properties.filter((p) => !p.is_deduced)}
					type="functor"
				/>
			{/if}
		</section>

		<section>
			<h3>Unsatisfied Properties</h3>

			{#if category_detail_level.value === 'all'}
				<p class="hint">Properties from the database</p>
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
				<p class="hint">
					Properties from the database; further properties can be deduced
				</p>
				<PropertyList
					properties={data.unsatisfied_properties.filter((p) => !p.is_deduced)}
					type="functor"
				/>
			{/if}
		</section>
	</div>

	<section>
		<h3>Unknown properties</h3>

		{#if data.unknown_properties.length}
			<p class="hint">
				For these properties the database currently doesn't have an answer if they
				are satisfied or not. Please help to <a href="/contribute">contribute</a> the
				data!
			</p>
		{/if}

		<PropertyList properties={data.unknown_properties} type="functor" />
	</section>
{/key}

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
