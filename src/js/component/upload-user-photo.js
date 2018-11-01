/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { forObject } from "../i18n.js";
import { create as createNotice } from "../notices.js";
import { id as generateUniqueId, request } from "../util/api.js";

/**
 * Creates the latte-upload-user-photo component.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{

	Vue.component("latte-upload-user-photo", {

		props: {

			id: {
				default: "photo_id",
				required: false,
				type: String
			},

			name: {
				default: "photo",
				required: false,
				type: String
			},

			noPicture: {
				default: "/resource/image/simple-avatar/bm?seed=12",
				required: false,
				type: String
			},

			value: {
				default: 0,
				required: false,
				type: Number
			}

		},

		template: `	<div class="latte-drop-container latte-upload-user-photo" :id="uniqueId" @drop="onDrop">
						<div class="row no-gutters">
							<div class="col align-self-center text-center" style="flex-grow:0">
								<img :src="imageSource" alt="Photo" class="avatar avatar-medium" @load="onImageLoaded" />
								<span class="spinner spinner-primary above-parent" v-if="isLoading"></span>
							</div>
							<div class="col d-flex align-self-center mt-3 mt-lg-0 ml-0 ml-lg-auto" style="flex-grow:0">
								<button type="button" class="btn btn-contained btn-primary" @click="selectFile"><i class="mdi mdi-plus-circle"></i><span>{{ i18n.select }}</span></button>
								<button type="button" class="btn btn-icon btn-dark" @click="remove" v-if="currentFile !== null && previewUrl === null"><i class="mdi mdi-delete"></i></button>
								<button type="button" class="btn btn-icon btn-dark" @click="cancel" v-if="previewUrl !== null"><i class="mdi mdi-close"></i></button>
							</div>
						</div>
						<div class="drop-here" :class="{'is-droppable': isDroppable}">{{ i18n.dropHere }}</div>
						<input ref="file_id" type="hidden" :name="name + '_id'" :value="fileId"/>
						<input ref="file_input" class="d-none" type="file" accept="image/*" :name="name + '_file'" :id="name" @change="onFileSelected"/>
					</div>`,

		/**
		 * Provides the initial data for our Vue Component.
		 *
		 * @returns {*}
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				i18n: {
					cancel: "Cancel",
					dropHere: "Place photo here to upload.",
					invalidFile: "Invalid file type. Input is cleared.",
					remove: "Remove",
					select: "Select"
				},
				currentFile: null,
				isDroppable: false,
				isLoading: true,
				previewUrl: null,
				uniqueId: generateUniqueId()
			};
		},

		/**
		 * Invoked when our Vue Component is mounted.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		mounted()
		{
			window.addEventListener("latte:i18n:translations-loaded", () => this.loadI18n());
			window.addEventListener("dragleave", evt => this.onDragLeave(evt));
			window.addEventListener("dragend", evt => this.onDragLeave(evt));
			window.addEventListener("dragover", evt => this.onDragOver(evt));

			this.loadFile();
			this.loadI18n();
		},

		computed: {

			/**
			 * Computes the current file id.
			 *
			 * @returns {Number}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			fileId()
			{
				if (this.previewUrl !== null)
					return 0;

				if (this.currentFile !== null)
					return this.currentFile.id;

				return 0;
			},

			/**
			 * Computes the preview url.
			 *
			 * @returns {String}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			imageSource()
			{
				if (this.previewUrl !== null)
					return this.previewUrl;

				if (this.currentFile !== null)
				{
					if (typeof this.currentFile["variants"] !== "undefined" && typeof this.currentFile["variants"][3] !== "undefined")
						return this.currentFile["variants"][3]["path"];
					else
						return this.currentFile["path"];
				}

				return this.noPicture;
			}

		},

		methods: {

			/**
			 * Cancels uploading.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			cancel()
			{
				window.URL.revokeObjectURL(this.previewUrl);

				this.$refs["file_input"].value = "";
				this.previewUrl = null;
			},

			/**
			 * Loads file data.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			loadFile()
			{
				if (this.value <= 0)
				{
					this.currentFile = null;
					return;
				}

				request(`/api/system/file-system/file/${this.value}`)
					.then(r => r.json())
					.then(r => this.onFileResponse(r));
			},

			/**
			 * Loads i18n strings.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			loadI18n()
			{
				this.i18n = forObject(this.i18n, "admin-file-manager");
			},

			/**
			 * Invoked on dragleave.
			 *
			 * @param {Event} evt
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onDragLeave(evt)
			{
				this.isDroppable = false;

				evt.preventDefault();
				evt.stopPropagation();
			},

			/**
			 * Invoked on dragover.
			 *
			 * @param {Event} evt
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onDragOver(evt)
			{
				this.isDroppable = true;

				evt.preventDefault();
				evt.stopPropagation();
			},

			/**
			 * Invoked on file drop.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onDrop(evt)
			{
				this.isDroppable = false;

				if (evt.dataTransfer.files.length !== 1)
					return;

				if (evt.dataTransfer.files[0].type.match(/image.*/) === null)
					return;

				this.$refs["file_input"].files = evt.dataTransfer.files;

				evt.preventDefault();
				evt.stopPropagation();
			},

			/**
			 * Invoked on a file response.
			 *
			 * @param {*} response
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onFileResponse(response)
			{
				if (response && response.success === true)
				{
					this.currentFile = response.data;
				}
			},

			/**
			 * Invoked when a file is selected.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onFileSelected()
			{
				if (this.$refs["file_input"].files.length !== 1)
					return;

				if (this.$refs["file_input"].files[0].type.match(/image.*/) === null)
				{
					this.$refs["file_input"].value = "";

					createNotice(this.i18n.invalidFile, "error", true);

					return;
				}

				let previewUrl = window.URL.createObjectURL(this.$refs["file_input"].files[0]);

				if (this.previewUrl === previewUrl)
					return;

				if (this.previewUrl !== null)
					window.URL.revokeObjectURL(this.previewUrl);

				this.isLoading = true;
				this.previewUrl = previewUrl;
			},

			/**
			 * Invoked when the preview image is loaded.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onImageLoaded()
			{
				this.isLoading = false;
			},

			/**
			 * Removes the photo.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			remove()
			{
				this.currentFile = null;
			},

			/**
			 * Invoked when the Select button is clicked.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			selectFile()
			{
				this.$refs["file_input"].click();
			}

		},

		watch: {

			/**
			 * Invoked when {@see value} has changed.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			value()
			{
				this.loadFile();
			}

		}

	});

}
