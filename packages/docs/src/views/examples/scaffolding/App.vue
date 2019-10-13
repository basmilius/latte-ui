<template>

	<main class="master-detail scaffolding">
		<latte-sheet position="left" ref="drawer">
			<div class="d-flex align-items-stretch flex-grow-1 h-100">
				<div class="bottom-nav bottom-nav-side bottom-nav-dark bottom-nav-flat justify-content-start h-100 overflow-auto">
					<latte-ripple as="a" class="btn btn-action is-branding"><i class="mdi branding"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Home" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-home"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action is-active" data-tooltip="Relaties" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-account-group"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Contacten" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-phone"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Projecten" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-clipboard-text"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Financieel" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-finance"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Inloggegevens" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-lock"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Hosting" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-cloud"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Screw Up Service" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-nuke"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action mt-auto" data-tooltip="Instellingen" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-settings"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Home" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-home"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action is-active" data-tooltip="Relaties" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-account-group"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Contacten" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-phone"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Projecten" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-clipboard-text"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Financieel" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-finance"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Inloggegevens" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-lock"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Hosting" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-cloud"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action" data-tooltip="Screw Up Service" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-nuke"></i></latte-ripple>
					<latte-ripple as="a" class="btn btn-action mt-auto" data-tooltip="Instellingen" data-tooltip-class="tooltip-right tooltip-primary"><i class="mdi mdi-settings"></i></latte-ripple>
				</div>
				<nav class="nav nav-list pt-0 flex-grow-1 h-100 overflow-auto">
					<div class="app-bar app-bar-main app-bar-light mb-3">
						<div class="app-bar-row">
							<span class="app-bar-title">Mijn projecten</span>
						</div>
					</div>
					<latte-ripple as="a" class="nav-link" :key="i" v-for="i of [1, 2, 3]" :class="{'is-active': i === 3}">Nav item {{ i }}</latte-ripple>
					<div class="divider divider-horizontal"></div>
					<latte-ripple as="a" class="nav-link" :key="i + 3" v-for="i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]">Nav item {{ i }}</latte-ripple>
				</nav>
			</div>
		</latte-sheet>

		<div class="app-bar app-bar-main app-bar-light">
			<div class="app-bar-row">
				<button class="btn btn-icon btn-text d-lg-none" @click="$refs.drawer.toggle()"><i class="mdi mdi-menu"></i></button>
				<span class="app-bar-title d-lg-none">Latte UI</span>
				<button class="btn btn-icon btn-text ml-auto"><i class="mdi mdi-dots-horizontal"></i></button>
			</div>
		</div>

		<button class="btn btn-fab btn-contained btn-success"><i class="mdi mdi-plus"></i></button>

		<div class="content">
			<div class="row no-gutters">
				<div class="col-12 col-lg order-lg-1">

					<div class="panel" id="detail">
						<div class="panel-header"><span class="panel-title">Hi</span></div>
						<div class="panel-body">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum dolore iure officia pariatur, quasi rem repellat sit! At consequuntur culpa eius esse eveniet maiores repellendus veniam! Minus quae quod rem!
						</div>
					</div>

				</div>
				<div class="col-12 col-lg-auto order-lg-0" style="width: 480px">

					<div class="panel" id="master">
						<div class="panel-header"><span class="panel-title">Hi</span></div>
						<div class="panel-body">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquam aliquid architecto blanditiis dolore labore, molestiae necessitatibus nesciunt odio perferendis sapiente sit sunt, tenetur. Explicabo laudantium magni nulla qui sequi.
						</div>
					</div>

				</div>
			</div>
		</div>
	</main>

</template>

<script>

	export default {

		name: "App.vue"

	}

</script>

<style lang="scss" scoped>

	.scaffolding
	{
		--scaffolding-drawer-width: 300px
	}

	.bottom-nav
	{
		.btn-action
		{
			height: 72px;

			&.is-branding
			{
				--icon-size: 42px;

				margin-bottom: 3px;
				height: 60px;
				opacity: 1;
			}

			&.is-active
			{
				--bottom-nav-foreground: var(--color-primary-foreground);
				--radius: unset;

				z-index: 0;

				&::before
				{
					position: absolute;
					display: block;
					top: 6px;
					left: 6px;
					right: 6px;
					bottom: 6px;
					content: "";
					background: rgba(var(--color-primary), 1);
					border-radius: var(--radius);
					z-index: -1;
				}
			}
		}
	}

</style>
