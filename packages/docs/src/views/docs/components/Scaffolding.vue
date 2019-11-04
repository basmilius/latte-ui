<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="component-scaffolding">

		<PageHeader>
			<h1>Scaffolding</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Default" url="/snippets/components/scaffolding/default.html" class="darker"></CodeExample>
					<CodeExample title="Sheet below app bar" url="/snippets/components/scaffolding/below-app-bar.html" class="darker"></CodeExample>

				</div>
				<div class="col-12 col-lg-3">

					<TableOfContents></TableOfContents>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import CodeExample from "../../../components/CodeExample";
	import CodeSnippet from "../../../components/CodeSnippet";
	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";

	export default {

		name: "Scaffolding",

		components: {
			CodeExample,
			CodeSnippet,
			PageHeader,
			TableOfContents
		},

		methods: {}

	}

</script>
