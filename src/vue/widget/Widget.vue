<template>

	<div class="panel widget" :class="{'is-custom-body': customBody}" tabindex="0">

		<div class="panel-header">
			<div class="widget-drag-handle grid-item-drag-handle"></div>

			<slot name="custom_title"></slot>

			<div class="ml-auto d-flex flex-row align-items-center">
				<slot name="title"></slot>

				<latte-button-dropdown icon="dots-vertical" :small="true" type="list">
					<nav class="nav nav-list">
						<slot name="widget_menu"></slot>
						<a class="nav-link" @click="removeWidget()"><i class="mdi mdi-delete"></i> <span>Delete widget</span></a>
					</nav>
				</latte-button-dropdown>
			</div>
		</div>

		<div class="panel-body">
			<slot name="content"></slot>
		</div>

		<slot name="footer"></slot>

	</div>

</template>

<script>

	import { forObject } from "../../js/i18n";
	import { confirm, Buttons } from "../../js/ui/messages";

	export default {

		name: "latte-widget",

		props: {

			customBody: {
				default: false,
				required: false,
				type: Boolean
			},

			widgetId: {
				type: Number,
				required: true
			}

		},

		data()
		{
			return {
				i18n: {
					delete: "Delete",
					widgetDeleteConfirmationTitle: "Are you sure?",
					widgetDeleteConfirmationBody: "This widget will be deleted permanently!"
				}
			};
		},

		mounted()
		{
			this.i18n = forObject(this.i18n);
		},

		methods: {

			removeWidget()
			{
				confirm(this.i18n.widgetDeleteConfirmationTitle, this.i18n.widgetDeleteConfirmationBody).then(r =>
				{
					if (r.button !== Buttons.OK)
						return;

					this.$emit("remove", this.widgetId);
				});
			}

		}

	}

</script>
