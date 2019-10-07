<template>

	<div class="container">

		<FrontpageSection color="--color-primary" title="Just in">
			<div class="row align-items-center">
				<div class="col-12 col-lg-6">

					<div class="embed-responsive embed-responsive-4by3 radius-default" style="background: url(https://images.pexels.com/photos/1786769/pexels-photo-1786769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat center center / cover"></div>

				</div>
				<div class="col-12 col-lg-5 ml-auto">

					<h3>Lorem ipsum dolor sit amet.</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, eligendi eos ipsum modi nihil odio officia perspiciatis quos vero voluptates. Commodi, dolor dolores excepturi ipsum magni officiis quae sint soluta!</p>
					<p>Accusantium aperiam asperiores autem delectus doloribus est fugiat fugit illum iure, nesciunt nobis officia perferendis.</p>
					<button class="btn btn-contained"><span>Read more</span><i class="mdi mdi-arrow-right mr-n1"></i></button>

				</div>
			</div>

			<div class="row mt-4">
				<div class="col-6 col-lg" v-for="i of [1, 2, 3, 4]">

					<a href="#" class="panel">
						<div class="panel-media panel-media-gutter mb-2 embed-responsive embed-responsive-4by3" style="background: url(https://images.pexels.com/photos/1786769/pexels-photo-1786769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260) no-repeat center center / cover"></div>
						<div class="panel-body">
							<h6>Newsitem {{ i }}</h6>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem cupiditate dicta dolorem eius eligendi.</p>
						</div>
					</a>

				</div>
			</div>
		</FrontpageSection>

		<FrontpageSection color="--blue-80" title="Technology">
			Hi
		</FrontpageSection>

	</div>

</template>

<script>

	import FrontpageSection from "./FrontpageSection";
	export default {

		name: "Frontpage",
		components: {FrontpageSection}
	}

</script>

<style lang="scss" scoped>

</style>
