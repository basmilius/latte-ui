<template>

	<div class="page" id="components-list">

		<PageHeader>
			<h1>List</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Basic list" url="/snippets/components/list/basic.html"></CodeExample>

					<CodeExample title="Icons" url="/snippets/components/list/icon.html"></CodeExample>

					<CodeExample title="Prefix and suffix" url="/snippets/components/list/prefix-suffix.html"></CodeExample>

					<CodeExample title="List with ripples" url="/snippets/components/list/ripple.html"></CodeExample>

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

		name: "List",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		}
	}

</script>
