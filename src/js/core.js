"use strict";

let main = undefined;

export function deepMerge(target, ...sources)
{
	if (sources.length === 0)
		return target;

	const source = sources.shift();

	if (!isObject(target) || !isObject(source))
		return deepMerge(target, ...sources);

	for (const key in source)
	{
		if (!source.hasOwnProperty(key))
			continue;

		if (isObject(source[key]))
		{
			if (!target[key])
				Object.assign(target, {[key]: source[key]});

			deepMerge(target[key], source[key]);
		}
		else
		{
			Object.assign(target, {[key]: source[key]});
		}
	}

	return deepMerge(target, ...sources);
}

export function getMainElement()
{
	return main || (main = document.querySelector("main#app"));
}

export function handleError(err, fn = undefined)
{
	Latte.messages.alert("Aw snap!", `<pre>${err.stack}</pre>`);

	if (fn)
		fn();
}

export function isObject(obj)
{
	return obj && typeof obj === "object" && !Array.isArray(obj);
}

export function interval(timeout, func)
{
	func();

	return window.setInterval(func, timeout);
}

export function isIterable(obj)
{
	if (obj === null)
		return false;

	return typeof obj[Symbol.iterator] === "function";
}

export function randomPassword(length = 9, availableSets = "luds")
{
	const sets = [];

	if (availableSets.indexOf("l") > -1)
		sets.push("abcdefghjkmnpqrstuvwxyz");

	if (availableSets.indexOf("u") > -1)
		sets.push("ABCDEFGHJKMNPQRSTUVWXYZ");

	if (availableSets.indexOf("d") > -1)
		sets.push("123456789");

	if (availableSets.indexOf("s") > -1)
		sets.push("!@#$%&*?");

	let all = "";
	let password = "";

	sets.forEach(set =>
	{
		password += set[Math.floor(Math.random() * set.length)];
		all += set;
	});

	for (let i = 0; i < length - sets.length; i++)
		password += all[Math.floor(Math.random() * all.length)];

	return shuffleString(password);
}

export function register(func)
{
	func(window.Latte);
}

export function timeout(timeout, func)
{
	return window.setTimeout(func, timeout);
}

export function updateURLHash(data)
{
	let parts = [];

	for (let key in data)
	{
		if (!data.hasOwnProperty(key))
			continue;

		let str = key;
		let d = data[key];

		if (d.value)
			str += `=${d.value}`;

		for (let vk in d.vars)
			if (d.vars.hasOwnProperty(vk))
				str += `/${vk}:${d.vars[vk]}`;

		parts.push(str);
	}

	const hash = parts.join("&");

	if (hash.length > 0)
		location.hash = hash;
	else
		history.replaceState({}, document.title, location.pathname + location.search);
}

function shuffleString(str)
{
	const a = str.split("");
	const n = a.length;

	for (let i = n - 1; i > 0; i--)
	{
		let j = Math.floor(Math.random() * (i + 1));
		let tmp = a[i];

		a[i] = a[j];
		a[j] = tmp;
	}

	return a.join("");
}

export default {

	deepMerge,

	getMainElement,

	handleError,

	interval,

	isObject,

	isIterable,

	randomPassword,

	register,

	timeout,

	updateURLHash

}
