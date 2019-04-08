<template>

	<div class="page" id="components-swiper">

		<PageHeader>
			<h1>Swiper</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample class="darker" title="Basic" url="/snippets/components/swiper/basic.html"></CodeExample>

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

	export default {

		name: "Swiper",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		}

	}

</script>
