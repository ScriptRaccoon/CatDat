<script lang="ts">
	import { dev } from '$app/environment'
	import MetaData from '$components/MetaData.svelte'
	import {
		faChartBar,
		faChartDiagram,
		faProjectDiagram,
		faSearch,
		faUsers,
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
</script>

<MetaData />

<h2>A comprehensive database of categories and their properties</h2>

<p>
	<i>CatDat</i> provides a growing collection of
	<a class="accent" href="/categories">categories</a> and
	<a class="accent" href="/functors">functors</a>, each with detailed descriptions and
	properties. Built by and for those who love
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
			<Fa icon={faChartDiagram} />
			Category Deductions
		</h3>

		<p>
			A list of <a class="accent" href="/category-implications">implications</a>
			between
			<a class="accent" href="/category-properties">properties of categories</a>
			allows for automatic deduction of satisfied and unsatisfied properties from more
			basic ones.
		</p>
	</article>

	<article class="feature-card">
		<h3>
			<Fa icon={faProjectDiagram} />
			Functor Deductions
		</h3>

		<p>
			There is also a list of <a class="accent" href="/functor-implications"
				>implications</a
			>
			between <a class="accent" href="/functor-properties">functor properties</a>,
			enabling automatic reasoning about functors.
		</p>
	</article>

	<article class="feature-card">
		<h3>
			<Fa icon={faSearch} /> Search by properties
		</h3>
		<p>
			You can easily <a class="accent" href="/category-search"
				>search for categories</a
			>
			and <a class="accent" href="/functor-search">search for functors</a>
			that satisfy specific properties while not satisfying others.
		</p>
	</article>

	<article class="feature-card">
		<h3>
			<Fa icon={faChartBar} /> Compare categories
		</h3>
		<p>
			You can <a class="accent" href="/category-comparison">compare categories</a> to
			see how their properties align or differ.
		</p>
	</article>

	<article class="feature-card centered">
		<h3>
			<Fa icon={faUsers} /> Community-driven
		</h3>
		<p>
			This project is <a
				class="accent"
				href="https://github.com/ScriptRaccoon/catdat"
				target="_blank"
			>
				open-source
			</a>
			and welcomes <a class="accent" href="/contribute">contributions</a>
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

			.centered {
				width: 50%;
				margin-inline: auto;
				grid-column: 1 / -1;
			}
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

	.video-container {
		margin-block: 2rem;
		display: flex;
		justify-content: center;

		iframe {
			max-width: 600px;
			aspect-ratio: 16/9;
			border: 1px solid var(--secondary-outline-color);
			border-radius: 0.5rem;
		}
	}
</style>
