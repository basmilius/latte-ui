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
		return translate("Embeds a YouTube-video.");
	}

	get keywords()
	{
		return [translate("Embed"), translate("Video")];
	}

	get name()
	{
		return translate("YouTube video");
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
				group(h, "YouTube", true, [
					textField(h, "Video-ID", () => instance.options.videoId, videoId => instance.setOptions({videoId}))
				])
			]),
			sidebar(h, instance, [
				blockActions(h, instance)
			])
		]);
	}

}
