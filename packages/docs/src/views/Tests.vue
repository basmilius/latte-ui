<!--
  - Copyright (c) 2018-2020 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<div class="content page" id="tests">
		<div class="container">

			<TestCase title="App bar">
				<div class="row">
					<div class="col-12 col-lg-6">

						<div class="panel">
							<div class="panel-body">
								<div class="app-bar app-bar-primary">
									<div class="app-bar-row">
										<button class="btn btn-icon btn-text"><latte-icon>menu</latte-icon></button>
										<span class="app-bar-title">App bar</span>
									</div>
								</div>
							</div>
						</div>

					</div>
					<div class="col-12 col-lg-6">

						<div class="panel">
							<div class="panel-body">
								<div class="app-bar app-bar-primary">
									<div class="app-bar-row">
										<button class="btn btn-icon btn-text"><latte-icon>menu</latte-icon></button>
										<span class="app-bar-title">App bar</span>
										<button class="btn btn-icon btn-text ml-auto"><latte-icon>dots-vertical</latte-icon></button>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div class="row mt-panel-gutter">
					<div class="col-12">

						<div class="panel">
							<div class="panel-body">
								<div class="app-bar app-bar-primary">
									<div class="app-bar-row">
										<img class="mr-3" src="/image/bas.svg" alt="Bas' logo" height="36"/>
										<button class="btn btn-text is-hover"><span>Home</span></button>
										<button class="btn btn-text"><span>About</span></button>
										<button class="btn btn-text"><span>Projects</span></button>
										<button class="btn btn-text"><span>Contact</span></button>
										<button class="btn btn-icon btn-text ml-auto"><latte-icon>dots-vertical</latte-icon></button>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div class="row mt-panel-gutter">
					<div class="col-12 col-lg-6">

						<div class="panel">
							<div class="panel-body">
								<div class="app-bar app-bar-primary">
									<div class="app-bar-row">
										<button class="btn btn-icon btn-text"><latte-icon>menu</latte-icon></button>
										<span class="app-bar-title">App bar</span>
									</div>
								</div>
								<div class="notice notice-info is-fluid">
									<latte-icon>information</latte-icon>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
								</div>
							</div>
						</div>

					</div>
					<div class="col-12 col-lg-6">

						<div class="panel">
							<div class="panel-body">
								<div class="app-bar app-bar-primary">
									<div class="app-bar-row">
										<button class="btn btn-icon btn-text"><latte-icon>menu</latte-icon></button>
										<span class="app-bar-title">App bar</span>
										<button class="btn btn-icon btn-text ml-auto"><latte-icon>dots-vertical</latte-icon></button>
									</div>
								</div>
								<div class="notice notice-error is-fluid">
									<latte-icon>alert-circle</latte-icon>
									<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
								</div>
							</div>
						</div>

					</div>
				</div>
			</TestCase>

			<TestCase title="Badge">
				<div class="row">
					<div class="col-12 col-lg-6">

						<div class="panel">
							<div class="panel-body">
								<div class="badge-group">
									<span class="badge"><span>Badge</span></span>
									<span class="badge"><span class="spinner"></span><span>Badge</span></span>
									<span class="badge"><span>Badge</span><button class="close" aria-label="Remove this badge"></button></span>
									<span class="badge"><span>Badge</span><latte-icon>information</latte-icon></span>
								</div>
							</div>
						</div>

						<div class="panel">
							<div class="panel-body">
								<div class="badge-group">
									<span class="badge"><span>Badge</span></span>
									<span class="badge"><span>Badge</span><span class="spinner"></span></span>
									<span class="badge"><button class="close" aria-label="Remove this badge"></button><span>Badge</span></span>
									<span class="badge"><latte-icon>information</latte-icon><span>Badge</span></span>
								</div>
							</div>
						</div>

					</div>
					<div class="col-12 col-lg-6">

						<div class="panel">
							<div class="panel-body">
								<div class="badge-group">
									<span class="badge badge-info"><span>Badge</span></span>
									<span class="badge badge-error"><span class="spinner"></span><span>Badge</span></span>
									<span class="badge badge-warning"><span>Badge</span><button class="close" aria-label="Remove this badge"></button></span>
									<span class="badge badge-success"><span>Badge</span><latte-icon>information</latte-icon></span>
								</div>
							</div>
						</div>

						<div class="panel">
							<div class="panel-body">
								<div class="badge-group">
									<span class="badge badge-info"><span>Badge</span></span>
									<span class="badge badge-error"><span>Badge</span><span class="spinner"></span></span>
									<span class="badge badge-warning"><button class="close" aria-label="Remove this badge"></button><span>Badge</span></span>
									<span class="badge badge-success"><latte-icon>information</latte-icon><span>Badge</span></span>
								</div>
							</div>
						</div>

					</div>
				</div>

				<div class="row mt-panel-gutter">
					<div class="col-12">

						<div class="panel">
							<div class="panel-body">
								<div class="badge-group">
									<span class="badge is-small">Badge</span>
									<span class="badge">Badge</span>
									<span class="badge is-large">Badge</span>
									<span class="badge is-huge">Badge</span>
								</div>
								<div class="badge-group">
									<span class="badge is-small"><span>Badge</span><span class="spinner"></span></span>
									<span class="badge"><span>Badge</span><span class="spinner"></span></span>
									<span class="badge is-large"><span>Badge</span><span class="spinner"></span></span>
									<span class="badge is-huge"><span>Badge</span><span class="spinner"></span></span>
								</div>
								<div class="badge-group">
									<span class="badge is-small"><span>Badge</span><button class="close"></button></span>
									<span class="badge"><span>Badge</span><button class="close"></button></span>
									<span class="badge is-large"><span>Badge</span><button class="close"></button></span>
									<span class="badge is-huge"><span>Badge</span><button class="close"></button></span>
								</div>
								<div class="badge-group">
									<span class="badge is-small"><span>Badge</span><latte-icon>information</latte-icon></span>
									<span class="badge"><span>Badge</span><latte-icon>information</latte-icon></span>
									<span class="badge is-large"><span>Badge</span><latte-icon>information</latte-icon></span>
									<span class="badge is-huge"><span>Badge</span><latte-icon>information</latte-icon></span>
								</div>
							</div>
						</div>

					</div>
				</div>
			</TestCase>

			<TestCase title="Breadcrumb">
				<div class="row">
					<div class="col-12 col-lg-6">

						<div class="panel">
							<div class="panel-body">
								<nav class="nav nav-breadcrumb">
									<a class="nav-link">Some school</a>
									<a class="nav-link">Learning</a>
									<span class="nav-link is-active">Webdevelopment</span>
								</nav>
							</div>
						</div>

					</div>
					<div class="col-12 col-lg-6">

						<div class="panel">
							<div class="panel-body">
								<nav class="nav nav-breadcrumb">
									<a class="nav-link">Some school</a>
									<a class="nav-link">Learning</a>
									<a class="nav-link is-active" ref="breadcrumbMenu">Webdevelopment<latte-icon>chevron-down</latte-icon></a>
									<latte-popup :associate-with="$refs.breadcrumbMenu" :margin-x="-15" :margin-y="6">
										<nav class="nav nav-list">
											<a class="nav-link"><latte-icon>cellphone-android</latte-icon><span>App development</span></a>
											<a class="nav-link"><latte-icon>code-tags</latte-icon><span>Web development</span></a>
										</nav>
									</latte-popup>
								</nav>
							</div>
						</div>

					</div>
				</div>
			</TestCase>

			<TestCase title="Button">
				<div class="row">
					<div class="col-12">

						<div class="panel">
							<div class="panel-body">
								<button class="btn btn-contained btn-primary"><span>Button</span></button>
								<button class="btn btn-contained btn-primary ml-2"><latte-icon>check-circle</latte-icon><span>Button</span></button>
								<button class="btn btn-contained btn-primary ml-2"><span>Button</span><latte-icon>check-circle</latte-icon></button>
								<button class="btn btn-contained btn-primary ml-2"><span class="spinner"></span><span>Button</span></button>
								<button class="btn btn-contained btn-primary ml-2"><span class="text-uppercase">Button</span></button>
							</div>
						</div>

						<div class="panel">
							<div class="panel-body">
								<button class="btn btn-outline btn-primary"><span>Button</span></button>
								<button class="btn btn-outline btn-primary ml-2"><latte-icon>check-circle</latte-icon><span>Button</span></button>
								<button class="btn btn-outline btn-primary ml-2"><span>Button</span><latte-icon>check-circle</latte-icon></button>
								<button class="btn btn-outline btn-primary ml-2"><span class="spinner"></span><span>Button</span></button>
								<button class="btn btn-outline btn-primary ml-2"><span class="text-uppercase">Button</span></button>
							</div>
						</div>

						<div class="panel">
							<div class="panel-body">
								<button class="btn btn-text btn-primary"><span>Button</span></button>
								<button class="btn btn-text btn-primary ml-2"><latte-icon>check-circle</latte-icon><span>Button</span></button>
								<button class="btn btn-text btn-primary ml-2"><span>Button</span><latte-icon>check-circle</latte-icon></button>
								<button class="btn btn-text btn-primary ml-2"><span class="spinner"></span><span>Button</span></button>
								<button class="btn btn-text btn-primary ml-2"><span class="text-uppercase">Button</span></button>
							</div>
						</div>

						<div class="panel">
							<div class="panel-body">
								<button class="btn btn-contained btn-primary is-small"><latte-icon>check-circle</latte-icon><span>Button</span></button>
								<button class="btn btn-contained btn-primary is-medium ml-2"><latte-icon>check-circle</latte-icon><span>Button</span></button>
								<button class="btn btn-contained btn-primary is-large ml-2"><latte-icon>check-circle</latte-icon><span>Button</span></button>
								<button class="btn btn-contained btn-primary is-huge ml-2"><latte-icon>check-circle</latte-icon><span>Button</span></button>
							</div>
						</div>

						<div class="panel">
							<div class="panel-body">
								<button class="btn btn-contained btn-primary is-fluid is-large"><latte-icon>check-circle</latte-icon><span>Button</span></button>
								<button class="btn btn-contained btn-primary is-fluid is-large mt-2"><latte-icon>check-circle</latte-icon><span>Button</span></button>
							</div>
						</div>

						<div class="panel">
							<div class="panel-body">
								<button class="btn btn-text btn-action btn-primary"><latte-icon>check-circle</latte-icon><span>Button</span></button>
								<button class="btn btn-text btn-action btn-primary ml-2"><latte-icon>check-circle</latte-icon><span>Button</span></button>
								<button class="btn btn-text btn-action btn-primary ml-2"><latte-icon>check-circle</latte-icon><span>Button</span></button>
								<button class="btn btn-text btn-action btn-primary ml-2"><latte-icon>check-circle</latte-icon><span>Button</span></button>
							</div>
						</div>

					</div>
				</div>

				<div class="row mt-panel-gutter">
					<div class="col-12 col-lg-6">

						<div class="panel">
							<div class="panel-body">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, animi atque consectetur cum deleniti dolor, dolores eveniet illo, illum ipsa modi officia optio quam quia quisquam quos saepe soluta temporibus.
							</div>
							<button class="btn btn-contained btn-primary is-fluid is-huge"><span>Button</span></button>
						</div>

					</div>
					<div class="col-12 col-lg-6">

						<div class="panel">
							<div class="panel-body">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, animi atque consectetur cum deleniti dolor, dolores eveniet illo, illum ipsa modi officia optio quam quia quisquam quos saepe soluta temporibus.
							</div>
							<div class="btn-group">
								<button class="btn btn-contained btn-primary is-fluid is-huge"><span>Button</span></button>
								<button class="btn btn-contained btn-primary is-fluid is-huge"><span>Button</span></button>
							</div>
						</div>

					</div>
				</div>
			</TestCase>

			<TestCase title="Nav">
				<div class="row">
					<div class="col-12 col-lg-6">

						<div class="panel">
							<latte-focus-zone is-cycle is-vertical>
								<nav class="nav nav-list">
									<a class="nav-link" tabindex="0"><span>Home</span></a>
									<a class="nav-link" tabindex="-1"><span>Projects</span></a>
									<a class="nav-link" tabindex="-1"><span>Finance</span></a>
									<a class="nav-link" tabindex="-1"><span>Employees</span></a>
								</nav>
							</latte-focus-zone>
						</div>

					</div>
					<div class="col-12 col-lg-6">

						<div class="panel">
							<latte-focus-zone is-cycle is-vertical>
								<nav class="nav nav-list">
									<a class="nav-link" tabindex="0"><latte-icon>home</latte-icon><span>Home</span></a>
									<a class="nav-link" tabindex="-1"><latte-icon>clipboard-text</latte-icon><span>Projects</span></a>
									<a class="nav-link" tabindex="-1"><latte-icon>finance</latte-icon><span>Finance</span></a>
									<a class="nav-link" tabindex="-1"><latte-icon>account-group</latte-icon><span>Employees</span></a>
								</nav>
							</latte-focus-zone>
						</div>

					</div>
				</div>

				<div class="row mt-panel-gutter">
					<div class="col-12 col-lg-6">

						<div class="panel">
							<nav class="nav nav-list">
								<a class="nav-link"><span>Home</span></a>
								<a class="nav-link"><span>Projects</span><span class="badge ml-auto">10</span></a>
								<a class="nav-link"><span>Finance</span><span class="spinner ml-auto"></span></a>
								<label class="nav-link"><span>Employees</span><input type="checkbox" class="toggle-button ml-auto"/></label>
							</nav>
						</div>

					</div>
					<div class="col-12 col-lg-6">

						<div class="panel">
							<nav class="nav nav-list">
								<a class="nav-link"><latte-icon>home</latte-icon><span>Home</span><latte-icon class="ml-auto">chevron-right</latte-icon></a>
								<a class="nav-link"><latte-icon>clipboard-text</latte-icon><span>Projects</span><latte-icon class="ml-auto">chevron-right</latte-icon></a>
								<a class="nav-link"><latte-icon>finance</latte-icon><span>Finance</span><latte-icon class="ml-auto">chevron-right</latte-icon></a>
								<a class="nav-link"><latte-icon>account-group</latte-icon><span>Employees</span><latte-icon class="ml-auto">chevron-right</latte-icon></a>
							</nav>
						</div>

					</div>
				</div>

				<div class="row mt-panel-gutter">
					<div class="col-12 col-lg-6">

						<div class="panel">
							<nav class="nav nav-list">
								<a class="nav-link">
									<div class="d-flex flex-column">
										<strong>Home</strong>
										<span>Is where the heart lives</span>
									</div>
									<latte-icon class="ml-auto">chevron-right</latte-icon>
								</a>
								<a class="nav-link">
									<div class="d-flex flex-column">
										<strong>Projects</strong>
										<span>Everything that we're working on</span>
									</div>
									<latte-icon class="ml-auto">chevron-right</latte-icon>
								</a>
								<a class="nav-link">
									<div class="d-flex flex-column">
										<strong>Finance</strong>
										<span>How much money do we take from our customers</span>
									</div>
									<latte-icon class="ml-auto">chevron-right</latte-icon>
								</a>
								<a class="nav-link is-active">
									<div class="d-flex flex-column">
										<strong>Employees</strong>
										<span>All our slaves, in one big list</span>
									</div>
									<latte-icon class="ml-auto">chevron-right</latte-icon>
								</a>
							</nav>
						</div>

					</div>
					<div class="col-12 col-lg-6">
						<div class="panel">
							<nav class="nav nav-list">
								<a class="nav-link is-active">
									<latte-icon>home</latte-icon>
									<div class="d-flex flex-column">
										<strong>Home</strong>
										<span>Is where the heart lives</span>
									</div>
								</a>
								<a class="nav-link">
									<latte-icon>clipboard-text</latte-icon>
									<div class="d-flex flex-column">
										<strong>Projects</strong>
										<span>Everything that we're working on</span>
									</div>
								</a>
								<a class="nav-link">
									<latte-icon>finance</latte-icon>
									<div class="d-flex flex-column">
										<strong>Finance</strong>
										<span>How much money do we take from our customers</span>
									</div>
								</a>
								<a class="nav-link">
									<latte-icon>account-group</latte-icon>
									<div class="d-flex flex-column">
										<strong>Employees</strong>
										<span>All our slaves, in one big list</span>
									</div>
								</a>
							</nav>
						</div>
					</div>
				</div>
			</TestCase>

			<TestCase title="Tab">
				<div class="row">
					<div class="col-12 col-lg-6">

						<div class="panel">
							<latte-tab-container class="panel-body" role="tabpanel">

								<latte-focus-zone is-horizontal>
									<latte-tab-bar class="mb-3"></latte-tab-bar>
								</latte-focus-zone>

								<latte-tab label="My files">
									My files
								</latte-tab>

								<latte-tab label="Recent">
									Recent
								</latte-tab>

								<latte-tab label="Shared with me">
									Shared with me
								</latte-tab>

							</latte-tab-container>
						</div>

					</div>
					<div class="col-12 col-lg-6"></div>
				</div>
			</TestCase>

		</div>
	</div>

</template>

<script>

	import TestCase from "../components/TestCase";

	export default {

		name: "Tests",

		refs: ["breadcrumbMenu"],

		components: {TestCase}

	}

</script>
