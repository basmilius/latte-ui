<template>

	<div class="page" id="components-avatar">

		<PageHeader>
			<h1>Avatar</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Standalone" url="/snippets/components/avatar/avatar.html"></CodeExample>
					<CodeExample title="Initials" url="/snippets/components/avatar/initials.html"></CodeExample>
					<CodeExample title="Alternative corners" url="/snippets/components/avatar/radius.html"></CodeExample>
					<CodeExample title="Strip" url="/snippets/components/avatar/strip.html"></CodeExample>

					<div class="divider divider-horizontal docs-separator"></div>

					<ApiExplorer v-bind="api"/>

				</div>
				<div class="col-12 col-lg-3">

					<TableOfContents/>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import ApiExplorer from "../../../components/ApiExplorer";
	import CodeExample from "../../../components/CodeExample";
	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";

	export default {

		name: "Avatar",

		components: {
			ApiExplorer,
			CodeExample,
			PageHeader,
			TableOfContents
		},

		data()
		{
			return {
				api: {
					variables: [
						{
							name: "font-size",
							description: "Sets the size of the avatar.",
							type: "string",
							default: "15px"
						}
					]
				}
			};
		}

	}

</script>
