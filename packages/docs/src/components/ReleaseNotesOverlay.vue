<template>

	<latte-overlay :name="uniqueId">

		<div class="panel" style="width: 420px">
			<div class="panel-header">
				<span class="panel-title">Release notes</span>
				<button class="btn btn-icon btn-text btn-dark ml-auto" @click="close"><i class="mdi mdi-window-close"></i></button>
			</div>
			<div class="panel-body">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur deserunt dicta doloribus ducimus, impedit nam odit quaerat quis repellendus reprehenderit ullam vitae voluptatibus. Aliquid aut deleniti dignissimos facere, labore quos?
			</div>
			<div class="panel-body border-top-0 pt-0">
				<latte-ripple as="button" class="btn btn-contained btn-pill btn-primary" @click="close"><span>Close</span></latte-ripple>
			</div>
		</div>

	</latte-overlay>

</template>

<script>

	import { Latte } from "../../../latte-ui";

	export default {

		name: "ReleaseNotesOverlay",

		data()
		{
			return {
				uniqueId: Latte.api.id()
			};
		},

		methods: {

			close()
			{
				Latte.ui.overlay.close(this.uniqueId);
			},

			open()
			{
				Latte.ui.overlay.open(this.uniqueId);
			}

		}

	}

</script>
