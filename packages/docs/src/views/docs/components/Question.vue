<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="component-question">

		<PageHeader>
			<h1>Question</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample class="darker" :show-code="false" title="What is a Question" url="/snippets/components/question/what.html"></CodeExample>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title">JavaScript API</h2></div>
						<div class="panel-body">
							<button class="btn btn-contained btn-primary" @click="findMe"><i class="mdi mdi-map-marker"></i><span>Find me</span></button>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="js" url="/snippets/components/question/api.snippet"></CodeSnippet>
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

	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";
	import CodeExample from "../../../components/CodeExample";
	import CodeSnippet from "../../../components/CodeSnippet";

	export default {

		name: "Question",

		components: {
			CodeSnippet,
			CodeExample,
			PageHeader,
			TableOfContents
		},

		methods: {

			async findMe()
			{
				const result = await this.$latte.ui.question.create("map-marker-outline", "Allow <strong>Latte UI Docs</strong> to use this device's location?", [
					{id: 1, label: "Allow all the time"},
					{id: 2, label: "Allow when the app in use"},
					{id: 4, label: "Deny"},
					{id: 8, label: "Deny & don't ask again"}
				]);

				switch (result)
				{
					case 1:
					case 2:
						navigator.geolocation.getCurrentPosition(pos => this.$latte.ui.snackbar.create({message: `Lat: ${pos.coords.latitude}; Long: ${pos.coords.longitude}`}));
						break;

					case 4:
						await this.$latte.ui.snackbar.create({message: "You denied!"});
						break;

					case 8:
						await this.$latte.ui.snackbar.create({message: "You denied and asked to never show this question again!"});
						break;
				}
			}

		}

	}

</script>
