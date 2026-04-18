<script lang="ts">
	import { enhance } from '$app/forms'
	import MetaData from '$components/MetaData.svelte'
	import type { PageProps } from './$types'

	let { data, form }: PageProps = $props()
</script>

<MetaData
	title="Submissions"
	description="Manage submissions sent by the suggestion form"
/>

<h2>Submissions</h2>

<p class="hint">
	Approve submissions sent by the suggestion form to convert them to GitHub issues.
</p>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

{#if data.submissions.length}
	{#each data.submissions as submission (submission.id)}
		<article class="submission">
			<h3 class="title">#{submission.id}: {submission.title}</h3>
			<div class="body">{submission.body}</div>

			<ul class="summary">
				{#if submission.name}
					<li>Submission by: {submission.name}</li>
				{/if}

				<li>
					Created: {new Date(submission.created_at).toLocaleDateString('en-CA')}
				</li>

				{#if submission.approved_at}
					<li>
						Approved: {new Date(submission.approved_at).toLocaleDateString(
							'en-CA',
						)}
					</li>
				{/if}

				<li>URL: {submission.url}</li>
			</ul>

			<form class="actions" method="POST" use:enhance>
				<input type="hidden" name="id" value={submission.id} />
				{#if !submission.approved_at}
					<button class="button" formaction="?/approve"> Approve</button>
				{/if}
				<button class="button" formaction="?/delete">Delete</button>
			</form>
		</article>
	{/each}
{:else}
	<p>No submissions found</p>
{/if}

<style>
	.submission {
		border-bottom: 1px solid var(--secondary-bg-color);
		padding-bottom: 1rem;

		.title {
			margin-block: 1rem;
		}

		.body,
		.summary {
			font-size: 1rem;
		}

		.summary {
			margin-block: 1rem 1.25rem;
		}

		.actions {
			display: flex;
			gap: 1rem;
		}
	}
</style>
