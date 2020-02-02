<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="component-avatar">

		<PageHeader title="Avatar" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Used to show profile pictures or initials of users or other images in a list.</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.standard" title="Standard" classes="bg-panel d-flex flex-wrap align-items-center justify-content-center"/>
				<CodeExample :code="previews.initials" title="Initials" classes="bg-panel d-flex flex-wrap align-items-center justify-content-center"/>
				<CodeExample :code="previews.shapes" title="Shapes" classes="bg-panel d-flex flex-wrap align-items-center justify-content-center"/>
				<CodeExample :code="previews.strip" title="Strip" classes="bg-panel d-flex flex-wrap align-items-center flex-column justify-content-center"/>
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

		name: "Avatar",

		components: {ApiExplorer, CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
				api: {
					variables: [
						{
							name: "font-size",
							description: "Sets the size of the avatar.",
							type: "string",
							default: "15px"
						}
					]
				},
				previews: {
					standard: require("raw-loader!../../data/components/avatar/standard.html").default,
					initials: require("raw-loader!../../data/components/avatar/initials.html").default,
					shapes: require("raw-loader!../../data/components/avatar/shapes.html").default,
					strip: require("raw-loader!../../data/components/avatar/strip.html").default
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
