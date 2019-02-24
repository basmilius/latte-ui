<template>

	<div class="page" id="getting-started">

		<PageHeader>
			<h1>Getting started</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title mb-0">Install using NPM</h2></div>
						<div class="panel-body">

							<CodeSnippet lang="shell">npm i @bybas/latte-ui</CodeSnippet>

						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title mb-0">Use within your Vue project</h2></div>
						<div class="panel-body">

							<p>To use Latte in your project, add it to the global Vue object. Everything should now be available.</p>

							<CodeSnippet lang="js">
import LatteUI from "@bybas/latte-ui";

Vue.use(LatteUI);

new Vue({
	el: "#app"
});
							</CodeSnippet>

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
