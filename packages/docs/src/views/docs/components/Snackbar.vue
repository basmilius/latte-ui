<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="component-snackbar">

		<PageHeader>
			<h1>Snackbar</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample class="darker" :show-code="false" title="What is a Snackbar" url="/snippets/components/snackbar/what.html"></CodeExample>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title">JavaScript API</h2></div>
						<div class="panel-body">
							<button class="btn btn-contained btn-primary" @click="show"><span>Show</span></button>
							<button class="btn btn-contained btn-primary" @click="showWithAction"><span>Show with action</span></button>
							<button class="btn btn-contained btn-primary" @click="allLocations"><span>All locations</span></button>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="js" url="/snippets/components/snackbar/api.snippet"></CodeSnippet>
						</div>
					</div>

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
	import CodeSnippet from "../../../components/CodeSnippet";
	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";

	export default {

		name: "Snackbar",

		components: {
			CodeExample,
			CodeSnippet,
			PageHeader,
			TableOfContents
		},

		methods: {

			allLocations()
			{
				const locations = [
					Latte.ui.snackbar.Locations.BOTTOM_LEFT,
					Latte.ui.snackbar.Locations.BOTTOM,
					Latte.ui.snackbar.Locations.BOTTOM_RIGHT,
					Latte.ui.snackbar.Locations.TOP_LEFT,
					Latte.ui.snackbar.Locations.TOP,
					Latte.ui.snackbar.Locations.TOP_RIGHT
				];

				locations.forEach(location =>
				{
					Latte.ui.snackbar.create({
						duration: 300,
						location,
						message: "Hey! I'm a snackbar!"
					});
				});
			},

			show()
			{
				Latte.ui.snackbar.create({
					message: "Hello world!"
				});
			},

			async showWithAction()
			{
				const wasAction = await Latte.ui.snackbar.create({
					action: {
						color: "success",
						label: "Undo"
					},
					message: "Folder has been removed."
				});

				Latte.ui.message.alert("Snackbar result", wasAction ? "You pressed Undo" : "You did nothing!");
			}

		}

	}

</script>
