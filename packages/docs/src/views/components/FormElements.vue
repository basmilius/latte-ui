<template>

	<div class="page" id="component-app-bar">

		<PageHeader title="Form elements" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.field" title="Field" classes="bg-panel"/>
				<CodeExample :code="previews.select" title="Select" classes="bg-panel"/>
				<CodeExample :code="previews.datetime" title="Date and time picker" classes="bg-panel"/>
				<CodeExample :code="previews.addons" title="Addons" classes="bg-panel"/>
				<CodeExample :code="previews.colors" title="Colors" classes="bg-panel"/>
				<CodeExample :code="previews.password" title="Password" classes="bg-panel"/>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="API" id="api">
			<div class="col-12">
				<ApiExplorer v-bind="api"/>
			</div>
		</TitledRow>

	</div>

</template>

<script>

	import PageHeader from "../../components/PageHeader";
	import TitledRow from "../../components/TitledRow";
	import CodeExample from "../../components/CodeExample";
	import ApiExplorer from "../../components/ApiExplorer";

	export default {

		name: "FormElements",

		components: {ApiExplorer, CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
				api: {},
				previews: {
					field: require("raw-loader!../../data/components/form-elements/field.html").default,
					select: require("raw-loader!../../data/components/form-elements/select.html").default,
					datetime: require("raw-loader!../../data/components/form-elements/datetime.html").default,
					addons: require("raw-loader!../../data/components/form-elements/addons.html").default,
					colors: require("raw-loader!../../data/components/form-elements/colors.html").default,
					password: require("raw-loader!../../data/components/form-elements/password.html").default,
				},
				tabs: [
					{label: "Introduction", selector: "#introduction"},
					{label: "Examples", selector: "#examples"},
					{label: "API", selector: "#api"}
				]
			};
		}

	}

</script>
