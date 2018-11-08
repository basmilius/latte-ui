<template>

	<div class="drop-container uploader uploader-photo" :class="containerClasses" @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop">
		<template v-if="files.length === 1">
			<img :src="urls[0]" alt="Photo" class="preview-image single"/>
		</template>

		<slot class="uploader-info" name="drop-here" :uploader="this" v-if="!isDraggingOver">Drop here to upload</slot>
		<slot class="uploader-info" name="let-go" :uploader="this" v-else>Let go to upload</slot>

		<input ref="fileInput" class="d-none" type="file" accept="image/*" :name="name" @change="onFilesSelected"/>
	</div>

</template>

<script>

	export default {

		name: "latte-uploader",

		props: {

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
				files: [],
				urls: []
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
				this.urls.forEach(url => URL.revokeObjectURL(url));
				this.urls = this.files.map(file => URL.createObjectURL(file));
			}

		}

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
		z-index: 0;
	}

	div.uploader div.uploader-info
	{
		z-index: 1;
	}

	div.uploader img.preview-image.single
	{
		position: absolute;
		display: block;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: inherit;
		object-fit: cover;
		object-position: center center;
		pointer-events: none;
		z-index: 0;
	}

</style>
