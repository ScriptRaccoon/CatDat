<script lang="ts">
	import type { Snippet } from 'svelte'

	type Props = {
		children: Snippet
		handle_click?: () => void
		size?: 'small' | 'medium'
		selected?: boolean
		link?: string
	}

	let { children, handle_click, size = 'medium', selected, link }: Props = $props()
</script>

{#if link}
	<a href={link} class="chip {size}">
		{@render children()}
	</a>
{:else if handle_click}
	<button class="chip {size}" onclick={handle_click} aria-pressed={selected}>
		{@render children()}
	</button>
{/if}

<style>
	.chip {
		display: inline-block;
		border-radius: 100vw;
		background-color: var(--secondary-bg-color);
		outline: 1px solid var(--secondary-outline-color);
		transition: outline-color 150ms;
	}

	.chip.medium {
		font-size: 1rem;
		padding: 0.2rem 0.875rem;
	}

	.chip.small {
		font-size: 0.875rem;
		padding: 0.15rem 0.85rem;
	}

	.chip:hover,
	.chip:focus-visible {
		outline-color: var(--link-underline-color);
	}

	a.chip {
		text-decoration: none;
	}
</style>
