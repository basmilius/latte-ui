/*
 * Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Declaration file for LatteUI.
 */

type LatteColors = "primary" | "dark" | "light" | "error" | "info" | "success" | "warning";
type LatteRenderFunction = (h: Function) => any;

interface LattePHPBaseEntity
{
	"@type"?: string;
}

declare namespace Latte
{

	namespace action
	{
		interface ActionSubscription
		{
			handle(data: any, el: HTMLElement, evt: Event): void;

			unsubscribe(): void;
		}

		export function dispatch(action: string, payload?: any, el?: HTMLElement, evt?: Event): void;

		export function on(action: string, callback: Function): ActionSubscription;
	}

	namespace api
	{
		export function id(): string;

		export function request(url: string, options?: RequestInit): Promise<Response>;

		export function requestJson(url: string, options?: RequestInit): Promise<Response>;
	}

	namespace core
	{
		namespace popup
		{
			export function isPopupOpened(): boolean;

			export function popupClosed(): boolean;

			export function popupOpened(): boolean;
		}

		namespace z
		{
			export function applyZ(fn: (z: number) => void): void;
		}

		export function getMainElement(): HTMLElement;

		export function handleError(err: Error, fn?: Function): void;

		export function interval(delay: number, fn: Function): number;

		export function randomPassword(length: number, availableSets?: string): string;

		export function register(fn: (Latte: any) => void): void;

		export function timeout(delay: number, fn: Function): number;
	}

	namespace i18n
	{
		export function replace(str: string, params: any[]): string;

		export function translate(domain: string, str: string, params?: any[]): string;
	}

	namespace iid
	{
		interface AutocompleteSuggestion extends LattePHPBaseEntity
		{
			value: number;
			label: string;
			sub_label?: string | null;
		}

		type AutocompleteDataSourceMethods = {
			getEntries(ids: Array<number>): Promise<AutocompleteSuggestion[]>;
			getSuggestions(query: string): Promise<AutocompleteSuggestion[]>;
		};

		type AutocompleteDataSource = () => Promise<AutocompleteDataSourceMethods> | AutocompleteDataSourceMethods;

		interface DataTableAction
		{
			template: string;
		}

		interface DataTableColumn
		{
			field: string;
			is_searchable?: boolean;
			is_sortable?: boolean;
			label: string;
			template: string;
			width?: number;
		}

		type DataTableDataSourceData = {
			actions: DataTableAction[];
			columns: DataTableColumn[];
			initial_data: any[];
			limit: number;
			offset: number;
			requestData(offset: number, limit: number, filters: { [key: string]: any }, params: { [key: string]: any }, sorting: { by: string, order: string }): Promise<any>;
		};

		type DataTableDataSource = () => Promise<DataTableDataSourceData> | DataTableDataSourceData;
	}

	namespace math
	{
		export function clamp(value: number, min: number, max: number): number;

		export function pythagorean(a: number, b: number): number;
	}

	namespace operators
	{
		export function spaceship(a: number, b: number): number;
	}

	namespace ui
	{
		namespace message
		{
			export enum Buttons
			{
				OK,
				CANCEL,
				YES,
				NO,
				UPDATE,
				SAVE,
				REMOVE,
				CREATE,
				GO,
				PROCEED,
				ALLOW,
				DENY
			}

			export function create(title: string, message: string, buttons: Buttons, prompt?: boolean): Promise<number>;

			export function alert(title: string, message: string): Promise<number>;

			export function confirm(title: string, message: string): Promise<number>;

			export function prompt(title: string, message: string): Promise<number>;
		}

		namespace notice
		{
			export function areEntitiesNotices(entities: LattePHPBaseEntity[]): boolean;

			export function create(message: string, type: LatteColors, dismissible?: boolean): string;

			export function isEntityNotice(entity: LattePHPBaseEntity): boolean;

			export function remove(noticeId: string): void;
		}

