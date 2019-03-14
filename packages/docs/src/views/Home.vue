<template>

	<div class="page" id="home">

		<div class="page-header py-0 py-lg-5">
			<div class="container pt-5 pb-lg-5">
				<div class="row align-items-center">
					<div class="col-12 col-lg-6">

						<div class="page-header-content text-center" id="logo-container">
							<img src="../assets/logo.svg" alt="Latte UI" id="logo"/>
						</div>

					</div>
					<div class="col-12 col-lg-6 mt-3 mt-lg-0">

						<div class="page-header-content tall text-center">
							<h1>Latte UI</h1>
							<p>An easy to use UI library build on top of Vue.js</p>
							<p>This website is a work in progress</p>
							<div class="d-flex justify-content-center" id="hero-actions">
								<latte-ripple as="button" class="btn btn-contained btn-primary mt-5" @click="$router.push('/docs')"><i class="mdi mdi-book-open-variant"></i><span>Documentation</span></latte-ripple>
								<latte-ripple as="a" href="//github.com/basmilius/latte-ui" target="_blank" class="btn btn-text btn-dark mt-5"><i class="mdi mdi-github-circle"></i><span>GitHub</span></latte-ripple>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-4 mb-panel-gutter">

					<div class="panel h-100">
						<div class="panel-header border-bottom-0"><span class="panel-title">Install</span></div>
						<div class="panel-body py-0">

							<CodeSnippet lang="shell">
npm i @bybas/latte-ui
-- or --
yarn add @bybas/latte-ui
							</CodeSnippet>

						</div>
					</div>

				</div>
				<div class="col-12 col-lg-4 mb-panel-gutter">

					<div class="panel h-100">
						<div class="panel-header border-bottom-0"><span class="panel-title">CDN</span></div>
						<div class="panel-body py-0">

							<CodeSnippet lang="html">
&lt;link href="//unpkg.com/@bybas/latte-ui@1.4.0/dist/latte.css" type="text/css"/&gt;
&lt;script src="//unpkg.com/@bybas/latte-ui@1.4.0/dist/latte.js" type="text/javascript"&gt;&lt;/script&gt;
							</CodeSnippet>

						</div>
						<div class="panel-footer border-top-0">
							<a :href="`//cdn.mili.us/@bybas/latte-ui/v${$latte.version}/download.zip`" :download="`latte-ui-v${$latte.version}.zip`" class="btn btn-text btn-primary">Download instead</a>
						</div>
					</div>

				</div>
				<div class="col-12 col-lg-4 mb-panel-gutter">

					<div class="panel h-100">
						<div class="panel-header border-bottom-0"><span class="panel-title">Contribute!</span></div>
						<div class="panel-body py-0">
							Help us make latte ui even better by contributing to our project.
						</div>
						<div class="panel-footer border-top-0">
							<a href="//github.com/basmilius/latte-ui" target="_blank" class="btn btn-text btn-primary">GitHub</a>
						</div>
					</div>

				</div>
			</div>
			<div class="row mt-5 mb-3">
				<div class="col-12">
					<h2 class="text-center">Examples</h2>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-lg-4">

					<router-link to="/examples/admin" class="panel mb-panel-gutter">
						<div class="panel-rich-media panel-rich-media-gutter" style="padding-bottom: 56.777%; background-image: url(/image/wallpaper/1.jpg)"></div>
						<div class="panel-header border-bottom-0"><span class="panel-title mx-auto">Admin</span></div>
					</router-link>

				</div>
				<div class="col-12 col-lg-4">

					<router-link to="/examples/blog" class="panel mb-panel-gutter">
						<div class="panel-rich-media panel-rich-media-gutter" style="padding-bottom: 56.777%; background-image: url(/image/wallpaper/1.jpg)"></div>
						<div class="panel-header border-bottom-0"><span class="panel-title mx-auto">Blog</span></div>
					</router-link>

				</div>
				<div class="col-12 col-lg-4">

					<router-link to="/examples/shop" class="panel">
						<div class="panel-rich-media panel-rich-media-gutter" style="padding-bottom: 56.777%; background-image: url(/image/wallpaper/1.jpg)"></div>
						<div class="panel-header border-bottom-0"><span class="panel-title mx-auto">Shop</span></div>
					</router-link>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import PageHeader from "../components/PageHeader";
	import CodeSnippet from "../components/CodeSnippet";

	export default {

		name: "Home",

		components: {
			CodeSnippet,
			PageHeader
		}
	}

</script>

<style lang="scss" scoped>

	#hero-actions .btn
	{
		--btn-height: 48px;
		--btn-padding: 0 24px;
	}

	#logo
	{
		width: 100%;
	}

	@media (max-width: 991px)
	{
		#logo-container
		{
			padding-bottom: 0;
		}

		#logo
		{
			width: 50%;
		}
	}

</style>
