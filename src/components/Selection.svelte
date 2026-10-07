<script lang="ts">
	import ChipGroup from './ChipGroup.svelte'
	import Chip from './Chip.svelte'
	import { get_comparison_score } from '#lib/client/utils.js'
	import type { Snippet } from 'svelte'
	import { remove_underscores } from '#shared/utils.js'
	import Listbox, { get_option_id } from './Listbox.svelte'

	type Props = {
		allowed_items: readonly string[]
		selected_items: string[]
		section_label: string
		item_label: string
		max?: number
		children?: Snippet
	}

	let {
		allowed_items,
		selected_items = $bindable(),
		section_label,
		item_label,
		max = Infinity,
		children
	}: Props = $props()

	let item = $state('')
	let show_suggestions = $state(false)
	let active_index = $state(0)

	const id = $props.id()
	const input_id = `${id}-input`
	const listbox_id = `${id}-listbox`

	let suggestions = $derived.by(() => {
		if (selected_items.length >= max) return []
		const q = item.trim()
		if (!q) return allowed_items
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

	function select(allowed_item?: string) {
		if (!allowed_item) return
		if (selected_items.includes(allowed_item)) return

		selected_items.push(allowed_item)
		item = ''
		show_suggestions = false
		active_index = 0
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

	let is_expanded = $derived(show_suggestions && suggestions.length > 0)

	function handle_keydown(e: KeyboardEvent) {
		const key = e.key

		switch (key) {
			case 'Escape':
				if (show_suggestions) show_suggestions = false
				break
			case 'Enter':
				select(suggestions.at(active_index))
				break
			case 'ArrowUp':
				e.preventDefault()
				if (active_index > 0) active_index--
				break
			case 'ArrowDown':
				e.preventDefault()
				if (active_index < suggestions.length - 1) active_index++
				break
		}
	}
</script>

<section aria-label={section_label}>
	{@render children?.()}

	<form onsubmit={handle_submit}>
		<input
			id={input_id}
			role="combobox"
			aria-label={remove_underscores(item_label)}
			aria-autocomplete="list"
			aria-controls={listbox_id}
			aria-expanded={is_expanded}
			aria-activedescendant={is_expanded
				? get_option_id(listbox_id, active_index)
				: undefined}
			name={item_label}
			aria-invalid={item.trim().length > 0 && !is_valid(item)}
			type="text"
			bind:value={item}
			onfocus={() => (show_suggestions = true)}
			onblur={() => (show_suggestions = false)}
			oninput={handle_input}
			onkeydown={handle_keydown}
		/>

		<Listbox
			id={listbox_id}
			label_id={input_id}
			options={suggestions.map((s) => ({ value: s, label: s }))}
			bind:active_index
			open={is_expanded}
			is_selected={(value) => selected_items.includes(value)}
			onselect={select}
		/>
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

	form {
		position: relative;
		margin-bottom: 1rem;

		input {
			width: 100%;
		}

		@media (min-width: 600px) {
			max-width: 28rem;
		}
	}
</style>
