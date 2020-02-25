<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<footer class="footer bg-panel py-5">
		<div class="content">
			<div class="container">
				<div class="row">
					<div class="col-12 col-lg-4 text-center text-lg-left">

						<img src="../assets/bas.svg" alt="Bas' logo" height="54" class="mx-auto mx-lg-0 mb-3"/>
						<p><strong>By Bas</strong></p>
						<p>
							Designed and developed with <img src="https://bmcdn.nl/assets/joypixels/v5.5/svg/2764.svg" alt="Heart" class="emoji"/> by <a href="https://bas.dev" target="_blank" rel="noopener">Bas Milius</a> and other contributors.
						</p>

					</div>
					<div class="col-12 col-lg-2 d-none d-lg-block"></div>
					<div class="col-12 col-lg mt-5 mt-lg-0 footer-nav text-center text-lg-left">

						<strong>Develop</strong>
						<nav class="nav nav-links mt-3 align-items-center align-items-lg-start">
							<router-link to="/docs" class="nav-link">Documentation</router-link>
							<a href="//github.com/basmilius/latte-ui/issues#bug" target="_blank" class="nav-link">Report a bug</a>
							<a href="//github.com/basmilius/latte-ui/issues#feature" target="_blank" class="nav-link">Request a feature</a>
						</nav>

					</div>
					<div class="col-12 col-lg mt-5 mt-lg-0 footer-nav text-center text-lg-left">

						<strong>Packages (Coming soon)</strong>
						<nav class="nav nav-links mt-3 align-items-center align-items-lg-start">
							<router-link to="/packages/blocks" class="nav-link">Blocks</router-link>
							<router-link to="/packages/layouts" class="nav-link">Layouts</router-link>
						</nav>

					</div>
				</div>
			</div>
		</div>
	</footer>

</template>

<script>

	export default {

		name: "Footer"

	}

</script>
