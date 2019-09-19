<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<button class="btn btn-icon btn-text btn-dark">
		<Icon name="sticker-emoji"/>

		<latte-popup ref="popup" :associate-with="$el" :margin-x="-9" @open="onOpen">
			<latte-virtual-scroller ref="scroller" class="panel emoji-picker" :items="emojis" items-class="panel-body m-2" :item-height="36" :items-padding="[7, 7, 7, 7]" :item-width="36">

				<template #header>
					<div class="app-bar app-bar-flat">
						<nav class="nav nav-tabs is-over-outline px-2">
							<template v-for="(cat, index) of categories">
								<a class="nav-link mx-0" :data-tooltip="cat.label|i18n('latte-ui')" :class="{'is-active': index === currentCategory}" @click="currentCategory = index">
									<img :src="cat.imageUrl" :alt="cat.label|i18n('latte-ui')"/>
								</a>
							</template>
						</nav>
					</div>
				</template>

				<template v-slot="{item, style}">
					<latte-ripple as="button" :style="style" class="btn btn-icon btn-text btn-emoji" @click="onEmojiClick(item)">
						<i :class="`joypixels-24-${item.diversity !== null && !item.isDiversityBase ? 'diversity' : item.category} _${item.codePoints.base}`"></i>
					</latte-ripple>
				</template>

				<template #footer v-if="showSkinTones">
					<div class="app-bar skin-tones">
						<div class="app-bar-row app-bar-auto justify-content-center py-1">
							<latte-ripple as="button" class="btn btn-icon btn-icon btn-text" :key="index" @click="setSkinTone(index)" v-for="(skinTone, index) of skinTones">
								<i :class="`skin-tone tone-${index}`" :data-skin-tone="skinTone"></i>
							</latte-ripple>
						</div>
					</div>
				</template>

			</latte-virtual-scroller>
		</latte-popup>
	</button>

</template>

<script>

	import { emojiBaseUrl, ensureEmojisReady, getCategories, getEmoji, getEmojisForCategory, skinTones } from "../../js/ui/emoji";
	import { createElement } from "../../js/util/dom";
	import Icon from "./base/Icon.vue";

	let isSpriteCssLoaded = false;

	export default {

		components: {Icon},

		name: "latte-emoji-picker",

		props: {
			closeOnSelect: {default: false, type: Boolean}
		},

		created()
		{
			if (isSpriteCssLoaded)
				return;

			isSpriteCssLoaded = true;

			document.head.appendChild(createElement("link", link =>
			{
				link.rel = "stylesheet";
				link.href = `${emojiBaseUrl}/sprite/joypixels-sprite-24.min.css`;
			}));
		},

		data()
		{
			return {
				categories: [],
				currentCategory: 0,
				skinTone: 0,
				skinTones: skinTones
			};
		},

		mounted()
		{
			ensureEmojisReady()
				.then(() => this.onEmojiReady());
		},

		computed: {

			emojis()
			{
				if (this.categories.length === 0)
					return [];

				return getEmojisForCategory(this.categories[this.currentCategory].id)
					.filter(emoji => emoji.diversity === null || emoji.isDiversityBase)
					.map(emoji =>
					{
						if (this.skinTone === 0 || emoji.diversities.length === 0)
							return emoji;

						return getEmoji(emoji.diversities.find(d => d.indexOf(this.skinTones[this.skinTone]) > -1)) || emoji;
					});
			},

			showSkinTones()
			{
				let cat = this.categories[this.currentCategory] || "";

				return cat !== undefined && (cat.id === "activity" || cat.id === "people");
			}

		},

		methods: {

			setSkinTone(index)
			{
				this.skinTone = index;
			},

			onEmojiClick(emoji)
			{
				this.$emit("select", emoji);

				if (this.closeOnSelect)
					this.$refs.popup.close();
			},

			onEmojiReady()
			{
				this.categories = getCategories();
			},

			onOpen()
			{
				this.$refs.scroller.calculateVisibleNodes();
			}

		}

	}

</script>
