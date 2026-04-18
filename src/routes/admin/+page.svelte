<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()
</script>

<MetaData title="Admin Page" />

<h2>Admin Page</h2>

<ul>
	<li>
		<a href="/admin/statistics">Statistics</a>
	</li>
</ul>
