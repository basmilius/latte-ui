<template>

	<div class="page" id="components-button">

		<PageHeader>
			<h1>Button</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Contained buttons" url="/snippets/components/button/contained.html"></CodeExample>

					<CodeExample title="Floating action buttons" url="/snippets/components/button/fab.html"></CodeExample>

					<CodeExample title="Soft buttons" url="/snippets/components/button/soft.html"></CodeExample>

					<CodeExample title="Text buttons" url="/snippets/components/button/text.html"></CodeExample>

					<CodeExample title="Action buttons" url="/snippets/components/button/action.html"></CodeExample>

					<CodeExample title="Grouped buttons" url="/snippets/components/button/group.html"></CodeExample>

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
	import TableOfContents from "../../../components/TableOfContents";
	import PageHeader from "../../../components/PageHeader";

	export default {

		name: "Buttons",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		}
	}

</script>
