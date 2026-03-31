<script>
	import FunctorImplicationList from '$components/FunctorImplicationList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import { pluralize } from '$lib/client/utils'

	let { data } = $props()
</script>

<MetaData
	title="List of implications of functors"
	description="Implications of functorial properties"
/>

<h2>List of implications of functors</h2>

<!-- TODO: add search feature if the list grows in the future -->
<!-- TODO: add dualized-toggle if the list grows in the future -->

<p class="hint">
	{pluralize(data.implications.length, {
		one: 'Found {count} implication',
		other: 'Found {count} implications',
	})}
</p>

<FunctorImplicationList implications={data.implications} />
