/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Creates the v-latte-context-menu directive.
 *
 * @returns {*}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createDirective()
{
	let app = document.querySelector("body");

	return Vue.directive("latte-context-menu", {

		/**
		 * Invoked when our directive is bound.
		 *
		 * @param {HTMLElement} element
		 * @param {*} binding
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		bind(element, binding)
		{
			let contextMenu = element.contextMenuInstance = element.querySelector(":scope > nav.latte-context-menu:not(.is-inline)");

			if (contextMenu === null)
				return;

			// Place the context menu in the body element.
			element.removeChild(contextMenu);
			app.appendChild(contextMenu);

			let contextMenuCloseHandler = event =>
			{
				if (event.cancelable)
				{
					event.preventDefault();
					event.stopPropagation();
				}

				contextMenu.classList.remove("is-open");
				app.classList.remove("is-context-menu-open");

				document.scrollingElement.removeEventListener("scroll", contextMenuCloseHandler);
				app.removeEventListener("mousedown", contextMenuCloseHandler);
			};

			let contextMenuItemDownHandler = element.contextMenuItemDownHandler = event =>
			{
				event.preventDefault();
				event.stopPropagation();
			};

			let contextMenuItemUpHandler = element.contextMenuItemUpHandler = event =>
			{
				event.preventDefault();
				event.stopPropagation();

				contextMenuCloseHandler(event);
			};

			let contextMenuHandler = element.contextMenuHandler = event =>
			{
				event.preventDefault();
				event.stopPropagation();

				contextMenu.classList.add("is-open");

				let offset = 9;
				let rect = contextMenu.getBoundingClientRect();

				let x = event.pageX - document.scrollingElement.scrollLeft;
				let y = event.pageY - document.scrollingElement.scrollTop;

				// Place context menu on other side.
				if ((x + rect.width + offset) > window.innerWidth)
					x = x - rect.width;

				if ((y + rect.height + offset) > window.innerHeight)
					y = y - rect.height;

				// Never leave win, but that's it.
				if ((x + rect.width + offset) > window.innerWidth)
					x = window.innerWidth - (rect.width + offset);

				if ((y + rect.height + offset) > window.innerHeight)
					y = window.innerHeight - (rect.height + offset);

				contextMenu.style.top = `${y}px`;
				contextMenu.style.left = `${x}px`;

				app.classList.add("is-context-menu-open");

				app.addEventListener("mousedown", contextMenuCloseHandler);
				window.addEventListener("scroll", contextMenuCloseHandler, {passive: true});
				document.dispatchEvent(new CustomEvent("latte:context-menu", {detail: {menu: contextMenu, open: true}}));
			};

			element.addEventListener("contextmenu", contextMenuHandler);
			contextMenu.addEventListener("mousedown", contextMenuItemDownHandler);
			contextMenu.addEventListener("mouseup", contextMenuItemUpHandler);
		},

		/**
		 * Invoked when our directive is unbound.
		 *
		 * @param {HTMLElement} element
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		unbind(element)
		{
			if (typeof element.contextMenuInstance === "undefined" || element.contextMenuInstance === null)
				return;

			element.contextMenuInstance.addEventListener("mousedown", event.contextMenuItemDownHandler);
			element.contextMenuInstance.addEventListener("mouseup", event.contextMenuItemUpHandler);

			// Place the context menu back to it's original place.
			app.removeChild(element.contextMenuInstance);
			element.appendChild(element.contextMenuInstance);

			element.removeEventListener("contextmenu", element.contextMenuHandler);
			document.dispatchEvent(new CustomEvent("latte:context-menu", {detail: {menu: element.contextMenuInstance, open: false}}));
		}

	});
}
