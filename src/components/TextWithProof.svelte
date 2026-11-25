<script lang="ts">
	import Fa from 'svelte-fa'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import type { Snippet } from 'svelte'
	import {
		open_proof,
		popup_state,
		register_proof,
		unregister_proof
	} from './Popup.svelte'

	type Props = {
		children: Snippet
		claim: string
		proof: string
		proof_key: string
		is_duplicate?: boolean
	}

	let { children, claim, proof, proof_key, is_duplicate = false }: Props = $props()

	const id = $props.id()

	let wrapper = $state<HTMLElement | null>(null)

	$effect(() => {
		if (is_duplicate || !wrapper) return
		const key = proof_key
		register_proof(key, { id, claim, proof, element: wrapper })
		return () => unregister_proof(key, id)
	})

	function show_proof(e: MouseEvent) {
		e.stopPropagation()
		open_proof(proof_key)
	}
</script>

<span class="wrapper" class:expanded={popup_state?.id === id} bind:this={wrapper}>
	<button onclick={show_proof} aria-label="Show proof">
		<Fa icon={faInfoCircle} />
	</button>

	<span>{@render children()}</span>
</span>

<style>
	.wrapper {
		display: inline-flex;
		align-items: start;
		gap: 0.35rem;
		scroll-margin-top: 25dvh;

		&.expanded {
			color: var(--accent-color);
		}
	}

	button {
		padding-inline: 0.25rem;
		margin-inline: -0.25rem;
		color: var(--secondary-text-color);
		transition: color 150ms;
	}
</style>
