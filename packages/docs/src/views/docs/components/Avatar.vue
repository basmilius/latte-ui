<template>

	<div class="page" id="components-avatar">

		<PageHeader>
			<h1>Avatar</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Standalone" url="/snippets/components/avatar/avatar.html"></CodeExample>
					<CodeExample title="Alternative corners" url="/snippets/components/avatar/radius.html"></CodeExample>
					<CodeExample title="Strip" url="/snippets/components/avatar/strip.html"></CodeExample>

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

		name: "Avatar",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		}
	}

</script>
