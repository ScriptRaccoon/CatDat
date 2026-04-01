<script lang="ts">
	import {
		faArrowsSplitUpAndLeft,
		faChartBar,
		faDatabase,
		faHome,
		faList,
		faSearch,
		faXmark,
	} from '@fortawesome/free-solid-svg-icons'
	import Fa from 'svelte-fa'

	type Props = {
		close: () => void
	}

	let { close }: Props = $props()
</script>

<nav>
	<button class="button" aria-label="close navigation" onclick={close}>
		<Fa icon={faXmark} />
	</button>

	<ul class="main-list">
		<li>
			<a href="/">
				Home
				<Fa icon={faHome} />
			</a>
		</li>
		<li>
			<a href="/categories">
				Categories
				<Fa icon={faDatabase} />
			</a>
		</li>
		<li>
			<a href="/category-properties">
				Properties
				<Fa icon={faList} />
			</a>
		</li>

		<li>
			<a href="/category-implications">
				Implications
				<Fa icon={faArrowsSplitUpAndLeft} />
			</a>
		</li>

		<li>
			<a href="/category-comparison">
				Compare
				<Fa icon={faChartBar} />
			</a>
		</li>

		<li>
			<a href="/category-search">
				Search
				<Fa icon={faSearch} />
			</a>
		</li>
	</ul>

	<ul class="secondary-list">
		<li>
			<a href="/contribute">Contribute</a>
		</li>
		<li>
			<a href="/settings">Settings</a>
		</li>
		<li>
			<a href="/missing">Missing Data</a>
		</li>
		<li>
			<a href="/resources">Resources</a>
		</li>
		<li>
			<a href="/foundations">Foundations</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		position: fixed;
		z-index: 10;
		inset: 0;
		padding-top: 2rem;
		padding-inline: 0.75rem;
		background-color: var(--bg-color);
		text-align: right;
	}

	ul {
		padding: 0;
		list-style-type: none;
		margin-top: 2rem;
	}

	ul.main-list {
		font-size: 1.25rem;

		li {
			margin-bottom: 0.5rem;
		}

		a {
			display: inline-flex;
			align-items: center;
			gap: 1rem;

			:global(svg) {
				color: var(--heading-color);
			}
		}
	}

	ul.secondary-list {
		color: var(--secondary-text-color);
	}
</style>
