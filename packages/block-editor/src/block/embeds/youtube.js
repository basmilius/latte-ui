/*
 * Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte UI package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

import { Block } from "../../core/block/block";
import { description, fragment, group, settings, sidebar } from "../../ui/render/settings";
import { textField } from "../../ui/render/element";
import { blockActions } from "../../ui/render/block";
import { translate } from "../../core/i18n";

export class YouTubeEmbedBlock extends Block
{

	get defaultOptions()
	{
		return {
			videoId: "2TuyT0knklM"
		};
	}

	get description()
	{
		return translate("block.embeds.youtube.description");
	}

	get keywords()
	{
		return translate("block.embeds.youtube.keywords");
	}

	get name()
	{
		return translate("block.embeds.youtube.name");
	}

	constructor()
	{
		super("youtube-embed", "embeds", "youtube");
	}

	render(h, instance)
	{
		return h("div", {class: "embed-responsive embed-responsive-16by9 be-block-embed be-block-youtube-embed"}, [
			h("iframe", {
				domProps: {
					src: `https://www.youtube-nocookie.com/embed/${instance.options.videoId}`
				}
			})
		]);
	}

	renderEditor(h, instance)
	{
		return this.render(h, instance);
	}

	renderOptions(h, instance)
	{
		return fragment(h, [
			settings(h, instance, [
				description(h, this),
				group(h, translate("block.embeds.youtube.settings"), true, [
					textField(h, translate("block.embeds.youtube.settings.video_id"), () => instance.options.videoId, videoId => instance.setOptions({videoId}))
				])
			]),
			sidebar(h, instance, [
				blockActions(h, instance)
			])
		]);
	}

}
