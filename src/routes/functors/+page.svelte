<script lang="ts">
	import FunctorList from '$components/FunctorList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import { pluralize } from '$lib/client/utils'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	let { data } = $props()
</script>

<MetaData title="List of functors" description="All available functors" />

<h2>List of functors</h2>

<!-- TODO: add search feature if the list grows in the future -->

<p>
	<!-- TODO: remove this later -->
	<Fa icon={faInfoCircle} />
	The functor application is still in its early stages. More functors will be added soon.
</p>

<p class="hint">
	{pluralize(data.functors.length, {
		one: 'Found {count} functor',
		other: 'Found {count} functors',
	})}
</p>

<FunctorList functors={data.functors} />
