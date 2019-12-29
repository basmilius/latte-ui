/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

registerPaint("btn-background", class
{
	static get inputProperties()
	{
		return ["--btnBackground", "--btnForeground", "--btnAlpha", "--btnHover"];
	}

	paint(context, geometry, properties)
	{
		context.fillStyle = `rgba(${properties.get("--btnBackground")}, ${properties.get("--btnAlpha")})`;
		context.beginPath();
		context.rect(0, 0, geometry.width, geometry.height);
		context.fill();

		if (properties.get("--btnHover") > 0)
		{
			context.fillStyle = `rgba(${properties.get("--btnForeground")}, ${properties.get("--btnHover")})`;
			context.beginPath();
			context.rect(0, 0, geometry.width, geometry.height);
			context.fill();
		}
	}
});
