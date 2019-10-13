<template>

	<main class="scaffolding sheet-below-app-bar" :class="{'is-collapsed': $router.currentRoute.path.substr(0, 5) !== '/docs'}">

		<latte-sheet ref="drawer" class="drawer-container" :touch-enabled="isDrawerTouchEnabled">
			<nav class="nav nav-list py-4" @click="$refs.drawer.close()">

				<div class="d-flex d-lg-none flex-column">
					<latte-ripple as="router-link" to="/" class="nav-link"><span>Home</span></latte-ripple>
					<latte-ripple as="router-link" to="/docs" class="nav-link"><span>Documentation</span></latte-ripple>
					<latte-ripple as="router-link" to="/tests" class="nav-link"><span>Random tests</span></latte-ripple>

					<div class="divider divider-horizontal"></div>
				</div>

				<latte-ripple as="router-link" to="/docs" class="nav-link"><span>Getting started</span></latte-ripple>

				<div class="divider divider-horizontal"></div>

				<latte-ripple as="router-link" to="/docs/color" class="nav-link"><span>Color</span></latte-ripple>
				<latte-ripple as="router-link" to="/docs/grid-system" class="nav-link"><span>Grid system</span></latte-ripple>
				<latte-ripple as="router-link" to="/docs/icons" class="nav-link"><span>Icons</span></latte-ripple>
				<latte-ripple as="router-link" to="/docs/typography" class="nav-link"><span>Typography</span></latte-ripple>
				<latte-ripple as="router-link" to="/docs/utilities" class="nav-link"><span>Utilities</span></latte-ripple>

				<div class="divider divider-horizontal"></div>

				<span class="section">Components</span>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/app-bar"><span>App bar</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/avatar"><span>Avatar</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/badge"><span>Badge</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/bottom-nav"><span>Bottom nav</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/button"><span>Button</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/chat"><span>Chat</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/datatable"><span>Datatable</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/expandable"><span>Expandable</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/form-elements"><span>Form elements</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/list"><span>List</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/message"><span>Message</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/nav"><span>Nav</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/notice"><span>Notice</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/notification"><span>Notification</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/overlay"><span>Overlay</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/pagination"><span>Pagination</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/panel"><span>Panel</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/popup"><span>Popup</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/portal"><span>Portal</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/progress"><span>Progress</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/question"><span>Question</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/ripple"><span>Ripple</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/sheet"><span>Sheet</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/snackbar"><span>Snackbar</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/spinner"><span>Spinner</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/swiper"><span>Swiper</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/tabs"><span>Tabs</span></latte-ripple>
				<latte-ripple as="router-link" class="nav-link" to="/docs/components/window"><span>Window</span></latte-ripple>

			</nav>
		</latte-sheet>

		<MainMenu @toggle-drawer="$refs.drawer.toggle()"/>

		<div class="content p-0">
			<router-view/>

			<footer class="footer py-5">
				<div class="content">
					<div class="container">
						<div class="row">
							<div class="col-12 col-lg-4 text-center text-lg-left">

								<img src="../assets/bas.svg" alt="Bas' logo" height="54" class="mx-auto mx-lg-0"/>
								<br/>
								<p><strong>By Bas</strong></p>
								<p>
									Designed and developed with <img src="https://g.s3.bmcdn.nl/assets/joypixels/v5/svg/2764.svg" alt="Heart" class="emoji"/> by <a href="https://bas.dev" target="_blank" rel="noopener">Bas Milius</a> and other contributors.
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
		</div>
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
