<template>

	<div class="page" id="components-form-elements">

		<PageHeader>
			<h1>Form elements</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<CodeExample title="Field" url="/snippets/components/form-elements/field.html"></CodeExample>
					<CodeExample title="Select" url="/snippets/components/form-elements/select.html"></CodeExample>
					<CodeExample title="Date/Time" url="/snippets/components/form-elements/datetime.html"></CodeExample>
					<CodeExample title="Addons" url="/snippets/components/form-elements/addons.html"></CodeExample>
					<CodeExample title="Colors" url="/snippets/components/form-elements/colors.html"></CodeExample>
					<CodeExample title="Password" url="/snippets/components/form-elements/password.html"></CodeExample>
					<CodeExample title="Autocomplete" url="/snippets/components/form-elements/autocomplete.html"></CodeExample>
					<CodeExample title="Range" url="/snippets/components/form-elements/range.html"></CodeExample>
					<CodeExample title="Checkbox" url="/snippets/components/form-elements/checkbox.html"></CodeExample>
					<CodeExample title="Radio" url="/snippets/components/form-elements/radio.html"></CodeExample>
					<CodeExample title="Toggle" url="/snippets/components/form-elements/toggle.html"></CodeExample>

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

		name: "FormElements",

		components: {
			CodeExample,
			PageHeader,
			TableOfContents
		}
	}

</script>
