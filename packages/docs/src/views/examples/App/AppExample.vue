<template>

	<main id="example-root" class="d-flex app-example bg-white" :class="{'flex-column': is.smallUi}">

		<latte-sheet ref="drawer">
			<div id="drawer" role="menu" style="height: 100vh" @click="$refs.drawer.close()">
				<nav class="nav nav-list py-3" id="drawer-secondary">

					<latte-ripple as="button" class="nav-link"><i class="mdi mdi-play-circle-outline"></i><span>Now</span></latte-ripple>
					<latte-ripple as="button" class="nav-link"><i class="mdi mdi-radio"></i><span>Radio</span></latte-ripple>
					<latte-ripple as="button" class="nav-link"><i class="mdi mdi-spotify"></i><span>Spotify</span></latte-ripple>

					<div class="mt-auto"></div>

					<latte-ripple as="button" class="nav-link"><i class="mdi mdi-wrench-outline"></i><span>Debug</span></latte-ripple>

					<div class="divider divider-horizontal"></div>

					<latte-ripple as="button" class="nav-link"><i class="mdi mdi-settings-outline"></i><span>Settings</span></latte-ripple>

				</nav>
			</div>
		</latte-sheet>

		<main id="example-content" class="container order-lg-1 flex-grow-1">
			<div class="content">
				<div class="row align-items-center">
					<div class="col-12 col-lg">

						<div id="now-playing-caption">
							<h2>Now Playing</h2>
							<span class="np-track">On My Way</span>
							<span class="np-artists">Alan Walker &amp; Sabrina Carpenter</span>
						</div>

						<div class="btn-group" id="control-bar">
							<button class="btn btn-icon btn-text btn-dark"><i class="mdi mdi-skip-previous"></i></button>
							<button class="btn btn-icon btn-text btn-dark"><i class="mdi mdi-stop"></i></button>
							<button class="btn btn-icon btn-text btn-dark"><i class="mdi mdi-play"></i></button>
							<button class="btn btn-icon btn-text btn-dark"><i class="mdi mdi-skip-next"></i></button>
						</div>

					</div>
					<div class="col-12 col-lg-auto">

						<img class="radius-squircle" id="now-playing-artwork" src="https://i.scdn.co/image/dafcfdeb2c73c29429fe294c932fa56900adf410" alt="artwork"/>

					</div>
				</div>
			</div>

			<div class="content">

				<h2>Stations</h2>

				<div class="row">
					<div class="col-6 col-lg-3 col-xl-2" v-for="i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]">

						<a class="panel panel-outline mb-panel-gutter">
							<div class="panel-rich-media panel-rich-media-gutter embed-responsive embed-responsive-1by1 radius-default" style="background-image: url(https://i.scdn.co/image/dafcfdeb2c73c29429fe294c932fa56900adf410)"></div>
							<div class="panel-header justify-content-center text-center">
								<span class="panel-title">Station {{ i }}</span>
							</div>
						</a>

					</div>
				</div>

			</div>
		</main>

		<latte-bottom-nav class="bottom-nav-primary order-lg-0" :class="{'flex-grow-0': is.smallUi}" :is-side="!is.smallUi">
			<template v-if="!is.smallUi">
				<button class="btn btn-icon btn-text" @click="$refs.drawer.open()"><i class="mdi mdi-menu"></i></button>
				<div class="mt-auto"></div>
			</template>

			<button class="btn btn-action btn-text"><i class="mdi mdi-play-circle-outline"></i><span>Now</span></button>
			<button class="btn btn-action btn-text"><i class="mdi mdi-radio"></i><span>Radio</span></button>
			<button class="btn btn-action btn-text"><i class="mdi mdi-spotify"></i><span>Spotify</span></button>

			<template v-if="!is.smallUi">
				<div class="mb-auto"></div>
				<button class="btn btn-icon btn-text"><i class="mdi mdi-settings-outline"></i></button>
			</template>
		</latte-bottom-nav>

	</main>

</template>

<script>

	export default {

		name: "AppExample",

		destroyed()
		{
			this.sub.tickSubscription.unsubscribe();
		},

		data()
		{
			return {
				is: {
					smallUi: window.innerWidth < 991
				},
				sub: {
					tickSubscription: null
				}
			};
		},

		mounted()
		{
			this.sub.tickSubscription = this.$latte.action.on("latte:tick", () => this.onTick());
		},

		methods: {

			onTick()
			{
				this.is.smallUi = window.innerWidth < 991;
			}

		}

	}

</script>

<style lang="scss">

	.app-example
	{
		--color-primary: 88, 81, 219;
		--nav-item-height: 54px;
		--outline-color: var(--outline-color-secondary);
		--gutter: 48px;

		min-height: 100vh;
	}

	.bottom-nav
	{
		position: sticky;
		bottom: 0;

		&.bottom-nav-side
		{
			top: 0;
			bottom: 0;
			height: 100vh;
		}
	}

	.swiper
	{
		overflow: visible !important;
	}

	.content
	{
		--content-gutter: 0;
		margin: var(--gutter) 0;
	}

	.content + .content
	{
		padding-top: var(--gutter);
		border-top: 2px solid var(--outline-color);
	}

	h2
	{
		color: RGB(var(--color-primary));
		font-size: 1.1rem;
		font-weight: 500;
		line-height: 1em;
		opacity: .75;
	}

	#now-playing-caption
	{
		position: relative;
		display: flex;
		flex-flow: column;

		.np-track
		{
			display: block;
			margin: 1rem 0 .75rem 0;
			font-size: 2.5rem;
			font-weight: 900;
			line-height: 1em;
		}

		.np-artists
		{
			font-size: .9rem;
			line-height: 1em;
		}
	}

	#control-bar
	{
		margin-top: 1rem;
		margin-left: -9px;
	}

	#now-playing-artwork
	{
		height: 240px;
		width: 240px;
	}

</style>
