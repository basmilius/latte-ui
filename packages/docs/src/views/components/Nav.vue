<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="component-nav">

		<PageHeader title="Nav" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.standard" title="Standard" classes="bg-panel"/>
				<CodeExample :code="previews.badge" title="With badge" classes="bg-panel"/>
				<CodeExample :code="previews.icon" title="With icon" classes="bg-panel"/>
				<CodeExample :code="previews.spinner" title="With spinner" classes="bg-panel"/>
				<CodeExample :code="previews.formElements" title="With form elements" classes="bg-panel"/>
			</div>
		</TitledRow>

	</div>

</template>

<script>

	import PageHeader from "../../components/PageHeader";
	import TitledRow from "../../components/TitledRow";
	import CodeExample from "../../components/CodeExample";
	import CodeSnippet from "../../components/CodeSnippet";
	import ApiExplorer from "../../components/ApiExplorer";

	export default {

		name: "Nav",

		components: {ApiExplorer, CodeSnippet, CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
				previews: {
					standard: require("raw-loader!../../data/components/nav/standard.html").default,
					badge: require("raw-loader!../../data/components/nav/badge.html").default,
					formElements: require("raw-loader!../../data/components/nav/form-elements.html").default,
					icon: require("raw-loader!../../data/components/nav/icon.html").default,
					spinner: require("raw-loader!../../data/components/nav/spinner.html").default
				},
				tabs: [
					{label: "Introduction", selector: "#introduction"},
					{label: "Examples", selector: "#examples"}
				]
			};
		}

	}

</script>
