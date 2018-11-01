/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

import { request } from "../util/api.js";
import { deepMerge } from "../util/core.js";

/**
 * Creates the latte-chart and latte-chart-panel components.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{

	Vue.component("latte-chart", {

		props: {

			options: {
				default: () =>
				{
					return {};
				},
				required: false,
				type: Object
			},

			title: {
				default: null,
				required: false,
				type: String | null
			},

			url: {
				required: true,
				type: String
			}

		},

		template: `	<div class="latte-charts latte-charts-line" :class="{'is-loading':is_loading}">
						<span class="spinner spinner-primary"></span>
						<div class="latte-charts-title" v-if="title !== null">{{ titleTransformed }}</div>
						<div class="latte-charts-chart" style="height:calc(100% - 75px)">
							<canvas ref="chart"></canvas>
						</div>
					</div>`,

		/**
		 * Provides the initial dataset for our Vue Component.
		 *
		 * @returns {*}
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				instance: null,
				is_loading: true,
				chartData: {},
				chartOptions: {}
			};
		},

		/**
		 * Invoked when our Vue Component is mounted.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		mounted()
		{
			this.loadChart();
		},

		computed: {

			titleTransformed()
			{
				if (this.title === null)
					return null;

				return this.title.replace(new RegExp("\\${([a-zA-Z0-9_.\\[\\]]+)}"), (match, contents) =>
				{
					return new Function(`
						try
						{
							return new Intl.NumberFormat(navigator.language).format(this.${contents});
						}
						catch(err)
						{
							return "";
						}
					`).call(this);
				});
			}

		},

		methods: {

			/**
			 * Loads chart data.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			loadChart()
			{
				this.is_loading = true;

				request(this.url)
					.then(r => r.json())
					.then(r => this.onReceivedChart(r));
			},

			/**
			 * Invoked when chart data is received.
			 *
			 * @param {*} response
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onReceivedChart(response)
			{
				if (response.success !== true)
					return;

				const canvas = this.$refs["chart"];
				const chart = this.chartData = response.data;
				const tooltipOptions = {
					tooltips: {
						callbacks: {
							label: this.onTooltipLabel.bind(this)
						}
					}
				};

				this.$emit("change", chart);

				if (this.instance === null)
				{
					this.chartOptions = chart.options = deepMerge({}, tooltipOptions, chart.options, this.options);
					this.instance = new Chart(canvas, chart);
				}
				else
				{
					chart.data.datasets.forEach((dataset, index) =>
					{
						if (typeof this.instance.data.datasets[index] !== "undefined")
						{
							let remove = (this.instance.data.datasets[index].data.length > dataset.data.length ? this.instance.data.datasets[index].data.length - dataset.data.length : 0);

							for (let i = 0; i < remove; i++)
								this.instance.data.datasets[index].data.pop();

							dataset.data.forEach((data, i) => this.instance.data.datasets[index].data[i] = data);
						}
						else
						{
							this.instance.data.datasets.push(dataset);
						}
					});

					this.instance.data.labels = chart.data.labels;
					this.instance.update();
				}

				this.is_loading = false;
			},

			/**
			 * Invoked tooltip labels are generated.
			 *
			 * @param {*} tooltip
			 * @param {*} data
			 *
			 * @returns {String}
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onTooltipLabel(tooltip, data)
			{
				if (!this.chartData)
					return "";

				const dataset = data.datasets[tooltip.datasetIndex];
				const value = dataset.data[tooltip.index];
				const valueFormatted = Intl !== undefined && Intl.NumberFormat !== undefined ? new Intl.NumberFormat(navigator.language)["format"](value) : value;

				switch (this.chartOptions.tooltips.transform || "default")
				{
					case "percentage":
						return `${dataset.label}: ${value}%`;

					default:
						return `${dataset.label}: ${valueFormatted}`;
				}
			}

		},

		watch: {

			/**
			 * Invoked when the url attribute has changed.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			url()
			{
				this.loadChart();
			}

		}

	});

	Vue.component("latte-chart-panel", {

		props: {

			url: {
				required: true,
				type: String
			}

		},

		template: `	<div class="panel">
						<div class="panel-header">
							<span class="panel-title">{{ name }}</span>
							<latte-button-dropdown class="ml-auto" icon="dots-vertical" type="list">
								<nav class="nav latte-nav-list">
									<a @click="$refs['chart'].loadChart()" class="nav-link"><i class="mdi mdi-refresh"></i> <span>Refresh chart</span></a>
								</nav>
							</latte-button-dropdown>
						</div>
						<latte-chart ref="chart" :url="url" @change="onChange"></latte-chart>
					</div>`,

		/**
		 * Provides the initial dataset for our Vue Component.
		 *
		 * @returns {*}
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				name: ""
			};
		},

		methods: {

			/**
			 * Invoked when chart data has changed.
			 *
			 * @param {*} data
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			onChange(data)
			{
				this.name = data.name;
			}

		}

	});

}
