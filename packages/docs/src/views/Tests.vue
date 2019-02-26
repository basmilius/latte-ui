<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="tests">

		<PageHeader>
			<h1>Random tests</h1>
			<p>These are some development tests.</p>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12">

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Message dialog</span></div>
						<div class="panel-body">

							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showAlert"><span>Show alert</span></latte-ripple>
							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showConfirm"><span>Show confirm</span></latte-ripple>
							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showPrompt"><span>Show prompt</span></latte-ripple>

						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Question dialog</span></div>
						<div class="panel-body">

							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showQuestion"><span>Open question</span></latte-ripple>

						</div>
					</div>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import PageHeader from "../components/PageHeader";

	export default {

		components: {
			PageHeader
		},

		methods: {

			showAlert()
			{
				this.$latte.ui.message.alert("Hello", "Hello world from the new Vue based message dialog!").then(result => console.log(result));
			},

			showConfirm()
			{
				this.$latte.ui.message.confirm("Hello", "Hello world from the new Vue based message dialog!").then(result => console.log(result));
			},

			showPrompt()
			{
				this.$latte.ui.message.prompt("Hello", "Hello world from the new Vue based message dialog!").then(result => console.log(result));
			},

			showQuestion()
			{
				this.$latte.ui.question.create("map-marker-outline", "Allow <strong>Maps</strong> to access this device's location?", [
					{id: 1, label: "Allow all the time"},
					{id: 2, label: "Allow when the app in use"},
					{id: 4, label: "Deny"},
					{id: 8, label: "Deny & don't ask again"}
				]).then(result => console.log(result));
			}

		}

	}

</script>
