import { createElement, fixHTMLString } from "../../util/create-element";
import { BlockInstance } from "./instance";
import { flatten } from "../../util/array";

import BlockView from "../../component/BlockView";
import { optional } from "../../util/vue";
import { inserterInline } from "../../ui/render/inserter";

export function convertBlock(editor, index, block, parent = undefined)
{
	return new BlockInstance(editor, index, block.id, block.options, block.children || [], parent);
}

export function convertBlocks(editor, blocks, parent = undefined)
{
	return blocks.map((block, index) => convertBlock(editor, index, block, parent));
}

export function convertToBlocks(editor, data)
{
	return new BlockInstance(editor, -1, "root", {}, data);
}

export function convertToData(root)
{
	return root.children
		.filter(entry => entry !== undefined)
		.map(entry => entry.data());
}

export function convertToHtml(root)
{
	const tmp = document.createElement("div");

	renderChildren(root)
		.forEach(dom => tmp.appendChild(dom));

	return fixHTMLString(tmp.innerHTML);
}

export function convertToJson(root, pretty = false)
{
	const data = convertToData(root);

	if (pretty)
		return JSON.stringify(data, null, 2);

	return JSON.stringify(data);
}

export function renderChildren(entry)
{
	return entry.children
		.map(child => child.render(createElement))
		.filter(dom => !!dom);
}

export function renderInstance(h, instance)
{
	let canShowInserters = instance.parent && !instance.parent.block.canHaveGroups;

	return [
		optional(canShowInserters && instance.index === 0, () => inserterInline(h, instance)),
		h(BlockView, {
			key: instance.hash,
			props: {instance: instance}
		}),
		optional(canShowInserters, () => inserterInline(h, instance, 1))
	];
}

export function renderInstances(h, instance)
{
	return flatten(instance.children.map(child => renderInstance(h, child)));
}
