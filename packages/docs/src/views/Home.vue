<template>

	<div class="page" id="home">

		<div id="home-hero">
			<div class="container">
				<div class="row align-items-center">
					<div class="col-12 col-lg-6">

						<div class="page-header-content text-center" id="logo-container">
							<img src="../assets/logo.svg" alt="Latte UI" id="hero-image"/>
						</div>

					</div>
					<div class="col-12 col-lg-5 mt-3 mt-lg-0 ml-lg-auto">

						<div class="page-header-content tall">
							<h1>Latte UI</h1>
							<p class="lead">An easy to use UI library build for Vue.js.</p>
							<div class="d-flex mt-4 mb-3 justify-content-center justify-content-lg-start" id="hero-actions">
								<latte-ripple as="button" class="btn btn-contained btn-outline btn-lg" @click="$router.push('/docs')"><i class="mdi mdi-book-open-variant"></i><span>Documentation</span></latte-ripple>
								<latte-ripple as="a" href="//github.com/basmilius/latte-ui" target="_blank" class="btn btn-text btn-dark btn-lg"><i class="mdi mdi-github-circle"></i><span>GitHub</span></latte-ripple>
							</div>
							<small class="text-muted">Version {{ latteVersion }}</small>
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
						Use Latte within your project by including the source through NPM. Everything except the
						documentation is included.
					</p>
					<p><strong>Yarn</strong></p>
					<CodeSnippet class="mb-3" lang="shell" small>yarn add @bybas/latte-ui</CodeSnippet>
					<p><strong>NPM</strong></p>
					<CodeSnippet class="mb-3" lang="shell" small>npm i @bybas/latte-ui</CodeSnippet>
				</div>
				<latte-ripple as="button" class="btn btn-outline btn-primary btn-lg" @click="$router.push('/docs')"><span>Install guide</span></latte-ripple>

			</section>
			<section class="home-block">

				<h4>CDN & Download</h4>
				<div class="position-relative w-100 flex-grow-1 mb-3">
					<p>
						Start quickly by including Latte from a CDN in your template. Just include the following
						links and you're ready!
					</p>
					<p><strong>CSS only</strong></p>
					<CodeSnippet class="mb-3" lang="html" small>
&lt;link href="https://unpkg.com/@bybas/latte-ui/dist/latte-ui.css" type="text/css"/&gt;
					</CodeSnippet>
					<p><strong>JS & Vue</strong></p>
					<CodeSnippet class="mb-3" lang="html" small>
&lt;script href="https://unpkg.com/vue@2.6.10/dist/vue.min.js" type="application/javascript"&gt;&lt;/script&gt;
&lt;script href="https://unpkg.com/@bybas/latte-ui/dist/latte-ui.js" type="application/javascript"&gt;&lt;/script&gt;
					</CodeSnippet>
					<p>Rather include the Latte compiled files in your source? Just download it!</p>
				</div>
				<latte-ripple as="button" class="btn btn-outline btn-primary btn-lg" @click="notAvailable"><span>Download</span></latte-ripple>

			</section>
			<section class="home-block">

				<h4>Gallery</h4>
				<div class="flex-grow-1 mb-3">
					<p>
						Curious to see what Latte looks like in real applications? View the gallery for inspiration
						and submit your own!
					</p>
					<img src="https://via.placeholder.com/540x300" alt="Placeholder" class="w-100" />
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
		background: rgba(var(--panel-background), 1);
		border: 1px solid rgba(var(--outline-color), 1);

		@media (max-width: 991px)
		{
			text-align: center;
		}

		img#hero-image
		{
			width: 80%;
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
			background: rgba(var(--panel-background), 1);
			border: 1px solid rgba(var(--outline-color), 1);
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
