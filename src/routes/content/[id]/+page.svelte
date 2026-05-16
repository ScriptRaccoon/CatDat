<script lang="ts">
	import MetaData from '$components/MetaData.svelte'

	let { data } = $props()
</script>

<MetaData title={data.meta_data.title} description={data.meta_data.description} />

<div class="content">
	{@html data.html}
</div>

<style>
	.content {
		:global(img) {
			width: min(100%, 30rem);
			margin-inline: auto;
			border-radius: 1rem;
		}

		:global(svg.diagram) {
			width: 100%;
			margin-block: 1rem;
		}

		:global(.theorem) {
			padding: 0.5rem 1rem;
			border-radius: 0.4rem;
			border: 1px solid var(--secondary-outline-color);
			background-color: var(--theorem-bg-color);
			margin-block: 1.5rem;

			:global(.theorem-title) {
				font-weight: 600;
				margin-right: 0.75rem;
			}
		}

		:global(span.qed) {
			float: right;
		}
	}
</style>
