<template>

	<div class="page" id="layout-grid-system">

		<PageHeader>
			<h1>Grid System</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Auto grid" url="/snippets/layout/grid-system/auto-grid.html"></CodeExample>

					<CodeExample title="Various widths" url="/snippets/layout/grid-system/widths.html"></CodeExample>

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
	import CodeExample from "../../components/CodeExample";

	export default {

		name: "GridSystem",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		}

	}

</script>

<style lang="scss">

	#layout-grid-system div.code-example-preview .row
	{
		> [class*="col"]
		{
			position: relative;
			display: block;
			background: RGB(var(--main-background));
			box-shadow: inset 0 0 0 1px RGB(var(--outline-color));
			font-size: .8rem;
			font-weight: 500;
			line-height: 48px;
			text-align: center;
		}

		+ .row
		{
			margin-top: 1rem;
		}
	}

</style>
