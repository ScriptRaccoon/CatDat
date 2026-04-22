<script lang="ts">
	import { dev } from '$app/environment'
	import MetaData from '$components/MetaData.svelte'
	import SuggestionForm from '$components/SuggestionForm.svelte'
</script>

<MetaData title="How to contribute to CatDat" />

<h2>How to contribute</h2>

<p>
	<i>CatDat</i> is developed in an open-source
	<a class="accent" href="https://github.com/ScriptRaccoon/catdat" target="_blank">
		GitHub repository
	</a>
	owned by
	<a href="https://ncatlab.org/nlab/show/Martin+Brandenburg" target="_blank">
		Martin Brandenburg
	</a>. It welcomes contributions from the community, including filling in missing
	information or discovering new combinations of properties.
</p>

{#if !dev}
	<div class="video-container">
		<iframe
			src="https://www.youtube.com/embed/NoZWdMFfQfg?si=1bn9ISx4zMLuP4LN"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			referrerpolicy="strict-origin-when-cross-origin"
			allowfullscreen
		></iframe>
	</div>
{/if}

<p>There are three ways to contribute:</p>

<h3>Option 1: Use the Suggestion Form</h3>

<p>
	On most pages of CatDat, you will find a suggestion form at the bottom. Use it to
	contribute new data, report an issue, or make a suggestion. After submission, the form
	automatically creates a GitHub issue, which we then review and try to resolve and
	implement.
</p>

<p>
	This option does not require any knowledge of GitHub or coding, making it accessible
	to everyone. It also does not require following any guidelines for adding new data.
</p>

<h3>Option 2: Create a Pull Request</h3>

<p>
	Create a
	<a href="https://github.com/ScriptRaccoon/CatDat/pulls" target="_blank" class="accent"
		>pull request</a
	>
	on GitHub. You will need a GitHub account and some coding knowledge. Make sure to follow
	the
	<a
		class="accent"
		href="https://github.com/ScriptRaccoon/CatDat/blob/main/CONTRIBUTING.md"
		target="_blank">contribution guidelines</a
	>.
</p>

<h3>Option 3: Create an Issue</h3>

<p>
	Create an
	<a
		class="accent"
		href="https://github.com/ScriptRaccoon/CatDat/issues/new"
		target="_blank">issue</a
	>
	on GitHub. You will need a GitHub account.
</p>

<SuggestionForm />
