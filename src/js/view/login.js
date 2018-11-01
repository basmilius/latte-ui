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

/**
 * Creates the login view.
 *
 * @returns {*}
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createView()
{
	Vue.component("latte-view-login", {

		props: {

			redirect: {
				default: "/admin",
				requireed: false,
				typ: String
			}

		},

		/**
		 * Provides the dataset for our Vue Component.
		 *
		 * @returns {*}
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
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

		/**
		 * Invoked when our Vue Component is mounted.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
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

			/**
			 * Invoked on a fatal error.
			 *
			 * @param {Error} err
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
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

			/**
			 * Invoked when a login response is received.
			 *
			 * @param {*} response
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
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

			/**
			 * Invoked when the submit button is clicked.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
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

	});
}
