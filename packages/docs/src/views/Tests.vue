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

					<div class="row mb-panel-gutter">
						<div class="col-12 col-lg-6">

							<div class="panel">
								<nav class="nav nav-list py-3" style="--nav-item-height: 60px">
									<latte-ripple as="a" class="nav-link"><i class="mdi mdi-home"></i><span>Home</span></latte-ripple>

									<latte-expandable>
										<template v-slot:header="{isOpen}">
											<latte-ripple as="a" class="nav-link">
												<i class="mdi mdi-view-grid"></i>
												<span>Components</span>
												<i class="mdi mdi-chevron-up" v-if="isOpen"></i>
												<i class="mdi mdi-chevron-down" v-else></i>
											</latte-ripple>
										</template>

										<latte-ripple as="a" class="nav-link"><i class="mdi mdi-home"></i><span>Home</span></latte-ripple>
										<latte-ripple as="a" class="nav-link"><i class="mdi mdi-home"></i><span>Home</span></latte-ripple>
										<latte-ripple as="a" class="nav-link"><i class="mdi mdi-home"></i><span>Home</span></latte-ripple>
										<latte-ripple as="a" class="nav-link"><i class="mdi mdi-home"></i><span>Home</span></latte-ripple>
										<latte-ripple as="a" class="nav-link"><i class="mdi mdi-home"></i><span>Home</span></latte-ripple>
										<latte-ripple as="a" class="nav-link"><i class="mdi mdi-home"></i><span>Home</span></latte-ripple>
										<latte-ripple as="a" class="nav-link"><i class="mdi mdi-home"></i><span>Home</span></latte-ripple>
										<latte-ripple as="a" class="nav-link"><i class="mdi mdi-home"></i><span>Home</span></latte-ripple>
									</latte-expandable>
								</nav>
							</div>

						</div>
						<div class="col-12 col-lg-6">

							<div class="panel">
								<nav class="nav nav-list py-3">
									<a class="nav-link"><i class="mdi mdi-home"></i><span>Home</span></a>
								</nav>
							</div>

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
						<div class="panel-header"><span class="panel-title">Message dialog</span></div>
						<div class="panel-body">

							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showAlert"><span>Show alert</span></latte-ripple>
							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showConfirm"><span>Show confirm</span></latte-ripple>
							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showPrompt"><span>Show prompt</span></latte-ripple>

						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Notification</span></div>
						<div class="panel-body">

							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showNotificationBasic"><span>Basic</span></latte-ripple>
							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showNotificationIcon"><span>Icon</span></latte-ripple>
							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showNotificationAvatar"><span>Avatar</span></latte-ripple>
							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showNotificationButtons"><span>Buttons</span></latte-ripple>

						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><span class="panel-title">Question dialog</span></div>
						<div class="panel-body">

							<latte-ripple as="button" class="btn btn-contained btn-primary" @click="showQuestion"><span>Open question</span></latte-ripple>

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
				paginationLimit: 10,
				paginationOffset: 0
			};
		},

		methods: {

			showAlert()
			{
				this.$latte.ui.message.alert("Hello", "Hello world from the new Vue based message dialog!").then(result => console.log(result));
			},

			showConfirm()
			{
				this.$latte.ui.message.confirm("Hello", "Hello world from the new Vue based message dialog!").then(result => console.log(result));
			},

			showPrompt()
			{
				this.$latte.ui.message.prompt("Hello", "Hello world from the new Vue based message dialog!").then(result => console.log(result));
			},

			showNotificationAvatar()
			{
				this.$latte.ui.notification.create({
					avatar: "https://latte.dev-preview.nl/module/@bas/website/resource/image/photos/2.jpg",
					message: "<strong>Bas</strong> is now online"
				});
			},

			showNotificationBasic()
			{
				this.$latte.ui.notification.create({
					title: "I'm a notification",
					message: "Lorem ipsum dolor sit amet consectetur..."
				});
			},

			async showNotificationButtons()
			{
				const result = await this.$latte.ui.notification.create({
					duration: 0,
					avatar: "https://latte.dev-preview.nl/module/@bas/website/resource/image/photos/2.jpg",
					title: "Incoming call",
					message: "<strong>Bas</strong> is calling...",
					buttons: [
						{id: 1, icon: "phone", label: "Answer", color: "success"},
						{id: 2, icon: "phone-hangup", label: "Deny", color: "error"}
					]
				});

				console.log(result);
			},

			showNotificationIcon()
			{
				this.$latte.ui.notification.create({
					icon: "map-marker-outline",
					message: "<strong>Maps</strong> is using your devices's location"
				});
			},

			showQuestion()
			{
				this.$latte.ui.question.create("map-marker-outline", "Allow <strong>Maps</strong> to access this device's location?", [
					{id: 1, label: "Allow all the time"},
					{id: 2, label: "Allow when the app in use"},
					{id: 4, label: "Deny"},
					{id: 8, label: "Deny & don't ask again"}
				]).then(result => console.log(result));
			}

		}

	}

</script>
