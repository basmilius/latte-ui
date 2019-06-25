/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

declare interface HTMLElement
{
	scrollIntoViewIfNeeded(): void;
}

declare interface Window
{
	ResizeObserver: ResizeObserver;
}

declare interface ResizeObserver
{
	new(callback: ResizeObserverCallback);

	observe(target: Element): void;

	unobserve(target: Element): void;

	disconnect(): void;
}

declare interface ResizeObserverCallback
{
	(entries: ResizeObserverEntry[], observer: ResizeObserver): void;
}

declare interface ResizeObserverEntry
{
	readonly target: Element;
	readonly contentRect: DOMRectReadOnly;
}
