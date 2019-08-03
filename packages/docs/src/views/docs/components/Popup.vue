<template>

	<div class="page" id="components-popup">

		<PageHeader>
			<h1>Popup</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

				</div>
				<div class="col-12 col-lg-3">

					<TableOfContents/>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";
	import ApiExplorer from "../../../components/ApiExplorer";

	export default {

		name: "Popup",

		components: {
			ApiExplorer,
			PageHeader,
			TableOfContents
		}

	}

</script>
