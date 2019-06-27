<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="component-message">

		<PageHeader>
			<h1>Message</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample class="darker" :show-code="false" title="What is a Message" url="/snippets/components/message/what.html"></CodeExample>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title">Alert</h2></div>
						<div class="panel-body">
							<button class="btn btn-contained btn-primary" @click="showAlert"><span>Show alert</span></button>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="js" url="/snippets/components/message/alert.snippet"></CodeSnippet>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title">Confirm</h2></div>
						<div class="panel-body">
							<button class="btn btn-contained btn-primary" @click="showConfirm"><span>Show confirm</span></button>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="js" url="/snippets/components/message/confirm.snippet"></CodeSnippet>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title">Prompt</h2></div>
						<div class="panel-body">
							<button class="btn btn-contained btn-primary" @click="showPrompt"><span>Show prompt</span></button>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="js" url="/snippets/components/message/prompt.snippet"></CodeSnippet>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title">Custom</h2></div>
						<div class="panel-body">
							<button class="btn btn-contained btn-primary" @click="showCustom"><span>Show custom</span></button>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="js" url="/snippets/components/message/custom.snippet"></CodeSnippet>
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
	import { Latte } from "../../../../../latte-ui";

	export default {

		name: "Message",

		components: {
			CodeExample,
			CodeSnippet,
			PageHeader,
			TableOfContents
		},

		methods: {

			showAlert()
			{
				Latte.ui.message.alert("Alert", "This is an alert message with a single button.");
			},

			async showConfirm()
			{
				const {button} = await Latte.ui.message.confirm("Confirm", "This is a confirm message with two buttons.");

				switch (button)
				{
					case Latte.ui.message.Buttons.CANCEL:
						Latte.ui.message.alert("Result", "You clicked Cancel!");
						break;

					case Latte.ui.message.Buttons.OK:
						Latte.ui.message.alert("Result", "You clicked OK!");
						break;
				}
			},

			async showCustom()
			{
				const buttons = Latte.ui.message.Buttons.CANCEL | Latte.ui.message.Buttons.NO | Latte.ui.message.Buttons.YES;
				const {button} = await Latte.ui.message.create("Custom", "This is a message with three custom buttons defined in Latte.ui.message.Buttons", buttons);

				switch (button)
				{
					case Latte.ui.message.Buttons.CANCEL:
						Latte.ui.message.alert("Result", "You clicked Cancel!");
						break;

					case Latte.ui.message.Buttons.NO:
						Latte.ui.message.alert("Result", "You clicked No!");
						break;

					case Latte.ui.message.Buttons.YES:
						Latte.ui.message.alert("Result", "You clicked Yes!");
						break;
				}
			},

			async showPrompt()
			{
				const {button, input} = await Latte.ui.message.prompt("Prompt", "This is a prompt message where you can enter something. What is your name?");

				switch(button)
				{
					case Latte.ui.message.Buttons.CANCEL:
						Latte.ui.message.alert("Result", "You clicked Cancel!");
						break;

					case Latte.ui.message.Buttons.OK:
						Latte.ui.message.alert("Result", `You clicked OK and entered ${input}!`);
						break;
				}
			}

		}

	}

</script>
