<template>

	<div class="page" id="component-app-bar">

		<PageHeader title="App Bar" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">An App Bar is the primary navigation element of your app or website. It can also show your primary branding color.</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples"></TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="API" id="api"></TitledRow>

	</div>

</template>

<script>

	import PageHeader from "../../components/PageHeader";
	import TitledRow from "../../components/TitledRow";

	export default {

		name: "AppBar",

		components: {TitledRow, PageHeader},

		data()
		{
			return {
				tabs: [
					{label: "Introduction", selector: "#introduction"},
					{label: "Examples", selector: "#examples"},
					{label: "API", selector: "#api"}
				]
			};
		}

	}

</script>
