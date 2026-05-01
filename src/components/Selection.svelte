<script lang="ts">
	import ChipGroup from './ChipGroup.svelte'
	import Chip from './Chip.svelte'
	import { get_comparison_score, normalize_text } from '$lib/client/utils'

	type Props = {
		title?: string
		allowed_items: readonly string[]
		selected_items: string[]
		section_label: string
		item_label: string
		max?: number
	}

	let {
		title,
		allowed_items,
		selected_items = $bindable(),
		section_label,
		item_label,
		max = Infinity,
	}: Props = $props()

	let item = $state('')
	let show_suggestions = $state(false)
	let active_index = $state(0)

	const id = $props.id()

	let suggestions = $derived.by(() => {
		if (selected_items.length >= max) return []
		const q = item.trim()
		if (!q) return []
		return allowed_items
			.filter((a) => !selected_items.includes(a))
			.map((a) => ({ a, r: get_comparison_score(a, q) }))
			.filter((x) => x.r > 0)
			.sort((x, y) => y.r - x.r || x.a.localeCompare(y.a))
			.map((x) => x.a)
	})

	function is_valid(item: string) {
		return (
			allowed_items.includes(item.trim()) &&
			!selected_items.includes(item.trim()) &&
			selected_items.length < max
		)
	}

	function handle_submit(e: SubmitEvent) {
		e.preventDefault()
		if (!is_valid(item)) return
		selected_items.push(item.trim())
		item = ''
		active_index = 0
	}

	function select(allowed_item: string) {
		selected_items.push(allowed_item)
		item = ''
		show_suggestions = false
		active_index = 0
	}

	let suggestions_element = $state<HTMLDivElement | null>(null)

	function handle_blur(e: FocusEvent) {
		const is_suggestion_click = suggestions_element?.contains(e.relatedTarget as Node)
		if (!is_suggestion_click) show_suggestions = false
	}

	function handle_input() {
		const last_char = item.slice(-1)
		const rest = item.slice(0, -1).trim()

		if (last_char === ',' && is_valid(rest)) {
			selected_items.push(rest)
			item = ''
			show_suggestions = false
		} else {
			show_suggestions = true
		}

		active_index = 0
	}

	function remove_item(item: string) {
		selected_items = selected_items.filter((_item) => _item !== item)
	}

	function handle_keydown(e: KeyboardEvent) {
		const key = e.key

		switch (key) {
			case 'Escape':
				if (show_suggestions) show_suggestions = false
				break
			case 'Enter':
				select(suggestions[active_index])
				break
			case 'ArrowUp':
				if (active_index > 0) {
					active_index--
					scroll_to_option()
				}
				break
			case 'ArrowDown':
				if (active_index < suggestions.length - 1) {
					active_index++
					scroll_to_option()
				}
				break
		}
	}

	function scroll_to_option() {
		document.querySelector(`#${id}-${active_index}`)?.scrollIntoView({
			block: 'center',
		})
	}
</script>

<section aria-label={section_label}>
	{#if title}
		<p>{@html title}</p>
	{/if}

	<form onsubmit={handle_submit}>
		<div class="input-wrapper">
			<input
				aria-label={item_label}
				name={item_label}
				aria-invalid={item.trim().length > 0 && !is_valid(item)}
				type="text"
				bind:value={item}
				onfocus={() => (show_suggestions = true)}
				oninput={handle_input}
				onkeydown={handle_keydown}
				onblur={handle_blur}
			/>
		</div>

		{#if show_suggestions && suggestions.length > 0}
			<div class="suggestions" bind:this={suggestions_element} tabindex="-1">
				{#each suggestions as allowed_item, i}
					<button
						id="{id}-{i}"
						tabindex="-1"
						class="option"
						class:selected={i === active_index}
						onclick={() => select(allowed_item)}
					>
						{allowed_item}
					</button>
				{/each}
			</div>
		{/if}
	</form>

	<ChipGroup>
		{#each selected_items as selected_item}
			<Chip handle_click={() => remove_item(selected_item)}>
				{selected_item}
			</Chip>
		{/each}
	</ChipGroup>
</section>

<style>
	section {
		margin-block: 1.5rem;
	}

	.input-wrapper {
		margin-bottom: 1rem;

		input {
			width: 100%;
		}

		@media (min-width: 600px) {
			max-width: 28rem;
		}
	}

	form {
		position: relative;
	}

	.suggestions {
		position: absolute;
		z-index: 5;
		max-height: 12rem;
		overflow-y: scroll;
		scrollbar-width: thin;
		top: calc(100% + 0.25rem);
		background-color: var(--bg-color);
		border: 1px solid var(--outline-color);
		border-radius: 0.4rem;
		box-shadow: 0 0 1rem var(--shadow-color);
		display: grid;
	}

	.option {
		font-size: 1rem;
		text-align: left;
		padding: 0.25rem 1rem;

		&.selected {
			background-color: var(--secondary-bg-color);
		}
	}
</style>
