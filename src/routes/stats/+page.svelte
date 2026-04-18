<script lang="ts">
	import MetaData from '$components/MetaData.svelte'

	let { data } = $props()
</script>

<MetaData
	title="CatDat Stats"
	description="How many times and from where CatDat has been visited"
/>

<h2>Stats</h2>

<i>CatDat</i> has been visited <strong>{data.total}</strong> times since its launch on
{data.start.substring(0, 10)}. There has been <strong>{data.total_last_day}</strong>
visits in the last day, <strong>{data.total_last_week}</strong>
visits in the last week, and <strong>{data.total_last_month}</strong> visits in the last
month.

<h3>Daily Visits – Last 2 Weeks</h3>

<table>
	<colgroup>
		<col style="width: 75%" />
		<col style="width: 25%" />
	</colgroup>

	<thead>
		<tr>
			<th>Day</th>
			<th>#</th>
		</tr>
	</thead>
	<tbody>
		{#each data.daily_visits as visit}
			<tr>
				<td>
					{visit.day}
				</td>
				<td>
					{visit.count}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<h3>Countries – Top 10</h3>

<table>
	<colgroup>
		<col style="width: 75%" />
		<col style="width: 25%" />
	</colgroup>

	<thead>
		<tr>
			<th>Country</th>
			<th>#</th>
		</tr>
	</thead>
	<tbody>
		{#each data.country_stats as stat}
			<tr>
				<td>
					{stat.country}
				</td>
				<td>
					{stat.count}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<h3>Device Types</h3>

<table>
	<colgroup>
		<col style="width: 50%" />
		<col style="width: 25%" />
		<col style="width: 25%" />
	</colgroup>

	<thead>
		<tr>
			<th>Device Types</th>
			<th>#</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		{#each data.device_stats as stat}
			<tr>
				<td>
					{stat.device_type}
				</td>
				<td>
					{stat.count}
				</td>
				<td>
					{stat.percentage}%
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<h3>Themes</h3>

<table>
	<colgroup>
		<col style="width: 50%" />
		<col style="width: 25%" />
		<col style="width: 25%" />
	</colgroup>

	<thead>
		<tr>
			<th>Themes</th>
			<th>#</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		{#each data.theme_stats as stat}
			<tr>
				<td>
					{stat.theme}
				</td>
				<td>
					{stat.count}
				</td>
				<td>
					{stat.percentage}%
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 1rem;

		th,
		td {
			padding: 0.1rem 0.25rem;
		}

		th {
			text-align: left;
		}

		thead,
		tr:nth-child(2n) {
			background-color: var(--secondary-bg-color);
		}
	}
</style>
