import { isTouchOnlyDevice } from "../util/dom";

(function ()
{

	if (typeof PointerEvent !== "undefined")
		return; // Yay for this browser!

	const isATouchOnlyDevice = isTouchOnlyDevice();

	const events = {
		click: ["click", "tap"],
		pointerdown: ["mousedown", "touchstart"],
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
			handlers[type](this, listener, options);
		else
			original.addEventListener.call(this, overrideType, listener, options);
	};

})();
