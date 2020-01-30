<template>

	<div class="content page" id="tests">
		<div class="container">

			<div class="panel panel-blank overflow-hidden">
				<div class="panel-header">
					<span class="panel-title">App bar</span>
				</div>
				<div class="panel-body">

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
						<div class="col-12 col-lg-6">

							<div class="panel">
								<div class="panel-body">
									<div class="app-bar app-bar-primary">
										<div class="app-bar-row">
											<button class="btn btn-icon btn-text"><latte-icon>menu</latte-icon></button>
											<span class="app-bar-title">App bar</span>
										</div>
									</div>
									<div class="notice notice-info notice-fluid">
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
									<div class="notice notice-error notice-fluid">
										<latte-icon>alert-circle</latte-icon>
										<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
									</div>
								</div>
							</div>

						</div>
					</div>

				</div>
			</div>

			<div class="panel panel-blank overflow-hidden">
				<div class="panel-header">
					<span class="panel-title">Breadcrumb</span>
				</div>
				<div class="panel-body">

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
										<a class="nav-link is-active" ref="breadcrumbMenu">Webdevelopment <latte-icon>chevron-down</latte-icon></a>
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

				</div>
			</div>

			<div class="panel panel-blank overflow-hidden">
				<div class="panel-header">
					<span class="panel-title">Nav</span>
				</div>
				<div class="panel-body">

					<div class="row">
						<div class="col-12 col-lg-6">

							<div class="panel">
								<nav class="nav nav-list">
									<a class="nav-link"><span>Home</span></a>
									<a class="nav-link is-active"><span>Projects</span></a>
									<a class="nav-link"><span>Finance</span></a>
									<a class="nav-link"><span>Employees</span></a>
								</nav>
							</div>

						</div>
						<div class="col-12 col-lg-6">

							<div class="panel">
								<nav class="nav nav-list">
									<a class="nav-link"><latte-icon>home</latte-icon><span>Home</span></a>
									<a class="nav-link"><latte-icon>clipboard-text</latte-icon><span>Projects</span></a>
									<a class="nav-link is-active"><latte-icon>finance</latte-icon><span>Finance</span></a>
									<a class="nav-link"><latte-icon>account-group</latte-icon><span>Employees</span></a>
								</nav>
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
									<label class="nav-link"><span>Employees</span><input type="checkbox" class="toggle-button ml-auto" /></label>
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

				</div>
			</div>

		</div>
	</div>

</template>

<script>

	export default {

		name: "Tests"

	}

</script>
