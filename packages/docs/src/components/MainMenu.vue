<template>

	<div class="app-bar app-bar-main app-bar-primary" role="toolbar">
		<div class="app-bar-row">
			<button class="btn btn-icon btn-text ml-lg-2 mr-lg-1 d-block d-lg-none" aria-label="Toggle drawer" @click="$emit('toggle-drawer')">
				<i class="mdi mdi-menu"></i>
			</button>

			<span class="app-bar-title">Latte UI</span>

			<nav class="nav nav-tabs px-5 d-none d-lg-flex">
				<latte-ripple as="router-link" to="/" class="nav-link">Home</latte-ripple>
				<latte-ripple as="router-link" to="/docs" class="nav-link">Documentation</latte-ripple>
				<latte-ripple as="router-link" to="/block-editor" class="nav-link">Block editor</latte-ripple>
				<latte-ripple as="router-link" to="/tests" class="nav-link">Bas' playground</latte-ripple>
			</nav>

			<div class="d-flex align-items-center ml-auto">
				<span class="badge mx-2">v{{ latteVersion }}</span>
				<div class="divider divider-vertical"></div>
				<button class="btn btn-icon btn-text" ref="dotsMenu"><i class="mdi mdi-dots-vertical"></i></button>

				<latte-popup :associate-with="$refs.dotsMenu" :margin-x="-9">
					<nav class="nav nav-list">
						<latte-ripple as="a" class="nav-link" href="//github.com/basmilius/latte-ui/releases" target="_blank"><i class="mdi mdi-download"></i><span>Download</span></latte-ripple>
						<latte-ripple as="a" class="nav-link" href="//github.com/basmilius/latte-ui" target="_blank"><i class="mdi mdi-github-circle"></i><span>Get Source</span></latte-ripple>
						<!-- TODO(Bas): Reimplement theming options. -->
					</nav>
				</latte-popup>
			</div>
		</div>
	</div>

</template>

<script>

	import { Latte } from "@bybas/latte-ui";

	export default {

		refs: ["dotsMenu"],

		computed: {

			latteVersion()
			{
				return Latte.version;
			}

		}

	}

</script>
