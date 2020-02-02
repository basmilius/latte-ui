/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export function createElement(tag, props = undefined, content = undefined)
{
	if (tag === "template")
		tag = "be-template";

	if (typeof props !== "object" && content === undefined)
	{
		content = props;
		props = {};
	}

	const el = document.createElement(tag);

	if (props.class)
	{
		if (typeof props.class === "string")
			el.classList.add(...props.class.split(" ").filter(t => t.trim() !== ""));
		else
			el.classList.add(...props.class);
	}

	if (props.domProps)
	{
		for (let prop in props.domProps)
		{
			const val = props.domProps[prop];

			if (val === undefined)
				continue;

			if (prop === "innerHTML")
				content = val;
			else
				el.setAttribute(prop, val);
		}
	}

	if (props.style)
		for (let prop in props.style)
			el.style[prop] = props.style[prop];

	if (content !== undefined)
	{
		if (typeof content === "string")
		{
			el.innerHTML = content;
		}
		else
		{
			for (let child of content)
				el.appendChild(child);
		}
	}

	return el;
}

export function fixHTMLString(html)
{
	return html
		.replace(/v-bind:/g, ":")
		.replace(/v-on:/g, "@")
		.replace(/<be-template/g, "<template")
		.replace(/<\/be-template/g, "</template")
		.replace(/=""/g, "");
}
