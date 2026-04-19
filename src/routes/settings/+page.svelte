<script lang="ts">
	import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	import Chip from '$components/Chip.svelte'
	import ChipGroup from '$components/ChipGroup.svelte'
	import {
		category_detail_level,
		CATEGORY_DETAIL_LEVELS,
		update_category_detail_level,
	} from '$lib/states/detail_level.svelte'
	import { theme, THEMES, update_theme } from '$lib/states/theme.svelte'
	import MetaData from '$components/MetaData.svelte'
	import { set_tracking, tracking } from '$lib/states/tracking.svelte'

	$effect(() => update_theme(theme.value))
	$effect(() => update_category_detail_level(category_detail_level.value))
	$effect(() => set_tracking(tracking.allow))
</script>

<MetaData title="Settings" description="Customize the appearance of CatDat" />

<h2>Settings</h2>

<section>
	<h3>Theme</h3>

	<ChipGroup>
		{#each THEMES as option}
			{@const selected = theme.value === option}
			<label class:selected>
				<input
					class="visually-hidden"
					type="radio"
					name="color"
					value={option}
					bind:group={theme.value}
				/>
				<Chip>
					{option}
					{#if selected}
						&nbsp;
						<Fa icon={faCheckCircle} />
					{/if}
				</Chip>
			</label>
		{/each}
	</ChipGroup>
</section>

<section>
	<h3>Category detail level</h3>

	<ChipGroup>
		{#each Object.keys(CATEGORY_DETAIL_LEVELS) as level}
			{@const selected = category_detail_level.value === level}
			<label class:selected>
				<input
					class="visually-hidden"
					type="radio"
					name="category-detail-level"
					value={level}
					bind:group={category_detail_level.value}
				/>
				<Chip>
					{level}
					{#if selected}
						&nbsp;
						<Fa icon={faCheckCircle} />
					{/if}
				</Chip>
			</label>
		{/each}
	</ChipGroup>

	<p class="hint" aria-live="polite">
		{CATEGORY_DETAIL_LEVELS[category_detail_level.value]}
	</p>
</section>

<section>
	<h3>Track visits</h3>
	<p class="hint">
		To measure how this application is used, we collect anonymous page visit data:
		time, device type (mobile, tablet, desktop), theme (light/dark), and country. We
		do not collect data that directly identifies you. Here you can disable this
		tracking.
	</p>

	<ChipGroup>
		{#each [true, false] as allow}
			{@const selected = tracking.allow === allow}
			<label class:selected>
				<input
					class="visually-hidden"
					type="radio"
					name="tracking"
					value={allow}
					bind:group={tracking.allow}
				/>

				<Chip>
					{allow ? 'On' : 'Off'}
					{#if selected}
						&nbsp;
						<Fa icon={faCheckCircle} />
					{/if}
				</Chip>
			</label>
		{/each}
	</ChipGroup>
</section>

<style>
	label {
		cursor: pointer;
	}

	label:has(:focus-visible) {
		outline: 2px solid var(--outline-color);
		outline-offset: 2px;
	}
</style>
