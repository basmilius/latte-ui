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

	render(h, {options})
	{
		return h("div", {class: "embed-responsive embed-responsive-16by9 be-block-embed be-block-youtube-embed"}, [
			h("iframe", {
				domProps: {
					src: `https://www.youtube-nocookie.com/embed/${options.videoId}`
				}
			})
		]);
	}

	renderEditor(h, api)
	{
		return h("div", {class: "embed-responsive embed-responsive-16by9 be-block-embed be-block-youtube-embed"}, [
			h("iframe", {
				domProps: {
					src: `https://www.youtube-nocookie.com/embed/${api.options.videoId}`
				}
			})
		]);
	}

	renderOptions(h, api)
	{
		return settingsGroup(h, this.title, [
			blockActions(h, api),
			textField(h, "Video ID", () => api.options.videoId, videoId => api.setOptions({videoId}))
		]);
	}

}
