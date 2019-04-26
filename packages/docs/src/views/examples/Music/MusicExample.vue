<template>

	<main id="example-root" class="d-flex flex-column music-example">

		<div class="app-bar app-bar-main app-bar-primary">
			<div class="app-bar-row">
				<button class="btn btn-icon btn-text" disabled><i class="mdi"></i></button>
				<span class="app-bar-title mx-auto">Spotify</span>
				<latte-ripple as="button" class="btn btn-icon btn-text btn-light"><i class="mdi mdi-dots-vertical"></i></latte-ripple>
			</div>
		</div>

		<section class="music-cards" v-for="t of ['For You', 'Recently played', 'Friends']">
			<h3>{{ t }}</h3>
			<latte-swiper :center="false" :item-padding="15" :item-width="270" :view-padding="[0, 15]">

				<div class="panel" v-for="i of [1, 2, 3, 4, 5, 6]">
					<div class="panel-rich-media embed-responsive embed-responsive-1by1" style="background-image: url(https://i.scdn.co/image/78d984cb018f355126c426306677ce3fc5711593)"></div>
					<div class="panel-header justify-content-center text-center">
						<span class="panel-title">Ava Max</span>
					</div>
				</div>

			</latte-swiper>
		</section>

		<latte-bottom-nav style="position: sticky; bottom: 0; height: 60px; background: white; z-index: 999">
			<latte-ripple as="a" class="btn btn-action"><i class="mdi mdi-home"></i><span>Home</span></latte-ripple>
			<latte-ripple as="a" class="btn btn-action"><i class="mdi mdi-magnify"></i><span>Search</span></latte-ripple>
			<latte-ripple as="a" class="btn btn-action"><i class="mdi mdi-library-music"></i><span>Library</span></latte-ripple>
		</latte-bottom-nav>

	</main>

</template>

<script>

	export default {

		name: "MusicExample"

	}

</script>

<style lang="scss">

	.music-example
	{
		--color-primary: 29, 185, 84;
	}

	.music-cards
	{
		position: relative;
		display: flex;
		margin-top: 30px;
		flex-flow: column;

		&:last-of-type
		{
			margin-bottom: 30px;
		}

		h3
		{
			margin: 0;
			text-align: center;
		}
	}

</style>
