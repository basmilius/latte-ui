<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="layout-color">

		<PageHeader>
			<h1>Color</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title m-0">Colors</h2></div>
						<div class="panel-body">
							<p>
								Latte-ui uses a minimal set of colors that you can override to whatever you want. Override them in
								the <code>:root</code> selector in CSS.
							</p>
						</div>
						<div class="notice notice-info">
							<i class="mdi mdi-information-outline"></i>
							<p>
								Note that colors are defined as individual rgb values. We've chosen this so that we can adjust alpha
								channels without defining milions of variables for everything.<br/>
								For example <span class="inline-code">rgba(12, 13, 14)</span> becomes <span class="inline-code">12, 13, 14</span>.
							</p>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="css">
:root
{
	--color-primary: 43, 120, 255;
	--color-primary-foreground: 255, 255, 255;
}
							</CodeSnippet>
						</div>
					</div>

					<ApiExplorer v-bind="api"/>

				</div>
				<div class="col-12 col-lg-3">
					<TableOfContents></TableOfContents>
				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import ApiExplorer from "../../components/ApiExplorer";
	import CodeSnippet from "../../components/CodeSnippet";
	import PageHeader from "../../components/PageHeader";
	import TableOfContents from "../../components/TableOfContents";

	export default {

		name: "Color",

		components: {
			ApiExplorer,
			CodeSnippet,
			PageHeader,
			TableOfContents
		},

		data()
		{
			const computedStyle = window
				.getComputedStyle(document.body);

			return {
				api: {
					variables: [
						{
							name: "--dark",
							type: "rgb",
							default: computedStyle.getPropertyValue("--dark").split(",").map(c => parseInt(c))
						},
						{
							name: "--light",
							type: "rgb",
							default: computedStyle.getPropertyValue("--light").split(",").map(c => parseInt(c))
						},
						{
							name: "--color-primary",
							type: "rgb",
							default: computedStyle.getPropertyValue("--color-primary").split(",").map(c => parseInt(c))
						},
						{
							name: "--color-primary-foreground",
							type: "rgb",
							default: computedStyle.getPropertyValue("--color-primary-foreground").split(",").map(c => parseInt(c))
						},
						{
							name: "--color-error",
							type: "rgb",
							default: computedStyle.getPropertyValue("--color-error").split(",").map(c => parseInt(c))
						},
						{
							name: "--color-error-foreground",
							type: "rgb",
							default: computedStyle.getPropertyValue("--color-error-foreground").split(",").map(c => parseInt(c))
						},
						{
							name: "--color-info",
							type: "rgb",
							default: computedStyle.getPropertyValue("--color-info").split(",").map(c => parseInt(c))
						},
						{
							name: "--color-info-foreground",
							type: "rgb",
							default: computedStyle.getPropertyValue("--color-info-foreground").split(",").map(c => parseInt(c))
						},
						{
							name: "--color-success",
							type: "rgb",
							default: computedStyle.getPropertyValue("--color-success").split(",").map(c => parseInt(c))
						},
						{
							name: "--color-success-foreground",
							type: "rgb",
							default: computedStyle.getPropertyValue("--color-success-foreground").split(",").map(c => parseInt(c))
						},
						{
							name: "--color-warning",
							type: "rgb",
							default: computedStyle.getPropertyValue("--color-warning").split(",").map(c => parseInt(c))
						},
						{
							name: "--color-warning-foreground",
							type: "rgb",
							default: computedStyle.getPropertyValue("--color-warning-foreground").split(",").map(c => parseInt(c))
						}
					]
				}
			};
		}

	}

</script>

<style lang="scss" scoped>

	.inline-code
	{
		font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
		font-size: .8rem;
	}

</style>
