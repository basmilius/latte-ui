<template>

	<div class="page" id="components-bottom-nav">

		<PageHeader>
			<h1>Bottom nav</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Basic" url="/snippets/components/bottom-nav/all.html"></CodeExample>

					<CodeExample title="Shifting" url="/snippets/components/bottom-nav/shifting.html"></CodeExample>

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

		name: "BottomNav",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		}

	}

</script>
