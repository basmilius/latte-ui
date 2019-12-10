<template>

	<div class="page" id="components-overlay">

		<PageHeader>
			<h1>Overlay</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample url="/snippets/components/overlay/basic.html"></CodeExample>

				</div>
				<div class="col-12 col-lg-3">

					<TableOfContents></TableOfContents>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";
	import CodeExample from "../../../components/CodeExample";

	export default {

		name: "Overlay",

		components: {
			CodeExample,
			TableOfContents,
			PageHeader
		}
		
	}

</script>
