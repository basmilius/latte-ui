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
							The most recommended way to add Latte UI to your project is to install it using yarn or npm. Latte UI
							uses Yarn internally and recommends using it.
						</div>
						<div class="panel-body border-top-0 pt-0">
							<CodeSnippet lang="shell" url="/snippets/getting-started/yarn-or-npm.txt"/>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header">
							<h2 class="panel-title mb-0">Install using CDN</h2>
							<a href="/download/starter-template.html" download="starter-template.html" class="btn btn-outline btn-primary ml-auto d-none d-lg-flex">
								<latte-icon>download</latte-icon>
								<span>Starter template</span>
							</a>
						</div>
						<div class="panel-body">
							<p>
								You can also add Latte UI to your project by using a CDN. Latte UI is available on unpkg.com the popular
								free to use CDN service that hosts almost every NPM package.
							</p>
						</div>
						<div class="panel-body border-top-0 pt-0">
							<CodeSnippet lang="html" url="/snippets/getting-started/cdn.txt"/>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title mb-0">Setup for Vue</h2></div>
						<div class="panel-body">
							Latte UI has several Vue components that you can use in your existing Vue project. Just add Latte UI as a
							Vue plugin to get started!
						</div>
						<div class="panel-body border-top-0 pt-0">
							<CodeSnippet lang="js" url="/snippets/getting-started/vue.txt"/>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title mb-0">Only CSS</h2></div>
						<div class="panel-body">
							Latte UI works best with Vue, but you can also just use Latte UI's CSS. Please note that a few features
							require your own custom implementation to work.
						</div>
						<div class="panel-body border-top-0 pt-0">
							<CodeSnippet lang="html" url="/snippets/getting-started/cdn-css.txt"/>
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
