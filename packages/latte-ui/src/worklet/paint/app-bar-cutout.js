/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

registerPaint("app-bar-cutout", class
{
	static get inputProperties()
	{
		return ["--app-bar-alpha", "--app-bar-background", "--app-bar-cutout-position", "--app-bar-cutout-offset"];
	}

	paint(context, geometry, properties)
	{
		let alpha = properties.get("--app-bar-alpha").toString();
		let background = properties.get("--app-bar-background").toString();
		let offset = properties.get("--app-bar-cutout-offset").toString();
		let position = properties.get("--app-bar-cutout-position").toString();

		let cutoutShapeGutter = 6;
		let cutoutShapeSize = 56;

		if (offset.endsWith("%"))
			offset = geometry.width * (parseFloat(offset) / 100);
		else
			offset = parseFloat(offset);

		offset = Math.round(offset);

		if (position.trim() === "" || ["top", "bottom"].indexOf(position) === -1)
			position = "top";

		context.fillStyle = `rgba(${background}, ${alpha})`;

		if (position === "top")
			this.drawTopCutout(context, geometry, cutoutShapeSize, cutoutShapeGutter, offset);
		else
			this.drawBottomCutout(context, geometry, cutoutShapeSize, cutoutShapeGutter, offset);

		context.fill();
	}

	drawBottomCutout(context, geometry, css, csg, offset)
	{
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(geometry.width, 0);
		context.lineTo(geometry.width, geometry.height);
		context.lineTo(offset + (css / 2) + csg * 2, geometry.height);
		context.bezierCurveTo(
			offset + css / 2 + csg, geometry.height,
			offset + css / 2 + csg, geometry.height - csg,
			offset + css / 2 + csg, geometry.height - csg
		);
		context.bezierCurveTo(
			offset + (css / 2), geometry.height - (css / 2 + csg * 3) + 1,
			offset - (css / 2), geometry.height - (css / 2 + csg * 3) + 1,
			offset - (css / 2) - csg, geometry.height - csg
		);
		context.bezierCurveTo(
			offset - css / 2 - csg, geometry.height,
			offset - css / 2 - csg * 2, geometry.height,
			offset - css / 2 - csg * 2, geometry.height
		);
		context.lineTo(0, geometry.height);
		context.lineTo(0, 0);
	}

	drawTopCutout(context, geometry, css, csg, offset)
	{
		context.beginPath();
		context.moveTo(0, 0);
		context.lineTo(offset - (css / 2) - csg * 2, 0);
		context.bezierCurveTo(
			offset - css / 2 - csg, 0,
			offset - css / 2 - csg, csg,
			offset - css / 2 - csg, csg
		);
		context.bezierCurveTo(
			offset - (css / 2), css / 2 + csg * 3 - 1,
			offset + (css / 2), css / 2 + csg * 3 - 1,
			offset + (css / 2) + csg, csg
		);
		context.bezierCurveTo(
			offset + css / 2 + csg, 0,
			offset + css / 2 + csg + csg, 0,
			offset + css / 2 + csg + csg, 0
		);
		context.lineTo(geometry.width, 0);
		context.lineTo(geometry.width, geometry.height);
		context.lineTo(0, geometry.height);
		context.lineTo(0, 0);
	}
});
