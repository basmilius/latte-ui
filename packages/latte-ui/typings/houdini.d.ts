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
