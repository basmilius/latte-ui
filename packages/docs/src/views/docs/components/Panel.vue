<template>

	<div class="page" id="components-panel">

		<PageHeader>
			<h1>Panel</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample class="darker" title="Panel" url="/snippets/components/panel/basic.html"></CodeExample>

					<CodeExample class="darker" title="Panel with footer" url="/snippets/components/panel/footer.html"></CodeExample>

					<CodeExample class="darker" title="Panel with media" url="/snippets/components/panel/media.html"></CodeExample>

					<CodeExample class="darker" title="Panel with notice" url="/snippets/components/panel/notice.html"></CodeExample>

					<CodeExample class="darker" title="Panel with list" url="/snippets/components/panel/list.html"></CodeExample>

					<CodeExample class="darker" title="Panel with nav" url="/snippets/components/panel/nav.html"></CodeExample>

					<CodeExample class="darker" title="Panel with tabs" url="/snippets/components/panel/tabs.html"></CodeExample>

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

		name: "Panels",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		}
	}

</script>
