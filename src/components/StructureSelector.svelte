<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/state'
	import type { StructureType } from '#lib/commons/types.ts'
	import { STRUCTURE_TYPES, PLURALS } from '#shared/config.ts'
	import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import Listbox, { get_option_id } from './Listbox.svelte'

	type Props = {
		selected_type: StructureType
		variant: 'header' | 'nav_mobile'
	}

	let { selected_type, variant }: Props = $props()

	const id = $props.id()
	const label_id = `${id}-label`
	const listbox_id = `${id}-listbox`

	let expanded = $state(false)
	let active_index = $state(0)

	function open() {
		active_index = Math.max(0, STRUCTURE_TYPES.indexOf(selected_type))
		expanded = true
	}

	function close() {
		expanded = false
	}

	function toggle() {
		if (expanded) close()
		else open()
	}

	function select(type: StructureType) {
		close()
		if (type === selected_type) return
		selected_type = type
		navigate_to(type)
	}

	function navigate_to(type: StructureType) {
		const path = page.url.pathname

		if (path.endsWith('-implications')) {
			goto(`/${type}-implications`)
		} else if (path.endsWith('-properties')) {
			goto(`/${type}-properties`)
		} else if (path.endsWith('-search')) {
			goto(`/${type}-search`)
		} else if (path.endsWith('-search/results')) {
			goto(`/${type}-search`)
		} else if (path.includes('-comparison')) {
			goto(`/${type}-comparison`)
		} else {
			goto(`/${type}-list`)
		}
	}

	function handle_keydown(e: KeyboardEvent) {
		const last_index = STRUCTURE_TYPES.length - 1

		if (!expanded) {
			if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
				e.preventDefault()
				open()
			}
			return
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault()
				if (active_index < last_index) active_index++
				break
			case 'ArrowUp':
				e.preventDefault()
				if (active_index > 0) active_index--
				break
			case 'Home':
				e.preventDefault()
				active_index = 0
				break
			case 'End':
				e.preventDefault()
				active_index = last_index
				break
			case 'Enter':
			case ' ':
				e.preventDefault()
				select(STRUCTURE_TYPES[active_index])
				break
			case 'Escape':
				e.preventDefault()
				close()
				break
			case 'Tab':
				close()
				break
		}
	}
</script>

<div class="selector {variant}">
	<span id={label_id} class="visually-hidden">Structure</span>

	<div
		class="combobox"
		role="combobox"
		tabindex="0"
		aria-labelledby={label_id}
		aria-haspopup="listbox"
		aria-controls={listbox_id}
		aria-expanded={expanded}
		aria-activedescendant={expanded
			? get_option_id(listbox_id, active_index)
			: undefined}
		onclick={toggle}
		onkeydown={handle_keydown}
		onblur={close}
	>
		<span>{PLURALS[selected_type]}</span>
		<span class="caret">
			<Fa icon={faChevronDown} scale={0.75} />
		</span>
	</div>

	<Listbox
		id={listbox_id}
		{label_id}
		options={STRUCTURE_TYPES.map((type) => ({ value: type, label: PLURALS[type] }))}
		bind:active_index
		open={expanded}
		align={variant === 'nav_mobile' ? 'right' : 'left'}
		is_selected={(value) => value === selected_type}
		onselect={(value) => select(value as StructureType)}
	/>
</div>

<style>
	.selector {
		position: relative;
		font-size: 1rem;
		width: fit-content;

		&.nav_mobile {
			margin-top: 1rem;
			margin-left: auto;
		}
	}

	.combobox {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		user-select: none;
	}

	.caret {
		display: inline-flex;
		color: var(--secondary-text-color);
	}

	.combobox[aria-expanded='true'] .caret {
		transform: rotate(180deg);
	}
</style>
