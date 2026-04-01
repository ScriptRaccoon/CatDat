<script lang="ts">
	import { page } from '$app/state'
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

	type Link = {
		href: string
		text: string
		nested?: string
		icon: IconDefinition
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
		},
		{
			href: '/category-properties',
			text: 'Properties',
			nested: '/category-property/',
			icon: faList,
		},
		{
			href: '/category-implications',
			text: 'Implications',
			nested: '/category-implication',
			icon: faArrowsSplitUpAndLeft,
		},
		{
			href: '/category-comparison',
			text: 'Compare',
			nested: '/category-comparison',
			icon: faChartBar,
		},
		{
			href: '/category-search',
			text: 'Search',
			icon: faSearch,
		},
	]
</script>

<nav>
	<ul>
		{#each links as { nested, href, text, icon }}
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
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.25rem 1.25rem;
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
