<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="uploader">
		<input ref="fileInput" type="file" :accept="accept" :id="id" :multiple="multiple" :name="name" @change="onFilesUpdate"/>

		<slot v-bind="{blobs, files, id, multiple, name, openDialog, removeFile}"></slot>

		<div class="drop-target" :class="{'is-dragging': isDragging, 'is-dragging-over': isDraggingOver}">
			<div class="drop-target-info" v-if="!isDraggingOver">{{ (multiple ? strings.placeFiles : strings.placeFile)|i18n(i18nDomain) }}</div>
			<div class="drop-target-info" v-else>{{ (multiple ? strings.dropFiles : strings.dropFile)|i18n(i18nDomain) }}</div>
		</div>
	</div>

</template>

<script>

	import { dispatch } from "../../js/core/action";
	import { id } from "../../js/core/api";
	import { closest } from "../../js/util/dom";

	const defaultStrings = {
		dropFile: "Drop here to upload!",
		dropFiles: "Drop here to upload!",
		placeFile: "Place your file here to upload",
		placeFiles: "Place your file(s) here to upload"
	};

	function arrayToFileList(files)
	{
		if (files === undefined)
			files = [];

		const dataTransfer = new DataTransfer();
		files.forEach(file => dataTransfer.items.add(file));

		return dataTransfer.files;
	}

	export default {

		name: "latte-uploader",

		props: {

			accept: {
				default: undefined,
				required: false,
				type: String | undefined
			},

			droppable: {
				default: true,
				required: false,
				type: Boolean
			},

			i18nDomain: {
				default: "latte-ui",
				required: false,
				type: String
			},

			id: {
				default: () => id(),
				required: false,
				type: String
			},

			multiple: {
				default: false,
				required: false,
				type: Boolean
			},

			name: {
				default: () => id(),
				required: false,
				type: String
			},

			strings: {
				default: () => defaultStrings,
				required: false,
				type: Object
			}

		},

		beforeDestroy()
		{
			window.removeEventListener("dragend", this.fn.onDragEnd);
			window.removeEventListener("dragleave", this.fn.onDragLeave);
			window.removeEventListener("dragover", this.fn.onDragOver);
			window.removeEventListener("drop", this.fn.onDrop);
		},

		data()
		{
			return {
				blobs: [],
				files: [],
				fn: {
					onDragEnd: evt => this.onDragEnd(evt),
					onDragLeave: evt => this.onDragLeave(evt),
					onDragOver: evt => this.onDragOver(evt),
					onDrop: evt => this.onDrop(evt)
				},
				isDragging: false,
				isDraggingOver: false
			};
		},

		mounted()
		{
			window.addEventListener("dragend", this.fn.onDragEnd);
			window.addEventListener("dragleave", this.fn.onDragLeave);
			window.addEventListener("dragover", this.fn.onDragOver);
			window.addEventListener("drop", this.fn.onDrop);
		},

		computed: {

			fileInput()
			{
				return this.$refs.fileInput;
			}

		},

		methods: {

			openDialog()
			{
				this.fileInput.click();
			},

			removeFile(index)
			{
				dispatch("latte:tooltip:hide");
				this.files.splice(index, 1);
				this.fileInput.files = arrayToFileList(this.files);
			},

			onDragEnd(evt)
			{
				evt.preventDefault();

				this.isDragging = false;
				this.isDraggingOver = false;
			},

			onDragLeave(evt)
			{
				evt.preventDefault();
			},

			onDragOver(evt)
			{
				evt.preventDefault();

				this.isDragging = true;
				this.isDraggingOver = closest(evt.target, this.$el) !== null;
			},

			onDrop(evt)
			{
				if (!this.isDragging)
					return;

				evt.preventDefault();

				this.isDragging = false;
				this.isDraggingOver = false;

				if (closest(evt.target, this.$el) === null)
					return;

				const files = Array.from(evt.dataTransfer.files);

				if (!this.multiple && files.length > 1)
					return;

				if (this.multiple)
					files.push(...this.files);

				this.fileInput.files = arrayToFileList(files);
				this.onFilesUpdate();
			},

			onFilesUpdate()
			{
				this.files = Array.from(this.fileInput.files);
			}

		},

		watch: {

			files()
			{
				while (this.blobs.length > 0)
					URL.revokeObjectURL(this.blobs.shift());

				this.files.forEach(file => this.blobs.push(URL.createObjectURL(file)));
				this.$emit("change", this.files);
			}

		}

	}

</script>
