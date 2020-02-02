/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

export function hexToRGB(hex)
{
	const rgb = {r: 0, g: 0, b: 0};

	if (hex[0] === "#")
		hex = hex.substring(1);

	if (hex.length === 3)
	{
		rgb.r = +`0x${hex[0]}${hex[0]}`;
		rgb.g = +`0x${hex[1]}${hex[1]}`;
		rgb.b = +`0x${hex[2]}${hex[2]}`;
	}
	else if (hex.length === 6)
	{
		rgb.r = +`0x${hex[0]}${hex[1]}`;
		rgb.g = +`0x${hex[2]}${hex[3]}`;
		rgb.b = +`0x${hex[4]}${hex[5]}`;
	}

	return rgb;
}

export function hslToRGB(hsl)
{
	let {h, s, l} = hsl, r, g, b;

	h /= 360;
	s /= 100;
	l /= 100;

	if (s === 0)
	{
		r = g = b = l;
	}
	else
	{
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;

		r = hueToRgb(p, q, h + 1 / 3);
		g = hueToRgb(p, q, h);
		b = hueToRgb(p, q, h - 1 / 3);
	}

	r = Math.round(r * 255);
	g = Math.round(g * 255);
	b = Math.round(b * 255);

	return {r, g, b};
}

export function hsvToRGB(hsv)
{
	let {h, s, v} = hsv;
	let r, g, b;

	let i = Math.floor(h * 6),
		f = h * 6 - i,
		p = v * (1 - s),
		q = v * (1 - f * s),
		t = v * (1 - (1 - f) * s);

	switch (i % 6)
	{
		case 0:
			r = v;
			g = t;
			b = p;
			break;

		case 1:
			r = q;
			g = v;
			b = p;
			break;

		case 2:
			r = p;
			g = v;
			b = t;
			break;

		case 3:
			r = p;
			g = q;
			b = v;
			break;

		case 4:
			r = t;
			g = p;
			b = v;
			break;

		case 5:
			r = v;
			g = p;
			b = q;
			break;
	}

	r = Math.round(r * 255);
	g = Math.round(g * 255);
	b = Math.round(b * 255);

	return {r, g, b};
}

export function rgbToHex(rgb)
{
	let r = rgbHexComponent(rgb.r),
		g = rgbHexComponent(rgb.g),
		b = rgbHexComponent(rgb.b);

	return `#${r}${g}${b}`;
}

export function rgbToHSL(rgb)
{
	let r = rgb.r / 255,
		g = rgb.g / 255,
		b = rgb.b / 255;

	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h, s, l;

	if (delta === 0)
		h = 0;
	else if (cmax === r)
		h = ((g - b) / delta) % 6;
	else if (cmax === g)
		h = (b - r) / delta + 2;
	else
		h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0)
		h += 360;

	l = (cmax + cmin) / 2;
	s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);

	return {h, s, l};
}

export function rgbToHSV(rgb)
{
	let r = rgb.r / 255,
		g = rgb.g / 255,
		b = rgb.b / 255;

	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h, s = (cmax === 0 ? 0 : delta / cmax), v = cmax;

	if (cmax === cmin)
	{
		h = 0;
	}
	else
	{
		if (cmax === r)
			h = (g - b) / delta + (g < b ? 6 : 0);
		else if (cmax === g)
			h = (b - r) / delta + 2;
		else
			h = (r - g) / delta + 4;

		h /= 6;
	}

	return {h, s, v};
}

export function smartColor(data, oldHue, initialAlpha)
{
	if (data.hex && data.rgb && data.hsl && data.hsv && data._is)
		return data;

	let alpha;
	let hsv;

	if (allNumber(data, ["h", "s", "v"]))
	{
		hsv = data;
	}
	else if (allNumber(data, ["h", "s", "l"]))
	{
		hsv = rgbToHSV(hslToRGB(data));
	}
	else if (allNumber(data, ["r", "g", "b"]))
	{
		hsv = rgbToHSV(data);
	}
	else
	{
		if (data.substring(0, 3) === "rgb")
		{
			const [r, g, b, a] = data.match(/[\d.]+/g);

			hsv = rgbToHSV({r, g, b});
			initialAlpha = parseFloat(a);
		}
		else if (data.substring(0, 3) === "hsl")
		{
			const [h, s, l, a] = data.match(/[\d.]+/g);

			hsv = rgbToHSV(hslToRGB({h, s, l}));
			initialAlpha = parseInt(a) / 100;
		}
		else
		{
			hsv = rgbToHSV(hexToRGB(data));
		}
	}

	if (hsv.s === 0)
		hsv.h = hsv.h || oldHue || 0;

	if (!isNaN(data.a))
		alpha = data.a;
	else if (!isNaN(initialAlpha))
		alpha = initialAlpha;
	else
		alpha = 1;

	const rgb = hsvToRGB(hsv);
	const hsl = rgbToHSL(rgb);
	const hex = rgbToHex(rgb);

	return {
		alpha,
		hex,
		rgb,
		hsl,
		hsv,
		hsla: {...hsl, a: alpha},
		hsva: {...hsv, a: alpha},
		rgba: {...rgb, a: alpha},
		_is: true
	};
}

export function colorToString(data)
{
	if (allNumber(data, ["r", "g", "b", "a"]))
		return `rgba(${data.r}, ${data.g}, ${data.b}, ${data.a})`;

	if (allNumber(data, ["r", "g", "b"]))
		return `rgb(${data.r}, ${data.g}, ${data.b})`;

	if (allNumber(data, ["h", "s", "l", "a"]))
		return `hsla(${data.h}, ${data.s}%, ${data.l}%, ${data.a * 100}%)`;

	if (allNumber(data, ["h", "s", "l"]))
		return `hsl(${data.h}, ${data.s}, ${data.l})`;

	return data;
}

function allNumber(obj, props)
{
	for (let prop of props)
		if (isNaN(obj[prop]))
			return false;

	return true;
}

function hueToRgb(p, q, t)
{
	if (t < 0)
		t += 1;

	if (t > 1)
		t -= 1;

	if (t < 1 / 6)
		return p + (q - p) * 6 * t;

	if (t < 1 / 2)
		return q;

	if (t < 2 / 3)
		return p + (q - p) * (2 / 3 - t) * 6;

	return p;
}

/**
 * @param {Number} val
 * @returns {String}
 */
function rgbHexComponent(val)
{
	let s = val.toString(16);

	if (s.length === 1)
		return "0" + s;

	return s;
}
