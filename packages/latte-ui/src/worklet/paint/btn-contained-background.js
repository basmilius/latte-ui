/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

class ButtonContainedBackgroundPaintWorklet
{

	static get inputProperties()
	{
		return ["--btn-background", "--btn-foreground", "--btn-contained-hover-state"];
	}

	paint(context, geometry, properties)
	{
		context.fillStyle = `rgb(${properties.get("--btn-background")})`;
		context.beginPath();
		context.rect(0, 0, geometry.width, geometry.height);
		context.fill();

		if (properties.get("--btn-contained-hover-state") > 0)
		{
			context.fillStyle = `rgba(${properties.get("--btn-foreground")}, ${properties.get("--btn-contained-hover-state")})`;
			context.beginPath();
			context.rect(0, 0, geometry.width, geometry.height);
			context.fill();
		}
	}

}

registerPaint("btn-contained-background", ButtonContainedBackgroundPaintWorklet);
