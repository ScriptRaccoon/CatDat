<script lang="ts">
	import MetaData from '$components/MetaData.svelte'
	import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'
</script>

<MetaData title="Download" description="Download CatDat's SQLite database" />

<h2>Download</h2>

<p>
	<i>CatDat</i> is built on a
	<a href="https://sqlite.org/" target="_blank">SQLite database</a>, which is stored as
	a single file. Use the link below to download a snapshot of it. You can then explore
	the data in your terminal or with any database tool of your choice.
</p>

<a href="/databases/catdat-snapshot.db" class="button" download>
	Download CatDat database
</a>

<p>
	<Fa icon={faInfoCircle} />
	This is intended for advanced users. Use it if you want to inspect the data beyond what
	the web application provides.
</p>
