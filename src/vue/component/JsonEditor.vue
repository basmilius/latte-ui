<!--
  - Copyright (c) 2019 - Bas Milius <bas@mili.us>
  -
  - This file is part of the Latte UI package.
  -
  - For the full copyright and license information, please view the
  - LICENSE file that was distributed with this source code.
  -->

<template>

	<latte-json-editor-view :parsedData="parsedData" v-model="parsedData"></latte-json-editor-view>

</template>

<script>

	export default {

		name: "latte-json-editor",

		props: {

			json: {
				required: true
			}

		},

		created()
		{
			this.parsedData = this.jsonParse(this.json);
		},

		data()
		{
			return {
				parsedData: []
			};
		},

		methods: {

			getType(obj)
			{
				if (obj === null)
					return "null";

				switch (Object.prototype.toString.call(obj))
				{
					case "[object Array]":
						return "array";
					case "[object Object]":
						return "object";
					default:
						return typeof (obj);
				}
			},

			jsonParse(jsonString)
			{
				let parseJson = json =>
				{
					let result = [];
					let keys = Object.keys(json);

					keys.forEach(key =>
					{
						let val = json[key];
						let parsedVal = val;

						if (this.getType(val) === 'object')
						{
							parsedVal = parseJson(val);
						}
						else if (this.getType(val) === 'array')
						{
							parsedVal = parseArray(val);
						}

						let opt = {
							name: key,
							type: this.getType(val)
						};

						if (opt.type === 'array' || opt.type === 'object')
						{
							opt.childParams = parsedVal;
							opt.remark = null;
						}
						else
						{
							opt.childParams = null;
							opt.remark = parsedVal;
						}

						result.push(opt);
					});

					return result;
				};

				let parseArray = json =>
				{
					let result = [];

					for (let i = 0; i < json.length; ++i)
					{
						let val = json[i];
						let parsedVal = val;

						if (this.getType(val) === 'object')
						{
							parsedVal = parseJson(val);
						}
						else if (this.getType(val) === 'array')
						{
							parsedVal = parseArray(val);
						}

						let opt = {
							name: null,
							type: this.getType(val)
						};

						if (opt.type === 'array' || opt.type === 'object')
						{
							opt.childParams = parsedVal;
							opt.remark = null;
						}
						else
						{
							opt.childParams = null;
							opt.remark = parsedVal;
						}

						result.push(opt);
					}

					return result;
				};

				let parseBody = json =>
				{
					return parseJson(json);
				};

				return parseBody(jsonString);
			},

			makeJson(dataArray)
			{
				let revertWithObject = data =>
				{
					let r = {};

					for (let i = 0; i < data.length; ++i)
					{
						let el = data[i];
						let key = el.name, value;

						if (el.type === 'array')
						{
							value = revertWithArray(el.childParams);
						}
						else if (el.type === 'object')
						{
							value = revertWithObject(el.childParams);
						}
						else
						{
							value = el.remark;
						}

						r[key] = value;
					}

					return r;
				};

				let revertWithArray = data =>
				{
					let array = [];

					for (let i = 0; i < data.length; ++i)
					{
						let el = data[i];
						let r;

						if (el.type === 'array')
						{
							r = revertWithArray(el.childParams);
						}
						else if (el.type === 'object')
						{
							r = revertWithObject(el.childParams);
						}
						else
						{
							r = el.remark;
						}

						array.push(r);
					}

					return array;
				};

				return revertWithObject(dataArray);
			}

		},

		watch: {

			parsedData: {

				deep: true,

				handler()
				{
					this.$emit("input", this.makeJson(this.parsedData));
				}

			}

		}

	}

</script>
