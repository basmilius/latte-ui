<template>

	<main id="skeleton" :class="{'is-docs': $router.currentRoute.path.substr(0, 5) === '/docs'}">
		<div class="app-bar app-bar-main app-bar-primary" role="toolbar">
			<div class="app-bar-row">
				<button class="btn btn-icon btn-text ml-lg-2 mr-lg-1 d-block d-lg-none" aria-label="Toggle drawer" @click="$refs.drawer.open()"><i class="mdi mdi-menu"></i></button>

				<span class="app-bar-title">Latte UI</span>

				<nav class="nav nav-tabs px-5 d-none d-lg-flex">
					<latte-ripple as="router-link" to="/" class="nav-link">Home</latte-ripple>
					<latte-ripple as="router-link" to="/docs" class="nav-link">Documentation</latte-ripple>
					<latte-ripple as="router-link" to="/examples" class="nav-link">Examples</latte-ripple>
				</nav>

				<div class="d-flex align-items-center ml-auto">
					<span class="mx-2">v{{ $latte.version }}</span>
					<div class="divider divider-vertical"></div>
					<latte-button-dropdown button-class="btn-icon btn-text" icon="dots-vertical">
						<nav class="nav nav-list">
							<latte-ripple as="a" class="nav-link" href="//github.com/basmilius/latte-ui/releases" target="_blank"><i class="mdi mdi-download"></i><span>Download</span></latte-ripple>
							<latte-ripple as="a" class="nav-link" href="//github.com/basmilius/latte-ui" target="_blank"><i class="mdi mdi-github-circle"></i><span>Get Source</span></latte-ripple>
							<div class="divider divider-horizontal"></div>
							<latte-ripple as="a" class="nav-link" data-action="latte:switch-theme" data-close data-theme-id="default"><i class="mdi mdi-lightbulb-on"></i><span>Light theme</span></latte-ripple>
							<latte-ripple as="a" class="nav-link" data-action="latte:switch-theme" data-close data-theme-id="dark"><i class="mdi mdi-invert-colors"></i><span>Dark theme</span></latte-ripple>
						</nav>
					</latte-button-dropdown>
				</div>
			</div>
			<div class="app-bar-row d-flex d-lg-none">
				<nav class="nav nav-tabs tabs-fill flex-grow-1">
					<latte-ripple as="router-link" to="/" class="nav-link" style="flex-basis: 0">Home</latte-ripple>
					<latte-ripple as="router-link" to="/docs" class="nav-link" style="flex-basis: 0">Documentation</latte-ripple>
					<latte-ripple as="router-link" to="/examples" class="nav-link" style="flex-basis: 0">Examples</latte-ripple>
				</nav>
			</div>
		</div>

		<latte-sheet ref="drawer" class="drawer-container has-secondary">
			<div id="drawer" role="menu" @click="$refs.drawer.close()">
				<nav class="nav nav-list py-3" id="drawer-secondary">

					<latte-ripple as="router-link" to="/docs" class="nav-link"><span>Getting started</span></latte-ripple>

					<div class="divider divider-horizontal"></div>

					<span class="section">Layout</span>
					<latte-ripple as="router-link" to="/docs/layout/color" class="nav-link"><span>Color</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/layout/grid-system" class="nav-link"><span>Grid system</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/layout/typography" class="nav-link"><span>Typography</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/layout/utilities" class="nav-link"><span>Utilities</span></latte-ripple>

					<div class="divider divider-horizontal"></div>

					<span class="section">Components</span>
					<latte-ripple as="router-link" to="/docs/components/app-bar" class="nav-link"><span>App bar</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/avatar" class="nav-link"><span>Avatar</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/badge" class="nav-link"><span>Badge</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/bottom-nav" class="nav-link"><span>Bottom nav</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/button" class="nav-link"><span>Button</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/chat" class="nav-link"><span>Chat</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/datatable" class="nav-link"><span>Datatable</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/dropdown-button" class="nav-link"><span>Dropdown button</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/expandable" class="nav-link"><span>Expandable</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/form-elements" class="nav-link"><span>Form elements</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/list" class="nav-link"><span>List</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/message" class="nav-link"><span>Message</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/nav" class="nav-link"><span>Nav</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/notice" class="nav-link"><span>Notice</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/notification" class="nav-link"><span>Notification</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/overlay" class="nav-link"><span>Overlay</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/pagination" class="nav-link"><span>Pagination</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/panel" class="nav-link"><span>Panel</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/popup" class="nav-link"><span>Popup</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/portal" class="nav-link"><span>Portal</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/progress" class="nav-link"><span>Progress</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/question" class="nav-link"><span>Question</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/ripple" class="nav-link"><span>Ripple</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/sheet" class="nav-link"><span>Sheet</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/snackbar" class="nav-link"><span>Snackbar</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/spinner" class="nav-link"><span>Spinner</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/swiper" class="nav-link"><span>Swiper</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs/components/tabs" class="nav-link"><span>Tabs</span></latte-ripple>

				</nav>
			</div>
		</latte-sheet>

		<div class="content">

			<router-view/>

		</div>

		<footer class="footer py-5" style="background: rgb(var(--panel-background))">
			<div class="content">
				<div class="container">
					<div class="row">
						<div class="col-12 col-lg footer-nav">

							<strong>Develop</strong>
							<nav class="nav nav-links mt-3">
								<router-link to="/docs" class="nav-link">Documentation</router-link>
								<a href="//github.com/basmilius/latte-ui/issues" target="_blank" class="nav-link">Report a bug</a>
								<a href="//github.com/basmilius/latte-ui/issues" target="_blank" class="nav-link">Request a feature</a>
							</nav>

						</div>
						<div class="col-12 col-lg footer-nav mt-5 mt-lg-0">

							<strong>Design</strong>
							<nav class="nav nav-links mt-3">
								<router-link to="/design/blocks" class="nav-link">Blocks</router-link>
								<router-link to="/design/adobe-xd" class="nav-link">Adobe XD</router-link>
							</nav>

						</div>
						<div class="col-12 col-lg-5 mt-5 mt-lg-0 text-center text-lg-left">

							<strong>About</strong>
							<p class="mt-4">
								Designed and developed with much <i class="mdi mdi-heart text-error"></i> by <a href="//bas.dev" target="_blank">Bas Milius</a> and the contributors.
							</p>
							<p class="mt-4 text-soft">
								Version {{ $latte.version }} &mdash; <a href="//github.com/basmilius/latte-ui/blob/master/LICENSE" target="_blank">MIT</a> licensed.
							</p>

						</div>
					</div>
				</div>
			</div>
		</footer>
	</main>

</template>

<script>

	export default {

		name: "Skeleton"

	}

</script>
