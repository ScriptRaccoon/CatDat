<script lang="ts">
	import { page } from '$app/state'
	import type { Structure } from '$lib/commons/types'
	import {
		faArrowsSplitUpAndLeft,
		faChartBar,
		faDatabase,
		faHome,
		faList,
		faSearch,
		type IconDefinition,
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	type Props = {
		structure: Structure
	}

	let { structure }: Props = $props()

	type Link = {
		href: string
		text: string
		nested?: string
		icon: IconDefinition
		structure?: Structure
	}

	const links: Link[] = [
		{
			href: '/',
			text: 'Home',
			icon: faHome,
		},
		{
			href: '/categories',
			text: 'Categories',
			nested: '/category/',
			icon: faDatabase,
			structure: 'categories',
		},
		{
			href: '/category-properties',
			text: 'Properties',
			nested: '/category-property/',
			icon: faList,
			structure: 'categories',
		},
		{
			href: '/category-implications',
			text: 'Implications',
			nested: '/category-implication',
			icon: faArrowsSplitUpAndLeft,
			structure: 'categories',
		},
		{
			href: '/category-comparison',
			text: 'Compare',
			icon: faChartBar,
			nested: '/category-comparison',
			structure: 'categories',
		},
		{
			href: '/category-search',
			text: 'Search',
			icon: faSearch,
			nested: '/category-search/results',
			structure: 'categories',
		},
		{
			href: '/functors',
			text: 'Functors',
			nested: '/functor/',
			icon: faDatabase,
			structure: 'functors',
		},
		{
			href: '/functor-properties',
			text: 'Properties',
			nested: '/functor-property',
			icon: faList,
			structure: 'functors',
		},
		{
			href: '/functor-implications',
			text: 'Implications',
			nested: '/functor-implication',
			icon: faArrowsSplitUpAndLeft,
			structure: 'functors',
		},
		{
			href: '/functor-search',
			text: 'Search',
			icon: faSearch,
			structure: 'functors',
		},
	]

	let displayed_links = $derived(
		links.filter((link) => !link.structure || link.structure === structure),
	)
</script>

<nav>
	<ul>
		{#each displayed_links as { nested, href, text, icon }}
			<li
				class:current={page.url.pathname === href ||
					(nested && page.url.pathname.startsWith(nested))}
			>
				<a {href}><Fa {icon} scale={0.85} /> {text}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		padding-bottom: 1.5rem;

		@media (width <= 600px) {
			display: none;
		}
	}

	ul {
		padding: 0;
		list-style-type: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem 1.5rem;
	}

	a {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	li.current a {
		color: var(--accent-color);
		text-decoration-color: var(--accent-color);
	}

	li:not(.current) :global(svg) {
		color: var(--heading-color);
	}
</style>
