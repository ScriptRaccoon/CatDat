<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import StatsCard from '$components/StatsCard.svelte'

	let { data } = $props()

	let show_more_recent = $state(false)
	let number_recent = $derived(show_more_recent ? data.recent_structures.length : 5)
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
				<a href="/{structure.type}/{structure.id}" aria-label={structure.name}>
					{@html structure.notation}
				</a>{#if !last}<span>,&nbsp;</span>{/if}
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

	<StatsCard number={data.stats.proof_number} title="Proofs of properties">
		e.g. <a href="/category/Haus" aria-label={data.selected_structures.Haus.name}>
			{@html data.selected_structures.Haus.notation}
		</a>
		is extensive,
		<a href="/category/FinAb" aria-label={data.selected_structures.FinAb.name}>
			{@html data.selected_structures.FinAb.notation}
		</a> is ℵ₁-accessible ...
	</StatsCard>

	<StatsCard number={data.stats.implication_number} title="Implications">
		e.g. <a href="/category-implication/pullbacks_criterion"
			>binary products ∧ equalizers ⟹ pullbacks</a
		>, <a href="/category-implication/abelian_implies_regular">abelian ⟹ regular</a> ...
	</StatsCard>
</section>

<section>
	<h2>Recently added structures</h2>

	<ul class="with-margins">
		{#each data.recent_structures.slice(0, number_recent) as structure (structure.id)}
			<li>
				<a href="/{structure.type}/{structure.id}">{structure.name}</a>
			</li>
		{/each}
	</ul>

	{#if !show_more_recent}
		<p>
			<button class="button" onclick={() => (show_more_recent = true)}
				>Show more</button
			>
		</p>
	{/if}
</section>

<section>
	<h2>Structures, Properties, Implications</h2>

	<p>
		<i>CatDat</i> currently supports four types of categorical structures:
		<a class="accent" href="/category-list">categories</a>,
		<a class="accent" href="/functor-list">functors</a>,
		<a class="accent" href="/morphism-list">morphisms</a>, and
		<a class="accent" href="/symmetric_monoidal_category-list"
			>symmetric monoidal categories</a
		>. Each structure has a detailed description, proofs of its properties (satisfied
		or unsatisfied), and related structures.
	</p>

	<p>
		For each type, there is a collection of properties, such as
		<a class="accent" href="/category-properties">category properties</a> and
		<a class="accent" href="/functor-properties">functor properties</a>. Each property
		has a detailed description, relevant results, structures satisfying or not
		satisfying the property, and related properties.
	</p>

	<p>
		For each type, there is a collection of implications, such as <a
			class="accent"
			href="/category-implications">category implications</a
		>
		and
		<a class="accent" href="/functor-implications">functor implications</a>, each with
		a detailed proof. They form the basis of a powerful deduction system that deduces,
		for every structure, new properties from given ones. Of the {data.stats
			.proof_number} proofs of properties in the database,
		{data.stats.automated_proof_number} have been automated ({Math.round(
			100 * (data.stats.automated_proof_number / data.stats.proof_number)
		)}%).
	</p>
</section>

<section>
	<h2>Search</h2>

	<p>
		<i>CatDat's</i> <a class="accent" href="/category-search">search feature</a> makes it
		easy to find structures that satisfy specific properties while not satisfying others.
		For example, you can find ...
	</p>

	<ul class="with-margins">
		<li>
			<a href="/category-search/results?satisfied=abelian&unsatisfied=well-powered"
				>abelian categories that are not well-powered</a
			>
		</li>
		<li>
			<a
				href="/category-search/results?satisfied=finitely_cocomplete&unsatisfied=terminal_object~cocomplete"
				>finitely cocomplete categories that have neither a terminal object nor
				are cocomplete</a
			>
		</li>
		<li>
			<a
				href="/functor-search/results?satisfied=cocontinuous&unsatisfied=preserves_monomorphisms"
				>cocontinuous functors that do not preserve monomorphisms</a
			>
		</li>
		<li>
			<a
				href="/morphism-search/results?satisfied=regular_monomorphism&unsatisfied=split_monomorphism"
				>regular monomorphisms that do not split</a
			>
		</li>
	</ul>

	<p>
		Any combination of properties is possible. Inconsistent combinations are detected
		as well (<a
			href="/category-search/results?satisfied=groupoid~binary_products~inhabited&unsatisfied=trivial"
			>example</a
		>).
	</p>
</section>

<section>
	<h2>Compare structures</h2>

	<p>
		<i>CatDat's</i>
		<a class="accent" href="/category-comparison">comparison feature</a> allows you to compare
		multiple categories, functors, etc. to identify similarities and differences in their
		properties. For example, you can compare ...
	</p>

	<ul class="with-margins">
		<li>
			<a href="/category-comparison/CRing/Ring">rings with commutative rings</a>
		</li>
		<li>
			<a href="/category-comparison/FinSet/Set_c/Set"
				>finite sets and countable sets with all sets
			</a>
		</li>
		<li>
			<a href="/category-comparison/grAb/Ch(Ab)"
				>graded modules with cochain complexes</a
			>
		</li>
		<li>
			<a href="/functor-comparison/power_set_contravariant/power_set_covariant"
				>the contravariant power set functor with the covariant power set functor
			</a>
		</li>
	</ul>
</section>

<section>
	<h2>Contribute to CatDat</h2>

	<p>
		<i>CatDat</i> is a <strong>community effort</strong>, developed in an
		<a class="accent" href="https://github.com/ScriptRaccoon/CatDat" target="_blank">
			open-source GitHub repository
		</a>.
	</p>

	<p>
		Whether you're a mathematician spotting missing data or a developer improving the
		interface, your contributions are welcome. A particularly useful way to help is to
		fill in
		<a href="/missing">missing information</a> in the database.
	</p>

	<p></p>

	<p>
		See <a class="accent" href="/content/contribute">how to contribute</a> for more information.
	</p>
</section>

<style>
	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1rem;
		margin-block: 2rem;
	}
</style>
