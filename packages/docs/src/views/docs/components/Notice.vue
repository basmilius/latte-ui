<template>

	<div class="page" id="components-notice">

		<PageHeader>
			<h1>Notice</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="All notices" url="/snippets/components/notice/all.html"></CodeExample>
					<CodeExample title="With icon" url="/snippets/components/notice/icon.html"></CodeExample>
					<CodeExample title="With button" url="/snippets/components/notice/button.html"></CodeExample>
					<CodeExample class="darker" title="Inside a panel" url="/snippets/components/notice/panel.html"></CodeExample>

					<div class="divider divider-horizontal docs-separator"></div>

					<Variables :vars="noticeVars"/>

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
	import Variables from "../../../components/Variables";

	export default {

		name: "Notice",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents,
			Variables
		},

		data()
		{
			return {
				noticeVars: [
					{
						name: "--notice-background",
						type: "none"
					},
					{
						name: "--notice-foreground",
						type: "none"
					}
				]
			};
		}

	}

</script>
