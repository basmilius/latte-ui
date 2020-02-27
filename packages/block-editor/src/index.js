/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import "./scss/_index.scss";

import { initializeCategoryRegistry } from "./core/category/registry";
import { initializeBlockRegistry } from "./core/block/registry";

export { default as Editor } from "./component/Editor";
export { default as SettingsGroup } from "./component/SettingsGroup";
export { default as SettingsPane } from "./component/SettingsPane";

export { convertToBlocks, convertToData, convertToHtml, convertToJson } from "./core/block/api"

initializeCategoryRegistry();
initializeBlockRegistry();
