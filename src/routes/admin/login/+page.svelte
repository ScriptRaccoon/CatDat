<script lang="ts">
	import { enhance } from '$app/forms'
	import MetaData from '$components/MetaData.svelte'
	import type { PageProps } from './$types'

	let { form }: PageProps = $props()
</script>

<MetaData title="Admin Login" />

<h2>Admin Login</h2>

<form action="?/login" method="POST" use:enhance>
	<div class="form-group">
		<label for="password">Password</label>
		<input
			class="input"
			type="password"
			name="password"
			id="password"
			autocomplete="off"
			required
		/>
	</div>
	<div>
		<button class="button">Login</button>
	</div>
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}
