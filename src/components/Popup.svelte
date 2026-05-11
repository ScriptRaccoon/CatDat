<!--
In theory, it is better to use a <dialog> here, but Safari makes many
problems, Firefox does not display the native animation, and there is
an issue when clicking two reasons in a row. So it's a <div> then.
-->

<script lang="ts" module>
	type PopupState = {
		id?: string
		open: boolean
		heading: string
		text: string
	}

	export const popup_state = $state<PopupState>({
		id: '',
		open: false,
		heading: '',
		text: '',
	})

	export function show_popup(data: Omit<PopupState, 'open'>) {
		popup_state.open = true
		popup_state.id = data.id
		popup_state.heading = data.heading
		popup_state.text = data.text
	}

	export function close_popup() {
		popup_state.open = false
		delete popup_state.id
	}
</script>

<script lang="ts">
	import { afterNavigate } from '$app/navigation'

	import { faXmark } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	afterNavigate(() => {
		close_popup()
	})

	function handle_keydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && popup_state.open) {
			close_popup()
		}
	}

	function handle_click(e: MouseEvent) {
		const target = e.target as HTMLElement
		const clicked_inside = popup?.contains(target)
		if (popup_state.open && !clicked_inside) {
			close_popup()
		}
	}

	let popup = $state<HTMLElement | null>(null)
</script>

<svelte:document onkeydown={handle_keydown} />
<svelte:window onclick={handle_click} />

<div class="popup" class:open={popup_state.open} bind:this={popup}>
	<div class="content">
		<header>
			<h3>{popup_state.heading}</h3>
			<button onclick={close_popup} aria-label="close popup">
				<Fa icon={faXmark} />
			</button>
		</header>
		{@html popup_state.text}
	</div>
</div>

<style>
	header {
		margin-block: 0rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	h3 {
		margin: 0;
	}

	.content {
		max-width: 800px;
		margin: 0 auto;

		:global(a:has(.katex)) {
			text-decoration: none;
			border-bottom: 1px solid var(--outline-color);
		}
	}

	.popup {
		--speed: 120ms;
		position: fixed;
		z-index: 5;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--bg-color);
		border-top: 2px solid var(--secondary-outline-color);
		color: var(--text-color);
		padding-inline: 1rem;
		padding-block: 1rem 1.5rem;
		box-shadow: 0 0 3rem var(--bg-color);

		opacity: 0;
		transform: translateY(1.5rem);
		pointer-events: none;

		transition:
			opacity var(--speed) linear,
			transform var(--speed) ease-out;
	}

	.popup.open {
		opacity: 1;
		transform: translateY(0);
		pointer-events: initial;
	}

	button {
		padding: 0.2rem 1rem;
	}
</style>
