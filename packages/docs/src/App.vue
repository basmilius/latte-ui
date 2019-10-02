<template>

	<div id="app">

		<router-view/>

		<latte-overlay name="test" opened>
			<div class="panel" style="width: 480px">
				<div class="panel-header">
					<span class="panel-title">Test overlay</span>
					<button class="btn btn-icon btn-text btn-dark ml-auto" ref="overlayOptionsButton"><i class="mdi mdi-dots-vertical"></i></button>
					<div class="divider divider-vertical"></div>
					<button class="btn btn-icon btn-text btn-dark" @click="closeOverlay"><i class="mdi mdi-close"></i></button>

					<latte-popup :associate-with="$refs.overlayOptionsButton" :margin-x="-9">
						<div class="panel-body" style="width: 360px">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid commodi ducimus esse est et incidunt ipsam magnam necessitatibus odit officiis, quaerat quas quis quo sequi sunt, voluptates! Aspernatur, iure.
						</div>
					</latte-popup>
				</div>
				<div class="panel-body">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam commodi cumque dolore dolores id incidunt laboriosam magni odio omnis, quis quo reiciendis rem rerum soluta vel velit vero voluptate voluptatum.
				</div>
				<div class="panel-body">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam commodi cumque dolore dolores id incidunt laboriosam magni odio omnis, quis quo reiciendis rem rerum soluta vel velit vero voluptate voluptatum.
				</div>
				<div class="panel-body border-0 pt-0">
					<button class="btn btn-contained btn-primary btn-pill" @click="closeOverlay"><span>Close</span></button>
				</div>
			</div>
		</latte-overlay>

		<span class="spinner spinner-primary" :class="{'is-hidden': !isLoading}" id="app-spinner"></span>

	</div>

</template>

<script>

	import { Latte } from "../../latte-ui";

	export default {

		name: "App",

		refs: ["overlayOptionsButton"],

		data()
		{
			return {
				isLoading: false
			};
		},

		mounted()
		{
			Latte.action.on("latte-docs:navigate", () => this.isLoading = true);
			Latte.action.on("latte-docs:navigated", () => this.isLoading = false);
		},

		methods: {

			closeOverlay()
			{
				Latte.ui.overlay.close("test");
			}

		}

	}

</script>
