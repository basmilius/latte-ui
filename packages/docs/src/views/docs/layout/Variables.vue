<template>

	<div class="page" id="layout-variables">

		<PageHeader>
			<h1>Variables</h1>
		</PageHeader>

		<div class="container">
			<div class="row">
				<div class="col-12 col-lg-9 mb-panel-gutter">

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title m-0">Introduction</h2></div>
						<div class="panel-body">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab amet animi aperiam aspernatur aut beatae eius fugit illo illum ipsam iusto labore laboriosam minus modi officiis pariatur qui repellendus, voluptatem.
						</div>
					</div>

					<div class="panel">
						<div class="panel-header border-bottom-0"><h2 class="panel-title m-0">Colors</h2></div>
						<div class="notice notice-info">
							<i class="mdi mdi-information-outline"></i>
							<p>Colors are defined as individual rgb values.</p>
						</div>
						<table class="table">
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

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title m-0">Dimensions</h2></div>
						<div class="panel-body">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis consequatur esse fugiat impedit minus, natus officiis quibusdam recusandae reprehenderit. Aliquid corporis dignissimos incidunt, inventore minus molestiae officia omnis quod.
						</div>
					</div>

					<div class="panel">
						<div class="panel-header"><h2 class="panel-title m-0">Typography</h2></div>
						<div class="panel-body">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus blanditiis consequatur esse fugiat impedit minus, natus officiis quibusdam recusandae reprehenderit. Aliquid corporis dignissimos incidunt, inventore minus molestiae officia omnis quod.
						</div>
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

	import PageHeader from "../../../components/PageHeader";
	import TableOfContents from "../../../components/TableOfContents";
	import RgbDisplay from "../../../components/RgbDisplay";

	export default {

		name: "Variables",

		components: {
			PageHeader,
			RgbDisplay,
			TableOfContents
		}
	}

</script>
