<template>

	<div class="latte-charts latte-charts-line" :class="{'is-loading':is_loading}">
		<span class="spinner spinner-primary"></span>
		<div class="latte-charts-title" v-if="title !== null">{{ titleTransformed }}</div>
		<div class="latte-charts-chart" style="height:calc(100% - 75px)">
			<canvas ref="chart"></canvas>
		</div>
	</div>

</template>

<script>

	import { request } from "../../js/api";
	import { deepMerge } from "../../js/core";

	export default {

		name: "latte-chart",

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

		data()
		{
			return {
				instance: null,
				is_loading: true,
				chartData: {},
				chartOptions: {}
			};
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

			url()
			{
				this.loadChart();
			}

		}

	}

</script>
