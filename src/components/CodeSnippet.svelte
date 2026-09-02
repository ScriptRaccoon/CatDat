<script lang="ts">
	import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	type Props = {
		title: string
		code: string
	}

	let { title, code }: Props = $props()

	let copied = $state(false)

	let normalized_code = $derived(code.replace(/^\s*\n/, '').trimEnd())

	function copy_code() {
		window.navigator.clipboard.writeText(normalized_code)
		copied = true
		setTimeout(() => (copied = false), 1500)
	}
</script>

<div class="snippet">
	<header>
		<h3>{title}</h3>
		<button aria-label="copy code" onclick={copy_code}>
			{#if copied}
				<Fa icon={faCheck} scale={0.875} color="var(--success-color)" />
			{:else}
				<Fa icon={faCopy} scale={0.75} color="var(--secondary-text-color)" />
			{/if}
		</button>
	</header>

	<pre>{normalized_code}</pre>
</div>

<style>
	.snippet {
		margin-block: 1.5rem 0.5rem;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: end;
		margin-bottom: 0.5rem;
	}

	pre {
		font-size: 0.875rem;
		white-space: pre-wrap;
		border: 1px solid var(--secondary-outline-color);
		padding: 0.75rem;
		border-radius: 0.25rem;
	}
</style>
