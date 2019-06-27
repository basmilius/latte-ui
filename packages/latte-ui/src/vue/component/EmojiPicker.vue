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
		<i class="mdi mdi-sticker-emoji"></i>

		<latte-popup ref="popup" :associate-with="$el" :margin-x="-9">
			<div class="panel panel-blank emoji-picker">
				<div class="app-bar app-bar-flat">
					<div class="app-bar-row app-bar-auto px-2">
						<nav class="nav nav-tabs is-over-outline">
							<template v-for="(cat, index) of categories">
								<a class="nav-link mx-0" :data-tooltip="cat.label|i18n('latte-ui')" :class="{'is-active': index === currentCategory}" @click="currentCategory = index">
									<img :src="cat.imageUrl"/>
								</a>
							</template>
						</nav>
					</div>
				</div>
				<div class="panel-body p-2">
					<template v-for="emoji of emojis">
						<button class="btn btn-text btn-emoji" @click="onEmojiClick(emoji)">
							<i :class="`joypixels-24-${emoji.diversity !== null && !emoji.isDiversityBase ? 'diversity' : emoji.category} _${emoji.codePoints.base}`"></i>
						</button>
					</template>
				</div>
				<div class="app-bar skin-tones" v-if="showSkinTones">
					<div class="app-bar-row app-bar-auto justify-content-center py-1">
						<button class="btn btn-icon btn-text" @click="setSkinTone(index)" v-for="(skinTone, index) of skinTones">
							<i :class="`skin-tone tone-${index}`" :data-skin-tone="skinTone"></i>
						</button>
					</div>
				</div>
			</div>
		</latte-popup>
	</button>

</template>

<script>

	import { emojiBaseUrl, ensureEmojisReady, getCategories, getEmoji, getEmojisForCategory, skinTones } from "../../js/ui/emoji";
	import { createElement } from "../../js/util/dom";

	let isSpriteCssLoaded = false;

	export default {

		name: "latte-emoji-picker",

		props: {

			closeOnSelect: {
				default: false,
				type: Boolean
			}

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
			}

		}

	}

</script>
