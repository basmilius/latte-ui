<template>

	<div class="docs-example-site">

		<link href="https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,700&display=swap" rel="stylesheet"/>

		<div class="app-bar app-bar-light app-bar-main">
			<div class="container px-0">
				<div class="app-bar-row app-bar-auto mx-n3 py-4">
					<h1 class="app-bar-title font-weight-bolder">Newsroom</h1>

					<nav class="nav nav-tabs ml-auto" id="primary-nav">
						<a href="#" class="nav-link is-active"><span>Home</span></a>
						<a href="#" class="nav-link"><span>About</span></a>
						<a href="#" class="nav-link"><span>Contact</span></a>
					</nav>
				</div>
				<div class="app-bar-row app-bar-auto mx-n3" id="category-nav">
					<nav class="nav nav-tabs">
						<a href="#" class="nav-link is-active" style="--tabs-accent: var(--color-primary)"><span>Frontpage</span></a>
						<a href="#" class="nav-link" style="--tabs-accent: var(--blue-80)"><span>Technology</span></a>
						<a href="#" class="nav-link" style="--tabs-accent: var(--orange-50)"><span>Economy</span></a>
						<a href="#" class="nav-link" style="--tabs-accent: var(--pink-70)"><span>Entertainment</span></a>
						<a href="#" class="nav-link" style="--tabs-accent: var(--green-60)"><span>Sports</span></a>
					</nav>
				</div>
			</div>
		</div>

		<router-view/>

		<footer class="footer mt-auto py-5">
			<div class="content">
				<div class="container">
					<div class="row">
						<div class="col-12 col-lg-4 text-center text-lg-left">

							<img src="../../../assets/bas.svg" alt="Bas' logo" height="54"/><br/>
							<br/>
							<p><strong>Newsroom</strong></p>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid aperiam delectus dignissimos doloremque, ducimus exercitationem facilis harum labore.
							</p>

						</div>
						<div class="col-12 col-lg-2 d-none d-lg-block"></div>
						<div class="col-12 col-lg mt-5 mt-lg-0 footer-nav text-center text-lg-left">

							<strong>News</strong>
							<nav class="nav nav-links mt-3">
								<router-link to="#" class="nav-link">Technology</router-link>
								<router-link to="#" class="nav-link">Economy</router-link>
								<router-link to="#" class="nav-link">Entertainment</router-link>
								<router-link to="#" class="nav-link">Sports</router-link>
							</nav>

						</div>
						<div class="col-12 col-lg mt-5 mt-lg-0 footer-nav text-center text-lg-left">

							<strong>Contact</strong>
							<nav class="nav nav-links mt-3">
								<router-link to="#" class="nav-link">Tip the Editors</router-link>
								<router-link to="#" class="nav-link">FaQ</router-link>
								<router-link to="#" class="nav-link">Contact</router-link>
							</nav>

						</div>
					</div>
				</div>
			</div>
		</footer>
	</div>

</template>

<script>

	export default {

		name: "App.vue"

	}

</script>

<style lang="scss" scoped>

	.docs-example-site
	{
		--color-primary: var(--red-60);

		position: relative;
		display: flex;
		min-height: 100vh;
		flex-flow: column;
	}

	.app-bar-main
	{
		top: -93px;
		overflow: hidden;
	}

	#primary-nav
	{
		--tabs-accent: var(--color-primary);
		--tabs-height: 36px;

		.nav-link
		{
			margin: 0 15px;
			padding: 9px 0;
		}
	}

	#category-nav
	{
		--tabs-height: 60px;

		.nav-link
		{
			margin: 0 15px;
			padding: 9px 0;
		}
	}

</style>

<style lang="scss">

	h2, h3, h4, h5, h6
	{
		font-family: "Roboto Slab", serif;
		text-transform: uppercase;
	}

</style>
