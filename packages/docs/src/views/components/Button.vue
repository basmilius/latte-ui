<template>

	<div class="page" id="component-button">

		<PageHeader title="Button" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.contained" title="Contained" classes="bg-panel d-flex flex-wrap justify-content-center"/>
				<CodeExample :code="previews.outline" title="Outline" classes="bg-panel d-flex flex-wrap justify-content-center"/>
				<CodeExample :code="previews.text" title="Text" classes="bg-panel d-flex flex-wrap justify-content-center"/>
				<CodeExample :code="previews.action" title="Action" classes="bg-panel d-flex flex-wrap justify-content-center"/>
				<CodeExample :code="previews.group" title="Group" classes="bg-panel d-flex flex-wrap justify-content-center"/>
				<CodeExample :code="previews.fluid" title="Pill" classes="d-flex flex-column flex-lg-row justify-content-center"/>
				<CodeExample :code="previews.sizes" title="Sizes" classes="bg-panel d-flex flex-wrap align-items-center justify-content-center"/>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="API" id="api">
			<div class="col-12">
				<ApiExplorer v-bind="api"/>
			</div>
		</TitledRow>

	</div>

</template>

<script>

	import PageHeader from "../../components/PageHeader";
	import TitledRow from "../../components/TitledRow";
	import CodeExample from "../../components/CodeExample";
	import ApiExplorer from "../../components/ApiExplorer";

	export default {

		name: "Button",

		components: {ApiExplorer, CodeExample, TitledRow, PageHeader},

		data()
		{
			const computedStyle = window
				.getComputedStyle(document.body);

			return {
				api: {
					variables: [
						{
							name: "--btnAlpha",
							description: "Controls the button alpha level.",
							type: "int",
							default: 1
						},
						{
							name: "--btnBackground",
							description: "Background color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--btnBackground").split(",").map(c => parseInt(c))
						},
						{
							name: "--btnForeground",
							description: "Foreground color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--btnForeground").split(",").map(c => parseInt(c))
						},
						{
							name: "--btnFontSize",
							description: "Font size of the button.",
							type: "string",
							default: computedStyle.getPropertyValue("--btnFontSize")
						},
						{
							name: "--btnHeight",
							description: "Height of the button.",
							type: "string",
							default: computedStyle.getPropertyValue("--btnHeight")
						},
						{
							name: "--btnHover",
							description: "Hover state.",
							type: "int",
							default: 0
						},
						{
							name: "--btnIconSize",
							description: "Icon size.",
							type: "string",
							default: computedStyle.getPropertyValue("--btnIconSize")
						},
						{
							name: "--btnPadding",
							description: "Button padding.",
							type: "string",
							default: computedStyle.getPropertyValue("--btnPadding")
						}
					]
				},
				previews: {
					contained: require("raw-loader!../../data/components/button/contained.html").default,
					outline: require("raw-loader!../../data/components/button/outline.html").default,
					text: require("raw-loader!../../data/components/button/text.html").default,
					action: require("raw-loader!../../data/components/button/action.html").default,
					group: require("raw-loader!../../data/components/button/group.html").default,
					fluid: require("raw-loader!../../data/components/button/fluid.html").default,
					sizes: require("raw-loader!../../data/components/button/sizes.html").default
				},
				tabs: [
					{label: "Introduction", selector: "#introduction"},
					{label: "Examples", selector: "#examples"},
					{label: "API", selector: "#api"}
				]
			};
		}

	}

</script>
