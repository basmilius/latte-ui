<template>

	<div class="container">
		<div class="row py-5">
			<div class="col-12 col-lg-5 align-self-center text-center text-lg-left">

				<h1 class="font-weight-bolder text-error mb-4">404</h1>
				<p>
					<strong>OOPS!</strong>
					Something went wrong... We couldn't find the page you were looking for.
				</p>
				<button class="btn btn-soft btn-primary mt-4" @click="$router.push('/')"><i class="mdi mdi-home"></i><span>Go home</span></button>

			</div>
			<div class="col-12 col-lg-7 align-self-center mt-5 mt-lg-0">

				<latte-svg-undraw url="https://cdn.mili.us/assets/undraw.co/lost.svg" color="rgb(var(--color-primary))" class="illustration mx-5"></latte-svg-undraw>

			</div>
		</div>
	</div>

</template>

<script>

	export default {

		name: "NotFound"

	}

</script>

<style lang="scss" scoped>

	div.row
	{
		min-height: calc(100vh - var(--app-bar-height) - (var(--content-gutter) * 2));
	}

	h1
	{
		font-size: 5rem;
		line-height: 1em;
	}

	p
	{
		margin: 0;
		font-size: 1.25rem;
		opacity: .75;
	}

	.btn.btn-soft
	{
		--btn-height: 54px;
		--btn-padding: 6px 24px;
	}

</style>
