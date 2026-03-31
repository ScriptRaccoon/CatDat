<script lang="ts">
	import { afterNavigate } from '$app/navigation'
	import { page } from '$app/state'
	import Footer from '$components/Footer.svelte'
	import Header from '$components/Header.svelte'
	import Nav from '$components/Nav.svelte'
	import NavMobile from '$components/NavMobile.svelte'
	import Popup from '$components/Popup.svelte'
	import { track_visit } from '$lib/client/track'
	import type { Structure } from '$lib/commons/types'
	import { tracking } from '$lib/states/tracking.svelte'
	import './app.css'

	let { children } = $props()

	function open_mobile_nav() {
		nav_dialog?.showModal()
	}

	function close_mobile_nav() {
		nav_dialog?.close()
	}

	afterNavigate(() => {
		close_mobile_nav()
	})

	$effect(() => {
		if (tracking.allow) track_visit()
	})

	let nav_dialog = $state<HTMLDialogElement | null>(null)

	let structure = $state<Structure>(
		page.url.pathname.startsWith('/functor') ? 'functors' : 'categories',
	)

	$effect(() => {
		if (page.url.pathname.startsWith('/functor')) {
			structure = 'functors'
		} else if (
			page.url.pathname.startsWith('/category') ||
			page.url.pathname.startsWith('/categories')
		) {
			structure = 'categories'
		}
	})
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.css"
		integrity="sha384-FkTZUsHjYVyYpU6dse+5AzszY5617FqhnLpcMIIAlLKTbdmeVMO/7K6BrdHWM28V"
		crossorigin="anonymous"
	/>

	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="CatDat" />
	<link rel="manifest" href="/site.webmanifest" />

	<link
		rel="preload"
		href="/fonts/DMMono-Regular.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="container">
	<Header {open_mobile_nav} {structure} />
	<Nav {structure} />

	<main>
		{@render children()}
	</main>

	<Footer />
</div>

<Popup />

<dialog bind:this={nav_dialog} id="nav_dialog">
	<NavMobile close={close_mobile_nav} {structure} />
</dialog>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		min-height: 100dvh;
		display: grid;
		grid-template-rows: auto auto 1fr auto;
		padding-inline: 0.75rem;
	}

	main {
		margin-bottom: 1.5rem;
	}
</style>
