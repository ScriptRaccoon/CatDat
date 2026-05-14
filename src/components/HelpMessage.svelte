<script lang="ts">
	import { browser } from '$app/environment'
	import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
	import type { Snippet } from 'svelte'
	import Fa from 'svelte-fa'

	type Props = {
		id: string
		children: Snippet
	}

	let { id, children }: Props = $props()

	let show_message = $derived(browser && !window.localStorage.getItem(`help:${id}`))

	function hide_message() {
		show_message = false
		if (!browser) return
		window.localStorage.setItem(`help:${id}`, 'hide')
	}
</script>

{#if show_message}
	<div class="message">
		<Fa icon={faLightbulb} color="var(--accent-color)" />&nbsp;
		{@render children()}
		<button onclick={hide_message}>Hide this message</button>
	</div>
{/if}

<style>
	.message {
		margin-block: 1rem;
		font-size: 1rem;
		background-color: var(--secondary-bg-color);
		padding: 0.5rem 1rem;
		border-radius: 1rem;
	}

	button {
		text-decoration: underline;
	}
</style>
