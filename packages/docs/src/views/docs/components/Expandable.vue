<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="component-expandable">

		<PageHeader>
			<h1>Expandable</h1>
		</PageHeader>

		<div class="contained">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Basic" url="/snippets/components/expandable/basic.html"></CodeExample>
					<CodeExample title="Group" url="/snippets/components/expandable/group.html"></CodeExample>
					<CodeExample title="Advanced" url="/snippets/components/expandable/advanced.html"></CodeExample>
					<CodeExample title="Nav" url="/snippets/components/expandable/nav.html"></CodeExample>

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
	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";

	export default {

		name: "Expandable",

		components: {
			CodeExample,
			TableOfContents,
			PageHeader
		}

	}

</script>
