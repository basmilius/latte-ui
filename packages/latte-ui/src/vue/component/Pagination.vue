<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<nav class="pagination" :class="{'pagination-bar': controllerBar}" role="navigation">

		<template v-if="controllerBar">
			<div class="d-flex align-items-center mr-auto">

				<button ref="entriesButton" class="btn btn-text my-n2" style="margin-left: -12px">
					<span>{{ "pagination.entries" | i18n("latte_ui", limit) }}</span>
				</button>

				<LattePopup :associate-with="$refs.entriesButton" :margin-y="9">
					<LatteFocusZone is-cycle is-vertical>
						<nav class="nav nav-list">
							<template v-for="l of limits">
								<LatteRipple as="a" :tabindex="l === limit ? 0 : -1" class="nav-link" data-close @click="$emit('limit', l)">{{ "pagination.entries" | i18n("latte_ui", l) }}</LatteRipple>
							</template>
						</nav>
					</LatteFocusZone>
				</LattePopup>

				<small class="ml-2 text-muted">{{ "pagination.showing_entries" | i18n("latte_ui", offset + 1, Math.min(offset + limit, total), total) }}</small>

			</div>
		</template>

		<template v-if="visiblePages.length > 1">
			<div class="d-flex align-items-center">

				<template v-if="navigationControls && currentPage > 1">
					<button class="pagination-item d-none d-md-block" @click="navigate(1)">
						<Icon name="chevron-double-left"/>
					</button>
					<button class="pagination-item" @click="navigate(currentPage - 1)">
						<Icon name="chevron-left"/>
					</button>
				</template>

				<template v-for="page of visiblePages">
					<button class="pagination-item" @click="askForPage" v-if="page === '...'">&hellip;</button>
					<button class="pagination-item" :class="{'is-active': currentPage === page}" @click="navigate(page)" v-else>{{ page }}</button>
				</template>

				<template v-if="navigationControls && currentPage < totalPages">
					<button class="pagination-item" @click="navigate(currentPage + 1)">
						<Icon name="chevron-right"/>
					</button>
					<button class="pagination-item d-none d-md-block" @click="navigate(totalPages)">
						<Icon name="chevron-double-right"/>
					</button>
				</template>

			</div>
		</template>
	</nav>

</template>

<script>

	import { Buttons, prompt } from "../../js/ui/message";
	import { translate } from "../../js/i18n";
	import { clamp } from "../../js/math";

	import Icon from "./Icon.vue";
	import LatteFocusZone from "./FocusZone";
	import LattePopup from "./Popup";
	import LatteRipple from "./Ripple";

	export default {

		components: {LatteFocusZone, LatteRipple, LattePopup, Icon},

		name: "latte-pagination",

		props: {
			controllerBar: {default: false, type: Boolean},
			limit: {default: 10, required: true, type: Number},
			limits: {default: () => [5, 10, 20, 50, 100], type: Array},
			navigationControls: {default: true, type: Boolean},
			offset: {default: 0, type: Number},
			sizeEnd: {default: 2, type: Number, validator: num => num >= 0},
			sizeMid: {default: 1, type: Number, validator: num => num >= 0},
			total: {default: 0, required: true, type: Number}
		},

		computed: {

			currentPage()
			{
				return Math.min(this.totalPages, Math.floor(this.offset / this.limit) + 1);
			},

			totalPages()
			{
				return Math.ceil(this.total / this.limit);
			},

			visiblePages()
			{
				const current = this.currentPage;
				const total = this.totalPages;

				if (this.totalPages === 0)
					return [];

				let dots = false;
				let pages = [];

				if (this.totalPages === (this.sizeEnd + this.sizeMid + 2))
				{
					for (let n = 1; n <= total; n++)
						pages.push(n);
				}
				else
				{
					for (let n = 1; n <= total; n++)
					{
						if (current === n)
						{
							dots = true;
							pages.push(n);
						}
						else if (n <= this.sizeEnd || (n >= current - this.sizeMid && n <= current + this.sizeMid) || n > total - this.sizeEnd)
						{
							dots = true;
							pages.push(n);
						}
						else if (dots)
						{
							dots = false;
							pages.push("...");
						}
					}
				}

				return pages;
			}

		},

		methods: {

			askForPage()
			{
				const title = translate("latte_ui", "pagination.go_to.title");
				const message = translate("latte_ui", "pagination.go_to.message");

				prompt(title, message).then(r =>
				{
					if (r.button !== Buttons.OK)
						return;

					const page = parseInt(r.input);

					if (isNaN(page))
						return;

					this.navigate(clamp(page, 1, this.totalPages));
				});
			},

			navigate(page)
			{
				this.$emit("navigate", (page - 1) * this.limit);
			}

		}

	}

</script>
