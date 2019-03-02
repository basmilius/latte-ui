<template>

	<div class="page" id="components-notification">

		<PageHeader>
			<h1>Notification</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample class="darker" :show-code="false" title="What is a Notification" url="/snippets/components/notification/what.html"></CodeExample>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title">Minimal</h2></div>
						<div class="panel-body">
							<button class="btn btn-contained btn-primary" @click="showMinimal"><span>Show notification</span></button>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="js" url="/snippets/components/notification/minimal.snippet"></CodeSnippet>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title">Avatar</h2></div>
						<div class="panel-body">
							<button class="btn btn-contained btn-primary" @click="showAvatar"><span>Show notification</span></button>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="js" url="/snippets/components/notification/avatar.snippet"></CodeSnippet>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title">Icon</h2></div>
						<div class="panel-body">
							<button class="btn btn-contained btn-primary" @click="showIcon"><span>Show notification</span></button>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="js" url="/snippets/components/notification/icon.snippet"></CodeSnippet>
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title">Buttons</h2></div>
						<div class="panel-body">
							<button class="btn btn-contained btn-primary" @click="showButtons"><span>Show notification</span></button>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="js" url="/snippets/components/notification/buttons.snippet"></CodeSnippet>
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

	import CodeSnippet from "../../../components/CodeSnippet";
	import CodeExample from "../../../components/CodeExample";
	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";

	export default {

		name: "Notification",

		components: {
			CodeExample,
			CodeSnippet,
			PageHeader,
			TableOfContents
		},

		methods: {

			async showAvatar()
			{
				await Latte.ui.notification.create({
					avatar: "//latte.dev-preview.nl/module/@bas/website/resource/image/photos/2.jpg",
					title: "Example",
					message: "Lorem ipsum dolor sit amet..."
				});
			},

			async showButtons()
			{
				const result = await Latte.ui.notification.create({
					duration: 0,
					icon: "package",
					title: "Update available!",
					message: "Would you like to update now?",
					buttons: [
						{id: 1, label: "Update now", color: "primary"},
						{id: 2, label: "Later"}
					]
				});

				console.log(`Button ID: ${result}`);
			},

			async showIcon()
			{
				await Latte.ui.notification.create({
					color: "warning",
					icon: "map-marker-outline",
					message: "<strong>Maps</strong> is using your device's location"
				});
			},

			async showMinimal()
			{
				await Latte.ui.notification.create({
					title: "Hello world",
					message: "I'm a fancy notification!"
				});
			}

		}

	}

</script>

