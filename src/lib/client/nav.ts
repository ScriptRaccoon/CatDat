import type { StructureType } from '$lib/commons/types'
import {
	faArrowsSplitUpAndLeft,
	faBook,
	faChartBar,
	faCog,
	faCubes,
	faDatabase,
	faDownload,
	faHome,
	faList,
	faPenToSquare,
	faPuzzlePiece,
	faSearch,
	type IconDefinition
} from '@fortawesome/free-solid-svg-icons'
import { capitalize } from '$shared/utils'
import { PLURALS } from '$shared/config'

type Link = {
	href: string
	text: string
	nested?: string[]
	icon: IconDefinition
}

export function get_navigation_links(type: StructureType): Link[] {
	return [
		{
			href: '/',
			text: 'Home',
			icon: faHome
		},
		{
			href: `/${type}-list`,
			text: capitalize(PLURALS[type]),
			nested: [`/${type}/`, `/${type}-list/`],
			icon: faDatabase
		},
		{
			href: `/${type}-properties`,
			text: `Properties`,
			nested: [`/${type}-property/`, `/${type}-properties/`],
			icon: faList
		},
		{
			href: `/${type}-implications`,
			text: `Implications`,
			nested: [`/${type}-implication`],
			icon: faArrowsSplitUpAndLeft
		},
		{
			href: `/${type}-comparison`,
			text: `Compare`,
			icon: faChartBar,
			nested: [`/${type}-comparison`]
		},
		{
			href: `/${type}-search`,
			text: `Search`,
			icon: faSearch,
			nested: [`/${type}-search/results`]
		}
	]
}

export function get_footer_links() {
	return [
		{
			href: '/content/contribute',
			text: 'Contribute',
			icon: faPenToSquare
		},
		{
			href: '/settings',
			text: 'Settings',
			icon: faCog
		},
		{
			href: '/missing',
			text: 'Missing data',
			icon: faPuzzlePiece
		},
		{
			href: '/content/resources',
			text: 'Resources',
			icon: faBook
		},
		{
			href: '/content/foundations',
			text: 'Foundations',
			icon: faCubes
		},
		{
			href: '/download',
			text: 'Download',
			icon: faDownload
		}
	]
}
