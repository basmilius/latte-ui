<!--
  - Copyright © 2018 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<script>

	import { request } from "../../js/api";

	export default {

		name: "latte-view-login",

		props: {

			redirect: {
				default: "/admin",
				requireed: false,
				typ: String
			}

		},

		data()
		{
			return {
				error: null,
				field: {
					email: "",
					password: ""
				},
				isLoading: false
			};
		},

		mounted()
		{
			try
			{
				if (!("credentials" in navigator))
					return;

				navigator.credentials.get({mediation: "required", password: true}).then(credentials =>
				{
					this.isLoading = false;

					if (credentials === null)
						return;

					this.field.email = credentials.id;
					this.field.password = credentials.password;
					this.submit();
				});
			}
			catch (err)
			{
				console.error(err);
			}
		},

		methods: {

			onLoginError(err)
			{
				console.error("ERROR", err);

				this.error = {
					code: 0,
					message: "Fatal system error, see devtools for more information.",
					type: "error"
				};

				this.isLoading = false;
			},

			onLoginResponse(response)
			{
				if (response.data && response.data.login && response.data.login === 'ok')
				{
					if ("credentials" in navigator)
					{
						const options = {
							id: this.field.email,
							password: this.field.password,
							name: response.data.user.name
						};

						if (response.data.user.photo !== null)
							options.iconURL = response.data.user.photo.thumb_512;

						navigator.credentials.create({password: options})
							.then(credentials =>
							{
								navigator.credentials.store(credentials)
									.then(() => window.location = this.redirect)
									.catch(err => console.error(err));
							})
							.catch(err =>
							{
								console.error(err);
								window.location = this.redirect;
							});

						return;
					}

					window.location = this.redirect;
					return;
				}

				this.error = response.error;
				this.isLoading = false;
			},

			submit()
			{
				if (this.isLoading)
					return;

				this.isLoading = true;

				let json = JSON.stringify({email: this.field.email, password: this.field.password});

				request('/api/latte/login', {body: json, method: "POST"})
					.then(r => r.json())
					.then(r => this.onLoginResponse(r))
					.catch(err => this.onLoginError(err));
			}

		}

	}

</script>
