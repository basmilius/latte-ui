<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="app-bar app-bar-main app-bar-primary" role="toolbar">
		<div class="app-bar-row">
			<button class="btn btn-icon btn-text ml-lg-2 mr-lg-1 d-block d-lg-none" aria-label="Toggle drawer" @click="$emit('toggle-drawer')">
				<latte-icon>menu</latte-icon>
			</button>

			<span class="app-bar-title">Latte UI</span>
			<div class="mx-auto"></div>

			<div class="d-flex align-items-center">
				<span class="badge mx-2">v{{ latteVersion }}</span>
				<div class="divider divider-vertical"></div>
				<button class="btn btn-icon btn-text" ref="dotsMenu" aria-label="More..."><latte-icon>dots-vertical</latte-icon></button>

				<latte-popup :associate-with="$refs.dotsMenu" :margin-x="-9">
					<nav class="nav nav-list">
						<latte-ripple as="a" class="nav-link" href="//github.com/basmilius/latte-ui/releases" target="_blank"><latte-icon>download</latte-icon><span>Download</span></latte-ripple>
						<latte-ripple as="a" class="nav-link" href="//github.com/basmilius/latte-ui" target="_blank"><latte-icon>github-circle</latte-icon><span>Get Source</span></latte-ripple>
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
