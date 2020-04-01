/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { closest, getCoords } from "../util/dom";

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
		listener.type = type;
		listener.hof = evt =>
		{
			if (this.isWithinSource(evt))
				return;

			listener.apply(this.source, evt);
		};

		this.listeners.push(listener);

		document.addEventListener(type, listener.hof, options);
	}

	clearListeners()
	{
		this.listeners.forEach(listener => this.removeEventListener(listener.type, listener));
		this.listeners = [];
	}

	removeEventListener(type, listener)
	{
		const index = this.listeners.findIndex(l => l.id === listener.id);

		if (index === -1)
			return;

		document.removeEventListener(type, this.listeners[index].hof);

		this.listeners.splice(index, 1);
	}

	isWithinSource(evt)
	{
		const coords = getCoords(evt);

		return coords && closest(document.elementFromPoint(coords.x, coords.y), this.source) !== null;
	}

}

export function registerOutsideEvents()
{
	EventTarget.prototype.addOutsideEventListener = function (type, listener, options = {})
	{
		if (!this.outsideEvent)
			this.outsideEvent = new OutsideEvent(this);

		this.outsideEvent.addEventListener(type, listener, options);
	};

	EventTarget.prototype.clearOutsideEventListeners = function ()
	{
		if (!this.outsideEvent)
			this.outsideEvent = new OutsideEvent(this);

		this.outsideEvent.clearListeners();
	};

	EventTarget.prototype.removeOutsideEventListener = function (type, listener, options = {})
	{
		if (!this.outsideEvent)
			this.outsideEvent = new OutsideEvent(this);

		this.outsideEvent.removeEventListener(type, listener, options);
	};
}
