<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page mb-3" id="tests" v-if="!testEditor">

		<PageHeader>
			<h1>Random tests</h1>
			<p>These are some development tests.</p>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12">

					<div class="panel" v-if="true">
						<div class="panel-header"><span class="panel-title">Virtual scroller</span></div>
						<latte-virtual-scroller :items="rows" :item-height="48" style="height: 390px">

							<template v-slot="{item, style}">
								<div class="d-flex align-items-center justify-content-center bg-dark text-white border" :style="style">Item {{item.id}}</div>
							</template>

						</latte-virtual-scroller>
					</div>

					<div class="panel" v-if="true">
						<div class="panel-header"><span class="panel-title">Virtual scroller (grid)</span></div>
						<latte-virtual-scroller :items="rows" :item-height="48" :item-width="222" items-class="d-flex flex-row flex-wrap" style="height: 390px">

							<template v-slot="{item, style}">
								<div class="d-flex align-items-center justify-content-center bg-dark text-white border" :style="style">Item {{item.id}}</div>
							</template>

						</latte-virtual-scroller>
					</div>

					<div class="panel" v-if="true">
						<div class="panel-header">
							<span class="panel-title">Emoji stuff</span>
							<div class="ml-auto"></div>
							<latte-emoji-picker></latte-emoji-picker>
							<latte-emoji-picker close-on-select></latte-emoji-picker>
						</div>
						<div class="panel-body">
							<p v-emojify>{{ "Emoji's are now replaced in latte-ui 🎉🙅🏽‍♂️" }}</p>
							<p v-emojify>{{ "🥳🤪✋🏼🍑🥳🥳🥳😘" }}</p>
						</div>
					</div>

				</div>
			</div>
		</div>

	</div>

	<div class="panel radius-none" style="height: calc(100vh - 60px)" v-else>
		<BEEditor v-model="content">
			<template #settings-pane-after="{ blockSettingsShown }">
				<template v-if="!blockSettingsShown">
					<div class="panel-header"><span class="panel-title">Page settings</span></div>
					<BESettingsGroup title="General" :padded="true">
						This panel was added with a slot.
					</BESettingsGroup>
					<BESettingsGroup title="View" :opened="false" :padded="true">
						This panel was also added with a slot.
					</BESettingsGroup>
				</template>
			</template>
		</BEEditor>
	</div>

</template>

