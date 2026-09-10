<script lang="ts">
	import { browser } from '$app/environment'
	import type { Snippet } from 'svelte'

	type Props = {
		number: number
		title: string
		children: Snippet
	}

	let { number, title, children }: Props = $props()

	const storage_key = 'has_shown_stats_animation'

	let has_shown_animation = $state(
		browser && window.sessionStorage.getItem(storage_key) === '1'
	)

	let current_number = $derived(has_shown_animation ? number : 0)

	$effect(() => {
		if (has_shown_animation) return

		const STEP = Math.round(number / 150)

		let interval = setInterval(() => {
			if (current_number < number) {
				current_number = Math.min(current_number + STEP, number)
			} else {
				has_shown_animation = true
				window.sessionStorage.setItem(storage_key, '1')
				clearInterval(interval)
			}
		}, 10)
	})
</script>

<article>
	<span class="number">
		{current_number.toLocaleString('en-US')}
	</span>
	<span class="title">
		{title}
	</span>
	<span class="description hint">
		{@render children()}
	</span>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		outline: 1px solid var(--secondary-outline-color);
		padding: 1.5rem 1rem;
		border-radius: 0.5rem;
		background-color: var(--card-color);
		text-align: center;
		text-wrap: balance;
	}

	.number {
		font-size: 2.5rem;
		color: var(--accent-color);
		line-height: 1;
		font-family: var(--mono-font);
	}

	.title {
		font-size: 1.5rem;
		font-family: var(--mono-font);
	}

	.description {
		margin-top: 0.5rem;

		:global(a) {
			text-decoration: none;
		}
	}
</style>
