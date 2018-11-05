<template>

	<div class="drop-container uploader" :class="containerClasses" @dragenter="onDragEnter" @dragleave="onDragLeave" @drop="onDrop">
		<slot name="drop-here" :uploader="this" v-if="!isDraggingOver">Drop here to upload</slot>
		<slot name="let-go" :uploader="this" v-else>Let go to upload</slot>
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
				isDraggingOver: false
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

				this.isDragging = false;
				this.isDraggingOver = false;

				console.log(evt.dataTransfer.files);
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
