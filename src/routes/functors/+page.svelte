<script lang="ts">
	import StructureListPage from '$pages/StructureListPage.svelte'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	let { data } = $props()
</script>

<p>
	<!-- TODO: remove this later -->
	<Fa icon={faInfoCircle} />
	The functor application is still in its early stages. More functors will be added soon.
</p>

<StructureListPage type="functor" structures={data.functors} tags={data.tags} />
