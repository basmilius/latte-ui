<template>

	<div class="page-header">
		<div class="container text-center text-lg-left">
			<div class="row align-items-center">
				<div class="col-12 col-lg-8">
					<div class="page-header-content">
						<slot></slot>
					</div>
				</div>
				<div class="col-12 col-lg-4 my-3 my-lg-0">
					<div class="notice notice-outline notice-info">
						<p>Note: This documentation website is a work in progress! A lot is missing!</p>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>

	export default {

		name: "PageHeader"

	}

</script>
