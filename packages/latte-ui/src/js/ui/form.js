/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export function initializeForms()
{
	document.querySelectorAll(`form[method="post"]`).forEach(form => initializeForm(form));
}

function initializeForm(form)
{
	form.addEventListener("submit", onFormSubmit.bind(window, form));
	form.addEventListener("keyup", onFormKeyUp.bind(window, form));
}

function onFormKeyUp(form, evt)
{
	if (evt.ctrlKey !== true)
		return;

	if ((evt.code || evt.key) !== "Enter")
		return;

	onFormSubmit(form);
	form.submit();
}

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