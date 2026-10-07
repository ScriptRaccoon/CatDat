<script lang="ts" module>
	export function get_option_id(listbox_id: string, index: number) {
		return `${listbox_id}-option-${index}`
	}
</script>

<script lang="ts">
	type Option = {
		value: string
		label: string
	}

	type Props = {
		id: string
		options: Option[]
		active_index: number
		open: boolean
		onselect: (value: string) => void
		is_selected?: (value: string) => boolean
		align?: 'left' | 'right'
		label_id?: string
	}

	let {
		id,
		options,
		active_index = $bindable(),
		open,
		onselect,
		is_selected = () => false,
		align = 'left',
		label_id
	}: Props = $props()

	let listbox = $state<HTMLDivElement | null>(null)

	$effect(() => {
		if (!open || !listbox) return
		const option = listbox.querySelector(
			`#${CSS.escape(get_option_id(id, active_index))}`
		)
		option?.scrollIntoView({ block: 'nearest' })
	})
</script>

<!--
	Focus stays on the element controlling the listbox (aria-activedescendant pattern),
	so the listbox and its options are not focusable. Keyboard handling happens there.
	mousedown is prevented so that the controlling element keeps the focus.
-->
<!-- svelte-ignore a11y_interactive_supports_focus -->
<div
	class="listbox {align}"
	{id}
	role="listbox"
	aria-labelledby={label_id}
	hidden={!open}
	bind:this={listbox}
	onmousedown={(e) => e.preventDefault()}
>
	{#each options as option, index}
		<!-- svelte-ignore a11y_interactive_supports_focus, a11y_click_events_have_key_events -->
		<div
			class="option"
			id={get_option_id(id, index)}
			role="option"
			aria-selected={is_selected(option.value)}
			class:active={index === active_index}
			onclick={() => onselect(option.value)}
			onmouseenter={() => (active_index = index)}
		>
			{option.label}
		</div>
	{/each}
</div>

<style>
	.listbox {
		position: absolute;
		z-index: 20;
		top: calc(100% + 0.35rem);
		min-width: 100%;
		width: max-content;
		max-width: calc(100vw - 2rem);
		max-height: 12rem;
		overflow-y: auto;
		scrollbar-width: thin;
		padding: 0.25rem;
		background-color: var(--bg-color);
		border: 1px solid var(--secondary-outline-color);
		border-radius: 0.4rem;
		box-shadow: 0 0.25rem 0.75rem var(--shadow-color);
		font-size: 1rem;
		text-align: left;

		&.left {
			left: 0;
		}

		&.right {
			right: 0;
		}

		&[hidden] {
			display: none;
		}
	}

	.option {
		padding: 0.2rem 0.5rem;
		border-radius: 0.25rem;
		cursor: pointer;

		&.active {
			background-color: var(--secondary-bg-color);
		}

		&[aria-selected='true'] {
			color: var(--accent-color);
		}
	}
</style>
