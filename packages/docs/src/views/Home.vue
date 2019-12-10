<template>

	<div class="page" id="home">

		<div id="home-hero">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-12 col-lg-5">

						<div class="page-header-content tall">
							<h1>Latte UI</h1>
							<p class="lead">
								An Open Source project built using Vue.js to create beautiful interfaces with.
							</p>
							<div class="d-flex mt-4 mb-3 justify-content-center justify-content-lg-start" id="hero-actions">
								<latte-ripple as="button" class="btn btn-contained  btn-primary btn-lg radius-circle" @click="$router.push('/docs')">
									<span>Let's start</span>
								</latte-ripple>
							</div>
						</div>

					</div>
					<div class="col-12 col-lg-6 mt-3 mt-lg-0 ml-lg-auto">

						<div class="page-header-content text-center" id="logo-container">
							<img src="../assets/example.png" alt="Something created with Latte UI" id="hero-image"/>
						</div>

					</div>
				</div>
			</div>
		</div>

		<div id="home-blocks">
			<section class="home-block">

				<h4>Install</h4>
				<div class="flex-grow-1 mb-3">
					<p>
						Use Latte UI within your project by including the source through NPM. Everything except the
						documentation is included.
					</p>
					<p><strong>Yarn</strong></p>
					<CodeSnippet class="mb-3" lang="shell" small url="/snippets/home/yarn.txt"/>
					<p><strong>NPM</strong></p>
					<CodeSnippet class="mb-3" lang="shell" small url="/snippets/home/npm.txt"/>
				</div>
				<latte-ripple as="button" class="btn btn-outline btn-primary btn-lg" @click="$router.push('/docs')"><span>Install guide</span></latte-ripple>

			</section>
			<section class="home-block">

				<h4>CDN & Download</h4>
				<div class="position-relative w-100 flex-grow-1 mb-3">
					<p>
						Start quickly by including Latte UI from a CDN in your template. Just include the following
						links and you're ready!
					</p>
					<p><strong>CSS only</strong></p>
					<CodeSnippet class="mb-3" lang="html" small url="/snippets/home/cdn-css.txt"/>
					<p><strong>JS & Vue</strong></p>
					<CodeSnippet class="mb-3" lang="html" small url="/snippets/home/cdn-full.txt"/>
					<p>Rather include the Latte compiled files in your source? Just download it!</p>
				</div>
				<latte-ripple as="button" class="btn btn-outline btn-primary btn-lg" @click="notAvailable"><span>Download</span></latte-ripple>

			</section>
			<section class="home-block">

				<h4>Gallery</h4>
				<div class="flex-grow-1 mb-3">
					<p>
						Curious to see what Latte UI looks like in real applications? View the gallery for inspiration
						and submit your own!
					</p>
					<img src="https://via.placeholder.com/540x300" alt="Placeholder" class="w-100"/>
				</div>
				<latte-ripple as="button" class="btn btn-outline btn-primary btn-lg" @click="notAvailable"><span>Explore</span></latte-ripple>

			</section>
		</div>

	</div>

</template>

<script>

	import { Latte } from "@bybas/latte-ui";
	import PageHeader from "../components/PageHeader";
	import CodeSnippet from "../components/CodeSnippet";

	export default {

		name: "Home",

		components: {
			CodeSnippet,
			PageHeader
		},

		computed: {

			latteVersion()
			{
				return Latte.version;
			}

		},

		methods: {

			notAvailable()
			{
				Latte.ui.snackbar.create({
					location: Latte.ui.snackbar.Locations.TOP,
					message: "This feature is not yet available."
				});
			}

		}

	}

</script>

<style lang="scss" scoped>

	div#home-hero
	{
		position: relative;
		display: block;
		margin: 6px 6px 0 6px;
		padding: 120px 0;
		background: rgba(var(--panelBackground), 1);
		border: 1px solid rgba(var(--outlineColor), 1);

		@media (max-width: 991px)
		{
			text-align: center;
		}

		img#hero-image
		{
			width: 90%;
			box-shadow: var(--elevation24);
		}
	}

	div#home-blocks
	{
		position: relative;
		display: flex;
		padding: 3px;

		section.home-block
		{
			position: relative;
			display: flex;
			margin: 3px;
			padding: 48px;
			width: 0;
			align-items: flex-start;
			flex: 1 1 0;
			flex-flow: column;
			background: rgba(var(--panelBackground), 1);
			border: 1px solid rgba(var(--outlineColor), 1);
		}
	}

	@media (max-width: 991px)
	{
		div#home-blocks
		{
			flex-flow: column;

			section.home-block
			{
				padding: 39px;
				width: calc(100% - 6px);
			}
		}

		#logo-container
		{
			padding-bottom: 0;
		}

		#logo
		{
			width: 50%;
		}
	}

	@media (min-width: 1921px)
	{
		div#home-blocks section.home-block
		{
			padding: 48px 5vw;
		}
	}

</style>
