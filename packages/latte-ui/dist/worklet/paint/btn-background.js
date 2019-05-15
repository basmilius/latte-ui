/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

class ButtonBackgroundPaintWorklet
{

	static get inputProperties()
	{
		return ["--btn-background", "--btn-foreground", "--btn-hover-state"];
	}

	paint(context, geometry, properties)
	{
		context.fillStyle = `rgb(${properties.get("--btn-background")})`;
		context.beginPath();
		context.rect(0, 0, geometry.width, geometry.height);
		context.fill();

		if (properties.get("--btn-hover-state") > 0)
		{
			context.fillStyle = `rgba(${properties.get("--btn-foreground")}, ${properties.get("--btn-hover-state")})`;
			context.beginPath();
			context.rect(0, 0, geometry.width, geometry.height);
			context.fill();
		}
	}

}

registerPaint("btn-background", ButtonBackgroundPaintWorklet);
