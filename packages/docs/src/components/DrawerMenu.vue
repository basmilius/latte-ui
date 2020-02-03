<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<latte-focus-zone is-vertical>
		<nav class="nav nav-list py-4">

			<latte-expandable :close-when-open="false" group="main" :opened="$route.path === '/'">
				<template v-slot:header>
					<DrawerMenuItem to="/"><span>Home</span></DrawerMenuItem>
				</template>
			</latte-expandable>

			<latte-expandable :close-when-open="false" group="main" :opened="$route.path.startsWith('/getting-started')">
				<template v-slot:header="{isOpen}">
					<DrawerMenuItem to="/getting-started"><span>Getting Started</span><latte-icon class="ml-auto">{{ isOpen ? "chevron-down" : "chevron-right"}}</latte-icon></DrawerMenuItem>
				</template>
				<template>
					<DrawerMenuItem to="/getting-started/about"><span>About Latte UI</span></DrawerMenuItem>
					<DrawerMenuItem to="/getting-started/roadmap"><span>Roadmap</span></DrawerMenuItem>
					<DrawerMenuItem to="/getting-started/news-and-updates"><span>News &amp; Updates</span></DrawerMenuItem>
				</template>
			</latte-expandable>

			<latte-expandable :close-when-open="false" group="main" :opened="$route.path.startsWith('/layout')">
				<template v-slot:header="{isOpen}">
					<DrawerMenuItem to="/layout"><span>Layout</span><latte-icon class="ml-auto">{{ isOpen ? "chevron-down" : "chevron-right"}}</latte-icon></DrawerMenuItem>
				</template>
				<template>
					<DrawerMenuItem to="/layout/color"><span>Color</span></DrawerMenuItem>
					<DrawerMenuItem to="/layout/grid"><span>Grid</span></DrawerMenuItem>
					<DrawerMenuItem to="/layout/icons"><span>Icons</span></DrawerMenuItem>
					<DrawerMenuItem to="/layout/scaffolding"><span>Scaffolding</span></DrawerMenuItem>
					<DrawerMenuItem to="/layout/spacing"><span>Spacing</span></DrawerMenuItem>
					<DrawerMenuItem to="/layout/typography"><span>Typography</span></DrawerMenuItem>
					<DrawerMenuItem to="/layout/themes"><span>Themes</span></DrawerMenuItem>
					<DrawerMenuItem to="/layout/utilities"><span>Utilities</span></DrawerMenuItem>
				</template>
			</latte-expandable>

			<latte-expandable :close-when-open="false" group="main" :opened="$route.path.startsWith('/components')">
				<template v-slot:header="{isOpen}">
					<DrawerMenuItem to="/components"><span>Components</span><latte-icon class="ml-auto">{{ isOpen ? "chevron-down" : "chevron-right"}}</latte-icon></DrawerMenuItem>
				</template>
				<template>
					<DrawerMenuItem to="/components/app-bar"><span>App Bar</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/avatar"><span>Avatar</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/badge"><span>Badge</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/bottom-nav"><span>Bottom Nav</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/button"><span>Button</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/chat"><span>Chat</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/datatable"><span>Datatable</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/expandable"><span>Expandable</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/form-elements"><span>Form elements</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/list"><span>List</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/nav"><span>Nav</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/notice"><span>Notice</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/overlay"><span>Overlay</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/pagination"><span>Pagination</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/panel"><span>Panel</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/popup"><span>Popup</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/portal"><span>Portal</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/progress"><span>Progress</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/ripple"><span>Ripple</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/sheet"><span>Sheet</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/spinner"><span>Spinner</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/tabs"><span>Tabs</span></DrawerMenuItem>
					<DrawerMenuItem to="/components/window"><span>Window</span></DrawerMenuItem>
				</template>
			</latte-expandable>

			<latte-expandable :close-when-open="false" group="main" :opened="$route.path.startsWith('/javascript-api')">
				<template v-slot:header="{isOpen}">
					<DrawerMenuItem to="/javascript-api"><span>JavaScript API</span><latte-icon class="ml-auto">{{ isOpen ? "chevron-down" : "chevron-right"}}</latte-icon></DrawerMenuItem>
				</template>
				<template>
					<DrawerMenuItem to="/javascript-api/actions"><span>Actions</span></DrawerMenuItem>
					<DrawerMenuItem to="/javascript-api/message"><span>Message</span></DrawerMenuItem>
					<DrawerMenuItem to="/javascript-api/notification"><span>Notification</span></DrawerMenuItem>
					<DrawerMenuItem to="/javascript-api/question"><span>Question</span></DrawerMenuItem>
					<DrawerMenuItem to="/javascript-api/snackbar"><span>Snackbar</span></DrawerMenuItem>
				</template>
			</latte-expandable>

			<latte-expandable :close-when-open="false" group="main" :opened="$route.path === '/tests'">
				<template v-slot:header>
					<DrawerMenuItem to="/tests"><span>Tests</span></DrawerMenuItem>
				</template>
			</latte-expandable>

		</nav>
	</latte-focus-zone>
	
</template>

<script>

	import DrawerMenuDivider from "./DrawerMenuDivider";
	import DrawerMenuItem from "./DrawerMenuItem";

	export default {

		name: "DrawerMenu",

		components: {
			DrawerMenuDivider,
			DrawerMenuItem
		}

	}

</script>
