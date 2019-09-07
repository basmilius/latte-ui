<template>

	<div class="page" id="components-sheet">

		<PageHeader>
			<h1>Sheet</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

				</div>
				<div class="col-12 col-lg-3">


				</div>
			</div>
		</div>


	</div>

</template>

<script>

	import PageHeader from "../../../components/PageHeader"
	import CodeExample from "../../../components/CodeExample";
	import TableOfContents from "../../../components/TableOfContents";

	export default {

		name: "Sheet",

		components: {
			PageHeader,
			CodeExample,
			TableOfContents
		}

	}

</script>
