<script lang="ts">
	type Props = {
		title?: string
		description?: string
	}

	const default_title = 'CatDat'
	const default_description =
		'A comprehensive and searchable database of categorical structures and their properties'

	let { title = default_title, description = default_description }: Props = $props()
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content="https://catdat.app/" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="CatDat" />
	<meta property="og:image" content="https://catdat.app/og-image.webp" />
</svelte:head>
