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

					<div class="divider divider-horizontal docs-separator"></div>

					<Variables :vars="bottomNavVars"/>

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

		name: "BottomNav",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents,
			Variables
		},

		data()
		{
			const computedStyle = window
				.getComputedStyle(document.body);

			return {
				bottomNavVars: [
					{
						name: "--bottom-nav-alpha",
						type: "int",
						default: 1
					},
					{
						name: "--bottom-nav-background",
						type: "rgb",
						default: computedStyle.getPropertyValue("--bottom-nav-background").split(",").map(c => parseInt(c))
					},
					{
						name: "--bottom-nav-foreground",
						type: "rgb",
						default: computedStyle.getPropertyValue("--bottom-nav-foreground").split(",").map(c => parseInt(c))
					},
					{
						name: "--bottom-nav-elevation",
						type: "string",
						default: computedStyle.getPropertyValue("--bottom-nav-elevation")
					}
				]
			};
		}

	}

</script>
