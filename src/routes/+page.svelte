<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import StatsCard from '$components/StatsCard.svelte'
	import {
		faChartBar,
		faChartDiagram,
		faDatabase,
		faList,
		faSearch,
		faUsers
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	let { data } = $props()
</script>

<MetaData />

<h1>
	A comprehensive and searchable database of categorical structures and their properties
</h1>

<p>
	<i>CatDat</i> provides a growing collection of categorical structures such as
	<a class="accent" href="/category-list">categories</a> and
	<a class="accent" href="/functor-list">functors</a>. Built by and for those who love
	<a href="https://en.wikipedia.org/wiki/Category_theory" target="_blank">
		category theory
	</a>.
</p>

<section class="stats" aria-label="Statistics">
	<StatsCard number={data.stats.structure_number} title="Categorical structures">
		e.g.
		{#each data.example_structures as structure, index (structure.id)}
			{@const last = index === data.example_structures.length - 1}
			<span>
				<a href="/{structure.type}/{structure.id}">{@html structure.notation}</a
				>{#if !last}<span>,&nbsp;</span>{/if}
			</span>
		{/each}
		...
	</StatsCard>

	<StatsCard number={data.stats.property_number} title="Properties">
		e.g. <a href="/category-property/cocomplete">cocomplete</a>,
		<a href="/category-property/Barr-exact">Barr-exact</a>,
		<a href="/category-property/cartesian_closed">cartesian closed</a>,
		<a href="/functor-property/left_adjoint">left adjoint</a>,
		<a href="/functor-property/fully_faithful">fully faithful</a> ...
	</StatsCard>

	<StatsCard number={data.stats.assignment_number} title="Proofs">
		e.g. <a href="/category/Haus">{@html data.selected_structures.Haus.notation}</a>
		is extensive,
		<a href="/category/FinAb">{@html data.selected_structures.FinAb.notation}</a> is ℵ₁-accessible
		...
	</StatsCard>

	<StatsCard number={data.stats.implication_number} title="Implications">
		e.g. <a href="/category-implication/pullbacks_criterion"
			>binary products ∧ equalizers ⟹ pullbacks</a
		>, <a href="/category-implication/abelian_implies_regular">abelian ⟹ regular</a> ...
	</StatsCard>
</section>

<div class="features">
	<article class="feature-card">
		<h2>
			<Fa icon={faDatabase} /> Structures
		</h2>

		<p>
			Browse a comprehensive collection of categorical structures, including
			<a class="accent" href="/category-list">categories</a> and
			<a class="accent" href="/functor-list">functors</a>, each with detailed
			descriptions, proofs of their properties, and related structures.
		</p>
	</article>
	<article class="feature-card">
		<h2>
			<Fa icon={faList} /> Properties
		</h2>

		<p>
			Browse properties of categorical structures, including
			<a class="accent" href="/category-properties">category properties</a> and
			<a class="accent" href="/functor-properties">functor properties</a>, each with
			relevant results, structures satisfying or not satisfying the property, and
			related properties.
		</p>
	</article>

	<article class="feature-card">
		<h2>
			<Fa icon={faChartDiagram} />
			Deduction System
		</h2>

		<p>
			Implications between properties of categorical structures, including
			<a class="accent" href="/category-implications">category implications</a> and
			<a class="accent" href="/functor-implications">functor implications</a>, power
			a deduction system that automatically infers satisfied and unsatisfied
			properties.
		</p>
	</article>

	<article class="feature-card">
		<h2>
			<Fa icon={faSearch} /> Search by properties
		</h2>

		<p>
			Search for categorical structures such as
			<a class="accent" href="/category-search">categories</a>
			or
			<a class="accent" href="/functor-search">functors</a>
			satisfying specific properties while not satisfying others. Inconsistent property
			combinations are detected.
		</p>
	</article>

	<article class="feature-card">
		<h2>
			<Fa icon={faChartBar} /> Compare structures
		</h2>
		<p>
			Compare categorical structures such as
			<a class="accent" href="/category-comparison">categories</a>
			or
			<a class="accent" href="/functor-comparison">functors</a>
			to identify similarities and differences in their properties.
		</p>
	</article>

	<article class="feature-card">
		<h2>
			<Fa icon={faUsers} /> Community-driven
		</h2>
		<p>
			This <a
				class="accent"
				href="https://github.com/ScriptRaccoon/catdat"
				target="_blank"
			>
				open-source project
			</a>
			welcomes <a class="accent" href="/content/contribute">contributions</a>
			to fill in <a class="accent" href="/missing">missing data</a>
			or observe new combinations of properties.
		</p>
	</article>
</div>

<style>
	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		margin-block: 2rem;
	}

	.features {
		margin-block: 2rem;
		display: grid;
		gap: 1.25rem;

		@media (min-width: 600px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.feature-card {
		background-color: var(--card-color);
		padding: 1rem 1.5rem;
		border-radius: 1rem;
		outline: 1px solid var(--secondary-outline-color);
		box-shadow: 0 0 1rem var(--card-shadow);

		h2 {
			margin-block: 1rem;
		}
	}
</style>
