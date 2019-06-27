/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { defaultOnUpdateHandler } from "./easing";
import { raf } from "../util/dom";

function currentTime()
{
	return Date.now();
}

const timeConstant = 325;

export class Velocity
{

	constructor(vp1 = 0.8, vp2 = 0.2)
	{
		this.onUpdate = defaultOnUpdateHandler;

		/** @var {Number|undefined} */
		this.amplitude = undefined;

		/** @var {Number|undefined} */
		this.velocity = undefined;

		this.frame = undefined;
		this.max = undefined;
		this.min = undefined;
		this.offset = 0;
		this.reference = undefined;
		this.target = 0;
		this.time = 0;
		this.vp1 = vp1;
		this.vp2 = vp2;

		this.updateInterval = 0;
	}

	move(value)
	{
		const delta = this.reference - value;

		if (delta > 2 || delta < -2)
		{
			this.reference = value;
			this.updateValue(this.offset + delta);
		}
	}

	start(value)
	{
		this.reference = value;
		this.amplitude = 0;
		this.velocity = 0;
		this.frame = this.offset;
		this.time = currentTime();

		if (this.updateInterval !== 0)
			clearInterval(this.updateInterval);

		this.updateInterval = setInterval(() => this.update(), 10);
	}

	stop()
	{
		clearInterval(this.updateInterval);
		this.updateInterval = 0;

		if (this.velocity > 10 || this.velocity < -10)
		{
			// vp1: 0.8
			this.amplitude = 0.8 * this.velocity;
			this.target = Math.round(this.offset + this.amplitude);
			this.time = currentTime();

			raf(() => this.updateValueAuto());
		}
	}

	update()
	{
		const now = currentTime();
		const elapsed = now - this.time;
		const delta = this.offset - this.frame;

		this.frame = this.offset;
		this.time = now;

		const v = 1000 * delta / (1 + elapsed);
		this.velocity = this.vp1 * v + this.vp2 * this.velocity;
	}

	updateValue(value)
	{
		if (this.min !== undefined)
			value = Math.max(this.min, value);

		if (this.max !== undefined)
			value = Math.min(this.max, value);

		this.offset = value;

		if (this.onUpdate)
			this.onUpdate(-this.offset);
	}

	updateValueAuto()
	{
		if (this.amplitude === undefined)
			return;

		const elapsed = currentTime() - this.time;
		const delta = -this.amplitude * Math.exp(-elapsed / timeConstant);

		if (delta > 0.5 || delta < -0.5)
		{
			this.updateValue(this.target + delta);
			raf(() => this.updateValueAuto());
		}
		else
		{
			this.updateValue(this.target);
		}
	}

}
