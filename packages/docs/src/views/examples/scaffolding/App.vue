<template>

	<main class="scaffolding">
		<latte-sheet position="left" ref="drawer">
			<div class="app-bar app-bar-primary app-bar-main">
				<div class="app-bar-row">
					<span class="app-bar-title">Latte UI</span>
					<button class="btn btn-icon btn-text d-lg-none ml-auto" @click="$refs.drawer.toggle()"><i class="mdi mdi-window-close"></i></button>
				</div>
			</div>
			<nav class="nav nav-list">
				<latte-ripple as="a" class="nav-link" v-for="i of [1, 2, 3]">Nav item {{ i }}</latte-ripple>
				<div class="divider divider-horizontal"></div>
				<latte-ripple as="a" class="nav-link" v-for="i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]">Nav item {{ i }}</latte-ripple>
			</nav>
		</latte-sheet>

		<div class="app-bar app-bar-primary app-bar-main">
			<div class="app-bar-row">
				<button class="btn btn-icon btn-text d-lg-none" @click="$refs.drawer.toggle()"><i class="mdi mdi-menu"></i></button>
				<span class="app-bar-title d-lg-none">Latte UI</span>
				<nav class="nav nav-tabs d-none d-lg-flex mx-auto ml-lg-0">
					<latte-ripple as="a" class="nav-link is-active"><span>Home</span></latte-ripple>
					<latte-ripple as="a" class="nav-link"><span>Documentation</span></latte-ripple>
					<latte-ripple as="a" class="nav-link"><span>Block editor</span></latte-ripple>
					<latte-ripple as="a" class="nav-link"><span>Bas' playground</span></latte-ripple>
				</nav>
				<button class="btn btn-icon btn-text ml-auto ml-lg-0"><i class="mdi mdi-dots-horizontal"></i></button>
			</div>
		</div>

		<button class="btn btn-fab btn-contained btn-success"><i class="mdi mdi-plus"></i></button>

		<div class="content">
			<div class="row" v-for="r of [1, 2]">
				<div class="col-12 col-lg-6" v-for="i of [1, 2]">

					<div class="panel mb-panel-gutter">
						<div class="panel-header"><span class="panel-title">Panel {{ i }}</span></div>
						<div class="panel-body">
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aut autem distinctio dolores eligendi est impedit ipsa iste labore, maxime molestias neque odit quaerat quas soluta temporibus ullam veniam vero?</p>
							<p>Ad aliquam atque culpa dolores eligendi et ex exercitationem expedita explicabo facilis fuga fugit id iste, laboriosam laudantium magnam minima minus, nisi soluta suscipit tempore veniam, veritatis? Nihil, quam, repellat.</p>
							<p>Consequatur eos itaque nam quibusdam ratione, rerum similique tempora. Architecto assumenda consectetur debitis dolor id ipsum pariatur quo sapiente sint, soluta tempore voluptates. Beatae deleniti dolorum magni nam optio repellendus?</p>
							<p>A ab animi asperiores commodi consectetur debitis dolor ea exercitationem libero nihil, nostrum officia officiis porro quaerat quos, sint totam. Atque culpa dolore nisi numquam perspiciatis praesentium quis sed voluptatum.</p>
							<p>Ad aliquid aut dolores eligendi esse est expedita, natus perferendis quibusdam quis reprehenderit suscipit totam ullam ut, vero voluptas voluptatem! Assumenda dolores eligendi eum facere impedit iste quae quibusdam ratione!</p>
							<p>Consequatur cumque, distinctio est eveniet explicabo fugit ipsam laboriosam, molestiae odio, perferendis porro quos tempore temporibus! Alias asperiores autem ducimus eligendi enim exercitationem porro. Accusamus eligendi fugit harum pariatur sequi.</p>
							<p>Cum deserunt dignissimos eaque esse quia recusandae, repudiandae? Ad aliquam consequuntur deserunt eaque earum error et id, impedit incidunt labore laborum nisi nobis perferendis provident quae similique voluptas voluptatem voluptatibus.</p>
							<p>Animi asperiores cupiditate dignissimos doloremque eaque eius explicabo, illum incidunt ipsum itaque iure magnam maxime, molestias nulla obcaecati odit officia perspiciatis placeat praesentium provident quaerat quia ratione repudiandae vero voluptatum?</p>
							<p>Ab architecto, corporis cupiditate doloremque explicabo nulla numquam perspiciatis quod reiciendis rem repellendus saepe? Atque beatae consectetur, debitis ea eum expedita explicabo illo ipsa modi officiis omnis optio perferendis voluptatum?</p>
							<p>Ab, aspernatur aut commodi consequatur cumque doloribus eaque earum eum id illo ipsa ipsum iste magni nesciunt nihil nostrum nulla officiis, quisquam repellat sed sit suscipit temporibus vero vitae voluptas!</p>
						</div>
					</div>

				</div>
			</div>
		</div>
	</main>

</template>

<script>

	export default {

		name: "App.vue"

	}

</script>

<style lang="scss" scoped>

	.scaffolding
	{
		--color-primary: var(--blue-50);
		--color-success: var(--pink-60);
	}

</style>
