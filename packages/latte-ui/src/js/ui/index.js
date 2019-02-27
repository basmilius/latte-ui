/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { initializeForms } from "./form";
import message from "./message";
import notice, { initializeNotices } from "./notice";
import notification, { initializeNotifications } from "./notification";
import overlay from "./overlay";
import panel, { initializePanels } from "./panel";
import question from "./question";
import { initializeTooltips } from "./tooltip";

export function initializeUI()
{
	initializeForms();
	initializeNotices();
	initializeNotifications();
	initializePanels();
	initializeTooltips();
}

export default {
	message,
	notice,
	notification,
	overlay,
	panel,
	question
};
