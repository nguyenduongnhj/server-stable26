/**
 * @copyright Copyright (c) 2023 John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @author John Molakvoæ <skjnldsv@protonmail.com>
 *
 * @license AGPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
import type NavigationService from '../../files/src/services/Navigation'
import type { Navigation } from '../../files/src/services/Navigation'

import { getLanguage, translate as t } from '@nextcloud/l10n'
import FolderNetworkSvg from '@mdi/svg/svg/folder-network.svg?raw'

import './actions/openInFilesAction'
import { getContents } from './services/externalStorage'

const Navigation = window.OCP.Files.Navigation as NavigationService
Navigation.register({
	id: 'extstoragemounts',
	name: t('files_external', 'External storage'),
	caption: t('files_external', 'List of external storage.'),

	icon: FolderNetworkSvg,
	order: 30,

	columns: [
		{
			id: 'storage-type',
			title: t('files_external', 'Storage type'),
			render(node) {
				const backend = node.attributes?.backend || t('files_external', 'Unknown')
				const span = document.createElement('span')
				span.textContent = backend
				return span
			},
			sort(nodeA, nodeB) {
				const nameA = nodeA.attributes?.backend || t('files_external', 'Unknown')
				const nameB = nodeB.attributes?.backend || t('files_external', 'Unknown')
				return nameA.localeCompare(nameB, getLanguage(), { ignorePunctuation: true })
			},
		},
		{
			id: 'scope',
			title: t('files_external', 'Scope'),
			render(node) {
				const span = document.createElement('span')
				let scope = t('files_external', 'Personal')
				if (node.attributes?.scope === 'system') {
					scope = t('files_external', 'System')
				}
				span.textContent = scope
				return span
			},
			sort(nodeA, nodeB) {
				const nameA = nodeA.attributes?.scope
				const nameB = nodeB.attributes?.scope
				return nameA.localeCompare(nameB, getLanguage(), { ignorePunctuation: true })
			},
		},
	],

	getContents,
} as Navigation)
