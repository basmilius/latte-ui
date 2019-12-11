<template>

	<div class="page" id="components">

		<PageHeader title="Components"/>

		<div class="container pt-5">
			<div class="row">
				<div class="col-12 col-lg-6">
					<p class="lead">
						This page shows all available components in Latte UI. Some of them require a Vue.js-component
						to work, others you can use without.
					</p>
				</div>
			</div>
		</div>

		<TitledRow class="py-5" title="Available components">
			<div class="col-12 col-lg-3 d-flex" v-for="cmp of components">

				<latte-ripple as="router-link" :to="cmp.url" class="panel mb-panel-gutter w-100">
					<div class="panel-media panel-media-gutter bg-primary embed-responsive embed-responsive-16by9"></div>
					<div class="panel-body flex-grow-1">
						<h6 class="text-primary">{{ cmp.title }}</h6>
						<p class="text-muted">{{ cmp.description }}</p>
					</div>
				</latte-ripple>

			</div>
		</TitledRow>

	</div>

</template>

<script>

	import PageHeader from "../../components/PageHeader";
	import TitledRow from "../../components/TitledRow";

	export default {

		name: "GettingStartedIndex",

		components: {TitledRow, PageHeader},

		data()
		{
			return {
				components: [
					{url: "/components/app-bar", title: "App Bar", description: "The primary navigation element, used to display the branding of your app."},
					{url: "/components/avatar", title: "Avatar", description: "Used to show profile pictures or initials of users or other images in a list."},
					{url: "/components/badge", title: "Badge", description: "Also known as tags."},
					{url: "/components/bottom-nav", title: "Bottom Nav", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/button", title: "Button", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/chat", title: "Chat", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/data-table", title: "Datatable", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/expandable", title: "Expandable", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/form-elements", title: "Form elements", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/list", title: "List", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/nav", title: "Nav", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/notice", title: "Notice", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/overlay", title: "Overlay", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/pagination", title: "Pagination", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/panel", title: "Panel", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/popup", title: "Popup", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/portal", title: "Portal", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/progress", title: "Progress", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/ripple", title: "Ripple", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/sheet", title: "Sheet", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/spinner", title: "Spinner", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/tabs", title: "Tabs", description: "Lorem ipsum dolor sit amet..."},
					{url: "/components/window", title: "Window", description: "Lorem ipsum dolor sit amet..."}
				]
			};
		}

	}

</script>
