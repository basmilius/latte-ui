import { BlockBase } from "../block";
import { blockActions, settingsGroup, textField } from "../primitive/settings";

export class YouTubeEmbedBlock extends BlockBase
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

	get isInline()
	{
		return true;
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

	render(h, entry)
	{
		return h("div", {class: "embed-responsive embed-responsive-16by9 be-block-embed be-block-youtube-embed"}, [
			h("iframe", {
				domProps: {
					src: `https://www.youtube-nocookie.com/embed/${entry.options.videoId}`
				}
			})
		]);
	}

	renderEditor(h, entry)
	{
		return h("div", {class: "embed-responsive embed-responsive-16by9 be-block-embed be-block-youtube-embed"}, [
			h("iframe", {
				domProps: {
					src: `https://www.youtube-nocookie.com/embed/${entry.options.videoId}`
				}
			})
		]);
	}

	renderOptions(h, entry)
	{
		return settingsGroup(h, this.name, [
			blockActions(h, entry),
			textField(h, "Video ID", () => entry.options.videoId, videoId => entry.setOptions({videoId}))
		]);
	}

}
