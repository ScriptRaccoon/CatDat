<script lang="ts">
	import {
		faBook,
		faCog,
		faCubes,
		faDownload,
		faPuzzlePiece,
	} from '@fortawesome/free-solid-svg-icons'

	import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
	import Fa from 'svelte-fa'
</script>

<footer class="hint">
	<ul>
		<li>
			<Fa icon={faPenToSquare} scale={0.875} />
			<a href="/contribute">Contribute</a>
		</li>
		<li>
			<Fa icon={faCog} scale={0.875} />
			<a href="/settings">Settings</a>
		</li>
		<li>
			<Fa icon={faPuzzlePiece} scale={0.875} />
			<a href="/missing">Missing data</a>
		</li>
		<li>
			<Fa icon={faBook} scale={0.875} />
			<a href="/resources">Resources</a>
		</li>
		<li>
			<Fa icon={faCubes} scale={0.875} />
			<a href="/foundations">Foundations</a>
		</li>
		<li>
			<Fa icon={faDownload} scale={0.875} />
			<a href="/download">Download</a>
		</li>
	</ul>
</footer>

<style>
	footer {
		margin-bottom: 1.5rem;
	}

	ul {
		list-style-type: none;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 1.25rem;
	}

	@media (width <= 600px) {
		footer {
			display: none;
		}
	}
</style>
