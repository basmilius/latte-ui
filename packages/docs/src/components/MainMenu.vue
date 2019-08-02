<template>

	<div class="app-bar app-bar-main app-bar-primary" role="toolbar">
		<div class="app-bar-row">
			<button class="btn btn-icon btn-text ml-lg-2 mr-lg-1 d-block d-lg-none" aria-label="Toggle drawer" @click="$emit('toggle-drawer')">
				<i class="mdi mdi-menu"></i>
			</button>

			<span class="app-bar-title">Latte</span>

			<nav class="nav nav-tabs px-5 d-none d-lg-flex">
				<latte-ripple as="router-link" to="/" class="nav-link">Home</latte-ripple>
				<latte-ripple as="router-link" to="/docs" class="nav-link">Documentation</latte-ripple>
				<latte-ripple as="router-link" to="/tests" class="nav-link">Random tests</latte-ripple>
			</nav>

			<div class="d-flex align-items-center ml-auto">
				<span class="mx-2">v{{ $latte.version }}</span>
				<div class="divider divider-vertical"></div>
				<latte-button-dropdown button-class="btn-icon btn-text" icon="dots-vertical" :margin-y="9">
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
	</div>

</template>

<script>

	export default {

		name: "MainMenu"

	}

</script>
