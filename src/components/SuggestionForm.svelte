<script lang="ts">
	import { browser } from '$app/environment'
	import { page } from '$app/state'
	import { resize_textarea } from '$lib/client/utils'
	import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
	import { tick } from 'svelte'
	import Fa from 'svelte-fa'

	const saved_name = browser ? (window.localStorage.getItem('name') ?? '') : ''

	let title = $state('')
	let body = $state('')
	let name = $state(saved_name)

	let error = $state('')
	let sending = $state(false)
	let success = $state(false)

	const TITLE_MAX_LENGTH = 50
	const BODY_MAX_LENGTH = 10000
	const NAME_MAX_LENGTH = 50

	async function create_issue(e: SubmitEvent) {
		e.preventDefault()

		sending = true
		error = ''
		success = false

		if (name) {
			window.localStorage.setItem('name', name)
		} else {
			window.localStorage.removeItem('name')
		}

		try {
			const res = await fetch('/api/submissions', {
				method: 'POST',
				body: JSON.stringify({ title, body, url: page.url.href, name }),
				headers: { 'Content-Type': 'application/json' },
			})

			const res_json = await res.json()

			if ('error' in res_json) {
				error = res_json.error
			} else {
				success = true
			}
		} catch (err) {
			console.error(err)
			error = 'Failed to fetch API'
		} finally {
			sending = false
			await tick()
			section?.scrollIntoView({
				block: 'end',
				behavior: 'smooth',
			})
		}
	}

	let section = $state<HTMLElement | null>(null)

	let hide_form = $state(true)

	async function show_form() {
		hide_form = false
		await tick()
		section?.scrollIntoView({
			block: 'start',
			behavior: 'smooth',
		})
	}
</script>

<section bind:this={section}>
	{#if hide_form}
		<button class="button" onclick={show_form}>Make a suggestion</button>
	{:else}
		<h2>Suggestion Form</h2>

		<p class="hint">
			Use the form below to report missing data, submit an issue, or make a
			suggestion.
		</p>

		<form onsubmit={create_issue}>
			<div class="form-group">
				<label for="title">
					<span>Short summary</span>
					<span class="description">max. {TITLE_MAX_LENGTH} characters</span>
				</label>
				<input
					type="text"
					id="title"
					class="full-width"
					bind:value={title}
					required
					aria-invalid={title.length > TITLE_MAX_LENGTH}
				/>
			</div>

			<div class="form-group">
				<label for="body">
					<span>Details</span>
					<span class="description">max. {BODY_MAX_LENGTH} characters</span>
				</label>
				<textarea
					id="body"
					{@attach resize_textarea}
					bind:value={body}
					required
					class="full-width"
					aria-invalid={body.length > BODY_MAX_LENGTH}
				></textarea>
			</div>

			<div class="form-group">
				<label for="name">
					<span>Your name</span>
					<span class="description">optional</span>
				</label>
				<input
					type="text"
					id="name"
					class="full-width"
					bind:value={name}
					aria-invalid={name.length > NAME_MAX_LENGTH}
				/>
			</div>

			<button class="button" disabled={sending}>
				{#if sending}
					Submitting...
				{:else}
					Submit
				{/if}
			</button>
		</form>

		{#if error}
			<p class="error">
				<Fa icon={faWarning} />
				Error: {error}
			</p>
		{/if}

		{#if success}
			<p>
				<Fa icon={faCheckCircle} />
				Thank you for your submission! We will review it shortly. Once approved, it
				will be created as a
				<a href="https://github.com/ScriptRaccoon/CatDat/issues" target="_blank">
					GitHub issue
				</a>.
			</p>
		{/if}
	{/if}
</section>

<style>
	section {
		margin-top: 2rem;
		padding-bottom: 1rem;
		margin-bottom: -1rem;
	}

	textarea {
		height: 4lh;
	}

	label {
		display: flex;
		justify-content: space-between;
		align-items: end;

		.description {
			font-size: 0.875rem;
			color: var(--secondary-text-color);
		}
	}
</style>
