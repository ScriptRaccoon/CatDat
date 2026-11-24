<script lang="ts">
	import { get_shortcut_label } from '#lib/client/shortcut.ts'

	let label = $state('')

	// the device is not known when the page is prerendered
	$effect(() => {
		label = get_shortcut_label()
	})
</script>

<!--
	To be used as a sibling after an empty input that is focused by the shortcut.
	Screen readers get the shortcut from the aria-keyshortcuts attribute of the input.
-->
{#if label}
	<kbd aria-hidden="true">{label}</kbd>
{/if}

<style>
	kbd {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		pointer-events: none;
		padding: 0.1rem 0.35rem;
		border: 1px solid var(--secondary-outline-color);
		border-radius: 0.25rem;
		font-family: var(--text-font);
		font-size: 0.75rem;
		line-height: 1.25;
		color: var(--secondary-text-color);
	}

	/* not enough space for the hint, or most likely no keyboard */
	@media (width <= 600px), (hover: none), (pointer: coarse) {
		kbd {
			display: none;
		}
	}

	:global(input:focus) ~ kbd {
		display: none;
	}
</style>
