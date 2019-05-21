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
