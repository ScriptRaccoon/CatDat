<script lang="ts">
	import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
	import Chip from '$components/Chip.svelte'
	import ChipGroup from '$components/ChipGroup.svelte'
	import { theme, THEMES, update_theme } from '$lib/states/theme.svelte'
	import MetaData from '$components/MetaData.svelte'
	import { set_tracking, tracking } from '$lib/states/tracking.svelte'

	$effect(() => update_theme(theme.value))
	$effect(() => set_tracking(tracking.allow))
</script>

<MetaData title="Settings" description="Customize the appearance of CatDat" />

<h1>Settings</h1>

<section>
	<h2>Theme</h2>

	<ChipGroup>
		{#each THEMES as option}
			{@const selected = theme.value === option}
			<Chip handle_click={() => (theme.value = option)} {selected}>
				{option}
				{#if selected}
					&nbsp;
					<Fa icon={faCheckCircle} />
				{/if}
			</Chip>
		{/each}
	</ChipGroup>
</section>

<section>
	<h2>Track visits</h2>
	<p class="hint">
		To measure how this application is used, we collect anonymous page visit data:
		time, device type (mobile, tablet, desktop), theme (light/dark), and country. We
		do not collect data that directly identifies you. Here you can disable this
		tracking.
	</p>

	<ChipGroup>
		{#each [true, false] as allow}
			{@const selected = tracking.allow === allow}

			<Chip handle_click={() => (tracking.allow = allow)} {selected}>
				{allow ? 'On' : 'Off'}
				{#if selected}
					&nbsp;
					<Fa icon={faCheckCircle} />
				{/if}
			</Chip>
		{/each}
	</ChipGroup>
</section>
