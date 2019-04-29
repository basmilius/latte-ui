<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="tests">

		<PageHeader>
			<h1>Random tests</h1>
			<p>These are some development tests.</p>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12">

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Uploader</span></div>
						<div class="panel-body">
							New uploader, this is the base component that can be extended through slots.
						</div>
						<div class="panel-body">

							<latte-uploader accept="image/*" style="position: relative;">
								<template v-slot="{blobs, files, openDialog}">
									<div class="d-flex align-items-center">
										<div class="radius-circle" style="height: 150px; width: 150px; overflow: hidden;">
											<img :src="blobs[0]" :alt="files[0].name" v-if="files.length > 0" style="position: relative; height: 150px; width: 150px; object-fit: cover"/>
											<latte-initials initials="BM" style="position: relative; height: 150px; width: 150px;" v-else></latte-initials>
										</div>
										<button class="btn btn-contained btn-primary ml-3" @click="openDialog"><span>Choose file</span></button>
									</div>
								</template>
							</latte-uploader>

						</div>
						<div class="panel-body">

							<latte-uploader accept="audio/*" :multiple="true">
								<template v-slot="{blobs, files, openDialog, removeFile}">
									<button class="btn btn-contained btn-primary mt-3" @click="openDialog"><span>Select files</span></button>
									<table class="table" v-if="files.length > 0">
										<tr v-for="(file, index) of files">
											<td>
												<audio controls :src="blobs[index]"></audio>
											</td>
											<td>{{ file.name }}</td>
											<td>{{ file.size }}</td>
											<td>{{ file.type }}</td>
											<td>
												<button class="btn btn-icon btn-text btn-error btn-small" @click="removeFile(index)"><i class="mdi mdi-window-close"></i></button>
											</td>
										</tr>
									</table>
									<div class="notice notice-info" v-else>
										<i class="mdi mdi-information"></i>
										<p>Select some files please :-)</p>
									</div>
								</template>
							</latte-uploader>

						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Pagination</span></div>
						<div class="panel-body">

							<latte-pagination class="my-3" :offset="paginationOffset" :limit="paginationLimit" :total="500" controller-bar @navigate="paginationOffset = $event" @limit="paginationLimit = $event"></latte-pagination>
							<latte-pagination class="my-3" :offset="paginationOffset" :limit="paginationLimit" :total="500" controller-bar :navigation-controls="false" @navigate="paginationOffset = $event" @limit="paginationLimit = $event"></latte-pagination>
							<latte-pagination class="my-3" :offset="paginationOffset" :limit="paginationLimit" :total="500" @navigate="paginationOffset = $event" @limit="paginationLimit = $event"></latte-pagination>

						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Submenu</span></div>
						<div class="panel-body">

							<latte-button-dropdown icon="dots-vertical">
								<nav class="nav nav-list">
									<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
									<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>

									<div class="divider divider-horizontal"></div>

									<latte-submenu icon="dice-2" label="Submenu">
										<nav class="nav nav-list">
											<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
											<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
											<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
											<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
											<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
										</nav>
									</latte-submenu>

									<div class="divider divider-horizontal"></div>

									<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
									<button class="nav-link"><i class="mdi mdi-dice-1"></i><span>Nav item</span></button>
								</nav>
							</latte-button-dropdown>

						</div>
					</div>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import PageHeader from "../components/PageHeader";

	export default {

		components: {
			PageHeader
		},

		data()
		{
			return {
				cards: [1, 2, 3, 4, 5],
				paginationLimit: 10,
				paginationOffset: 0
			};
		},

		methods: {}

	}

</script>
