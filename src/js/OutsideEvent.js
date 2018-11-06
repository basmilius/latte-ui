import { closest } from "./util/dom";

class OutsideEvent
{

	constructor(source)
	{
		this.listeners = {};
		this.source = source;
	}

	addEventListener(type, listener, options = {})
	{
		const fn = evt =>
		{
			if (this.isWithinSource(evt))
				return;

			listener(evt);
		};

		document.addEventListener(type, fn, options);
	}

	removeEventListener(type, listener, options = {})
	{
		const handler = this.listeners[listener];

		if (handler === undefined)
			return;

		document.removeEventListener(type, handler, options);
	}

	isWithinSource(evt)
	{
		if (evt.pageX === undefined)
			return false;

		const element = document.elementFromPoint(evt.pageX, evt.pageY);

		return closest(element, this.source) !== null;
	}

}

EventTarget.prototype.addOutsideEventListener = function (type, listener, options = {})
{
	if (this.outsideEvent === undefined)
		this.outsideEvent = new OutsideEvent(this);

	this.outsideEvent.addEventListener(type, listener, options);
};

EventTarget.prototype.removeOutsideEventListener = function (type, listener, options = {})
{
	if (this.outsideEvent === undefined)
		this.outsideEvent = new OutsideEvent(this);

	this.outsideEvent.removeEventListener(type, listener, options);
};
