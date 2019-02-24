<template>

	<div class="page" id="components-ripple">

		<PageHeader>
			<h1>Ripple</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Standalone" url="/snippets/components/ripple/standalone.html"></CodeExample>

					<CodeExample title="Color" url="/snippets/components/ripple/color.html"></CodeExample>

					<CodeExample title="Center" url="/snippets/components/ripple/center.html"></CodeExample>

					<CodeExample title="Clip" url="/snippets/components/ripple/clip.html"></CodeExample>

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

		name: "Ripple",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		}

	}

</script>

<style lang="scss">

	.ce-ripple
	{
		position: relative;
		box-shadow: 0 0 0 2px var(--outline-color);
		line-height: 180px;
		text-align: center;
	}

</style>
