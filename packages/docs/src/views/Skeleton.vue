<template>

	<main id="skeleton" :class="{'is-docs': $router.currentRoute.path.substr(0, 5) === '/docs'}">

		<MainMenu @toggle-drawer="$refs.drawer.toggle()"/>

		<latte-sheet ref="drawer" class="drawer-container has-secondary" :touch-enabled="isDrawerTouchEnabled">
			<div id="drawer" role="menu" @click="$refs.drawer.close()">
				<nav class="nav nav-list py-3" id="drawer-secondary">

					<div class="d-flex d-lg-none flex-column">
						<latte-ripple as="router-link" to="/" class="nav-link"><span>Home</span></latte-ripple>
						<latte-ripple as="router-link" to="/docs" class="nav-link"><span>Documentation</span></latte-ripple>
						<latte-ripple as="router-link" to="/tests" class="nav-link"><span>Random tests</span></latte-ripple>

						<div class="divider divider-horizontal"></div>
					</div>

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

		<div class="content p-0">
			<router-view/>
		</div>

		<footer class="footer py-5">
			<div class="content">
				<div class="container">
					<div class="row">
						<div class="col-12 col-lg-4 text-center text-lg-left">

							<img src="../assets/bas.svg" alt="Bas' logo" height="54"/><br/>
							<br/>
							<p><strong>By Bas</strong></p>
							<p>
								Designed and developed with <img src="https://cdn.mili.us/assets/joypixels/v5/svg/2764.svg" alt="Heart" class="emoji"/> by <a href="https://bas.dev" target="_blank" rel="noopener">Bas Milius</a> and other contributors.
							</p>

						</div>
						<div class="col-12 col-lg-2 d-none d-lg-block"></div>
						<div class="col-12 col-lg mt-5 mt-lg-0 footer-nav text-center text-lg-left">

							<strong>Develop</strong>
							<nav class="nav nav-links mt-3">
								<router-link to="/docs" class="nav-link">Documentation</router-link>
								<a href="//github.com/basmilius/latte-ui/issues" target="_blank" class="nav-link">Report a bug</a>
								<a href="//github.com/basmilius/latte-ui/issues" target="_blank" class="nav-link">Request a feature</a>
							</nav>

						</div>
						<div class="col-12 col-lg mt-5 mt-lg-0 footer-nav text-center text-lg-left">

							<strong>Packages</strong>
							<nav class="nav nav-links mt-3">
								<router-link to="/packages/blocks" class="nav-link">Blocks</router-link>
								<router-link to="/packages/layouts" class="nav-link">Layouts</router-link>
							</nav>

						</div>
					</div>
				</div>
			</div>
		</footer>
	</main>

</template>

<script>

	import MainMenu from "../components/MainMenu";
	export default {

		name: "Skeleton",
		components: {MainMenu},
		data()
		{
			return {
				isDrawerTouchEnabled: true
			};
		},

		destroyed()
		{
			window.removeEventListener("resize", this.onWindowResize);
		},

		mounted()
		{
			window.addEventListener("resize", this.onWindowResize, {passive: true});
			this.onWindowResize();
		},

		methods: {

			onWindowResize()
			{
				this.isDrawerTouchEnabled = window.innerWidth <= 991;
			}

		}

	}

</script>
