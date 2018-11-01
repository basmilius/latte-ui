/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { querySelectorAll } from "./util/dom.js";

/**
 * Initializes form utils.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function initialize()
{
	querySelectorAll(`form[method="post"]`).forEach(form => initializeForm(form));
}

/**
 * Initializes a single form.
 *
 * @param {HTMLFormElement} form
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function initializeForm(form)
{
	form.addEventListener("submit", onFormSubmit.bind(window, form));
	form.addEventListener("keyup", onFormKeyUp.bind(window, form));
}

/**
 * Invoked on form keyup.
 *
 * @param {HTMLFormElement} form
 * @param {KeyboardEvent} evt
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function onFormKeyUp(form, evt)
{
	if (evt.ctrlKey !== true)
		return;

	if ((evt.code || evt.key) !== "Enter")
		return;

	onFormSubmit(form);
	form.submit();
}

/**
 * Invoked when a form is submitted.
 *
 * @param {HTMLFormElement} form
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
function onFormSubmit(form)
{
	form.querySelectorAll(".btn[type=submit]").forEach(btn =>
	{
		if (btn.classList.contains("btn-icon"))
			return;

		const icon = btn.querySelector("i.mdi");

		if (icon === null)
			return;

		icon.classList.add("spinner");

		if (btn.classList.contains("btn-light"))
			icon.classList.add("spinner-primary");
		else
			icon.classList.add("spinner-light");

		btn.classList.add("disabled");
	});
}
