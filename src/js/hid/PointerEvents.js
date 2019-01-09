/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { isTouchOnlyDevice } from "../util/dom";

(function ()
{

	if (typeof PointerEvent !== "undefined")
		return; // Yay for this browser!

	const isATouchOnlyDevice = isTouchOnlyDevice();

	const events = {
		click: ["click", "tap"],
		pointerdown: ["mousedown", "touchstart"],
		pointermove: ["mousemove", "touchmove"],
		pointerover: ["mouseover", "touchstart"],
		pointerout: ["mouseout", "touchend"],
		pointerup: ["mouseup", "touchend"]
	};

	const handlers = {

		tap($this, listener, options)
		{
			let isTap = false;

			original.addEventListener.call($this, "touchstart", () => isTap = true, options);
			original.addEventListener.call($this, "touchmove", () => isTap = false, options);
			original.addEventListener.call($this, "touchend", evt =>
			{
				if (!isTap)
					return;

				listener(evt);
			}, options);
		}

	};

	const original = {
		addEventListener: EventTarget.prototype.addEventListener,
		removeEventListener: EventTarget.prototype.removeEventListener
	};

	EventTarget.prototype.addEventListener = function (type, listener, options)
	{
		let overrideType = type;

		if (type in events)
			overrideType = isATouchOnlyDevice ? events[type][1] : events[type][0];

		if (overrideType in handlers)
			handlers[overrideType](this, listener, options);
		else
			original.addEventListener.call(this, overrideType, listener, options);
	};

})();
