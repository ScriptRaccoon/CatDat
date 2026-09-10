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
	const animation_duration = 1500

	let has_shown_animation = $state(
		browser && window.sessionStorage.getItem(storage_key) === '1'
	)

	let current_number = $state(0)

	$effect(() => {
		if (has_shown_animation) {
			current_number = number
			return
		}

		const start_time = performance.now()

		const update = (time: number) => {
			const progress = Math.max(
				Math.min((time - start_time) / animation_duration, 1),
				0
			)

			const eased_progress = 1 - (1 - progress) ** 3
			current_number = Math.round(number * eased_progress)

			if (progress < 1) {
				requestAnimationFrame(update)
			} else {
				has_shown_animation = true
				window.sessionStorage.setItem(storage_key, '1')
			}
		}

		requestAnimationFrame(update)
	})
</script>

<article>
	<span class="number" class:done={has_shown_animation}>
		<span aria-hidden="true">{current_number.toLocaleString('en-US')}</span>
		<span class="visually-hidden">{number}</span>
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
