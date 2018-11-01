/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { request } from "../util/api.js";
import { translate } from "../i18n.js";
import { create as createNotice } from "../notices.js";
import { dispatch as dispatchAction } from "../actions.js";

export const SelectionMode = {
	Multiple: "multiple",
	None: "none",
	Single: "single"
};

export const ToolbarAction = {
	Back: 1,
	Forward: 2,
	Home: 4,
	Up: 8,
	Reload: 16,
	UpdateView: 32,
	New: 64,
	Close: 128
};

export const Type = {
	File: "Latte\\Framework\\Entity\\File",
	Folder: "Latte\\Framework\\Entity\\Folder"
};

export const View = {
	Gallery: "gallery",
	Grid: "grid",
	List: "list"
};

/**
 * Moves a file to a folder.
 *
 * @param {Number} fileId
 * @param {Number} destinationFolderId
 * @param {String} fileName
 *
 * @returns {Promise<Response>}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function moveFile(fileId, destinationFolderId, fileName)
{
	return request(`/api/system/file-system/move-file/${fileId}/to/${destinationFolderId}`)
		.then(r => r.json())
		.then(r =>
		{
			if (r["success"] && r["success"] === true)
			{
				dispatch("latte:file-manager:reload-folder");
				createNotice(translate("admin-file-manager", "File <strong>@0</strong> was successfully moved!", [fileName]), "success", true);
			}
			else if (typeof r.error !== "undefined")
			{
				createNotice(r.error.message, "error", true);
			}
		})
		.catch(err => createNotice(err.message, "error", true));
}

/**
 * Moves a folder to another folder.
 *
 * @param {Number} folderId
 * @param {Number} destinationFolderId
 * @param {String} folderName
 *
 * @returns {Promise<Response>}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function moveFolder(folderId, destinationFolderId, folderName)
{
	return request(`/api/system/file-system/move-folder/${folderId}/to/${destinationFolderId}`)
		.then(r => r.json())
		.then(r =>
		{
			if (r["success"] && r["success"] === true)
			{
				dispatch("latte:file-manager:reload-folder");
				createNotice(translate("admin-file-manager", "Folder <strong>@0</strong> was successfully moved!", [folderName]), "success", true);
			}
			else if (typeof r.error !== "undefined")
			{
				createNotice(r.error.message, "error", true);
			}
		})
		.catch(err => createNotice(err.message, "error", true));
}
