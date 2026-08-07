<script lang="ts">
	import { dev } from '$app/environment'
	import MetaData from '$components/MetaData.svelte'
	import {
		faChartBar,
		faChartDiagram,
		faDatabase,
		faList,
		faSearch,
		faUsers
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
</script>

<MetaData />

<h2>
	A comprehensive and searchable database of categorical structures and their properties
</h2>

<p>
	<i>CatDat</i> provides a growing collection of categorical structures such as
	<a class="accent" href="/category-list">categories</a>,
	<a class="accent" href="/functor-list">functors</a>,
	<a class="accent" href="/morphism-list">morphisms</a>, and
	<a class="accent" href="/symmetric_monoidal_category-list"
		>symmetric monoidal categories</a
	>. Built by and for those who love
	<a href="https://en.wikipedia.org/wiki/Category_theory" target="_blank">
		category theory
	</a>.
</p>

{#if !dev}
	<div class="video-container">
		<iframe
			src="https://www.youtube.com/embed/dQXbPxk__qA"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>
{/if}

<div class="features">
	<article class="feature-card">
		<h3>
			<Fa icon={faDatabase} /> Structures
		</h3>

		<p>
			Browse a comprehensive collection of categorical structures, including
			<a class="accent" href="/category-list">categories</a> and
			<a class="accent" href="/functor-list">functors</a>, each with detailed
			descriptions, proofs of their properties, and related structures.
		</p>
	</article>
	<article class="feature-card">
		<h3>
			<Fa icon={faList} /> Properties
		</h3>

		<p>
			Browse properties of categorical structures, including
			<a class="accent" href="/category-properties">category properties</a> and
			<a class="accent" href="/functor-properties">functor properties</a>, each with
			relevant results, structures satisfying or not satisfying the property, and
			related properties.
		</p>
	</article>

	<article class="feature-card">
		<h3>
			<Fa icon={faChartDiagram} />
			Deduction System
		</h3>

		<p>
			Implications between properties of categorical structures, including
			<a class="accent" href="/category-implications">category implications</a> and
			<a class="accent" href="/functor-implications">functor implications</a>, power
			a deduction system that automatically infers satisfied and unsatisfied
			properties.
		</p>
	</article>

	<article class="feature-card">
		<h3>
			<Fa icon={faSearch} /> Search by properties
		</h3>

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
		<h3>
			<Fa icon={faChartBar} /> Compare structures
		</h3>
		<p>
			Compare categorical structures such as
			<a class="accent" href="/category-comparison">categories</a>
			or
			<a class="accent" href="/functor-comparison">functors</a>
			to identify similarities and differences in their properties.
		</p>
	</article>

	<article class="feature-card">
		<h3>
			<Fa icon={faUsers} /> Community-driven
		</h3>
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

		h3 {
			margin-block: 1rem;
		}
	}
</style>