<script>

	import { BEEditor } from "../../../block-editor/src";

	import BESettingsGroup from "../../../block-editor/src/BESettingsGroup";
	import PageHeader from "../components/PageHeader";

	export default {

		components: {
			BESettingsGroup,
			BEEditor,
			PageHeader
		},

		data()
		{
			let i = 0;
			let rows = Array.from(Array(50), () => ({id: ++i, name: `Bas ${i}`}));

			return {
				content: [
					{
						"id": "mv-opening-hours",
						"options": {
							"facilityId": 13,
							"showWhenClosed": true
						}
					},
					{
						"id": "wrapper",
						"options": {
							"class": "gutter-mp no-gutters"
						},
						"children": [
							{
								"id": "heading",
								"options": {
									"type": "h3",
									"text": "Italiaans restaurant Mama Mia"
								}
							},
							{
								"id": "paragraph",
								"options": {
									"align": "left",
									"fontSize": 1,
									"indent": 0,
									"text": "Voor een heerlijke pizza, pasta of lasagne hoef je niet naar Italië te reizen. Ook in ons Italiaanse restaurant op Marveld Recreatie is het culinair Mediterraans genieten. Alle pizza’s worden gebakken in een originele Italiaanse houtoven, wat een extra lekkere authentieke smaak geeft. Ook de voor- en bijgerechten zijn de moeite waard.&nbsp; U kunt reserveren via de receptie!"
								}
							}
						]
					},
					{
						"id": "html",
						"options": {
							"code": "<mva-version-check min-version=\"4.1.0\">\n\t<template v-slot:ok>\n\n\t\t<mva-reservation-button :facility-id=\"13\"></mva-reservation-button>\n\t\t<mva-reservation-button :facility-id=\"13\"></mva-reservation-button>\n\n\t</template>\n\n\t<div class=\"gutter-mp my-0\">\n\t\t<latte-ripple as=\"a\" href=\"tel:0031 544 466000\" class=\"btn btn-pill btn-contained btn-primary\">\n\t\t\t<i class=\"mdi mdi-pizza\"></i>\n\t\t\t<span>Pizza bezorgservice</span>\n\t\t</latte-ripple>\n\t\t<latte-ripple as=\"a\" href=\"tel:0031 544 466000\" class=\"btn btn-pill btn-contained btn-primary mt-2\">\n\t\t\t<i class=\"mdi mdi-phone\"></i>\n\t\t\t<span>Telefonisch reserveren</span>\n\t\t</latte-ripple>\n\t</div>\n\n</mva-version-check>\n"
						}
					},
					{
						"id": "wrapper",
						"options": {
							"class": "gutter-mp mb-0 no-gutters"
						},
						"children": [
							{
								"id": "heading",
								"options": {
									"type": "h4",
									"text": "Menukaart"
								}
							}
						]
					},
					{
						"id": "html",
						"options": {
							"code": "<table class=\"table_menu\" border=\"0\" cellspacing=\"0\">\n<tbody>\n<tr class=\"groep\">\n<td colspan=\"2\">Voor- en bijgerechten</td>\n</tr>\n<tr>\n<td><strong>Ciabatta met kruidenboter</strong>\nolijven en tomatenpesto</td>\n<td class=\"prijs\">€ 3,90</td>\n</tr>\n<tr>\n<td><strong>Insalata di pasta legume</strong>\nvegetarische pasta salade</td>\n<td class=\"prijs\">€ 5,80</td>\n</tr>\n<tr>\n<td><strong>Insalata di pasta pollo</strong>\npasta salade kip</td>\n<td class=\"prijs\">€ 5,80</td>\n</tr>\n<tr>\n<td><strong>Insalata di pasta tonno</strong>\npasta salade tonijn</td>\n<td class=\"prijs\">€ 6,10</td>\n</tr>\n<tr>\n<td><strong>Frisse rauwkost</strong>\nmet feta kaas en cocktail tomaatjes</td>\n<td class=\"prijs\">€ 4,20</td>\n</tr>\n<tr class=\"groep\">\n<td colspan=\"2\">Warme voorgerechten</td>\n</tr>\n<tr>\n<td><strong>Tassa di Minestrone</strong>\nItaliaanse tomatensoep</td>\n<td class=\"prijs\">€ 4,80</td>\n</tr>\n<tr>\n<td><strong>Pomodori mozzarella di Bufula</strong>\ntomaat gegratineerd met mozzarella</td>\n<td class=\"prijs\">€ 5,30</td>\n</tr>\n<tr>\n<td><strong>Tinozza di Pesce</strong>\nvispannetje met room</td>\n<td class=\"prijs\">€ 7,40</td>\n</tr>\n<tr>\n<td><strong>Lasagne Bolognese</strong>\nlasagne met gehakt</td>\n<td class=\"prijs\">€ 8,40</td>\n</tr>\n<tr>\n<td><strong>Lasagne Salmone</strong>\nlasagne met zalm</td>\n<td class=\"prijs\">€ 8,40</td>\n</tr>\n<tr>\n<td><strong>Lasagne Legume</strong>\nlasagne met groente</td>\n<td class=\"prijs\">€ 8,40</td>\n</tr>\n<tr class=\"groep\">\n<td colspan=\"2\">Pizza</td>\n</tr>\n<tr>\n<td><strong>Pizza Margarita </strong>\ntomatensaus, kaas en basilicum</td>\n<td class=\"prijs\">€ 6,80</td>\n</tr>\n<tr>\n<td><strong>Pizza Tonno </strong>\ntomatensaus, kaas, tonijn, ui, olijven</td>\n<td class=\"prijs\">€ 9,50</td>\n</tr>\n<tr>\n<td><strong>Pizza Hawaii </strong>\ntomatensaus, kaas, ananas, ham, bacon</td>\n<td class=\"prijs\">€10,00</td>\n</tr>\n<tr>\n<td><strong>Pizza Pepperoni </strong>\ntomatensaus, kaas, pepperoni, ui</td>\n<td class=\"prijs\">€ 9,20</td>\n</tr>\n<tr>\n<td><strong>Pizza Pollo</strong>\ntomatensaus, kaas, kip, mais, paprika, ui</td>\n<td class=\"prijs\">€ 10,30</td>\n</tr>\n<tr>\n<td><strong>Pizza Shoarma </strong>\ntomatensaus, kaas, shoarma, ui, paprika</td>\n<td class=\"prijs\">€ 10,30</td>\n</tr>\n<tr>\n<td><strong>Pizza Funghi </strong>\ntomatensaus, kaas, ham, champignons</td>\n<td class=\"prijs\">€ 9,20</td>\n</tr>\n<tr>\n<td><strong>Pizza Legume</strong>\ntomatensaus, kaas, champignons, paprika, ui, mais</td>\n<td class=\"prijs\">€ 8,90</td>\n</tr>\n<tr>\n<td><strong>Pizza Bambino</strong>\ntomatensaus, kaas, ananas</td>\n<td class=\"prijs\">€ 7,10</td>\n</tr>\n<tr class=\"groep\">\n<td colspan=\"2\">Pasta</td>\n</tr>\n<tr>\n<td><strong>Spaghetti bolognese</strong>\nmet bolognese gehaktsaus</td>\n<td class=\"prijs\">€ 7,40</td>\n</tr>\n<tr>\n<td><strong>Spaghetti carbonara</strong>\nkaas, spek, ui</td>\n<td class=\"prijs\">€ 7,90</td>\n</tr>\n<tr>\n<td><strong>Penne bolognese</strong>\nmet bolognese gehaktsaus</td>\n<td class=\"prijs\">€ 7,40</td>\n</tr>\n<tr>\n<td><strong>Penne carbonara</strong>\nkaas, spek, ui</td>\n<td class=\"prijs\">€ 7,90</td>\n</tr>\n<tr>\n<td><strong>Ravioli spinazie met ricotta, bolognese</strong>\nmet bolognese gehaktsaus</td>\n<td class=\"prijs\">€ 8,70</td>\n</tr>\n<tr>\n<td><strong>Ravioli spinazie met ricotta, carbonara</strong>\nkaas, spek, ui</td>\n<td class=\"prijs\">€ 8,70</td>\n</tr>\n<tr class=\"extras\">\n<td colspan=\"2\"><strong> * Pizzabezorgservice</strong>\nZin in een heerlijke pizza van onze pizzeria Mama Mia, maar blijft u liever op uw eigen stek op ons vakantiepark? Dan biedt onze pizzabezorgservice dé uitkomst! Als u vóór 20.00 uur bestelt, dan zorgen wij ervoor dat uw bestelling op uw aangegeven standplaats of bungalow wordt bezorgd. (Wij bezorgen uitsluitend pizza's)Vermeld tijdens uw telefonische bestelling: Naam, standplaats/bungalownummer en telefoonnummer.\n\n<strong>Pizza bestellijn: 0544 466000</strong></td>\n</tr>\n<tr class=\"opmerkingen\">\n<td colspan=\"2\">\n<ul>\n \t<li>Per tafel of gezelschap maken wij één rekening.</li>\n \t<li>U wordt vriendelijk verzocht uw rekening bij de kassa te voldoen.</li>\n \t<li>Waarde Marveld consumptie-munten € 2,30. Hierop geen geld teruggave.</li>\n \t<li>Wij serveren geen kraanwater, wel verschillende soorten bronwater.</li>\n</ul>\n&nbsp;</td>\n</tr>\n</tbody>\n</table>"
						}
					}
				],
				rows: rows,
				acTwo: [],
				acTree: [3, 6],
				testEditor: true
			};
		},

		destroyed()
		{
			document.body.style.removeProperty("overflow");
		},

		mounted()
		{
			if (this.testEditor)
				document.body.style.setProperty("overflow", "hidden");
		}

	}

</script>
