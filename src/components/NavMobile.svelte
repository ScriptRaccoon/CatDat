<script lang="ts">
	import { get_footer_links, get_navigation_links } from '$lib/client/nav'
	import type { StructureType } from '$lib/commons/types'
	import { faXmark } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	type Props = {
		close: () => void
		selected_type: StructureType
	}

	let { close, selected_type }: Props = $props()
</script>

<nav>
	<button class="button" aria-label="close navigation" onclick={close}>
		<Fa icon={faXmark} />
	</button>

	<ul class="main-list">
		{#each get_navigation_links(selected_type) as { text, href, icon }}
			<li>
				<a {href}>
					{text}
					<Fa {icon} />
				</a>
			</li>
		{/each}
	</ul>

	<ul class="secondary-list">
		{#each get_footer_links() as { text, href, icon }}
			<li>
				<a {href}>{text}</a>
				<Fa {icon} scale={0.875} />
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		position: fixed;
		z-index: 10;
		inset: 0;
		padding-top: 1rem;
		padding-inline: 0.75rem;
		background-color: var(--bg-color);
		text-align: right;
	}

	ul {
		padding: 0;
		list-style-type: none;
		margin-top: 2rem;
	}

	ul.main-list {
		font-size: 1.25rem;

		li {
			margin-bottom: 0.5rem;
		}

		a {
			display: inline-flex;
			align-items: center;
			gap: 1rem;

			:global(svg) {
				color: var(--heading-color);
			}
		}
	}

	ul.secondary-list {
		color: var(--secondary-text-color);

		li {
			margin-bottom: 0.25rem;
		}
	}
</style>
