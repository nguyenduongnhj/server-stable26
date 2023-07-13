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
import type { AxiosResponse } from 'axios'
import type { ContentsWithRoot } from '../../../files/src/services/Navigation'
import type { OCSResponse } from '../../../files_sharing/src/services/SharingService'

import { Folder, Permission } from '@nextcloud/files'
import { generateOcsUrl, generateRemoteUrl } from '@nextcloud/router'
import axios from '@nextcloud/axios'
import { getCurrentUser } from '@nextcloud/auth'

export const rootPath = `/files/${getCurrentUser()?.uid}`

/**
 * https://github.com/nextcloud/server/blob/ac2bc2384efe3c15ff987b87a7432bc60d545c67/apps/files_external/lib/Controller/ApiController.php#L71-L97
 */
type MountEntry = {
	name: string
	path: string,
	type: 'dir',
	backend: 'SFTP',
	scope: 'system' | 'personal',
	permissions: number,
	id: number,
	class: string
}

const entryToFolder = (ocsEntry: MountEntry): Folder => {
	const path = (ocsEntry.path + '/' + ocsEntry.name).replace(/^\//gm, '')
	return new Folder({
		id: ocsEntry.id,
		source: generateRemoteUrl('dav' + rootPath + '/' + path),
		root: rootPath,
		owner: getCurrentUser()?.uid || null,
		permissions: ocsEntry?.permissions || Permission.READ,
		attributes: {
			displayName: path,
			...ocsEntry,
		},
	})
}

export const getContents = async (): Promise<ContentsWithRoot> => {
	const response = await axios.get(generateOcsUrl('apps/files_external/api/v1/mounts')) as AxiosResponse<OCSResponse<MountEntry>>
	const contents = response.data.ocs.data.map(entryToFolder)

	return {
		folder: new Folder({
			id: 0,
			source: generateRemoteUrl('dav' + rootPath),
			root: rootPath,
			owner: getCurrentUser()?.uid || null,
			permissions: Permission.READ,
		}),
		contents,
	}
}
