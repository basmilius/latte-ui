<template>

	<div class="page" id="component-chat">

		<PageHeader title="Chat" :tabs="tabs"/>

		<TitledRow class="py-5 text-center text-lg-left" title="Introduction" id="introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda, aut blanditiis cumque deserunt ea earum exercitationem inventore labore magni nobis odio, perspiciatis quam quod reiciendis, rem suscipit. Corporis, molestiae?</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5 text-center text-lg-left" title="Examples" id="examples">
			<div class="col-12">
				<CodeExample :code="previews.standard" title="Standard" classes="bg-panel"/>
				<CodeExample :code="previews.avatar" title="With avatars" classes="bg-panel"/>
			</div>
		</TitledRow>

	</div>

</template>

<script>

	import PageHeader from "../../components/PageHeader";
	import TitledRow from "../../components/TitledRow";
	import CodeExample from "../../components/CodeExample";

	export default {

		name: "Chat",

		components: {CodeExample, TitledRow, PageHeader},

		data()
		{
			return {
				previews: {
					standard: require("raw-loader!../../data/components/chat/standard.html").default,
					avatar: require("raw-loader!../../data/components/chat/avatar.html").default
				},
				tabs: [
					{label: "Introduction", selector: "#introduction"},
					{label: "Examples", selector: "#examples"}
				]
			};
		}

	}

</script>
