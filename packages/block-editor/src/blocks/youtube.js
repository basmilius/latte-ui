import BEBlockActions from "../BEBlockActions";
import BESettingsGroup from "../BESettingsGroup";
import { BlockBase } from "../block";

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

	renderEditor(h, {options})
	{
		return h("div", {class: "embed-responsive embed-responsive-16by9 be-block-embed be-block-youtube-embed"}, [
			h("iframe", {
				domProps: {
					src: `https://www.youtube-nocookie.com/embed/${options.videoId}`
				}
			})
		]);
	}

	renderOptions(h, {depth, index, indexMax, rearrange, remove, children, options, setChildren, setOptions})
	{
		return h(BESettingsGroup, {props: {title: this.name}}, [
			h(BEBlockActions, {props: {index, indexMax, rearrange, remove}, slot: "header"}),
			h("label", {class: "be-settings-row flex-column"}, [
				h("span", "Video ID"),
				h("input", {class: "form-control", domProps: {type: "text", value: options.videoId}, on: {input: evt => setOptions({videoId: evt.target.value})}})
			])
		]);
	}

}
