<script lang="ts">
	import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { focus_on_shortcut } from '#lib/client/shortcut.ts'
	import { close_popup } from './Popup.svelte'
	import ShortcutHint from './ShortcutHint.svelte'

	type Props = {
		search: string
		label?: string
		placeholder?: string
		full_width?: boolean
	}

	let {
		search = $bindable(),
		label = 'search filter',
		placeholder = 'Search...',
		full_width = false
	}: Props = $props()

	let search_actual = $state('')

	$effect(() => {
		search = search_actual.trim()
	})
</script>

<div class="search-filter" class:full-width={full_width}>
	<div class="input-container">
		<input
			type="search"
			id="search"
			aria-label={label}
			bind:value={search_actual}
			{placeholder}
			{@attach focus_on_shortcut(close_popup)}
		/>

		{#if search}
			<button
				class="clear"
				onclick={() => (search_actual = '')}
				aria-label="clear search"
			>
				<Fa icon={faXmark} color="var(--secondary-text-color)" scale={0.875} />
			</button>
		{:else}
			<ShortcutHint />
		{/if}
	</div>

	<Fa icon={faSearch} />
</div>

<style>
	.search-filter {
		display: inline-grid;
		width: min(32ch, 100%);
		grid-template-columns: 1fr auto;
		gap: 1rem;
		align-items: center;
		margin-bottom: 0.5rem;

		&.full-width {
			width: 100%;
		}
	}

	.input-container {
		position: relative;

		input {
			width: 100%;
		}

		.clear {
			position: absolute;
			right: 0.5rem;
			top: 50%;
			transform: translateY(-50%);
		}
	}
</style>
