<script lang="ts">
	type Props = {
		title: string
		items: { href: string; label: string }[]
	}

	let { title, items }: Props = $props()

	let show_more = $state(false)
	let number_shown = $derived(show_more ? items.length : 5)
</script>

<section>
	<h2>{title}</h2>

	<ul class="with-margins">
		{#each items.slice(0, number_shown) as { href, label } (href)}
			<li>
				<a {href}>{label}</a>
			</li>
		{/each}
	</ul>

	{#if !show_more}
		<p>
			<button class="button" onclick={() => (show_more = true)}>Show more</button>
		</p>
	{/if}
</section>
