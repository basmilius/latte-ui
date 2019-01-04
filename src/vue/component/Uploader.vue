<!--
  - Copyright © 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="drop-container uploader" :class="containerClasses" @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop">
		<slot name="drop-here" :uploader="this" v-if="!isDraggingOver">Drop here to upload</slot>
		<slot name="let-go" :uploader="this" v-else>Let go to upload</slot>

		<template v-if="!isMultiple && previewMode === 'photo' && files.length === 0">
			<img src="" alt="">
		</template>
	</div>

</template>

<script>

	export default {

		name: "latte-uploader-noop",

		props: {

			isMultiple: {
				default: false,
				required: false,
				type: Boolean
			},

			previewMode: {
				default: "photo",
				required: false,
				type: String,
				validator: value => ["photo", "list"].includes(value)
			}

		},

		created()
		{
			window.addEventListener("dragend", evt => this.onDragEnd(evt));
			window.addEventListener("dragleave", evt => this.onDragEnd(evt));
			window.addEventListener("dragover", evt => this.onDragStart(evt));
			window.addEventListener("drop", evt => this.onDragEnd(evt));
		},

		data()
		{
			return {
				isDragging: false,
				isDraggingOver: false,
				files: []
			};
		},

		mounted()
		{
		},

		computed: {

			containerClasses()
			{
				const classes = [];

				if (this.isDragging)
					classes.push("is-dragging");

				if (this.isDraggingOver)
					classes.push("is-dragging-over");

				return classes;
			},

			isImage()
			{
				if (this.files.length === 0)
					return false;

				return this.files[0].type.startsWith("image/");
			},

			isPreviewAvailable()
			{
				if (this.files.length === 0)
					return false;

				// TODO(Bas): Handle multiple files.
				if (this.files.length === 1)
					return true;

				return false;
			}

		},

		methods: {

			onDragEnd()
			{
				this.isDragging = false;
			},

			onDragEnter(evt)
			{
				evt.preventDefault();

				this.isDraggingOver = true;
			},

			onDragLeave(evt)
			{
				evt.preventDefault();

				this.isDraggingOver = false;
			},

			onDragStart(evt)
			{
				evt.preventDefault();

				this.isDragging = true;
			},

			onDrop(evt)
			{
				evt.preventDefault();
				window.dispatchEvent(new CustomEvent("dragend"));

				this.files = evt.dataTransfer.files;
				this.isDragging = false;
				this.isDraggingOver = false;
			}

		},

		watch: {}

	}

</script>

<style lang="scss">

	div.drop-container
	{
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		border: 2px dashed var(--outline-color-secondary);
		border-radius: var(--border-radius);
		text-align: center;

		&.is-dragging > *
		{
			pointer-events: none;
		}

		&.is-dragging
		{
			background-color: rgba(var(--color-dark), .05);
			border-color: rgba(var(--color-dark), .1);
		}

		&.is-dragging-over
		{
			background-color: rgba(var(--color-primary), .3);
			border-color: rgba(var(--color-primary), .1);
		}
	}

</style>

<style lang="scss" scoped>

	div.uploader
	{
	}

</style>
