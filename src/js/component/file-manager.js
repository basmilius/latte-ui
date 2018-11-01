/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { ToolbarAction, View } from "../api/file-manager.js";
import { Overlays } from "./overlay.js";

export function createComponent()
{

	Vue.component("latte-file-manager", {

		props: {

			overlay: {
				default: null,
				required: false,
				type: String | null
			}

		},

		template: `	<div class="panel file-manager" :class="{'is-loading': isLoading, 'is-overlay': overlay !== null}">
						<latte-file-manager-toolbar @action="onToolbarAction" folder-name="Home" :is-overlay="overlay !== null"/>
						
						<div class="panel-body" style="overflow:hidden">
							<latte-tree-view url="/api/system/file-system/tree-view" @change="loadFolder($event)"></latte-tree-view>
						</div>
						
						<span class="spinner spinner-primary"></span>
					</div>`,

		data()
		{
			return {
				isLoading: false
			};
		},

		methods: {

			onToolbarAction(action, param)
			{
				if (action === ToolbarAction.Close)
					Overlays.close(this.overlay);
				else
					console.log({action, param});
			}

		}

	});

	Vue.component("latte-file-manager-toolbar", {

		props: {

			folderName: {
				required: true,
				type: String
			},

			isOverlay: {
				required: true,
				type: Boolean
			}

		},

		template: `	<div class="panel-header file-manager-toolbar">
						<button class="btn btn-icon btn-dark" @click="onActionClick(Action.Back)"><i class="mdi mdi-arrow-left"></i></button>
						<button class="btn btn-icon btn-dark" @click="onActionClick(Action.Forward)"><i class="mdi mdi-arrow-right"></i></button>

						<div class="divider divider-vertical"></div>

						<button class="btn btn-icon btn-dark" @click="onActionClick(Action.Home)"><i class="mdi mdi-home"></i></button>
						<button class="btn btn-icon btn-dark" @click="onActionClick(Action.Up)"><i class="mdi mdi-arrow-up-bold"></i></button>
						<button class="btn btn-icon btn-dark" @click="onActionClick(Action.Reload)"><i class="mdi mdi-reload"></i></button>

						<div class="divider divider-vertical"></div>

						<span class="panel-title">{{ folderName }}</span>

						<div class="divider divider-vertical ml-auto"></div>

						<button class="btn btn-icon btn-dark" @click="onActionClick(Action.UpdateView, View.List)"><i class="mdi mdi-view-list"></i></button>
						<button class="btn btn-icon btn-dark" @click="onActionClick(Action.UpdateView, View.Grid)"><i class="mdi mdi-view-grid"></i></button>
						<button class="btn btn-icon btn-dark" @click="onActionClick(Action.UpdateView, View.Gallery)"><i class="mdi mdi-view-dashboard mdi-rotate-90"></i></button>

						<div class="divider divider-vertical"></div>

						<latte-button-dropdown icon="plus" type="list">
							<nav class="nav latte-nav-list">
								<a class="nav-link" @click="onActionClick(Action.New, 'upload')"><i class="mdi mdi-upload"></i> <span>Upload files&hellip;</span></a>
								<a class="nav-link" @click="onActionClick(Action.New, 'folder')"><i class="mdi mdi-folder-plus"></i> <span>New folder&hellip;</span></a>
								<div class="divider divider-horizontal"></div>
								<a class="nav-link" @click="onActionClick(Action.New, 'download')"><i class="mdi mdi-link"></i> <span>Download from URL</span></a>
								<a class="nav-link" @click="onActionClick(Action.New, 'archive')"><i class="mdi mdi-archive"></i> <span>Archive current folder</span></a>
							</nav>
						</latte-button-dropdown>

						<template v-if="isOverlay">
							<div class="divider divider-vertical"></div>
							<button class="btn btn-icon btn-dark" @click="onActionClick(Action.Close)"><i class="mdi mdi-window-close"></i></button>
						</template>
					</div>`,

		data()
		{
			return {
				Action: ToolbarAction,
				View: View
			};
		},

		methods: {

			onActionClick(action, param = undefined)
			{
				this.$emit("action", action, param);
			}

		}

	});

}
