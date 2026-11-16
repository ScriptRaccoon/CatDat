<script lang="ts" module>
	import { goto } from '$app/navigation'

	type PopupState = {
		id: string
		open: boolean
		heading: string
		text: string
		expanded: boolean
	}

	export const popup_state = $state<PopupState>({
		id: '',
		open: false,
		heading: '',
		text: '',
		expanded: false
	})

	export function show_popup(data: Omit<PopupState, 'open'>) {
		popup_state.open = true
		popup_state.id = data.id
		popup_state.heading = data.heading
		popup_state.text = data.text
		popup_state.expanded = data.expanded
	}

	export function close_popup() {
		popup_state.open = false
		popup_state.id = ''
		back_stack.length = 0
		set_proof_param(null)
	}

	/**
	 * Proofs that were left by clicking a link to another proof, with the
	 * scroll position of the popup, so that the user can go back to them.
	 */
	const back_stack = $state<{ href: string; scroll_top: number }[]>([])

	/**
	 * Proofs on structure pages are reflected in the URL by the query
	 * parameter "proof". The pages are prerendered, so the parameter is
	 * read and written only on the client.
	 */
	type RegisteredProof = {
		id: string
		proof: string
		element: HTMLElement
	}

	const registered_proofs = new Map<string, RegisteredProof>()

	export function register_proof(key: string, registered_proof: RegisteredProof) {
		registered_proofs.set(key, registered_proof)
	}

	/**
	 * Only removes the registration of the given component, since during a
	 * navigation the next page may register the same key before the
	 * components of the previous page are destroyed.
	 */
	export function unregister_proof(key: string, id: string) {
		if (registered_proofs.get(key)?.id === id) {
			registered_proofs.delete(key)
		}
	}

	export function open_proof(key: string) {
		const registered_proof = registered_proofs.get(key)
		if (!registered_proof) return
		back_stack.length = 0
		show_popup({
			id: registered_proof.id,
			heading: 'Proof',
			text: registered_proof.proof,
			expanded: false
		})
		set_proof_param(key)
	}

	function set_proof_param(key: string | null) {
		const url = new URL(location.href)
		if (!key && !url.searchParams.has('proof')) return
		if (key) url.searchParams.set('proof', key)
		else url.searchParams.delete('proof')
		goto(url, { replace: true, reset: false })
	}
</script>

<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation'
	import { faArrowLeft, faExpand, faXmark } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import { tick } from 'svelte'

	let popup = $state<HTMLElement | null>(null)

	beforeNavigate(({ from, to, type }) => {
		if (!popup || !from || !to || type !== 'link') return

		const between_proofs =
			popup_state.open &&
			from.url.searchParams.has('proof') &&
			to.url.searchParams.has('proof')

		if (between_proofs) {
			back_stack.push({ href: from.url.href, scroll_top: popup.scrollTop })
		}
	})

	afterNavigate(async ({ from, to, type }) => {
		const key = to?.url.searchParams.get('proof')
		const registered_proof = key ? registered_proofs.get(key) : undefined

		if (!to || !registered_proof) {
			close_popup()
			return
		}

		// the URL update by open_proof, which has already opened the proof
		const already_open = popup_state.open && popup_state.id === registered_proof.id
		if (type === 'goto' && already_open) return

		let scroll_top = 0

		if (type === 'popstate') {
			const index = back_stack.findLastIndex((entry) => entry.href === to.url.href)
			if (index >= 0) scroll_top = back_stack[index].scroll_top
			back_stack.length = Math.max(index, 0)
		} else if (type !== 'link') {
			back_stack.length = 0
		}

		// following a link from an expanded proof keeps the popup expanded
		show_popup({
			id: registered_proof.id,
			heading: 'Proof',
			text: registered_proof.proof,
			expanded: popup_state.open && popup_state.expanded
		})

		// on popstate, SvelteKit restores the scroll position of the page
		if (type !== 'popstate') {
			const same_page = from?.url.pathname === to.url.pathname
			registered_proof.element.scrollIntoView({
				block: 'start',
				behavior: same_page ? 'smooth' : 'instant'
			})
		}

		await tick()

		if (popup) popup.scrollTop = scroll_top
	})

	function go_back() {
		history.back()
	}

	function handle_keydown(e: KeyboardEvent) {
		if (popup_state.open && e.key === 'Escape') {
			close_popup()
		}
	}

	function handle_click(e: MouseEvent) {
		const clicked_inside = popup?.contains(e.target as HTMLElement)
		if (popup_state.open && !clicked_inside) {
			close_popup()
		}
	}

	function toggle_expanded() {
		popup_state.expanded = !popup_state.expanded
	}
</script>

<svelte:document onkeydown={handle_keydown}></svelte:document>
<svelte:window onclick={handle_click} />

<!--
In theory, it is better to use a <dialog> here, but Safari makes many
problems, Firefox does not display the native animation, and there is
an issue when clicking two proofs in a row. So it's a <div> then.
-->
<div
	class="popup"
	class:open={popup_state.open}
	class:expanded={popup_state.expanded}
	bind:this={popup}
>
	<div class="content underline-formula-links">
		<header>
			{#if back_stack.length}
				<button
					class="back"
					onclick={go_back}
					aria-label="back to previous proof"
				>
					<Fa icon={faArrowLeft} />
				</button>
			{/if}

			<h2>{popup_state.heading}</h2>

			<button
				onclick={toggle_expanded}
				aria-label={popup_state.expanded ? 'collapse' : 'expand'}
			>
				<Fa icon={faExpand} />
			</button>

			<button onclick={close_popup} aria-label="close popup">
				<Fa icon={faXmark} />
			</button>
		</header>
		{@html popup_state.text}
	</div>
</div>

<style>
	.popup {
		position: fixed;
		z-index: 5;
		bottom: 0;
		left: 0;
		right: 0;
		max-height: 50dvh;
		overflow-y: scroll;
		background-color: var(--bg-color);
		border-top: 2px solid var(--secondary-outline-color);
		color: var(--text-color);
		padding-inline: 1rem;
		padding-block: 1rem 1.5rem;
		box-shadow: 0 0 3rem var(--bg-color);

		opacity: 0;
		visibility: hidden;
		transform: translateY(1.5rem);
		pointer-events: none;

		transition:
			opacity 140ms linear,
			transform 140ms ease-out,
			visibility 0s linear 140ms;
	}

	.popup.open {
		visibility: visible;
		opacity: 1;
		transform: translateY(0);
		pointer-events: initial;

		transition:
			opacity 140ms linear,
			transform 140ms ease-out,
			visibility 0s;
	}

	.popup.expanded {
		max-height: unset;
		height: 100dvh;
	}

	.popup .content {
		max-width: 800px;
		margin: 0 auto;
	}

	.popup header {
		margin-block: 0rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;

		h2 {
			margin: 0;
			margin-right: auto;
		}

		button {
			padding: 0.2rem 1rem;
		}

		button.back {
			padding-inline: 0 0.75rem;
		}
	}
</style>
