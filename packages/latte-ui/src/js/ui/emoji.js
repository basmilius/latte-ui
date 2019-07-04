/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import Vue from "vue";
import { request } from "../core/api";
import { spaceship } from "../operators";
import { format } from "../util/string";

export let emojiBaseUrl;
export let emojiPath;

export const skinTones = [
	null,
	"1f3fb",
	"1f3fc",
	"1f3fd",
	"1f3fe",
	"1f3ff"
];

let categoriesJson = null;
let emojisJson = null;
let isLoaded = false;
let resolvers = [];

Vue.directive("emojify", (el, binding, vnode) =>
{
	vnode.key = vnode.elm.innerHTML;

	ensureEmojisReady()
		.then(() => el.innerHTML = replaceEmoji(vnode.elm.innerHTML));
});

export function initializeEmoji(options)
{
	emojiBaseUrl = options.emojiBaseUrl;
	emojiPath = options.emojiPath;

	loadCategories();
}

export function ensureEmojisReady()
{
	return new Promise(resolve =>
	{
		if (isLoaded)
			resolve();

		resolvers.push(resolve);
	});
}

export function getCategories()
{
	return categoriesJson;
}

export function getEmoji(codePoint)
{
	return emojisJson.find(emoji => emoji.codePoints.base === codePoint);
}

export function getEmojiUrl(codePoint)
{
	return emojiBaseUrl + format(emojiPath, codePoint);
}

export function getEmojisForCategory(category)
{
	return emojisJson
		.filter(emoji => emoji.category === category)
		.sort((a, b) => spaceship(a.order, b.order));
}

export function replaceEmoji(str)
{
	if (!isLoaded)
		return str;

	for (let emoji of emojisJson)
		str = str.split(emoji.unicode).join(`<img src="${getEmojiUrl(emoji.codePoints.base)}" class="emoji" alt="${emoji.name}" title="${emoji.name}"/>`);

	return str;
}

function convertCodePoint(codePoint)
{
	if (codePoint.indexOf("-") > -1)
	{
		let parts = [];
		let s = codePoint.split("-");

		for (let i = 0; i < s.length; i++)
		{
			let part = parseInt(s[i], 16);

			if (part >= 0x10000 && part <= 0x10FFFF)
			{
				let hi = Math.floor((part - 0x10000) / 0x400) + 0xD800;
				let lo = ((part - 0x10000) % 0x400) + 0xDC00;
				part = (String.fromCharCode(hi) + String.fromCharCode(lo));
			}
			else
			{
				part = String.fromCharCode(part);
			}

			parts.push(part);
		}

		return parts.join("");
	}
	else
	{
		let s = parseInt(codePoint, 16);

		if (s >= 0x10000 && s <= 0x10FFFF)
		{
			let hi = Math.floor((s - 0x10000) / 0x400) + 0xD800;
			let lo = ((s - 0x10000) % 0x400) + 0xDC00;

			return (String.fromCharCode(hi) + String.fromCharCode(lo));
		}
		else
		{
			return String.fromCharCode(s);
		}
	}
}

function loadCategories()
{
	request(`${emojiBaseUrl}/categories.json`)
		.then(r => r.json())
		.then(r => onCategoriesLoaded(r))
		.catch(err => console.error(err));
}

function loadEmojis()
{
	request(`${emojiBaseUrl}/emoji.json`)
		.then(r => r.json())
		.then(r => onEmojisLoaded(r))
		.catch(err => console.error(err));
}

function onCategoriesLoaded(categories)
{
	categoriesJson = categories
		.map(cat => ({
			id: cat.category,
			imageUrl: `${emojiBaseUrl}/category-icons/${cat.category}.svg`,
			label: cat.category_label,
			order: cat.order
		}))
		.sort((a, b) => spaceship(a.order, b.order));

	loadEmojis();
}

function onEmojisLoaded(emojis)
{
	emojisJson = Object.values(emojis)
		.map(emoji => ({
			category: emoji.category,
			codePoints: {
				base: emoji.code_points.base,
				output: emoji.code_points.output
			},
			diversities: emoji.diversities,
			diversity: emoji.diversity,
			isDiversityBase: emoji.diversity_base === 1,
			name: emoji.name,
			order: emoji.order,
			unicode: convertCodePoint(emoji.code_points.output)
		}))
		.sort((a, b) => spaceship(b.codePoints.output.length, a.codePoints.output.length));

	onReady();
}

function onReady()
{
	isLoaded = true;

	for (let resolve of resolvers)
		resolve();

	resolvers = undefined;
}
