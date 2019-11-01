import { Block } from "../../core/block/block";
import { description, fragment, group, settings, sidebar } from "../../ui/render/settings";
import { textField } from "../../ui/render/element";
import { blockActions } from "../../ui/render/block";

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
		return "Embeds a YouTube-video.";
	}

	get keywords()
	{
		return ["youtube", "embed", "video"];
	}

	get name()
	{
		return "YouTube video";
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
