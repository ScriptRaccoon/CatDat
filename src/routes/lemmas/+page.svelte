<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'

	let { data } = $props()
</script>

<MetaData title="Lemmas" />

<h2>Lemmas</h2>

<p class="hint">
	These are reusable lemmas used in multiple proofs of categorical properties in CatDat.
</p>

<ul>
	{#each data.lemmas as lemma (lemma.id)}
		<li>
			<a href="/lemma/{lemma.id}">{lemma.title}</a>
		</li>
	{/each}
</ul>

<SuggestionForm />
