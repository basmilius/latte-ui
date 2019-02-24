/*
 * Copyright (c) 2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { closest } from "../util/dom";

class OutsideEvent
{

	constructor(source)
	{
		this.listeners = [];
		this.source = source;
	}

	addEventListener(type, listener, options = {})
	{
		listener.id = this.listeners.length;

		this.listeners.push(listener);

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
		const index = this.listeners.findIndex(l => l.id === listener.id);

		if (index === -1)
			return;

		document.removeEventListener(type, this.listeners[index], options);

		this.listeners.splice(index, 1);
	}

	isWithinSource(evt)
	{
		if (evt.pageX === undefined)
			return false;

		const documentElement = document.scrollingElement;
		const element = document.elementFromPoint(evt.pageX - documentElement.scrollLeft, evt.pageY - documentElement.scrollTop);

		return closest(element, this.source) !== null;
	}

}

export function registerOutsideEvents()
{
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
}
