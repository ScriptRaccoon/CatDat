<script lang="ts">
	import { dev } from '$app/environment'
	import MetaData from '$components/MetaData.svelte'
	import {
		faChartBar,
		faChartDiagram,
		faDatabase,
		faList,
		faSearch,
		faUsers,
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
</script>

<MetaData />

<h2>
	A comprehensive and searchable database of categorical structures and their properties
</h2>

<p>
	<i>CatDat</i> provides a growing collection of
	<a class="accent" href="/categories">categories</a> and
	<a class="accent" href="/functors">functors</a>. Built by and for those who love
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
			Browse a comprehensive collection of <a class="accent" href="/categories"
				>categories</a
			>
			and <a class="accent" href="/functors">functors</a>, each with detailed
			descriptions, proofs of their properties, and related structures.
		</p>
	</article>
	<article class="feature-card">
		<h3>
			<Fa icon={faList} /> Properties
		</h3>

		<p>
			Browse a collection of <a href="/category-properties" class="accent"
				>properties of categories</a
			>
			and <a href="/functor-properties" class="accent">properties of functors</a>,
			each with relevant results, structures satisfying or not satisfying this
			property, and related properties.
		</p>
	</article>

	<article class="feature-card">
		<h3>
			<Fa icon={faChartDiagram} />
			Deduction System
		</h3>

		<p>
			<a class="accent" href="/category-implications">Category implications</a>
			and <a class="accent" href="/functor-implications">functor implications</a> leverage
			a deduction system that automatically deduces satisfied and unsatisfied properties
			from given ones.
		</p>
	</article>

	<article class="feature-card">
		<h3>
			<Fa icon={faSearch} /> Search by properties
		</h3>
		<p>
			Search for <a class="accent" href="/category-search"> categories </a>
			and <a class="accent" href="/functor-search">functors</a> that satisfy specific
			properties while not satisfying others. Inconsistent property combinations are detected.
		</p>
	</article>

	<article class="feature-card">
		<h3>
			<Fa icon={faChartBar} /> Compare structures
		</h3>
		<p>
			Compare <a class="accent" href="/category-comparison">categories</a>
			and <a class="accent" href="/functor-comparison">functors</a> directly to identify
			structural similarities and differences in their properties.
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
