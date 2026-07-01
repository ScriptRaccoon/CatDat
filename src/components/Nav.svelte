<script lang="ts">
	import { page } from '$app/state'
	import { get_navigation_links } from '$lib/client/nav'
	import type { StructureType } from '$lib/commons/types'

	import Fa from 'svelte-fa'

	type Props = {
		selected_type: StructureType
	}

	let { selected_type }: Props = $props()
</script>

<nav>
	<ul>
		{#each get_navigation_links(selected_type) as { nested, href, text, icon }}
			<li
				class:current={page.url.pathname === href ||
					(nested && nested.some((path) => page.url.pathname.startsWith(path)))}
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
