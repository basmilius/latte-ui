<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="components-badge">

		<PageHeader>
			<h1>Badge</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Basic" url="/snippets/components/badge/basic.html"></CodeExample>
					<CodeExample title="Clickable" url="/snippets/components/badge/clickable.html"></CodeExample>
					<CodeExample title="Closable" url="/snippets/components/badge/closable.html"></CodeExample>
					<CodeExample title="With spinner" url="/snippets/components/badge/with-spinner.html"></CodeExample>

					<div class="divider divider-horizontal docs-separator"></div>

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

	import ApiExplorer from "../../../components/ApiExplorer";
	import CodeExample from "../../../components/CodeExample";
	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";

	export default {

		name: "Badge",

		components: {
			ApiExplorer,
			CodeExample,
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
							name: "--badgeColor",
							description: "Sets the badge color.",
							type: "rgb",
							default: computedStyle.getPropertyValue("--badgeColor").split(",").map(c => parseInt(c))
						}
					]
				}
			};
		}

	}

</script>
