<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="page" id="layout-color">

		<PageHeader>
			<h1>Color</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title m-0">Colors</h2></div>
						<div class="panel-body">
							<p>
								Latte-ui uses a minimal set of colors that you can override to whatever you want. Override them in
								the <code>:root</code> selector in CSS.
							</p>
						</div>
						<div class="notice notice-info">
							<i class="mdi mdi-information-outline"></i>
							<p>
								Note that colors are defined as individual rgb values. We've chosen this so that we can adjust alpha
								channels without defining milions of variables for everything.<br/>
								For example <span class="inline-code">rgba(12, 13, 14)</span> becomes <span class="inline-code">12, 13, 14</span>.
							</p>
						</div>
						<div class="panel-body">
							<CodeSnippet lang="css">
:root
{
	--color-primary: 52, 46, 97;
	--color-primary-foreground: 255, 255, 255;
}
							</CodeSnippet>
						</div>
					</div>



					<div class="panel">
						<div class="panel-header"><h2 class="panel-title m-0">Defaults</h2></div>
						<table class="table" style="margin: 0 6px">
							<thead>
							<tr>
								<th><div class="column-content"><strong>Variable</strong></div></th>
								<th style="width: 150px"><div class="column-content"><strong>Type</strong></div></th>
								<th><div class="column-content"><strong>Default value</strong></div></th>
							</tr>
							</thead>
							<tbody class="text-monospace" style="font-size: .8rem">
							<tr>
								<td><div class="column-content">--default-dark</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content"><RgbDisplay :rgb="[25, 26, 28]"></RgbDisplay></div></td>
							</tr>
							<tr>
								<td><div class="column-content">--default-light</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content"><RgbDisplay :rgb="[255, 255, 255]"></RgbDisplay></div></td>
							</tr>

							<tr>
								<td><div class="column-content">--color-primary</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content"><RgbDisplay :rgb="[55, 125, 255]"></RgbDisplay></div></td>
							</tr>
							<tr>
								<td><div class="column-content">--color-primary-foreground</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content">var(--default-light)</div></td>
							</tr>

							<tr>
								<td><div class="column-content">--color-error</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content"><RgbDisplay :rgb="[254, 50, 75]"></RgbDisplay></div></td>
							</tr>
							<tr>
								<td><div class="column-content">--color-error-foreground</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content">var(--default-light)</div></td>
							</tr>

							<tr>
								<td><div class="column-content">--color-info</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content"><RgbDisplay :rgb="[8, 122, 254]"></RgbDisplay></div></td>
							</tr>
							<tr>
								<td><div class="column-content">--color-info-foreground</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content">var(--default-light)</div></td>
							</tr>

							<tr>
								<td><div class="column-content">--color-success</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content"><RgbDisplay :rgb="[23, 195, 123]"></RgbDisplay></div></td>
							</tr>
							<tr>
								<td><div class="column-content">--color-success-foreground</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content">var(--default-light)</div></td>
							</tr>

							<tr>
								<td><div class="column-content">--color-warning</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content"><RgbDisplay :rgb="[254, 179, 53]"></RgbDisplay></div></td>
							</tr>
							<tr>
								<td><div class="column-content">--color-warning-foreground</div></td>
								<td><div class="column-content">RGB</div></td>
								<td><div class="column-content">var(--default-light)</div></td>
							</tr>
							</tbody>
						</table>
					</div>

				</div>
				<div class="col-12 col-lg-3">
					<TableOfContents></TableOfContents>
				</div>
			</div>
		</div>

	</div>

</template>

<script>

	import CodeSnippet from "../../../components/CodeSnippet";
	import PageHeader from "../../../components/PageHeader";
	import RgbDisplay from "../../../components/RgbDisplay";
	import TableOfContents from "../../../components/TableOfContents";

	export default {

		name: "Color",

		components: {
			CodeSnippet,
			PageHeader,
			RgbDisplay,
			TableOfContents
		}

	}

</script>

<style lang="scss" scoped>

	.inline-code
	{
		font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
		font-size: .8rem;
	}

</style>
