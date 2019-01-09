<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="drop-container uploader uploader-photo" :class="containerClasses" @click="onClick" @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop">
		<template v-if="files.length === 1">
			<img :src="urls[0]" alt="Photo" class="preview-image single" @load="isLoading = false"/>
		</template>

		<template v-else-if="currentPhoto !== null">
			<img :src="currentPhoto" alt="Photo" class="preview-image single"/>
		</template>

		<slot class="uploader-info" name="drop-here" :uploader="this" v-if="!isDraggingOver">Drop here to upload</slot>
		<slot class="uploader-info" name="let-go" :uploader="this" v-else>Let go to upload</slot>

		<input ref="fileInput" class="d-none" type="file" accept="image/*" :name="name" @change="onFilesSelected"/>

		<span class="spinner spinner-primary"></span>
	</div>

</template>

<script>

	export default {

		name: "latte-uploader-photo",

		props: {

			currentPhoto: {
				default: null,
				required: false,
				type: String | null
			},

			isMultiple: {
				default: false,
				required: false,
				type: Boolean
			},

			name: {
				default: "photo",
				required: false,
				type: String
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
				isLoading: false,
				files: [],
				urls: []
			};
		},

		computed: {

			containerClasses()
			{
				const classes = [];

				if (this.isDragging)
					classes.push("is-dragging");

				if (this.isDraggingOver)
					classes.push("is-dragging-over");

				if (this.isLoading)
					classes.push("is-loading");

				return classes;
			}

		},

		methods: {

			onClick()
			{
				this.$refs.fileInput.click();
			},

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

				this.$refs.fileInput.files = evt.dataTransfer.files;
				this.isDragging = false;
				this.isDraggingOver = false;
			},

			onFilesSelected()
			{
				this.files = [...this.$refs.fileInput.files];
			}

		},

		watch: {

			files()
			{
				this.isLoading = true;
				this.urls.forEach(url => URL.revokeObjectURL(url));
				this.urls = this.files.map(file => URL.createObjectURL(file));
			}

		}

	}

</script>
