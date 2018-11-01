/*
 * Copyright © 2018 - Bas Milius <bas@mili.us>
 *
 * This file is part of the Latte Framework package.
 *
 * For the full copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

"use strict";

/**
 * Creates the latte-json-editor, latte-json-editor-view, latte-json-editor-view-array and latte-json-editor-iaf components.
 *
 * @author Bas Milius <bas@mili.us>
 * @since 1.0.0
 */
export function createComponent()
{

	/**
	 * Removes an element from an array by index.
	 *
	 * @param index Int
	 *
	 * @author Bas Milius <bas@mili.us>
	 * @since 1.0.0
	 */
	Array.prototype.jsonEditorRemoveIndex = function (index)
	{
		this.splice(index, 1);

		return this;
	};

	Vue.component("latte-json-editor-iaf", {

		props: {

			needName: {
				default: true
			}

		},

		template: `	<div class="json-editor json-editor-iaf">
						<input class="form-control" id="iaf-key" type="text" v-model="keyName" placeholder="Key" v-if="needName" />
						<select class="custom-select ml-3" id="iaf-type" v-model="formatSelected">
							<option :value="item" v-for="(item, index) in formats" :key="item">{{ item }}</option>
						</select>
						<template v-if="formatSelected !== 'array' && formatSelected !== 'object' && formatSelected !== 'null'">
							<input class="form-control ml-3" :id="'iaf-value'" type="text" v-model="valueName" placeholder="Value" v-if="formatSelected === 'string'" />
							<input class="form-control ml-3" :id="'iaf-value'" type="number" v-model="valueName" placeholder="Value" v-if="formatSelected === 'number'" @change="dealNumber" />
							<select v-model="valueName" class="custom-select ml-3" :id="'iaf-value'" v-if="formatSelected === 'boolean'" @change="dealBoolean">
								<option value="true" selected>TRUE</option>
								<option value="true">FALSE</option>
							</select>
						</template>
						<button class="btn btn-primary ml-3" @click="confirm"><i class="mdi mdi-check-circle"></i></button>
						<button class="btn btn-light ml-1" @click="cancel"><i class="mdi mdi-close-circle"></i></button>
					</div>`,

		/**
		 * Returns the initial data for our Vue Component.
		 *
		 * @returns {*}
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				formats: ["string", "array", "object", "number", "boolean", "null"],
				formatSelected: "string",
				keyName: "",
				valueName: ""
			};
		},

		methods: {

			/**
			 * Confirms inserting.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			confirm()
			{
				let value = null;

				if (this.formatSelected === "array")
					value = [];
				else if (this.formatSelected === "null")
					value = null;
				else if (this.formatSelected === "object")
					value = [];
				else
					value = this.valueName;

				let objectData = {
					key: this.needName ? this.keyName : null,
					value: value,
					type: this.formatSelected
				};

				this.$emit("confirm", objectData);

				this.keyName = "";
				this.valueName = "";
				this.formatSelected = "string";
			},

			/**
			 * Cancels inserting.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			cancel()
			{
				this.$emit("cancel");
			},

			/**
			 * Deals with a boolean.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			dealBoolean()
			{
				this.valueName = Boolean(this.valueName);
			},

			/**
			 * Deals with a number.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			dealNumber()
			{
				this.valueName = Number(this.valueName);
			}

		}

	});

	Vue.component("latte-json-editor-view-array", {

		props: {

			parsedData: {
				required: true
			}

		},

		template: `	<div class="json-editor json-editor-view array">
						<div class="json-editor json-editor-block" v-for="(item, index) in flowData" :key="index" :class="[item.type, {'hide-block': hideMyBlock[index]}]">
							<div class="key">
								<button class="btn btn-light toggle" v-if="item.type === 'object' || item.type === 'array'" @click="toggleBlock(index)"><i :class="['mdi', {'mdi-chevron-down': !hideMyBlock[index]}, {'mdi-chevron-right': hideMyBlock[index]}]"></i></button>
								<span class="key">{{ index }}</span>
								<span class="json-editor json-editor-o" v-if="item.type === 'array'">{{ "[" + item.childParams.length + "]" }}</span>
								<span class="json-editor json-editor-o" v-if="item.type === 'object'">{{ "{" + (item.childParams.length || 0) + "}" }}</span>
								<button class="btn btn-light trash" @click="deleteItem(parsedData, item, index)" v-if="item.type === 'object' || item.type === 'array'"><i class="mdi mdi-delete"></i></button>
							</div>
							<div class="value">
								<template v-if="item.type === 'object'">
									<latte-json-editor-view :parsedData="item.childParams" v-model="item.childParams"></latte-json-editor-view>
								</template>
								<template v-else-if="item.type === 'array'">
									<latte-json-editor-view-array :parsedData="item.childParams" v-model="item.childParams"></latte-json-editor-view-array>
								</template>
								<template v-else>
									<input type="text" v-model="item.remark" class="form-control" v-if="item.type == 'string'">
									<input type="number" v-model.number="item.remark" class="form-control" v-if="item.type == 'number'">
									<select name="value" v-model="item.remark" class="custom-select" v-if="item.type == 'boolean'">
										<option :value="true">TRUE</option>
										<option :value="false">FALSE</option>
									</select>
									<button class="btn btn-light trash" @click="deleteItem(parsedData, item, index)"><i class="mdi mdi-delete"></i></button>
								</template>
							</div>
						</div>
						<latte-json-editor-iaf v-if="isAddingItem" :needName="false" @confirm="newItem" @cancel="cancelNewItem"></latte-json-editor-iaf>
						<button class="btn btn-light" @click="addItem" v-if="!isAddingItem"><i class="mdi mdi-plus-circle"></i></button>
					</div>`,

		/**
		 * Returns the initial data for our Vue Component.
		 *
		 * @returns {*}
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				hideMyBlock: {},
				flowData: this.parsedData,
				isAddingItem: false
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
			for (let index in this.flowData)
				if (this.flowData.hasOwnProperty(index))
					this.$set(this.hideMyBlock, index, true);
		},

		methods: {

			/**
			 * Deletes an item.
			 *
			 * @param parentDom HTMLElement
			 * @param item {*}
			 * @param index Int
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			deleteItem(parentDom, item, index)
			{
				this.flowData = this.flowData.jsonEditorRemoveIndex(index);
				this.$emit("input", this.flowData);
			},

			/**
			 * Opens the Add item panel.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			addItem()
			{
				if (this.isAddingItem)
					return;

				this.isAddingItem = true;
			},

			/**
			 * Cancels adding a new item.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			cancelNewItem()
			{
				if (!this.isAddingItem)
					return;

				this.isAddingItem = false;
			},

			/**
			 * Toggles block visibility.
			 *
			 * @param index Int
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			toggleBlock(index)
			{
				this.$set(this.hideMyBlock, index, !this.hideMyBlock[index]);
			},

			/**
			 * Adds a new item.
			 *
			 * @param obj {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			newItem(obj)
			{
				let oj = {
					name: obj.key,
					type: obj.type
				};

				if (obj.type === 'array' || obj.type === 'object')
				{
					oj.childParams = obj.value;
					oj.remark = null;
				}
				else
				{
					oj.childParams = null;
					oj.remark = obj.value;
				}

				this.flowData.push(oj);
				this.$emit("input", this.flowData);
				this.cancelNewItem();
			}

		}

	});

	Vue.component("latte-json-editor-view", {

		props: {

			parsedData: {
				required: true
			}

		},

		template: `	<div class="json-editor json-editor-view">
						<div class="json-editor json-editor-block" v-for="(item, index) in flowData" :key="key(item)" :class="[item.type, {'hide-block': hideMyBlock[index]}]">
							<div class="key">
								<button class="btn btn-light toggle" v-if="item.type === 'object' || item.type === 'array'" @click="toggleBlock(index)"><i :class="['mdi', {'mdi-chevron-down': !hideMyBlock[index]}, {'mdi-chevron-right': hideMyBlock[index]}]"></i></button>
								<input type="text" v-model="item.name" class="form-control" v-if="typeof item.name === 'string'" @blur="keyInputBlur(item, $event)" />
								<span class="json-editor json-editor-o" v-if="item.type === 'array'">{{ "[" + item.childParams.length + "]" }}</span>
								<span class="json-editor json-editor-o" v-if="item.type === 'object'">{{ "{" + (item.childParams.length || 0) + "}" }}</span>
								<button class="btn btn-light trash" @click="deleteItem(parsedData, item, index)" v-if="item.type === 'object' || item.type === 'array'"><i class="mdi mdi-delete"></i></button>
							</div>
							<div class="value">
								<template v-if="item.type === 'object'">
									<latte-json-editor-view :parsedData="item.childParams" v-model="item.childParams"></latte-json-editor-view>
								</template>
								<template v-else-if="item.type === 'array'">
									<latte-json-editor-view-array :parsedData="item.childParams" v-model="item.childParams"></latte-json-editor-view-array>
								</template>
								<template v-else>
									<input type="text" v-model="item.remark" class="form-control" v-if="item.type == 'string'">
									<input type="number" v-model.number="item.remark" class="form-control" v-if="item.type == 'number'">
									<select name="value" v-model="item.remark" class="custom-select" v-if="item.type == 'boolean'">
										<option :value="true">TRUE</option>
										<option :value="false">FALSE</option>
									</select>
									<button class="btn btn-light trash" @click="deleteItem(parsedData, item, index)"><i class="mdi mdi-delete"></i></button>
								</template>
							</div>
						</div>
						<latte-json-editor-iaf v-if="isAddingItem" @confirm="newItem" @cancel="cancelNewItem"></latte-json-editor-iaf>
						<button class="btn btn-light" @click="addItem" v-if="!isAddingItem"><i class="mdi mdi-plus-circle"></i></button>
					</div>`,

		/**
		 * Invoked when our Vue Component is created.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		created()
		{
			this.flowData = this.parsedData;
		},

		/**
		 * Invoked when our Vue Component is mounted.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		mounted()
		{
			for (let index in this.flowData)
				if (this.flowData.hasOwnProperty(index))
					this.$set(this.hideMyBlock, index, true);
		},

		/**
		 * Returns the initial data for our Vue Component.
		 *
		 * @returns {*}
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				flowData: [],
				hideMyBlock: {},
				isAddingItem: false
			};
		},

		methods: {

			key(item)
			{
				return JSON.stringify(item);
			},

			/**
			 * Deletes an item.
			 *
			 * @param parentDOM HTMLElement
			 * @param item {*}
			 * @param index Int
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			deleteItem(parentDOM, item, index)
			{
				this.flowData = this.flowData.jsonEditorRemoveIndex(index);
				this.$emit("input", this.flowData);
			},

			/**
			 * Toggles block visibility.
			 *
			 * @param index Int
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			toggleBlock(index)
			{
				this.$set(this.hideMyBlock, index, !this.hideMyBlock[index]);
			},

			/**
			 * Opens the Add item panel.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			addItem()
			{
				if (this.isAddingItem)
					return;

				this.isAddingItem = true;
			},

			/**
			 * Cancels adding a new item.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			cancelNewItem()
			{
				if (!this.isAddingItem)
					return;

				this.isAddingItem = false;
			},

			/**
			 * Adds a new item.
			 *
			 * @param obj {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			newItem(obj)
			{
				let oj = {
					name: obj.key,
					type: obj.type
				};

				if (obj.type === "array" || obj.type === "object")
				{
					oj.childParams = obj.value;
					oj.remark = null;
				}
				else
				{
					oj.childParams = null;
					oj.remark = obj.value;
				}

				if (!oj.name)
				{
					Latte.ui.alert(Latte.i18n.translate("root", "Invalid key"), Latte.i18n.translate("root", "Invalid key specified!"));
					return;
				}

				this.flowData.push(oj);
				this.$emit("input", this.flowData);
				this.cancelNewItem();
			},

			/**
			 * Invoked when the key input is being blurred.
			 *
			 * @param item {*}
			 * @param e Event
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			keyInputBlur(item, e)
			{
				if (item.name.length <= 0)
				{
					Latte.ui.alert(Latte.i18n.translate("root", "Invalid key"), Latte.i18n.translate("root", "Invalid key specified!"));
					item.name = "null";
					e.target.focus();
				}
			}

		}

	});

	Vue.component("latte-json-editor", {

		props: {

			json: {
				required: true
			}

		},

		template: `<latte-json-editor-view :parsedData="parsedData" v-model="parsedData"></latte-json-editor-view>`,

		/**
		 * Invoked when our Vue Component is created.
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		created()
		{
			this.parsedData = this.jsonParse(this.json);
		},

		/**
		 * Returns the initial data for our Vue Component.
		 *
		 * @returns {*}
		 *
		 * @author Bas Milius <bas@mili.us>
		 * @since 1.0.0
		 */
		data()
		{
			return {
				parsedData: []
			};
		},

		methods: {

			/**
			 * Gets the simple type of an object.
			 *
			 * @param obj
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
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
						return typeof(obj);
				}
			},

			/**
			 * Parses JSON to objects.
			 *
			 * @param jsonString
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
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

			/**
			 * Makes JSON from data.
			 *
			 * @param dataArray
			 *
			 * @returns {*}
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
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

			/**
			 * Watcher for {@see handler}.
			 *
			 * @author Bas Milius <bas@mili.us>
			 * @since 1.0.0
			 */
			parsedData: {

				handler()
				{
					this.$emit("input", this.makeJson(this.parsedData));
				},

				deep: true

			}

		}
	});

}
