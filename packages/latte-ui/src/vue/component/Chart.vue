<!--
  - Copyright (c) 2018-2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="latte-charts latte-charts-line" :class="{'is-loading':is_loading}">
		<span class="spinner spinner-primary"></span>
		<div class="latte-charts-title" v-if="title !== null">{{ titleTransformed }}</div>
		<div class="latte-charts-chart">
			<canvas ref="chart"></canvas>
		</div>
	</div>

</template>

<script>

	import { dispatch } from "../../js/core/action";
	import { request } from "../../js/core/api";
	import { deepMerge } from "../../js/util/object";
	import { createElement } from "../../js/util/dom";

	export default {

		name: "latte-chart",

		props: {
			options: {default: () => ({}), type: Object},
			title: {default: null, type: String | null},
			url: {required: true, type: String}
		},

		data()
		{
			return {
				instance: null,
				is_loading: true,
				chartData: {},
				chartOptions: {}
			};
		},

		beforeCreate()
		{
			if (typeof self.Chart === "undefined")
				throw new Error("[LatteUI] <latte-chart> You must include chart.js on your page in order to use charts.")
		},

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
					return new Function(`return new Intl.NumberFormat(navigator.language).format(this.${contents});`).call(this);
				});
			}

		},

		methods: {

			loadChart()
			{
				this.is_loading = true;

				request(this.url)
					.then(r => r.json())
					.then(r => this.onReceivedChart(r));
			},

			onReceivedChart(response)
			{
				if (response.success !== true)
					return;

				const canvas = this.$refs.chart;
				const chart = this.chartData = response.data;
				const tooltipOptions = {
					tooltips: {
						enabled: false,
						custom: model =>
						{
							if (model.opacity === 0)
							{
								dispatch("latte:tooltip:hide");
							}
							else
							{
								function genDataRow(line, colors)
								{
									return createElement("tr", tr =>
									{
										tr.appendChild(createElement("td", td =>
										{
											td.appendChild(createElement("div", div =>
											{
												div.classList.add("column-content", "pr-0");
												div.innerHTML = `<i class="mdi mdi-color" style="height: 18px; width: 18px; border-radius: 12px; background: ${colors.backgroundColor};"></i>`;
											}));
										}));

										tr.appendChild(createElement("td", td =>
										{
											td.appendChild(createElement("div", div =>
											{
												div.classList.add("column-content");
												div.innerHTML = line;
											}));
										}));
									});
								}

								function genTitleRow(title)
								{
									return createElement("tr", tr => tr.appendChild(createElement("th", th =>
									{
										th.setAttribute("colspan", 2);
										th.appendChild(createElement("div", div =>
										{
											div.classList.add("column-content", "font-weight-bold");
											div.innerText = title;
										}));
									})));
								}

								const rect = canvas.getBoundingClientRect();
								const table = createElement("table", table =>
								{
									table.classList.add("table", "table-compact");
									table.style.setProperty("--outline-color-secondary", "255, 255, 255");

									table.appendChild(createElement("thead", thead =>
									{
										model.title.forEach(title => thead.appendChild(genTitleRow(title)));
									}));

									table.appendChild(createElement("tbody", tbody =>
									{
										model.body.map(l => l.lines).forEach((line, i) => tbody.appendChild(genDataRow(line, model.labelColors[i])));
									}));

								});

								dispatch("latte:tooltip", {
									x: Math.floor(rect.left + model.caretX),
									y: Math.floor(rect.top + model.caretY),
									classes: ["p-0"],
									content: table,
									position: "vertical"
								});
							}
						},
						callbacks: {
							label: this.onTooltipLabel.bind(this)
						}
					}
				};

				this.$emit("change", chart);

				if (this.instance === null)
				{
					this.chartOptions = chart.options = deepMerge({}, tooltipOptions, chart.options, this.options);
					this.instance = new self.Chart(canvas, chart);
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

			onTooltipLabel(tooltip, data)
			{
				if (!this.chartData)
					return "";

				const dataset = data.datasets[tooltip.datasetIndex];
				const value = dataset.data[tooltip.index];
				const valueFormatted = Intl !== undefined && Intl.NumberFormat !== undefined ? new Intl.NumberFormat(navigator.language)["format"](value) : value;

				if ((this.chartOptions.tooltips.transform || "default") === "percentage")
					return `${dataset.label}: ${value}%`;
				else
					return `${dataset.label}: ${valueFormatted}`;
			}

		},

		watch: {

			url()
			{
				this.loadChart();
			}

		}

	}

</script>