		namespace notification
		{
			interface Button
			{
				color?: LatteColors;
				icon?: string;
				id?: number;
				label?: string;
				params?: any;
			}

			interface Options
			{
				avatar?: string | LatteRenderFunction;
				buttons?: Button[];
				color?: LatteColors;
				duration?: number;
				icon?: string;
				message?: string;
				sound?: string | "default";
				title?: string;
			}

			export function create(options: Options): Promise<number>;
		}

		namespace panel
		{
			export function close(panel: HTMLElement): void;

			export function initializePanel(panel: HTMLElement): void;

			export function open(panel: HTMLElement): void;
		}

		namespace question
		{
			interface Button
			{
				id: number;
				label: string;
			}

			interface Options
			{
				width: string;
			}

			export function create(icon: string, message: string, buttons: Button[], options?: Options): Promise<number>;
		}

		namespace overlay
		{
			export function close(name: string): void;

			export function find(name: string): void;

			export function open(name: string): void;

			export function register(name: string, overlay: any): void;

			export function remove(name: string): void;
		}

		namespace snackbar
		{
			interface Options
			{
				action?: ActionOptions | null;
				duration?: number;
				location?: Locations,
				message: string;
			}

			interface ActionOptions
			{
				color: LatteColors;
			}

			export enum Locations
			{
				BOTTOM,
				BOTTOM_LEFT,
				BOTTOM_RIGHT,
				TOP,
				TOP_LEFT,
				TOP_RIGHT
			}

			export function create(options: Options): Promise<boolean>;
		}
	}

	namespace util
	{
		namespace clipboard
		{
			export function copy(text: string): void;

			export function paste(): Promise<string>;
		}

		namespace cookies
		{
			export function getCookie(name: string): any;

			export function setCookie(name: string, value: any, days?: number): void;
		}

		namespace datetime
		{
			interface FormatOptions
			{
				day: string;
				month: string;
				weekday: string;
				year: string;
			}

			export function formatDateTime(date: Date, options: FormatOptions): string;
		}

		namespace dom
		{
			interface Coords
			{
				x: number;
				y: number;
			}

			interface EventOptions
			{
				capture?: boolean;
				passive?: boolean;
			}

			type CoordsEvents = MouseEvent | PointerEvent | TouchEvent;

			export function closest(element: HTMLElement, selector: string): HTMLElement | null;

			export function createElement(tag: string, fn: (el: HTMLElement) => void): HTMLElement;

			export function downloadFile(fileName: string, url: string): void;

			export function getCoords(evt: CoordsEvents): Coords | undefined;

			export function getLattePath(): string | undefined;

			export function isReady(): boolean;

			export function live(root: HTMLElement, selector: string, eventName: string, callback: Function, options: EventOptions): void;

			export function printDocument(url: string): void;

			export function raf(fn: Function, delay?: number): void;

			export function relativeCoordsTo(element: HTMLElement, evt: CoordsEvents): Coords | undefined;

			export function terminateEvent(evt: Event): void;

			export function toDOM(str: string): DocumentFragment;
		}

		namespace json
		{
			export function isJson(str: string): boolean;
		}

		namespace object
		{
			export function deepMerge(obj: any, ...sources: any): any;

			export function isIterable(obj: any): boolean;

			export function isObject(obj: any): boolean;
		}

		namespace string
		{
			export function commaCommaAnd(strs: string[]): string;

			export function isNullOrWhitespace(str: string | undefined | null): boolean;
		}

		namespace touch
		{
			export function isTouchDevice(): boolean;

			export function onlyMouse(fn: Function): Function;

			export function onlyTouch(fn: Function): Function;
		}
	}

}

declare module "@bybas/latte-ui"
{
	import { PluginObject } from "vue";

	interface LatteUIPlugin extends PluginObject<any>
	{
		Latte: any;
	}

	const LatteUI: LatteUIPlugin;

	export = LatteUI;
}
