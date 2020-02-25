<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
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
			<div class="drop-target-info" v-if="!isDraggingOver">{{ (multiple ? strings.placeFiles : strings.placeFile) | i18n("latte_ui") }}</div>
			<div class="drop-target-info" v-else>{{ (multiple ? strings.dropFiles : strings.dropFile) | i18n("latte_ui") }}</div>
		</div>
	</div>

</template>

<script>

	import { dispatch } from "../../js/core/action";
	import { id } from "../../js/core/api";
	import { closest } from "../../js/util/dom";
	import { addEventListener } from "../../js/util/event";

	const defaultStrings = {
		dropFile: "uploader.drop_here",
		dropFiles: "uploader.drop_here",
		placeFile: "uploader.place_file",
		placeFiles: "uploader.place_files"
	};

	function arrayToFileList(files)
	{
		if (!files)
			files = [];

		const dataTransfer = new DataTransfer();
		files.forEach(file => dataTransfer.items.add(file));

		return dataTransfer.files;
	}

	export default {

		name: "latte-uploader",

		props: {
			accept: {default: undefined, type: String | undefined},
			droppable: {default: true, type: Boolean},
			id: {default: () => id(), type: String},
			multiple: {default: false, type: Boolean},
			name: {default: () => id(), type: String},
			strings: {default: () => defaultStrings, type: Object}
		},

		beforeDestroy()
		{
			this.events.forEach(remove => remove());
		},

		data()
		{
			return {
				events: [],
				blobs: [],
				files: [],
				isDragging: false,
				isDraggingOver: false
			};
		},

		mounted()
		{
			this.events.push(
				addEventListener(window, "dragend", this.onDragEnd, {passive: false}),
				addEventListener(window, "dragleave", this.onDragLeave, {passive: false}),
				addEventListener(window, "dragover", this.onDragOver, {passive: false}),
				addEventListener(window, "drop", this.onDrop, {passive: false})
			);
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
