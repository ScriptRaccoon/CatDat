<script lang="ts">
	import { get_property_url } from '$lib/commons/property.url'
	import TextWithReason from './TextWithReason.svelte'

	type Props = {
		properties: {
			id: string
			relation: string
			reason?: string | null
		}[]
		type?: 'category' | 'functor'
	}

	let { properties, type = 'category' }: Props = $props()
</script>

{#if properties.length}
	<ul>
		{#each properties as { id, relation, reason }}
			<li>
				<TextWithReason {reason}>
					{relation}
					<a href={get_property_url(id, type)}>{id}</a>
				</TextWithReason>
			</li>
		{/each}
	</ul>
{:else}
	<p>&mdash;</p>
{/if}

<style>
	li {
		position: relative;
	}
</style>
