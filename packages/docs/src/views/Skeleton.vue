<template>

	<main class="scaffolding sheet-below-app-bar">

		<latte-sheet ref="drawer" class="drawer-container" :touch-enabled="isDrawerTouchEnabled">
			<DrawerMenu class="nav nav-list py-4" @click="$refs.drawer.close()"/>
		</latte-sheet>

		<MainMenu @toggle-drawer="$refs.drawer.toggle()"/>

		<div class="content p-0">
			<RouterView/>
			<Footer/>
		</div>
	</main>

</template>

<script>

	import DrawerMenu from "../components/DrawerMenu";
	import Footer from "../components/Footer";
	import MainMenu from "../components/MainMenu";

	export default {

		name: "Skeleton",

		components: {DrawerMenu, Footer, MainMenu},

		data()
		{
			return {
				isDrawerTouchEnabled: true
			};
		},

		destroyed()
		{
			window.removeEventListener("resize", this.onWindowResize);
		},

		mounted()
		{
			window.addEventListener("resize", this.onWindowResize, {passive: true});
			this.onWindowResize();
		},

		methods: {

			onWindowResize()
			{
				this.isDrawerTouchEnabled = window.innerWidth <= 991;
			}

		}

	}

</script>
