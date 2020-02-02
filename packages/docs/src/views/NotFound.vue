<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="d-flex vh-100">

		<div class="panel m-auto pt-3" style="max-width: 100%; width: 420px">
			<div class="panel-body text-center pb-0">
				<img src="//g.s3.bmcdn.nl/assets/joypixels/v5/svg/1f641.svg" alt="Slightly frowning face" height="96" width="96" class="mx-auto"/>
			</div>
			<div class="panel-body border-top-0 text-center">
				<h1>404</h1>
				<p><strong>OOPS!</strong> The requested page could not be found! Did you get the URL right?</p>
			</div>
			<div class="panel-body border-top-0 pt-0">
				<router-link as="router-link" tag="latte-ripple" to="/" class="btn btn-contained btn-primary is-fluid is-large"><latte-icon>arrow-left-bold-circle</latte-icon><span>Go Home</span></router-link>
			</div>
		</div>

	</div>

</template>

<script>

	export default {

		name: "NotFound"

	}

</script>
