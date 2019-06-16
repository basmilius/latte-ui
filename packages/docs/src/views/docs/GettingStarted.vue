<template>

	<div class="page" id="getting-started">

		<PageHeader>
			<h1>Getting started</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<div class="panel">
						<div class="panel-header">
							<h2 class="panel-title mb-0">Install using Yarn or NPM</h2>
							<span class="badge badge-success ml-auto">Recommended</span>
						</div>
						<div class="panel-body">
							The most recommended way to add latte-ui to your project is to install it using yarn or npm. Latte-ui
							recommends using yarn above npm.
						</div>
						<div class="panel-body border-top-0 pt-0">
							<CodeSnippet lang="shell">
yarn add @bybas/latte-ui

--- or ---

npm i @bybas/latte-ui
							</CodeSnippet>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title mb-0">Install using CDN</h2></div>
						<div class="panel-body">
							<p>
								You can also add latte-ui to your project by using a CDN. Latte-ui is available on unpkg.com the popular
								free to use CDN service that hosts almost every NPM package.
							</p>
						</div>
						<div class="panel-body border-top-0 pt-0">
							<CodeSnippet lang="html">
&lt;link href="https://unpkg.com/@bybas/latte-ui/dist/latte-ui.css" type="text/css"/&gt;
&lt;script src="https://unpkg.com/@bybas/latte-ui/dist/latte-ui.js" type="text/javascript"&gt;&lt;/script&gt;
							</CodeSnippet>
						</div>
						<div class="panel-body">
							Or if you want to use a specific version:
						</div>
						<div class="panel-body border-top-0 pt-0">
							<CodeSnippet lang="html">
&lt;link href="https://unpkg.com/@bybas/latte-ui@{{ $latte.version }}/dist/latte-ui.css" type="text/css"/&gt;
&lt;script src="https://unpkg.com/@bybas/latte-ui@{{ $latte.version }}/dist/latte-ui.js" type="text/javascript"&gt;&lt;/script&gt;
							</CodeSnippet>
						</div>
						<div class="panel-footer justify-content-end">
							<a href="/download/starter-template.html" download="starter-template.html" class="btn btn-contained btn-primary"><i class="mdi mdi-download"></i><span>Starter template</span></a>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title mb-0">Setup for Vue</h2></div>
						<div class="panel-body">
							Latte-ui has several Vue components that you can use in your existing Vue project. Just add latte-ui as a
							Vue plugin to get started!
						</div>
						<div class="panel-body border-top-0 pt-0">
							<CodeSnippet lang="js">
// Import LatteUI, ommit the next line if you're running in a browser.
import LatteUI from "@bybas/latte-ui";

// Register LatteUI with Vue.
Vue.use(LatteUI);

// Create your Vue instance.
new Vue({
	el: "#app"
});
							</CodeSnippet>
						</div>
						<div class="panel-body border-top-0 pt-0 d-none">
							<div class="notice notice-info">
								<i class="mdi mdi-information-outline"></i>
								<p>
									Note for laravel-mix users. T.B.D.
								</p>
							</div>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title mb-0">Only CSS</h2></div>
						<div class="panel-body">
							Latte-ui works best with Vue, but you can also just use latte-ui's CSS. Please note that a few features
							require your own custom implementation to work.
						</div>
					</div>

				</div>
				<div class="col-12 col-lg-3">

					<TableOfContents></TableOfContents>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import PageHeader from "../../components/PageHeader";
	import TableOfContents from "../../components/TableOfContents";
	import CodeSnippet from "../../components/CodeSnippet";

	export default {

		name: "GettingStarted",

		components: {
			CodeSnippet,
			PageHeader,
			TableOfContents
		}
	}

</script>
