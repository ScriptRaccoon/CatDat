<script lang="ts">
	import CategoryList from '$components/CategoryList.svelte'
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'

	let { data } = $props()
</script>

<MetaData title={data.lemma.title} />

<h2>{data.lemma.title}</h2>

<h3>Claim</h3>

{@html data.lemma.claim}

<h3>Proof</h3>

{@html data.lemma.proof}

<h3>Usage</h3>

<p class="hint">This lemma is referenced in the following categories:</p>

<CategoryList categories={data.categories} />

<SuggestionForm />
