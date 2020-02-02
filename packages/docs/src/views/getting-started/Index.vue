<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="getting-started">

		<PageHeader title="Getting Started" :tabs="tabs"/>

		<TitledRow class="py-5" title="Introduction" id="gs-introduction">
			<div class="col-12 col-lg-6">
				<p class="lead">Hi</p>
			</div>
		</TitledRow>

		<TitledRow class="py-5" title="Yarn & NPM" id="gs-yarn-npm">
			<div class="col-12">

				<div class="panel">
					<div class="panel-body">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, asperiores aut autem beatae blanditiis consectetur corporis dicta enim ipsam minima nam, nesciunt odio, officia optio porro provident repudiandae sit unde?
					</div>
				</div>

			</div>
		</TitledRow>

		<TitledRow class="py-5" title="Vue.js" id="gs-vuejs">
			<div class="col-12">

				<div class="panel">
					<div class="panel-body">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci architecto aspernatur aut corporis, dicta distinctio dolorem eaque eligendi esse inventore iusto magni maiores nisi possimus, quia ratione veritatis voluptates.
					</div>
				</div>

			</div>
		</TitledRow>

		<TitledRow class="py-5" title="CDN" id="gs-cdn">
			<div class="col-12">

				<div class="panel">
					<div class="panel-body">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam atque ea incidunt iure iusto nostrum possimus repellat veritatis. Beatae blanditiis consectetur, officia officiis pariatur recusandae repellendus sit ullam vero voluptatibus.
					</div>
				</div>

			</div>
		</TitledRow>

		<TitledRow class="py-5" title="CSS" id="gs-css">
			<div class="col-12">

				<div class="panel">
					<div class="panel-body">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque cupiditate ex labore libero natus quia quo rerum! Consectetur laboriosam molestiae nam nihil non obcaecati odio porro quibusdam sequi veniam!
					</div>
				</div>

			</div>
		</TitledRow>

	</div>

</template>

<script>

	import PageHeader from "../../components/PageHeader";
	import TitledRow from "../../components/TitledRow";

	export default {

		name: "GettingStartedIndex",

		components: {TitledRow, PageHeader},

		data()
		{
			return {
				tabs: [
					{label: "Introduction", selector: "#gs-introduction"},
					{label: "Yarn & NPM", selector: "#gs-yarn-npm"},
					{label: "Vue.js", selector: "#gs-vuejs"},
					{label: "CDN", selector: "#gs-cdn"},
					{label: "CSS", selector: "#gs-css"}
				]
			};
		}

	}

</script>
