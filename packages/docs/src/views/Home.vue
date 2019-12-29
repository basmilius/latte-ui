<template>

	<div class="content page" id="home">

		<div class="container py-5">
			<div class="row py-5 align-items-center">
				<div class="col-12 col-lg-5">

					<div class="page-header-content tall text-center text-lg-left">
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

					<div class="page-header-content text-center">
						<img src="../assets/example.png" alt="Something created with Latte UI" style="box-shadow: var(--elevation24)"/>
					</div>

				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-6 d-flex">

					<div class="panel mb-panel-gutter w-100">
						<div class="panel-header border-0">
							<h5 class="m-0">Install</h5>
						</div>
						<div class="panel-body border-0 flex-grow-1 pt-0">
							<p>
								Use Latte UI within your project by including the source through NPM. Everything except the documentation is included.
							</p>
							<h6>Yarn</h6>
							<CodeSnippet lang="shell" :code-string="data.yarnAdd" small/>
							<h6 class="mt-3">NPM</h6>
							<CodeSnippet lang="shell" :code-string="data.npmInstall" small/>
						</div>
						<div class="panel-body border-0 flex-grow-0 pt-0">
							<latte-ripple as="button" class="btn btn-outline btn-primary btn-lg"><span>Install Guide</span></latte-ripple>
						</div>
					</div>

				</div>
				<div class="col-12 col-lg-6 d-flex">

					<div class="panel mb-panel-gutter w-100">
						<div class="panel-header border-0">
							<h3 class="panel-title">CDN &amp; Download</h3>
						</div>
						<div class="panel-body border-0 flex-grow-1 pt-0">
							<p>
								Start quickly by including Latte UI from a CDN in your template. Just include the following links and you're ready!
							</p>
							<h6>CSS only</h6>
							<CodeSnippet lang="html" :code-string="data.cssOnly" small/>
							<h6 class="mt-3">JS & Vue</h6>
							<CodeSnippet lang="html" :code-string="data.cdn" small/>
						</div>
						<div class="panel-body border-0 flex-grow-0 pt-0">
							<latte-ripple as="button" class="btn btn-outline btn-primary btn-lg"><span>Download instead</span></latte-ripple>
						</div>
					</div>

				</div>
			</div>
		</div>

		<div class="container py-5">
			<div class="row">
				<div class="col-12 mb-4">
					<h4 class="font-weight-normal m-0">Showcase</h4>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-lg-4" v-for="i of [1, 2, 3]">

					<div class="panel">
						<div class="panel-body">
							Showcase item {{ i }}
						</div>
					</div>

				</div>
			</div>
		</div>

		<div class="container py-5">
			<div class="row">
				<div class="col-12 mb-4">
					<h4 class="font-weight-normal m-0">More by Bas</h4>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-lg-4" v-for="i of [1, 2, 3]">

					<a class="panel">
						<div class="panel-body">
							By Bas item {{ i }}
						</div>
					</a>

				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import cdn from "raw-loader!../data/home/cdn.html";
	import cssOnly from "raw-loader!../data/home/css-only.html";
	import npmInstall from "raw-loader!../data/home/npm-install.sh";
	import yarnAdd from "raw-loader!../data/home/yarn-add.sh";

	import CodeSnippet from "../components/CodeSnippet";

	export default {

		name: "Home",

		components: {CodeSnippet},

		data()
		{
			return {
				data: {cdn, cssOnly, npmInstall, yarnAdd}
			};
		}

	}

</script>
