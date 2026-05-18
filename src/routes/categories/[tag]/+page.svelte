<script lang="ts">
	import EntityList from '$components/EntityList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import { pluralize } from '$lib/client/utils'

	let { data } = $props()
</script>

<MetaData title="List of categories tagged with '{data.tag}'" />

<h2>List of categories tagged with '{data.tag}'</h2>

<p class="hint">
	{pluralize(data.categories.length, {
		one: 'Found {count} category',
		other: 'Found {count} categories',
	})}
</p>

<EntityList entities={data.categories} type="category" />
