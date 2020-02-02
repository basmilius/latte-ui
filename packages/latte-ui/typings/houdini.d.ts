/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

declare interface CSSRegisterPropertyOptions
{
	name: string;
	syntax?: string;
	inherits?: boolean;
	initialValue?: any;
}

declare interface CSSPaintWorklet
{
	addModule(path: string): Promise<void>;
}

declare interface CSS
{
	paintWorklet: CSSPaintWorklet;

	registerProperty(options: CSSRegisterPropertyOptions): undefined;
}

declare function registerPaint(name: string, implementation: any): undefined;
