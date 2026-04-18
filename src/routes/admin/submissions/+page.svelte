<script lang="ts">
	import { enhance } from '$app/forms'
	import MetaData from '$components/MetaData.svelte'
	import Fa from 'svelte-fa'
	import type { PageProps } from './$types'
	import {
		faCheckCircle,
		faClock,
		faLink,
		faUser,
	} from '@fortawesome/free-solid-svg-icons'

	import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons'

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
{:else if form?.issue_url}
	<p>
		<Fa icon={faCheckCircle} />
		The <a href={form.issue_url} target="_blank">GitHub issue</a> has been created.
	</p>
{/if}

{#if data.submissions.length}
	{#each data.submissions as submission (submission.id)}
		<article class="submission">
			<h3 class="title">
				<Fa
					icon={submission.approved_at ? faCircleCheck : faCircle}
					scale={0.875}
				/>

				{submission.title}
			</h3>
			<div class="body">{submission.body}</div>

			<ul class="summary">
				{#if submission.name}
					<li>
						<Fa icon={faUser} />
						{submission.name}
					</li>
				{/if}

				<li>
					<Fa icon={faClock} />
					{new Date(submission.created_at).toLocaleString()}
				</li>

				{#if submission.approved_at}
					<li>
						<Fa icon={faCircleCheck} />
						{new Date(submission.approved_at).toLocaleString()}
					</li>
				{/if}

				<li>
					<Fa icon={faLink} />
					{submission.url}
				</li>
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

		&:first-of-type {
			margin-top: 2rem;
		}

		.title {
			margin-block: 1rem;
			display: flex;
			align-items: center;
			gap: 0.5rem;
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
