<script lang="ts">
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

<SuggestionForm />
