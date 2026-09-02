<script lang="ts">
	import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
	import hljs from 'highlight.js/lib/core'
	import sql from 'highlight.js/lib/languages/sql'
	import Fa from 'svelte-fa'

	hljs.registerLanguage('sql', sql)

	type Props = {
		language: 'sql'
		title: string
		code: string
	}

	let { language, title, code }: Props = $props()

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

	<pre>{@html hljs.highlight(normalized_code, { language }).value}</pre>
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

	:global(.hljs-keyword),
	:global(.hljs-selector-tag),
	:global(.hljs-built_in),
	:global(.hljs-title),
	:global(.hljs-name) {
		color: var(--accent-color);
		font-weight: 600;
	}

	:global(.hljs-string),
	:global(.hljs-quote),
	:global(.hljs-symbol),
	:global(.hljs-number),
	:global(.hljs-literal) {
		color: var(--success-color);
	}
</style>
