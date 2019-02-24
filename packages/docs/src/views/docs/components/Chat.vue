<template>

	<div class="page" id="components-chat">

		<PageHeader>
			<h1>Chat</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Bubbles" url="/snippets/components/chat/bubbles.html"></CodeExample>

					<CodeExample title="With avatars" url="/snippets/components/chat/with-avatar.html"></CodeExample>

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
	import TableOfContents from "../../../components/TableOfContents";
	import PageHeader from "../../../components/PageHeader";

	export default {

		name: "Chat",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		}
	}

</script>
