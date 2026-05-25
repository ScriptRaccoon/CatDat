<script lang="ts">
	import Fa from 'svelte-fa'
	import { get_footer_links } from '$lib/client/nav'
</script>

<footer class="hint">
	<ul>
		{#each get_footer_links() as { text, href, icon }}
			<li>
				<Fa {icon} scale={0.875} />
				<a {href}>{text}</a>
			</li>
		{/each}
	</ul>
</footer>

<style>
	footer {
		margin-bottom: 1.5rem;
	}

	ul {
		list-style-type: none;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1.25rem;
	}

	@media (width <= 600px) {
		footer {
			display: none;
		}
	}
</style>
